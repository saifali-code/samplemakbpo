import {lazy,Suspense} from 'react';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Appearance from './components/Appearance';
import ContactDock from './components/ContactDock';
import RouteEffects from './components/RouteEffects';
import Home from './pages/Home';
import {useExperience} from './context/ExperienceContext';
const named=(loader,name)=>lazy(()=>loader().then(m=>({default:m[name]})));
const Services=named(()=>import('./pages/Services'),'Services'),ServiceDetail=named(()=>import('./pages/Services'),'ServiceDetail');
const Campaigns=named(()=>import('./pages/Services'),'Campaigns'),CampaignDetail=named(()=>import('./pages/Services'),'CampaignDetail');
const Careers=named(()=>import('./pages/Careers'),'Careers'),CareerDetail=named(()=>import('./pages/Careers'),'CareerDetail');
const Contact=lazy(()=>import('./pages/Contact')),Team=lazy(()=>import('./pages/Team'));
const About=named(()=>import('./pages/Company'),'About'),Life=named(()=>import('./pages/Company'),'Life'),Partnership=named(()=>import('./pages/Company'),'Partnership'),Approach=named(()=>import('./pages/Company'),'Approach'),Quality=named(()=>import('./pages/Company'),'Quality');
const FAQs=named(()=>import('./pages/Resources'),'FAQs'),Insights=named(()=>import('./pages/Resources'),'Insights'),Article=named(()=>import('./pages/Resources'),'Article'),Themes=named(()=>import('./pages/Resources'),'Themes'),Legal=named(()=>import('./pages/Resources'),'Legal'),Sitemap=named(()=>import('./pages/Resources'),'Sitemap');
const NotFound=lazy(()=>import('./pages/NotFound'));
export default function App(){const {ready}=useExperience();return <><RouteEffects/><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main" tabIndex="-1" data-framework="react" data-react-ready={ready?'true':undefined}><Suspense fallback={<div className="page-loading" role="status"><span/>Connecting you with MAK…</div>}><Routes>
  <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/team" element={<Team/>}/>
  <Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<ServiceDetail/>}/>
  <Route path="/campaigns" element={<Campaigns/>}/><Route path="/campaigns/:slug" element={<CampaignDetail/>}/>
  <Route path="/careers" element={<Careers/>}/><Route path="/careers/:slug" element={<CareerDetail/>}/>
  <Route path="/contact" element={<Contact/>}/><Route path="/life-at-mak" element={<Life/>}/><Route path="/partnership" element={<Partnership/>}/><Route path="/our-approach" element={<Approach/>}/><Route path="/quality" element={<Quality/>}/>
  <Route path="/faq" element={<FAQs/>}/><Route path="/insights" element={<Insights/>}/><Route path="/insights/:slug" element={<Article/>}/><Route path="/themes" element={<Themes/>}/>
  {['privacy','terms','accessibility'].map(kind=><Route key={kind} path={`/${kind}`} element={<Legal kind={kind}/>}/>)}
  <Route path="/sitemap" element={<Sitemap/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></Suspense></main><Footer/><ContactDock/><Appearance/></>;}
