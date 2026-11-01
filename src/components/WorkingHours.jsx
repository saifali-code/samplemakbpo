import {company} from '../config/site';
import Icon from './Icon';
export default function WorkingHours({compact=false}){
  return <div className={`working-hours ${compact?'compact':''}`}><span className="hours-icon"><Icon name="moon"/></span><div><span className="small-label">PAKISTAN NIGHT SHIFT · U.S. CAMPAIGNS</span><strong>{company.hours} <small>PKT</small></strong><p>Evening to the following morning · UTC+05:00</p></div></div>;
}
