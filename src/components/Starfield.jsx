import {useEffect,useRef} from 'react';
import {useExperience} from '../context/ExperienceContext';
export default function Starfield(){
  const ref=useRef(null),state=useRef(false);const {paused}=useExperience();state.current=paused;
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');if(!ctx)return;let w=1,h=1,raf=0,live=true,last=0,wasPaused=false;
    let seed=17011;const rnd=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
    const stars=Array.from({length:100},()=>({x:rnd(),y:rnd(),s:.35+rnd()*1.2,p:rnd()*6.28}));
    const start=performance.now();let visible=true;
    const draw=now=>{const t=state.current?0:(now-start)/1000;ctx.clearRect(0,0,w,h);const count=w<600?60:100;
      for(let i=0;i<count;i++){const s=stars[i],x=s.x*w+Math.sin(t*.08+s.p)*5,y=s.y*h+Math.cos(t*.06+s.p)*5;ctx.fillStyle=`rgba(190,215,255,${.24+Math.sin(t*.55+s.p)*.12})`;ctx.beginPath();ctx.arc(x,y,s.s,0,Math.PI*2);ctx.fill();if(i%13===0){ctx.strokeStyle='#aed4fa55';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}}
      if(!state.current){for(let i=0;i<4;i++){const p=((t+i*4.6)%19)/19;if(p>.2)continue;const x=(.35+i*.18)*w-p*w*2.1,y=(.08+i*.17)*h+p*h*1.5,len=w<600?70:160;const g=ctx.createLinearGradient(x,y,x+len,y-len*.45);g.addColorStop(0,'#c4f5ffb0');g.addColorStop(1,'#497dff00');ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len,y-len*.45);ctx.stroke();}}
    };
    const resize=()=>{w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(performance.now());};
    const ro=new ResizeObserver(resize);ro.observe(canvas);const io=new IntersectionObserver(e=>visible=e[0].isIntersecting);io.observe(canvas);
    function tick(now){if(!live)return;raf=requestAnimationFrame(tick);if(!visible||document.hidden||now-last<34)return;last=now;if(state.current&&wasPaused)return;wasPaused=state.current;draw(now);}resize();raf=requestAnimationFrame(tick);
    return()=>{live=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();};
  },[]);
  return <canvas ref={ref} className="react-stars" aria-hidden="true"/>;
}
