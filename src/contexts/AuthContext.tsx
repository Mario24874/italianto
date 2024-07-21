import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Asegúrate de que la ruta sea correcta

interface AuthContextValue {
  user: {
    id: string;
    email: string;
    // ...otros campos que necesites del usuario...
  } | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session:', error);
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (data.session?.user) {
        setRedirectPath('/dashboard'); // Redirigir si hay sesión
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user) {
          setRedirectPath('/dashboard'); // Redirigir si hay sesión
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []); // Dependencias vacías para que se ejecute solo una vez

  useEffect(() => {
    // Lógica de redirección condicional
    if (!loading && redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null); // Reiniciar la ruta después de redirigir
    } else if (!loading && !user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [loading, redirectPath, navigate, user, location]); // Dependencias para controlar la redirección

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw new Error('Error durante la autenticación con Google');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};