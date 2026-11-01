import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {createServer,loadEnv} from 'vite';
import {pageCatalog} from '../src/data/routes.mjs';
import {seoFor} from '../src/data/seo.mjs';
const root=resolve(import.meta.dirname,'..'),dist=resolve(root,'dist');
const template=await readFile(resolve(dist,'index.html'),'utf8'),env=loadEnv('production',root,'VITE_');
const manifest=JSON.parse(await readFile(resolve(dist,'.vite/manifest.json'),'utf8'));
const origin=(process.env.VITE_SITE_URL||env.VITE_SITE_URL||'https://makbpotelecommunications.com').replace(/\/$/,'');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=data=>JSON.stringify(data).replace(/</g,'\\u003c');
// Vite is used only as a build-time JSX compiler: middleware mode, no HTTP listener.
const compiler=await createServer({root,server:{middlewareMode:true,hmr:false,watch:null},appType:'custom',logLevel:'error'});
try{
  const {render}=await compiler.ssrLoadModule('/src/prerender.jsx');
  for(const p of [...pageCatalog,{path:'/not-found/'}]){
    const meta=seoFor(p.path,origin),content=await render(p.path);
    let html=template.replace(/<title>[^<]*<\/title>/,`<title>${esc(meta.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${esc(meta.description)}" />`);
    const head=`<link rel="canonical" href="${esc(meta.canonical)}"/><meta name="robots" content="${meta.robots}"/><meta property="og:title" content="${esc(meta.title)}"/><meta property="og:description" content="${esc(meta.description)}"/><meta property="og:url" content="${esc(meta.canonical)}"/><meta property="og:image" content="${esc(meta.image)}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="MAK BPO And Telecommunications"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(meta.title)}"/><meta name="twitter:description" content="${esc(meta.description)}"/><meta name="twitter:image" content="${esc(meta.image)}"/><script id="mak-structured-data" type="application/ld+json">${json(meta.graph)}</script>`;
    const page=p.path;
    const group=page.startsWith('/services/')||page.startsWith('/campaigns/')?'Services':page.startsWith('/careers/')?'Careers':page==='/contact/'?'Contact':page==='/team/'?'Team':['/about/','/life-at-mak/','/partnership/','/our-approach/','/quality/'].includes(page)?'Company':['/faq/','/insights/','/themes/','/privacy/','/terms/','/accessibility/','/sitemap/'].some(prefix=>page.startsWith(prefix))?'Resources':page==='/not-found/'?'NotFound':null;
    const chunks=new Set(),walk=key=>{const item=manifest[key];if(!item||chunks.has(item.file))return;chunks.add(item.file);for(const dep of item.imports||[])walk(dep);};
    if(group)walk(`src/pages/${group}.jsx`);
    const preload=[...chunks].filter(file=>!template.includes('/'+file)).map(file=>`<link rel="modulepreload" href="/${file}"/>`).join('');
    html=html.replace('</head>',preload+head+'</head>').replace('<div id="root"></div>',`<div id="root">${content}</div>`);
    const path=p.path==='/not-found/'?resolve(dist,'404.html'):resolve(dist,'.'+p.path,'index.html');await mkdir(dirname(path),{recursive:true});await writeFile(path,html);
  }
}finally{await compiler.close();}
const indexed=pageCatalog.filter(p=>!seoFor(p.path,origin).robots.includes('noindex'));
await writeFile(resolve(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+indexed.map(p=>`<url><loc>${esc(origin+p.path)}</loc></url>`).join('')+'</urlset>');
await writeFile(resolve(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(resolve(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/assets/*\n  Cache-Control: public, max-age=604800, stale-while-revalidate=86400\n/assets/*.js\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*.css\n  Cache-Control: public, max-age=31536000, immutable\n');
console.log(`${pageCatalog.length} pre-rendered React pages + 404. HTML content, metadata, JSON-LD, sitemap and static-host headers generated. No deployment backend.`);
