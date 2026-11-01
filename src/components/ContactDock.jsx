import {lazy,Suspense,useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {company} from '../config/site';
import Icon from './Icon';
const Chatbot=lazy(()=>import('./Chatbot'));
export default function ContactDock(){
  const [open,setOpen]=useState(false),{pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  return <><div className="contact-dock" aria-label="Talk to MAK"><a className="dock-call" href={`tel:${company.phoneLink}`} aria-label="Call MAK BPO"><Icon name="phone"/></a><a className="dock-whatsapp" href={company.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Connect with MAK on WhatsApp"><Icon name="whatsapp"/></a><button className="chat-launcher" aria-label={open?'Close MAK Guide chatbot':'Open MAK Guide chatbot'} aria-expanded={open} aria-controls="mak-chat" onClick={()=>setOpen(v=>!v)}><Icon name={open?'close':'chat'}/><span>Ask MAK</span><i/></button></div>{open&&<Suspense fallback={<div className="chat-loading" role="status">Opening MAK Guide…</div>}><Chatbot onClose={()=>setOpen(false)}/></Suspense>}</>;
}
