import {useEffect,useRef,useState} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {motion,useScroll,useSpring} from 'motion/react';
import {services} from '../config/site';
import Icon from './Icon';
import ModeToggle from './ModeToggle';
export default function Header(){
  const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);const location=useLocation(),ref=useRef(null);
  const {scrollYProgress}=useScroll();const progress=useSpring(scrollYProgress,{stiffness:180,damping:30});
  useEffect(()=>{setOpen(false);ref.current?.querySelectorAll('details').forEach(d=>d.open=false);},[location]);
  useEffect(()=>{const fn=()=>setScrolled(scrollY>90);fn();addEventListener('scroll',fn,{passive:true});return()=>removeEventListener('scroll',fn);},[]);
  useEffect(()=>{document.body.classList.toggle('menu-open',open);return()=>document.body.classList.remove('menu-open');},[open]);
  useEffect(()=>{const fn=e=>{if(e.key==='Escape'){setOpen(false);ref.current?.querySelectorAll('details').forEach(d=>d.open=false);}};addEventListener('keydown',fn);return()=>removeEventListener('keydown',fn);},[]);
  const nav=(to,label)=><NavLink to={to} end={to==='/'}>{label}</NavLink>;
  return <><motion.div className="scroll-progress react-progress" style={{scaleX:progress}}/><header ref={ref} className={`site-header ${scrolled?'scrolled':''}`}><div className="container header-inner"><Link className="brand" to="/" aria-label="MAK BPO home"><img src="/assets/mak-logo.webp" width="86" height="58" alt="MAK BPO"/><span>BPO &amp;<br/>TELECOMMUNICATIONS</span></Link><button className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}><span/><span/></button><nav id="main-nav" aria-label="Main navigation" className={open?'is-open':''}>{nav('/','Home')}<details className="nav-dropdown"><summary>Company <span>⌄</span></summary><div className="dropdown-panel"><span className="menu-label">Meet MAK</span>{nav('/about/','About us')}{nav('/team/','Our team')}{nav('/our-approach/','Our approach')}{nav('/life-at-mak/','Life at MAK')}{nav('/quality/','Quality & responsibility')}</div></details><details className="nav-dropdown"><summary>Services <span>⌄</span></summary><div className="dropdown-panel"><span className="menu-label">What we do</span>{nav('/services/','Explore all services')}{services.slice(0,4).map(s=><Link key={s.slug} to={`/services/${s.slug}/`}>{s.title}</Link>)}</div></details>{nav('/campaigns/','Campaigns')}{nav('/careers/',<>Careers <span className="hiring-dot"/></>)}{nav('/contact/','Contact')}<Link to="/partnership/" className="nav-cta">Let’s build together <Icon name="arrow-up" size={16}/></Link></nav><ModeToggle/></div></header></>;
}
