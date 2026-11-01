import * as THREE from 'three';
/** WebGL renderer owned and disposed by the React BuildingBackground component. */
export async function createBuildingScene(host,{canvas,gl,paused=false}){
  if(!host)throw new Error('Scene host unavailable');
  const image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src='/assets/mak-headquarters.webp';});
  const renderer=new THREE.WebGLRenderer({canvas,context:gl,alpha:true,antialias:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(canvas);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,1,.1,80),building=new THREE.Group();scene.add(building);
  scene.add(new THREE.HemisphereLight(0xdbeaff,0x273148,2.6));const light=new THREE.DirectionalLight(0xe9f0ff,2);light.position.set(4,10,8);scene.add(light);
  let disposed=false,frame=0,isPaused=paused,visible=true,last=0,elapsed=paused?1.8:0,renderedPaused=false;const pointer=new THREE.Vector2(),targetPointer=new THREE.Vector2();const textures=[];
  const texture=(x,y,w,h)=>{const c=document.createElement('canvas');c.width=Math.min(1536,w);c.height=Math.round(h*c.width/w);c.getContext('2d').drawImage(image,x,y,w,h,0,0,c.width,c.height);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);return t;};
  const W=5.8,H=7.6,D=1.9,front=D/2;
  const stone=new THREE.MeshStandardMaterial({color:0xc4b39c,roughness:.78}),frameMat=new THREE.MeshStandardMaterial({color:0x14283e,roughness:.4,metalness:.5});
  function box(w,h,d,material,x,y,z,parent=building){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  const sx=x=>((x-5)/1071-.5)*W,sy=y=>(1-(y-17)/1400)*H;
  box(W,H,D,stone,0,H/2,0);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(W,H),new THREE.MeshBasicMaterial({map:texture(5,17,1071,1400)}));face.position.set(0,H/2,front+.015);building.add(face);
  box(W+.35,.12,D+.4,frameMat,0,-.06,.1);box(W,.12,.13,frameMat,0,H,front);
  for(let floor=0;floor<4;floor++){box(.016,.86,1.15,frameMat,W/2+.014,2.6+floor*1.45,0);box(.02,.73,.99,new THREE.MeshStandardMaterial({color:0x1d4d78,metalness:.5,roughness:.3}),W/2+.022,2.6+floor*1.45,0);}
  for(let y=.5;y<H;y+=.3)box(.016,.009,D,new THREE.MeshStandardMaterial({color:0xa4947e}),W/2+.01,y,0);
  const signMaterial=new THREE.MeshBasicMaterial({map:texture(361,1079,367,86)});box(367/1071*W,86/1400*H,.10,[frameMat,frameMat,frameMat,frameMat,signMaterial,frameMat],sx(544.5),sy(1122),front+.09);
  const panels=[[145,200,110,54],[488,200,108,53],[143,461,110,60],[141,740,113,65],[486,741,110,64],[829,740,113,66],[139,1002,115,61],[485,1003,112,62]];
  for(const [x,y,w,h] of panels){const pivot=new THREE.Group();pivot.position.set(sx(x+w/2),sy(y),front+.03);pivot.rotation.x=-.18;building.add(pivot);const mat=new THREE.MeshBasicMaterial({map:texture(x,y,w,h)});box(w/1071*W,h/1400*H,.035,[frameMat,frameMat,frameMat,frameMat,mat,frameMat],0,-h/1400*H/2,0,pivot);}
  const contour=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W+.03,H+.03,D+.03)),new THREE.LineBasicMaterial({color:0x7aa4f5,transparent:true,opacity:.25}));contour.position.y=H/2;building.add(contour);
  const haloMaterial=new THREE.MeshBasicMaterial({color:0x527dff,transparent:true,opacity:.1,depthWrite:false,side:THREE.DoubleSide});
  const halo=new THREE.Mesh(new THREE.RingGeometry(W*.45,W*.73,64),haloMaterial);halo.rotation.x=-Math.PI/2;halo.position.y=-.2;scene.add(halo);
  const scanCanvas=document.createElement('canvas');scanCanvas.width=8;scanCanvas.height=128;const scanContext=scanCanvas.getContext('2d'),gradient=scanContext.createLinearGradient(0,0,0,128);gradient.addColorStop(0,'rgba(130,210,255,0)');gradient.addColorStop(.9,'rgba(180,245,255,.35)');gradient.addColorStop(1,'rgba(220,255,255,.9)');scanContext.fillStyle=gradient;scanContext.fillRect(0,0,8,128);const scanTexture=new THREE.CanvasTexture(scanCanvas);textures.push(scanTexture);
  const scanMaterial=new THREE.MeshBasicMaterial({map:scanTexture,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false});const scanner=new THREE.Mesh(new THREE.PlaneGeometry(W,H*.14),scanMaterial);scanner.position.z=front+.08;building.add(scanner);
  const starsGeometry=new THREE.BufferGeometry(),starPositions=new Float32Array(28*3);for(let i=0;i<28;i++){const a=i*2.39996;starPositions[i*3]=Math.cos(a)*(W*.6+(i%4)*.2);starPositions[i*3+1]=.5+(i%11)*.68;starPositions[i*3+2]=Math.sin(a)*2.8;}starsGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));const constellation=new THREE.Points(starsGeometry,new THREE.PointsMaterial({color:0xb9f5eb,size:.035,transparent:true,opacity:.5,depthWrite:false}));scene.add(constellation);
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.set(0,5.9,h>w?17:16.3);camera.lookAt(0,3.9,0);camera.updateProjectionMatrix();};
  const ro=new ResizeObserver(resize);ro.observe(host);const io=new IntersectionObserver(e=>visible=e[0].isIntersecting);io.observe(host);resize();const start=performance.now();
  function tick(now){
    if(disposed)return;frame=requestAnimationFrame(tick);
    if(!visible||document.hidden){last=now;return;}if(now-last<34)return;
    const delta=Math.min((now-last)/1000,.08);last=now;if(isPaused&&renderedPaused)return;renderedPaused=isPaused;
    if(!isPaused)elapsed+=delta;const t=elapsed;pointer.lerp(targetPointer,.07);
    const entry=1-Math.pow(1-Math.min(t/1.8,1),3);
    building.rotation.y=-.24+Math.sin(t*.38)*.12+pointer.x*.055;
    building.rotation.x=.025+Math.sin(t*.24)*.015-pointer.y*.022;
    building.rotation.z=Math.sin(t*.2)*.008;building.position.y=Math.sin(t*.85)*.095-(1-entry)*.55;building.scale.setScalar(.94+entry*.06);
    contour.material.opacity=.2+Math.sin(t*.7)*.07;
    const phase=(t*.15)%1;scanner.position.y=-H*.14+phase*(H*1.28);scanMaterial.opacity=Math.sin(phase*Math.PI)*.27;
    haloMaterial.opacity=.1+Math.sin(t*.5)*.025;halo.scale.setScalar(1+Math.sin(t*.4)*.035);constellation.rotation.y=t*.055;
    renderer.render(scene,camera);
  }frame=requestAnimationFrame(tick);
  return {setPointer(x,y){targetPointer.set(x,y);},setPaused(value){isPaused=value;},dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();scene.traverse(o=>{o.geometry?.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[])m.dispose();});textures.forEach(t=>t.dispose());renderer.dispose();canvas.remove();}};
}
