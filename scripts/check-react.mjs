import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {pageCatalog} from '../src/data/routes.mjs';
const root=resolve(import.meta.dirname,'..');let checks=0;
const check=(ok,message)=>{checks++;assert.ok(ok,message);};
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8'));
check(!!pkg.dependencies.react&&!!pkg.dependencies['react-dom'],'React dependencies required');
check(!!pkg.devDependencies.vite,'Vite required');
check(!pkg.dependencies.express&&!pkg.dependencies.mongoose&&!pkg.dependencies.mongodb,'Frontend must not include backend packages');
const main=await readFile(join(root,'src/main.jsx'),'utf8');check(main.includes('createRoot'),'React must own the root UI');
const files=await readdir(join(root,'src'),{recursive:true});const jsx=files.filter(f=>f.endsWith('.jsx'));
let forms=0;
for(const f of jsx){const text=await readFile(join(root,'src',f),'utf8');check(!text.includes('dangerouslySetInnerHTML'),`${f}: raw HTML wrapper is not allowed`);check(!/type=["']file["']/.test(text),`${f}: no CV uploads`);forms+=(text.match(/<form\b/g)||[]).length;}
check(forms===1,'Exactly one reusable React form component should implement the two forms');
const contact=await readFile(join(root,'src/pages/Contact.jsx'),'utf8'),career=await readFile(join(root,'src/pages/Careers.jsx'),'utf8'),company=await readFile(join(root,'src/pages/Company.jsx'),'utf8');
check(contact.includes('<EmailForm type="contact"'),'Contact form missing');check(career.includes('<EmailForm type="careers"'),'Careers form missing');check(!company.includes('EmailForm'),'Partnership must use Contact rather than a third form');
const settings=await readFile(join(root,'src/config/emailjs.js'),'utf8');check(!settings.includes('partnership:'),'Only two EmailJS template types are allowed');
for(const p of pageCatalog){const path=join(root,'dist','.'+p.path,'index.html');const html=await readFile(path,'utf8');check(html.includes('id="root"'),`${p.path}: React root missing`);check(html.includes('type="module"'),`${p.path}: module bundle missing`);check(html.includes('<title>'),`${p.path}: title missing`);check((html.match(/<h1\b/g)||[]).length===1,`${p.path}: full pre-rendered heading required`);check(html.includes('application/ld+json'),`${p.path}: structured data required`);check((html.match(/rel="canonical"/g)||[]).length===1,`${p.path}: exactly one canonical URL`);check((html.match(/<form\b/g)||[]).length===(['/contact/','/careers/'].includes(p.path)?1:0),`${p.path}: incorrect form count`);check(html.includes('6:00 PM'),`${p.path}: verified shift should appear in footer`);for(const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)){check((await stat(join(root,'dist',match[1]))).isFile(),`${p.path}: missing ${match[1]}`);}}
check(new Set(pageCatalog.map(p=>p.path)).size===pageCatalog.length,'Duplicate routes');
console.log(`PASS: ${pageCatalog.length} pre-rendered routes, ${jsx.length} JSX files, ${checks} source/build checks. SEO HTML, exactly two form destinations; no backend.`);
