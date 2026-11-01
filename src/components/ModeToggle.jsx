import {useExperience} from '../context/ExperienceContext';
import Icon from './Icon';
export default function ModeToggle(){
  const {resolvedMode,setMode}=useExperience(),light=resolvedMode==='light';
  const label=light?'Switch to dark mode':'Switch to light mode';
  return <button className="mode-toggle" type="button" onClick={()=>setMode(light?'dark':'light')} aria-label={label} aria-pressed={light} title={label}><Icon name={light?'moon':'sun'} size={17}/><span>{light?'Dark':'Light'}</span><i className="mode-toggle-track" aria-hidden="true"><i/></i></button>;
}
