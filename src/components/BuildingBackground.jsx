import {useEffect,useRef,useState} from 'react';
import {useExperience} from '../context/ExperienceContext';
const windows=[[145,200,110,54],[488,200,108,53],[143,461,110,60],[141,740,113,65],[486,741,110,64],[829,740,113,66],[139,1002,115,61],[485,1003,112,62]];
/** Decorative only: the building is never a foreground card or interactive model. */
export default function BuildingBackground(){
  const background=useRef(null),host=useRef(null),engine=useRef(null),[webgl,setWebgl]=useState(false);const {paused}=useExperience();
  const pauseRef=useRef(paused);pauseRef.current=paused;
  useEffect(()=>{
    const constrained=matchMedia('(max-width: 767px)').matches||navigator.connection?.saveData||['slow-2g','2g'].includes(navigator.connection?.effectiveType)||navigator.deviceMemory&&navigator.deviceMemory<=4||matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(constrained)return;
    let cancelled=false,canvas,gl;
    const start=async()=>{try{
      if(cancelled)return;canvas=document.createElement('canvas');gl=canvas.getContext('webgl2',{alpha:true,antialias:false});if(!gl)return;
      const m=await import('../graphics/createBuildingScene');if(cancelled){gl.getExtension('WEBGL_lose_context')?.loseContext();return;}
      const scene=await m.createBuildingScene(host.current,{canvas,gl,paused:pauseRef.current});
      if(cancelled)scene.dispose();else{engine.current=scene;scene.setPaused(pauseRef.current);setWebgl(true);}
    }catch{canvas?.remove();gl?.getExtension('WEBGL_lose_context')?.loseContext();}};
    const idle=window.requestIdleCallback?requestIdleCallback(start,{timeout:2200}):setTimeout(start,800);
    return()=>{cancelled=true;if(window.cancelIdleCallback)cancelIdleCallback(idle);else clearTimeout(idle);engine.current?.dispose();engine.current=null;};
  },[]);
  useEffect(()=>{
    const node=background.current,hero=node?.closest('[data-home-hero]');
    if(!hero||!matchMedia('(pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let frame=0,point={x:0,y:0};
    const apply=()=>{frame=0;if(pauseRef.current)return;node.style.setProperty('--model-yaw',`${point.x*4}deg`);node.style.setProperty('--model-pitch',`${-point.y*2}deg`);engine.current?.setPointer(point.x,point.y);};
    const move=e=>{if(pauseRef.current)return;const r=hero.getBoundingClientRect();point={x:Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1)),y:Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1))};if(!frame)frame=requestAnimationFrame(apply);};
    const reset=()=>{point={x:0,y:0};if(!frame)frame=requestAnimationFrame(apply);};
    hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',reset);
    return()=>{cancelAnimationFrame(frame);hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',reset);};
  },[]);
  useEffect(()=>engine.current?.setPaused(paused),[paused]);
  return <div ref={background} className={`building-background ${webgl?'has-webgl':''} ${paused?'is-paused':''}`} aria-hidden="true" data-building-background="true"><div className="architecture-halo"/><div className="architecture-orbit orbit-one"/><div className="architecture-orbit orbit-two"/><div className="architecture-orbit orbit-three"/><div ref={host} className="webgl-architecture"/><div className="react-model-perspective"><div className="react-building"><div className="building-front"><img src="/assets/mak-headquarters.webp" srcSet="/assets/mak-headquarters-640.webp 640w, /assets/mak-headquarters.webp 1086w" sizes="(max-width: 600px) 90vw, 600px" decoding="async" alt="" width="1086" height="1448"/><div className="building-light-sweep"/><div className="building-data-grid"/><div className="building-scanner"/></div><div className="building-side side-right"/><div className="building-side side-left"/><div className="building-roof"/><div className="building-plinth"/><div className="building-sign"><img src="/assets/mak-headquarters.webp" srcSet="/assets/mak-headquarters-640.webp 640w, /assets/mak-headquarters.webp 1086w" sizes="(max-width: 600px) 90vw, 600px" decoding="async" alt=""/></div>{windows.map(([x,y,w,h],i)=><div className="building-awning" key={i} style={{left:`${(x-5)/1071*100}%`,top:`${(y-17)/1400*100}%`,width:`${w/1071*100}%`,height:`${h/1400*100}%`,backgroundSize:`${1086/w*100}% ${1448/h*100}%`,backgroundPosition:`${x/(1086-w)*100}% ${y/(1448-h)*100}%`}}/>)}</div></div><div className="architecture-ground"/><div className="architecture-signals"><i/><i/><i/></div></div>;
}
