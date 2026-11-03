import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { portalGeometry,screenMatrix } from './screenProjection';

export default function ScreenEntrySurface({ entry, active=false, onBlocked, dim=.28 }) {
  const ref=useRef(null);
  const blocked=useRef(onBlocked);blocked.current=onBlocked;
  useLayoutEffect(()=>{
    const host=ref.current, surface=entry.surface;
    host.append(surface);
    entry.coverDim=dim;
    Object.assign(surface.style,{position:'absolute',left:'0',top:'0',width:`${entry.portalWidth}px`,height:`${entry.portalHeight}px`,transformOrigin:'0 0',border:'0',padding:'0',margin:'0',overflow:'hidden',pointerEvents:'none'});
    const update=(camera,brightness)=>{surface.style.transform=screenMatrix(camera.points,entry.portalWidth,entry.portalHeight);surface.style.filter=`brightness(${brightness})`;};
    const fit=()=>{const progress=entry.progress??1,camera=portalGeometry(entry,progress,host.clientWidth,host.clientHeight);update(camera,entry.brightness??(1-dim));};
    entry.updateSurface=update;
    fit();const observer=new ResizeObserver(fit);observer.observe(host);
    return()=>{observer.disconnect();if(entry.updateSurface===update)entry.updateSurface=null;surface.remove();};
  },[entry,dim]);
  useEffect(()=>{
    const onBlocked=()=>blocked.current?.();entry.onMotionBlocked=onBlocked;
    entry.setMotionActive?.(active);
    return()=>{if(entry.onMotionBlocked===onBlocked)entry.onMotionBlocked=null;entry.setMotionActive?.(false);};
  },[entry,active]);
  return <div ref={ref} className="exhibitionEntrySurface" aria-hidden="true"/>;
}
