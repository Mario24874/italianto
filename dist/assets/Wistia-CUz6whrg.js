import{g as e,r as t,u as a,p as n}from"./index-BKKWqMOC.js";function s(e,t){for(var a=0;a<t.length;a++){const n=t[a];if("string"!=typeof n&&!Array.isArray(n))for(const t in n)if("default"!==t&&!(t in e)){const a=Object.getOwnPropertyDescriptor(n,t);a&&Object.defineProperty(e,t,a.get?a:{enumerable:!0,get:()=>n[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var o=Object.create,l=Object.defineProperty,i=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,p=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,y=(e,t,a,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of r(t))u.call(e,s)||s===a||l(e,s,{get:()=>t[s],enumerable:!(n=i(t,s))||n.enumerable});return e},h=(e,t,a)=>(((e,t,a)=>{t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a})(e,"symbol"!=typeof t?t+"":t,a),a),c={};((e,t)=>{for(var a in t)l(e,a,{get:t[a],enumerable:!0})})(c,{default:()=>g});var d,b=(d=c,y(l({},"__esModule",{value:!0}),d)),P=((e,t,a)=>(a=null!=e?o(p(e)):{},y(e&&e.__esModule?a:l(a,"default",{value:e,enumerable:!0}),e)))(t),m=a,f=n;class g extends P.Component{constructor(){super(...arguments),h(this,"callPlayer",m.callPlayer),h(this,"playerID",this.props.config.playerId||`wistia-player-${(0,m.randomString)()}`),h(this,"onPlay",((...e)=>this.props.onPlay(...e))),h(this,"onPause",((...e)=>this.props.onPause(...e))),h(this,"onSeek",((...e)=>this.props.onSeek(...e))),h(this,"onEnded",((...e)=>this.props.onEnded(...e))),h(this,"onPlaybackRateChange",((...e)=>this.props.onPlaybackRateChange(...e))),h(this,"mute",(()=>{this.callPlayer("mute")})),h(this,"unmute",(()=>{this.callPlayer("unmute")}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){const{playing:t,muted:a,controls:n,onReady:s,config:o,onError:l}=this.props;(0,m.getSDK)("https://fast.wistia.com/assets/external/E-v1.js","Wistia").then((e=>{o.customControls&&o.customControls.forEach((t=>e.defineControl(t))),window._wq=window._wq||[],window._wq.push({id:this.playerID,options:{autoPlay:t,silentAutoPlay:"allow",muted:a,controlsVisibleOnLoad:n,fullscreenButton:n,playbar:n,playbackRateControl:n,qualityControl:n,volumeControl:n,settingsControl:n,smallPlayButton:n,...o.options},onReady:e=>{this.player=e,this.unbind(),this.player.bind("play",this.onPlay),this.player.bind("pause",this.onPause),this.player.bind("seek",this.onSeek),this.player.bind("end",this.onEnded),this.player.bind("playbackratechange",this.onPlaybackRateChange),s()}})}),l)}unbind(){this.player.unbind("play",this.onPlay),this.player.unbind("pause",this.onPause),this.player.unbind("seek",this.onSeek),this.player.unbind("end",this.onEnded),this.player.unbind("playbackratechange",this.onPlaybackRateChange)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){this.unbind(),this.callPlayer("remove")}seekTo(e,t=!0){this.callPlayer("time",e),t||this.pause()}setVolume(e){this.callPlayer("volume",e)}setPlaybackRate(e){this.callPlayer("playbackRate",e)}getDuration(){return this.callPlayer("duration")}getCurrentTime(){return this.callPlayer("time")}getSecondsLoaded(){return null}render(){const{url:e}=this.props,t=e&&e.match(f.MATCH_URL_WISTIA)[1],a=`wistia_embed wistia_async_${t}`;return P.default.createElement("div",{id:this.playerID,key:t,className:a,style:{width:"100%",height:"100%"}})}}h(g,"displayName","Wistia"),h(g,"canPlay",f.canPlay.wistia),h(g,"loopOnEnded",!0);const w=s({__proto__:null,default:e(b)},[b]);export{w as W};
