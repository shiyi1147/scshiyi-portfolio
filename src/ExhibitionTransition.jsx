import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
export default function ExhibitionTransition({entry,onClose,children}) {
 const layer=useRef(null),busy=useRef(false),animation=useRef(null);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const full=()=>({left:0,top:0,width:innerWidth,height:innerHeight});
 const origin=()=>{
  const live=document.querySelector('.spatialMedia.is-current .is-incoming, .spatialMedia.is-current > img, .spatialMedia.is-current video');
  const rect=live?.getBoundingClientRect();
  return rect && rect.width && rect.height ? {left:rect.left,top:rect.top,width:rect.width,height:rect.height} : {left:entry.left,top:entry.top,width:entry.width,height:entry.height};
 };
 useLayoutEffect(()=>{
  if(!layer.current)return;
  const t=gsap.timeline();animation.current=t;t.set(layer.current,{...origin(),opacity:1,display:'block'}).to(layer.current,{...full(),duration:.65,ease:'power3.inOut'}).to(layer.current,{opacity:0,duration:.18,onComplete:()=>{if(layer.current)layer.current.style.display='none'}});
  const resize=()=>{
    animation.current?.kill();
    if(busy.current){onClose();return;}
    if(layer.current)gsap.set(layer.current,{...full(),opacity:0,display:'none'});
  };
  window.addEventListener('resize',resize);
  return()=>{animation.current?.kill();gsap.killTweensOf(layer.current);window.removeEventListener('resize',resize);};
 },[]);
 const close=()=>{
  if(busy.current)return;busy.current=true;
  if(!layer.current){onClose();return;}
  animation.current?.kill();
  gsap.killTweensOf(layer.current);
  const dialogs=[...document.querySelectorAll('.wcShell,.exhibition')];
  gsap.set(layer.current,{...full(),opacity:1,display:'block'});
  dialogs.forEach(n=>n.style.visibility='hidden');
  animation.current=gsap.to(layer.current,{...origin(),duration:.6,ease:'power3.inOut',onComplete:onClose});
 };
 return <>{children(close)}{entry?.src&&!reduced&&createPortal(<div ref={layer} data-exhibition-transition="true" aria-hidden="true" style={{position:'fixed',zIndex:400,pointerEvents:'none',background:'#101916',overflow:'hidden'}}><img src={entry.src} alt="" style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/></div>,document.body)}</>;
}
