import {socials,socialNames} from '../config/site';
import Icon from './Icon';
export function SocialButtons({className=''}){
  return <div className={`social-buttons ${className}`} aria-label="MAK social channels">{Object.entries(socialNames).map(([id,name])=>{
    const href=socials[id],demo=href.includes('example.com');
    return <a key={id} href={href} className={`social-${id}`} data-placeholder={demo||undefined} aria-label={`${name}${demo?' — sample profile link':''}`} title={demo?`${name}: sample link, replace with your official profile`:name} target="_blank" rel={demo?'noopener noreferrer nofollow':'noopener noreferrer'}><Icon name={id}/></a>;
  })}</div>;
}
