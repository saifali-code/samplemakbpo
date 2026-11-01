import {createContext,startTransition,useContext,useEffect,useState} from 'react';
import {useReducedMotion} from 'motion/react';
const Context=createContext(null);
const palettes=['orbit','aurora','violet','ember','ocean'];
export function ExperienceProvider({children}){
  const reduce=useReducedMotion();
  // Deterministic first render keeps prebuilt HTML and React hydration identical.
  const [theme,setTheme]=useState('orbit'),[mode,setMode]=useState('dark'),[resolvedMode,setResolvedMode]=useState('dark'),[loaded,setLoaded]=useState(false),[paused,setPaused]=useState(false);
  useEffect(()=>{startTransition(()=>{try{const t=localStorage.getItem('mak-theme'),m=localStorage.getItem('mak-mode');if(palettes.includes(t))setTheme(t);if(['dark','light','auto'].includes(m))setMode(m);}catch{}setLoaded(true);});},[]);
  useEffect(()=>{
    if(!loaded)return;
    const media=matchMedia('(prefers-color-scheme: dark)');
    const apply=()=>{const resolved=mode==='auto'?(media.matches?'dark':'light'):mode;setResolvedMode(resolved);document.documentElement.dataset.theme=theme;document.documentElement.dataset.mode=resolved;document.querySelector('meta[name="theme-color"]').content=resolved==='light'?'#f7f9fc':'#080e1c';};
    apply();media.addEventListener('change',apply);try{localStorage.setItem('mak-theme',theme);localStorage.setItem('mak-mode',mode);}catch{}
    return()=>media.removeEventListener('change',apply);
  },[theme,mode,loaded]);
  return <Context.Provider value={{ready:loaded,theme,setTheme,mode,setMode,resolvedMode,paused:paused||!!reduce,setPaused,reduced:!!reduce}}>{children}</Context.Provider>;
}
export const useExperience=()=>useContext(Context);
