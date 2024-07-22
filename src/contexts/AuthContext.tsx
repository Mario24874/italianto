import React, { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
  loginWithGoogle: async () => { },
  logout: async () => { },
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => { // Usamos useLayoutEffect para evitar conflictos con React Router
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error; // Lanza el error para manejarlo en el catch

        setUser(data.session?.user ?? null);
        if (data.session?.user) {
          setRedirectPath('/dashboard');
        } else if (!data.session?.user && location.pathname !== '/login') {
          setRedirectPath('/login'); // Redirige al login si no hay sesión
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setLoading(false); // Actualizar el estado de carga en cualquier caso
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          setRedirectPath('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          setRedirectPath('/login');
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useLayoutEffect(() => { // useLayoutEffect para redirigir de forma segura
    if (!loading && redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null); // Reiniciar la ruta después de redirigir
    }
  }, [loading, redirectPath, navigate]);

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
      setRedirectPath('/login'); // Redirigir al login después de cerrar sesión
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
