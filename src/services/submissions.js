import {emailSettings} from '../config/emailjs';
import {deliverSubmission} from './submission-core.mjs';
// Swap this adapter for an Express API call when a backend is needed.
export function sendSubmission(type,values){
  return deliverSubmission({type,values,settings:emailSettings,pageUrl:location.origin+location.pathname,sender:async(...args)=>{
    const {default:emailjs}=await import('@emailjs/browser');
    return emailjs.send(...args);
  }});
}
