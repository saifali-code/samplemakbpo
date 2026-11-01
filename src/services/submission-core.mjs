export const submissionTypes=['contact','careers'];
export function isEmailConfigured(settings,type){
  const valid=v=>typeof v==='string'&&v.trim().length>2&&!/YOUR_|REPLACE_|PLACEHOLDER/.test(v);
  return submissionTypes.includes(type)&&[settings?.publicKey,settings?.serviceId,settings?.templates?.[type]].every(valid);
}
export function prepareSubmission(type,values,pageUrl=''){
  if(!submissionTypes.includes(type))throw new Error('Unknown form type');
  const get=k=>String(values[k]||'').trim();
  if(get('website'))throw new Error('Submission could not be processed.');
  if(!get('from_name')||!/^\S+@\S+\.\S+$/.test(get('reply_to')))throw new Error('Please enter your name and a valid email address.');
  if(!values.consent)throw new Error('Please agree to the Privacy Notice before sending.');
  if(type==='contact'&&(!get('subject')||!get('message')))throw new Error('Please choose a topic and enter your message.');
  if(type==='careers'&&(!['Junior Closer','Closer','Validators'].includes(get('position'))||!get('phone')||!get('city')||!get('experience')))throw new Error('Please complete the required application details.');
  return {form_type:type,from_name:get('from_name'),reply_to:get('reply_to'),phone:get('phone'),company:get('company'),city:get('city'),position:get('position'),experience:get('experience'),subject:type==='careers'?'Career application: '+get('position'):get('subject'),message:get('message'),consent:'Yes — permission to respond',page_url:pageUrl,submitted_at:new Date().toISOString()};
}
export async function deliverSubmission({type,values,settings,sender,pageUrl}){
  const payload=prepareSubmission(type,values,pageUrl);
  if(!isEmailConfigured(settings,type))throw new Error('Online submission is being connected. Your message has not been sent. Please email info@makbpotelecommunications.com or use WhatsApp. Your details are still here.');
  return sender(settings.serviceId,settings.templates[type],payload,{publicKey:settings.publicKey,limitRate:{id:'mak-react-forms',throttle:30000}});
}
