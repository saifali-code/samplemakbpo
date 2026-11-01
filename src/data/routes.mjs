import {services,campaigns,jobs,articles} from './content.mjs';
export const pageCatalog=[
  {path:'/',title:'Insurance Call Centre in Rawalpindi',description:'MAK BPO is a Rawalpindi call centre specialising in U.S. Final Expense, IUL, Auto Insurance and ACA campaign support. Pakistan shift: 6 PM–5 AM PKT.'},
  {path:'/about/',title:'About MAK',description:'Meet MAK BPO And Telecommunications, based in Satellite Town, Rawalpindi.'},
  {path:'/team/',title:'Our Team',description:'Meet the roles behind MAK’s campaign, operations, quality, and recruitment workflows. Sample team profiles ready to personalise.'},
  {path:'/services/',title:'Our services',description:'Final Expense, IUL, Auto Insurance and ACA campaign services, plus customer experience, outreach and BPO operations.'},
  ...services.map(s=>({path:`/services/${s.slug}/`,title:s.title,description:s.description})),
  {path:'/campaigns/',title:'Campaign areas',description:'Explore connected workflows across insurance, healthcare, home services, energy, retail and B2B programmes.'},
  ...campaigns.map(s=>({path:`/campaigns/${s.slug}/`,title:s.title,description:s.description})),
  {path:'/careers/',title:'Careers',description:'Apply for Junior Closer, Closer or Validators at MAK in Rawalpindi. A simple form with no CV upload.'},
  ...jobs.map(j=>({path:`/careers/${j.slug}/`,title:j.title+' opportunity',description:j.summary})),
  {path:'/life-at-mak/',title:'Life at MAK',description:'People, learning, conversations and shared ambition at MAK BPO.'},
  {path:'/partnership/',title:'Partnerships',description:'Discuss a campaign, outsourcing engagement or referral collaboration with MAK.'},
  {path:'/our-approach/',title:'Our approach',description:'Discover, design, prepare and refine your insurance campaign workflow with MAK BPO’s Rawalpindi team, supporting the U.S. market.'},
  {path:'/quality/',title:'Quality & responsibility',description:'Clear briefs, thoughtful checks and constructive feedback for connected operations.'},
  {path:'/contact/',title:'Contact MAK',description:'Email, call, WhatsApp, or find MAK in Satellite Town, Rawalpindi.'},
  {path:'/faq/',title:'Frequently asked questions',description:'Find answers about services, hiring, applications, partnerships and contacting MAK.'},
  {path:'/insights/',title:'Insights',description:'Original practical guides to campaigns, customer conversations and careers.'},
  ...articles.map(a=>({path:`/insights/${a.slug}/`,title:a.title,description:a.excerpt})),
  {path:'/themes/',title:'Colour & Appearance',description:'Five MAK colour palettes with light, dark, and automatic appearance modes.'},
  {path:'/privacy/',title:'Privacy Notice',description:'How the MAK website handles enquiries, applications and local chatbot questions.'},
  {path:'/terms/',title:'Website Terms',description:'Information about using the website and discussing services with MAK.'},
  {path:'/accessibility/',title:'Accessibility',description:'Navigation, motion preferences and accessibility features on the MAK website.'},
  {path:'/sitemap/',title:'Sitemap',description:'Find every company, service, campaign and career page on the MAK website.'}
];
export const normalisePath=p=>p==='/'?'/':p.replace(/\/+$/,'')+'/';
