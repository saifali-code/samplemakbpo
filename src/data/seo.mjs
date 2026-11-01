import {company,services,articles,faqs} from './content.mjs';
import {pageCatalog,normalisePath} from './routes.mjs';
import {teamIsPlaceholder} from './team.mjs';
export function seoFor(pathname,siteOrigin){
  const path=normalisePath(pathname),origin=siteOrigin.replace(/\/$/,''),page=pageCatalog.find(p=>p.path===path);
  const canonical=origin+path,title=(page?.title||'Page not found')+' | MAK BPO';
  const description=page?.description||'Explore insurance campaign services, careers, and contact MAK BPO in Rawalpindi.';
  const noindex=!page||path==='/themes/'||(path==='/team/'&&teamIsPlaceholder);
  const organization={'@type':'Organization','@id':origin+'/#organization',name:company.name,url:origin+'/',logo:origin+'/assets/mak-logo.webp',email:company.email,telephone:company.phoneLink,description:'Pakistan-based call centre specialising in U.S. Final Expense, IUL, Auto Insurance and ACA campaign support. '+company.hoursDetail+'.',address:{'@type':'PostalAddress',streetAddress:'1st floor, BLDG 4, st 1 Changezi Street, B Block Satellite Town',addressLocality:'Rawalpindi',addressCountry:'PK',postalCode:'46300'},areaServed:{'@type':'Country',name:'United States'},contactPoint:{'@type':'ContactPoint',telephone:company.phoneLink,email:company.email,contactType:'business enquiries',availableLanguage:['English','Urdu']},knowsAbout:['Final Expense campaign support','IUL campaign support','Auto Insurance campaign support','ACA campaign support','Business process outsourcing']};
  const graph=[organization,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:company.name,publisher:{'@id':organization['@id']}},{'@type':path==='/contact/'?'ContactPage':path==='/about/'?'AboutPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,isPartOf:{'@id':origin+'/#website'},about:{'@id':organization['@id']}}];
  if(path!=='/'){
    const parts=path.split('/').filter(Boolean),items=[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'}];
    parts.forEach((_,i)=>{const sub='/'+parts.slice(0,i+1).join('/')+'/',p=pageCatalog.find(p=>p.path===sub);items.push({'@type':'ListItem',position:i+2,name:p?.title||parts[i],item:origin+sub});});
    graph.push({'@type':'BreadcrumbList',itemListElement:items});
  }
  const service=services.find(s=>path===`/services/${s.slug}/`);
  if(service)graph.push({'@type':'Service',name:service.title+' campaign support',description:service.description,url:canonical,provider:{'@id':organization['@id']},areaServed:'United States'});
  if(path==='/faq/')graph.push({'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))});
  const article=articles.find(a=>path===`/insights/${a.slug}/`);
  if(article)graph.push({'@type':'Article',headline:article.title,description:article.excerpt,author:{'@id':organization['@id']},publisher:{'@id':organization['@id']},mainEntityOfPage:canonical});
  return {title,description,canonical,robots:noindex?'noindex,follow':'index,follow',image:origin+'/assets/mak-headquarters.jpg',graph:{'@context':'https://schema.org','@graph':graph}};
}
