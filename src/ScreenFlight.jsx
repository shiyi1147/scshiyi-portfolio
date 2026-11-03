import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { portalGeometry, screenMatrix } from './screenProjection';
import createEntryMotion from './entryMotion';
import './ScreenFlight.css';

export default function ScreenFlight({ entry, onClose, children }) {
  const layerRef=useRef(null), worldRef=useRef(null), portalRef=useRef(null);
  const animation=useRef(null), closing=useRef(false), entered=useRef(false), drawRef=useRef(null);
  const finishRef=useRef(onClose);finishRef.current=onClose;
  const [ready,setReady]=useState(false),[revealed,setRevealed]=useState(false),[atScreen,setAtScreen]=useState(false),[contentReady,setContentReady]=useState(false);
  const revealedRef=useRef(false);
  const contentRef=useRef(false);contentRef.current=contentReady;
  const onContentReady=useCallback(()=>setContentReady(true),[]);
  useLayoutEffect(()=>{
    const layer=layerRef.current, world=worldRef.current, host=portalRef.current, scene=entry.scene;
    const portal=scene.querySelector('.spatialScreen');
    host.append(portal);world.append(scene);
    Object.assign(scene.style,{position:'absolute',inset:'0',width:'100%',height:'100%',minHeight:'0',margin:'0'});
    Object.assign(portal.style,{position:'absolute',inset:'0',width:'100%',height:'100%',transform:'none',border:'0',padding:'0',margin:'0',overflow:'hidden'});
    Object.assign(host.style,{width:`${entry.portalWidth}px`,height:`${entry.portalHeight}px`});
    const list=scene.querySelector('.immersiveList');if(list)list.scrollTop=entry.listScroll;
    const chrome=scene.querySelectorAll('.immersiveList,.immersiveHeading,.immersiveFilters,.immersiveMobileFilters,.immersiveInfo,.immersivePosition,.immersiveFooter,.immersiveViewSwitch,.immersiveBrowseHint,.immersiveEdgeLabel');
    const motion=createEntryMotion(entry,()=>entry.onMotionBlocked?.());
    entry.pauseMotion=motion.pause;
    entry.setMotionActive=active=>active?motion.play():motion.pause();
    const smooth=value=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t);};
    const draw=progress=>{
      const p=Math.max(0,Math.min(1,progress)), camera=portalGeometry(entry,p,innerWidth,innerHeight);
      entry.progress=p;
      entry.brightness=1-(entry.coverDim??.28)*smooth((p-.64)/.36);
      portal.style.filter=`brightness(${entry.brightness})`;
      entry.updateSurface?.(camera,entry.brightness);
      host.style.transform=screenMatrix(camera.points,entry.portalWidth,entry.portalHeight);
      host.dataset.progress=p.toFixed(4);
      if(!closing.current&&contentRef.current){
        layer.style.opacity=String(1-smooth((p-.76)/.24));
        if(p>=.8&&!revealedRef.current){revealedRef.current=true;setRevealed(true);}
      }
      const roomScale=1+(camera.scale-1)*.32;
      world.style.transformOrigin=`${camera.center[0]}px ${camera.center[1]}px`;
      world.style.transform=`translate3d(${(camera.x-camera.center[0])*.45}px,${(camera.y-camera.center[1])*.45}px,0) scale(${roomScale})`;
      world.style.opacity=String(1-Math.pow(p,1.45));
      chrome.forEach(node=>{node.style.opacity=String(Math.max(0,1-p*4));});
    };
    drawRef.current=draw;draw(0);
    const camera={p:0};
    const timeline=gsap.timeline();animation.current=timeline;
    timeline.to(camera,{p:1,duration:1.18,ease:'power2.inOut',onUpdate:()=>draw(camera.p),onComplete:()=>{entered.current=true;setAtScreen(true);}});
    const interrupt=()=>{animation.current?.kill();if(closing.current){finishRef.current();return;}entered.current=true;draw(1);setAtScreen(true);};
    const key=event=>{if(event.key==='Escape'&&!contentRef.current){event.preventDefault();event.stopImmediatePropagation();finishRef.current();}};
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('resize',interrupt);preference.addEventListener('change',interrupt);window.addEventListener('keydown',key,true);
    return()=>{animation.current?.kill();window.removeEventListener('resize',interrupt);preference.removeEventListener('change',interrupt);window.removeEventListener('keydown',key,true);entry.release?.();motion.dispose();entry.setMotionActive=null;entry.pauseMotion=null;scene.remove();portal.remove();};
  },[entry]);
  useEffect(()=>{if(entry.motionAllowed&&!matchMedia('(prefers-reduced-motion: reduce)').matches)entry.setMotionActive?.(true);},[entry]);
  useLayoutEffect(()=>{
    if(contentReady&&!closing.current)drawRef.current?.(entry.progress??0);
    if(!atScreen||!contentReady||closing.current)return;
    if(!revealedRef.current){revealedRef.current=true;setRevealed(true);}
    setReady(true);
    animation.current=gsap.to(layerRef.current,{opacity:0,duration:.2,onComplete:()=>{if(layerRef.current)layerRef.current.style.display='none';}});
  },[atScreen,contentReady]);
  const close=()=>{
    if(closing.current)return;closing.current=true;animation.current?.kill();
    entry.pauseMotion?.();entry.paintAll?.();
    if(!entered.current||!contentReady||matchMedia('(prefers-reduced-motion: reduce)').matches||innerWidth!==entry.viewportWidth||innerHeight!==entry.viewportHeight){finishRef.current();return;}
    const layer=layerRef.current,camera={p:1};drawRef.current(1);
    gsap.set(layer,{opacity:0,display:'block'});
    const timeline=gsap.timeline({onComplete:()=>finishRef.current()});animation.current=timeline;
    timeline.to(layer,{opacity:1,duration:.12},0);
    timeline.to(camera,{p:0,duration:.92,ease:'power2.inOut',onUpdate:()=>drawRef.current(camera.p)},.1);
  };
  return <>{children(close,{entry,ready,revealed,onContentReady})}{createPortal(<div ref={layerRef} className="screenFlight" data-screen-flight="true"><div ref={worldRef} className="screenFlightWorld workAtlas" data-page="top" aria-hidden="true" style={{width:entry.viewportWidth,height:entry.viewportHeight,padding:0,margin:0,minHeight:0}}/><div ref={portalRef} className="screenFlightPortal" aria-hidden="true"/>{!contentReady&&<><button type="button" className="screenFlightCancel" aria-label="返回作品" onClick={close}><span aria-hidden="true">×</span></button>{atScreen&&<span className="screenFlightWaiting" role="status">正在打开作品…</span>}</>}</div>,document.body)}</>;
}
