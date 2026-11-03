import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './SiteEntrance.css';

export default function SiteEntrance({ onComplete }) {
  const [screen, setScreen] = useState(null);
  const frameRef = useRef(null);
  const lightRef = useRef(null);
  const finishRef = useRef(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useLayoutEffect(() => {
    const host = document.querySelector('#top:not([hidden]) .spatialScreen');
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.remove('portfolio-entering');
      completeRef.current();
      return;
    }
    try { sessionStorage.setItem(window.__portfolioEntrance?.sessionKey || 'portfolio-entrance-v3', 'seen'); } catch { /* Storage is optional. */ }
    document.documentElement.classList.add('portfolio-entering');
    setScreen(host);
  }, []);

  useLayoutEffect(() => {
    if (!screen) return;
    clearTimeout(window.__portfolioEntrance?.watchdog);
    const frame = frameRef.current;
    const number = frame.querySelector('.siteEntranceNumber');
    const noise = frame.querySelector('.siteEntranceNoise');
    const curtain = frame.querySelector('.siteEntranceCurtain');
    const context = noise.getContext('2d');
    let paintNoise=()=>{};
    if(context){
      const pixels = context.createImageData(noise.width, noise.height);
      const base=new Uint8Array(noise.width*noise.height),grain=new Float32Array(base.length),targets=new Int8Array(base.length);
      for(let index=0;index<base.length;index++){base[index]=45+Math.floor(Math.random()*120);pixels.data[index*4+3]=255;}
      let lastPaint=-Infinity,step=0;
      paintNoise=(phase,force=false)=>{
        const now=performance.now();if(!force&&now-lastPaint<40)return;lastPaint=now;
        // Change a quarter of the grain targets per update, never move the texture.
        const scan=(phase/(Math.PI*2)*1.36-.18)*noise.height,radius=noise.height*.065;
        for(let y=0;y<noise.height;y++){
          const distance=Math.max(0,1-Math.abs(y-scan)/radius);
          const band=11*distance*distance*(3-2*distance);
          for(let x=0;x<noise.width;x++){
            const index=y*noise.width+x;
            if(!force&&(index+step)%4===0)targets[index]=Math.floor(Math.random()*49)-24;
            grain[index]+=(targets[index]-grain[index])*.55;
            const value=base[index]+Math.round(grain[index]+band),offset=index*4;
            pixels.data[offset]=value;pixels.data[offset+1]=value;pixels.data[offset+2]=value;
          }
        }
        step++;
        context.putImageData(pixels,0,0);
      };
      paintNoise(0,true);
    }
    const page = document.getElementById('top');
    const near = [...page.querySelectorAll('.cyberFramePlate,.cyberNearPlate,.cyberFloorTint')];
    const far = [...page.querySelectorAll('.cyberRoomPlate')];
    const ambient = [...page.querySelectorAll('.cyberAmbientBackdrop')];
    const media = screen.querySelector('.spatialLiveMedia');
    const list = page.querySelector('.immersiveList');
    const heading = page.querySelector('.immersiveHeading');
    const info = page.querySelector('.immersiveInfo');
    const header = document.querySelector('.workAtlasHeader');
    const controls = [...page.querySelectorAll('.immersiveFilters,.immersiveMobileFilters,.immersivePosition,.immersiveFooter,.immersiveViewSwitch,.immersiveBrowseHint,.immersiveEdgeLabel')];
    const activeName = page.querySelector('.immersiveWorkRow.is-active .immersiveWorkName');
    const variables = ['--entrance-info-opacity','--entrance-camera'].map(key=>[key,page.style.getPropertyValue(key),page.style.getPropertyPriority(key)]);
    const typeSnapshot = activeName && ['color','-webkit-text-stroke-color'].map(key=>[key,activeName.style.getPropertyValue(key),activeName.style.getPropertyPriority(key)]);
    const touched = [...near,...far,...ambient,media,list,heading,info,header,...controls].filter(Boolean);
    const snapshots = touched.map(node => [node, node.style.getPropertyValue('opacity'), node.style.getPropertyPriority('opacity')]);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let finished = false;
    const restore = () => {
      document.documentElement.classList.remove('portfolio-entering');
      snapshots.forEach(([node, value, priority]) => value ? node.style.setProperty('opacity', value, priority) : node.style.removeProperty('opacity'));
      typeSnapshot?.forEach(([key,value,priority])=>value ? activeName.style.setProperty(key,value,priority) : activeName.style.removeProperty(key));
      variables.forEach(([key,value,priority])=>value ? page.style.setProperty(key,value,priority) : page.style.removeProperty(key));
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      timeline.kill(); restore();
      if (document.activeElement?.classList.contains('siteEntranceSkip')) document.querySelector('.workAtlasBrand')?.focus({ preventScroll: true });
      completeRef.current();
    };
    const counter = { value: 0 };
    const timeline = gsap.timeline({ onComplete: finish });
    // This is a short visual sequence, never a download percentage or a gate.
    timeline.to(counter, { value: 100, duration: .5, ease: 'power1.inOut', onUpdate: () => {
      number.textContent = String(Math.round(counter.value));
      frame.style.setProperty('--entrance-progress', String(counter.value / 100));
    } }, 0);
    timeline.to(number, { opacity: 0, duration: .18, ease: 'power2.in' }, .48);
    timeline.to(noise, { opacity: .74, duration: .16, ease:'power1.out' }, .54);
    const noiseTone={phase:0};
    timeline.to(noiseTone,{phase:Math.PI*2,duration:1.02,ease:'none',onUpdate:()=>paintNoise(noiseTone.phase)},.54);
    // Clear the black curtain before revealing the image: avoid two stacked fades.
    timeline.to(curtain,{opacity:0,duration:.52,ease:'power2.inOut'},.76);
    timeline.to(noise,{opacity:0,duration:.58,ease:'power2.inOut'},1.02);
    timeline.to(frame,{opacity:0,duration:.3,ease:'power2.out'},1.52);
    if(lightRef.current){
      timeline.to(lightRef.current,{opacity:.8,duration:.4,ease:'power2.out'},.65);
      timeline.to(lightRef.current,{opacity:0,duration:.76,ease:'power2.inOut'},1.05);
    }
    timeline.fromTo(near,{opacity:.025},{opacity:(_,node)=>node.classList.contains('cyberFloorTint') ? .64 : 1,duration:.74,ease:'power2.inOut'},.67);
    timeline.fromTo(far,{opacity:.025},{opacity:1,duration:.82,ease:'power2.inOut'},.84);
    timeline.fromTo(ambient,{opacity:.025},{opacity:1,duration:.76,ease:'power2.inOut'},1);
    timeline.fromTo(page,{'--entrance-camera':1.012},{'--entrance-camera':1,duration:1,ease:'power2.out'},.62);
    timeline.fromTo(media,{opacity:0},{opacity:1,duration:.58,ease:'power2.inOut'},.98);
    timeline.fromTo(controls,{opacity:.1},{opacity:1,duration:.58,ease:'power2.out'},1.2);
    if(header)timeline.fromTo(header,{opacity:.12},{opacity:1,duration:.6,ease:'power2.out'},1.2);
    if(list)timeline.fromTo(list,{opacity:.025},{opacity:1,duration:.54,ease:'power2.inOut'},1.33);
    if(heading)timeline.fromTo(heading,{opacity:.025},{opacity:1,duration:.48,ease:'power2.out'},1.4);
    if(info)timeline.fromTo(info,{opacity:.025},{opacity:1,duration:.48,ease:'power2.out'},1.4);
    timeline.fromTo(page,{'--entrance-info-opacity':.025},{'--entrance-info-opacity':1,duration:.48,ease:'power2.out'},1.4);
    if(activeName)timeline.fromTo(activeName,{color:'transparent',webkitTextStrokeColor:getComputedStyle(page).getPropertyValue('--work-tint')},{color:getComputedStyle(page).getPropertyValue('--work-tint'),webkitTextStrokeColor:'transparent',duration:.36,ease:'power2.out'},1.61);
    finishRef.current = finish;
    const key = event => { if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) finish(); };
    const preference = () => { if (motion.matches) finish(); };
    document.addEventListener('pointerdown', finish, true);
    window.addEventListener('wheel', finish, { passive: true, capture: true });
    window.addEventListener('touchstart', finish, { passive: true, capture: true });
    window.addEventListener('keydown', key, true);
    window.addEventListener('hashchange', finish);
    window.addEventListener('popstate', finish);
    motion.addEventListener('change', preference);
    const watchdog = setTimeout(finish, 2300);
    return () => {
      finished = true; timeline.kill(); clearTimeout(watchdog); restore();
      document.removeEventListener('pointerdown', finish, true);
      window.removeEventListener('wheel', finish, true);
      window.removeEventListener('touchstart', finish, true);
      window.removeEventListener('keydown', key, true);
      window.removeEventListener('hashchange', finish);
      window.removeEventListener('popstate', finish);
      motion.removeEventListener('change', preference);
      finishRef.current = null;
    };
  }, [screen]);

  if (!screen) return null;
  return <>
    {createPortal(<div ref={frameRef} className="siteEntranceFrame" aria-hidden="true"><span className="siteEntranceCurtain"/><canvas className="siteEntranceNoise" width="320" height="160"/><span className="siteEntranceScanlines"/><span className="siteEntranceProgress siteEntranceProgressTop"/><span className="siteEntranceProgress siteEntranceProgressRight"/><span className="siteEntranceProgress siteEntranceProgressBottom"/><span className="siteEntranceProgress siteEntranceProgressLeft"/><span className="siteEntranceNumber">0</span></div>, screen)}
    {screen.closest('.cyberWorld')&&createPortal(<div ref={lightRef} className="siteEntranceLight" aria-hidden="true"/>,screen.closest('.cyberWorld'))}
    {createPortal(<div className="siteEntranceControls"><button type="button" className="siteEntranceSkip" onClick={() => finishRef.current?.()}>立即进入 <span aria-hidden="true">↗</span></button></div>, document.body)}
  </>;
}
