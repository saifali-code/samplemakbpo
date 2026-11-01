import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {useExperience} from '../context/ExperienceContext';
import {themes} from '../config/site';
import Icon from './Icon';
export default function Appearance(){
  const [open,setOpen]=useState(false),ref=useRef(null),{theme,setTheme,mode,setMode}=useExperience();
  useEffect(()=>{if(!open)return;const key=e=>{if(e.key==='Escape')setOpen(false);},outside=e=>{if(!ref.current?.contains(e.target))setOpen(false);};document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};},[open]);
  return <div className="appearance" ref={ref}><button className="appearance-toggle" aria-label="Choose colour and appearance" aria-expanded={open} aria-controls="appearance-panel" onClick={()=>setOpen(!open)}><Icon name="palette"/></button>{open&&<div className="appearance-panel" id="appearance-panel"><p>Make it your MAK.</p><span>Daylight, midnight, or your own rhythm.</span><div className="appearance-modes" role="group" aria-label="Brightness mode">{[['light','sun','Light'],['dark','moon','Dark'],['auto','monitor','Auto']].map(([id,icon,label])=><button key={id} onClick={()=>setMode(id)} aria-pressed={mode===id}><Icon name={icon}/>{label}</button>)}</div><span className="small-label">YOUR COLOUR EXPERIENCE</span><div className="theme-options">{themes.map(t=><button key={t.id} onClick={()=>setTheme(t.id)} aria-pressed={theme===t.id}><i className="swatch" style={{background:t.color}}/>{t.name}<span>{theme===t.id?'✓':''}</span></button>)}</div><Link to="/themes/" onClick={()=>setOpen(false)}>Explore all colour experiences <Icon name="arrow"/></Link></div>}</div>;
}
