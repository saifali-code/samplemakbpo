import test from 'node:test';
import assert from 'node:assert/strict';
import {answerQuestion} from '../src/data/chat.mjs';
import {services} from '../src/data/content.mjs';

const cases=[
  ['Hello','greeting'],['Assalam o alaikum','greeting'],
  ['Which jobs are open?','jobs'],['How do I apply?','jobs'],['mujhe naukri chahiye','jobs'],
  ['Junior Closer','junior'],['I am a fresher','junior'],['Tell me about the closer role','closer'],
  ['Validators role','validator'],['Verifier jobs','validator'],
  ['Do I need a CV?','cv'],['Can I apply without CV?','cv'],
  ['What is the salary?','salary'],['Salary and shifts','salary'],['What are the working hours?','shifts'],
  ['Where is your office?','location'],['Are you in rwp?','location'],['Office kahan hai','location'],
  ['Can I work from home?','remote'],['Contact number please','contact'],['Call the office','contact'],
  ['Explore campaign services','services'],['What is your company name?','services'],
  ['Tell me about Final Expense','final-expense'],['FE campaign','final-expense'],
  ['What does IUL stand for?','iul'],['Indexed Universal Life','iul'],
  ['Auto Insurance service','auto'],['Car insurance campaign','auto'],['ACA support','aca'],
  ['Affordable Care Act','aca'],['Partnership options','partnership'],
  ['Check my application status','application-status'],['IUL jobs available?','campaign-jobs'],
  ['Is training provided?','training'],['What is the selection process?','interview'],
  ['What English skills are required?','requirements'],['Do you store chat history?','privacy'],
  ['My CNIC number is','sensitive'],['quantum pineapple submarine','fallback']
  ,['Do you work in the daytime?','shifts'],['Office timings in Rawalpindi','shifts'],['Kya timing hai?','shifts'],['Which U.S. market do you support?','markets'],['What is your time zone?','timezone'],['Who is the founder?','team-profiles'],['Show your team members','team-profiles'],['Change to light mode','appearance'],['Instagram link','socials'],['Where is Satellite Town B Block?','location']
];
for(const [question,id] of cases)test(question,()=>{const reply=answerQuestion(question);assert.equal(reply.id,id);assert.ok(reply.text.length>30);for(const [,url] of reply.links||[])assert.match(url,/^(\/|https:\/\/|tel:|mailto:)/);});
test('all four confirmed campaign services have complete workflows',()=>{for(const slug of ['final-expense','iul','auto-insurance','aca']){const s=services.find(x=>x.slug===slug);assert.ok(s);assert.equal(s.category,'Insurance campaigns');assert.ok(s.deliverables.length>=4);assert.ok(s.process.length===4);assert.ok(s.questions.length>=2);}});
test('no answer invents a salary or interview date',()=>{for(const question of ['salary','shift hours','interview date']){const a=answerQuestion(question);assert.doesNotMatch(a.text,/\b(?:PKR|Rs\.?|USD|\$)\s*\d|\b(?:Monday|Tuesday|Wednesday|Thursday|Friday)\b/);}});
test('verified night shift appears in hours and salary answers',()=>{for(const q of ['working hours','salary'])assert.match(answerQuestion(q).text,/6:00 PM.*5:00 AM.*PKT/);});
test('location answer preserves the exact address and a working map handoff',()=>{const a=answerQuestion('office location');assert.match(a.text,/BLDG 4.*changezi.*46300/);assert.match(a.text,/following morning/);assert.ok(a.links.some(([,u])=>u==='/contact/#location'));});
