import {Link} from 'react-router-dom';
import {company} from '../config/site';
import Icon from './Icon';
export default function ShiftBand(){return <section className="shift-band"><div className="container shift-band-inner"><div className="shift-route" aria-hidden="true"><span>PK</span><i/><span>US</span></div><div><p className="eyebrow">TWO MARKETS. ONE CONNECTED WORKFLOW.</p><h2>Insurance expertise.<br/><em>On the U.S. rhythm.</em></h2></div><div className="shift-band-info"><span><Icon name="moon"/>Rawalpindi, Pakistan</span><strong>{company.hours} <small>PKT</small></strong><p>Supporting U.S. campaigns from Pakistan.<br/>Shift ends the following morning.</p><Link className="text-link" to="/services/">Meet our campaign expertise<Icon name="arrow-up"/></Link></div></div></section>;}
