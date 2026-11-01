import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {seoFor} from '../data/seo.mjs';
export default function RouteEffects(){const location=useLocation();useEffect(()=>{
  const meta=seoFor(location.pathname,import.meta.env.VITE_SITE_URL||'https://makbpotelecommunications.com');
  document.title=meta.title;
  const setMeta=(key,value,property=false)=>{let el=document.querySelector(`meta[${property?'property':'name'}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(property?'property':'name',key);document.head.appendChild(el);}el.content=value;};
  setMeta('description',meta.description);setMeta('robots',meta.robots);
  for(const [key,value] of Object.entries({'og:title':meta.title,'og:description':meta.description,'og:url':meta.canonical,'og:image':meta.image,'og:type':'website','og:site_name':'MAK BPO And Telecommunications','twitter:card':'summary_large_image','twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':meta.image}))setMeta(key,value,!key.startsWith('twitter:'));
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=meta.canonical;
  let data=document.getElementById('mak-structured-data');if(!data){data=document.createElement('script');data.id='mak-structured-data';data.type='application/ld+json';document.head.appendChild(data);}data.textContent=JSON.stringify(meta.graph);
  const timer=setTimeout(()=>{if(location.hash){document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant',block:'start'});}else window.scrollTo({top:0,left:0,behavior:'instant'});},70);
  return()=>clearTimeout(timer);
},[location.pathname,location.search,location.hash]);return null;}
