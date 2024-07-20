import{g as e,r as t,u as r,p as a}from"./index-BKKWqMOC.js";function o(e,t){for(var r=0;r<t.length;r++){const a=t[r];if("string"!=typeof a&&!Array.isArray(a))for(const t in a)if("default"!==t&&!(t in e)){const r=Object.getOwnPropertyDescriptor(a,t);r&&Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:()=>a[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var n=Object.create,s=Object.defineProperty,i=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,p=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,c=(e,t,r,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of l(t))u.call(e,o)||o===r||s(e,o,{get:()=>t[o],enumerable:!(a=i(t,o))||a.enumerable});return e},h=(e,t,r)=>(((e,t,r)=>{t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),y={};((e,t)=>{for(var r in t)s(e,r,{get:t[r],enumerable:!0})})(y,{default:()=>P});var d,f=(d=y,c(s({},"__esModule",{value:!0}),d)),m=((e,t,r)=>(r=null!=e?n(p(e)):{},c(e&&e.__esModule?r:s(r,"default",{value:e,enumerable:!0}),e)))(t),g=r,b=a;class P extends m.Component{constructor(){super(...arguments),h(this,"callPlayer",g.callPlayer),h(this,"onDurationChange",(()=>{const e=this.getDuration();this.props.onDuration(e)})),h(this,"mute",(()=>{this.callPlayer("setMuted",!0)})),h(this,"unmute",(()=>{this.callPlayer("setMuted",!1)})),h(this,"ref",(e=>{this.container=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){const{controls:t,config:r,onError:a,playing:o}=this.props,[,n]=e.match(b.MATCH_URL_DAILYMOTION);this.player?this.player.load(n,{start:(0,g.parseStartTime)(e),autoplay:o}):(0,g.getSDK)("https://api.dmcdn.net/all.js","DM","dmAsyncInit",(e=>e.player)).then((o=>{if(!this.container)return;const s=o.player;this.player=new s(this.container,{width:"100%",height:"100%",video:n,params:{controls:t,autoplay:this.props.playing,mute:this.props.muted,start:(0,g.parseStartTime)(e),origin:window.location.origin,...r.params},events:{apiready:this.props.onReady,seeked:()=>this.props.onSeek(this.player.currentTime),video_end:this.props.onEnded,durationchange:this.onDurationChange,pause:this.props.onPause,playing:this.props.onPlay,waiting:this.props.onBuffer,error:e=>a(e)}})}),a)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e,t=!0){this.callPlayer("seek",e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",e)}getDuration(){return this.player.duration||null}getCurrentTime(){return this.player.currentTime}getSecondsLoaded(){return this.player.bufferedTime}render(){const{display:e}=this.props,t={width:"100%",height:"100%",display:e};return m.default.createElement("div",{style:t},m.default.createElement("div",{ref:this.ref}))}}h(P,"displayName","DailyMotion"),h(P,"canPlay",b.canPlay.dailymotion),h(P,"loopOnEnded",!0);const O=o({__proto__:null,default:e(f)},[f]);export{O as D};
