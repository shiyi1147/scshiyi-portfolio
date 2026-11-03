import { useLayoutEffect, useRef } from 'react';

// An idle camera costs no frames. Damping depends on elapsed time, not event rate.
export default function useScenePointer(ref,{enabled,frozen}) {
  const state=useRef({x:0,y:0,tx:0,ty:0,frame:0,last:0,enabled:false,frozen:false});
  const paint=()=>{const camera=state.current;ref.current?.style.setProperty('--mx',camera.x.toFixed(5));ref.current?.style.setProperty('--my',camera.y.toFixed(5));};
  const stop=()=>{cancelAnimationFrame(state.current.frame);state.current.frame=0;state.current.last=0;};
  const draw=now=>{
    const camera=state.current;camera.frame=0;
    if(!camera.enabled||document.hidden)return;
    const dt=camera.last?Math.min(48,now-camera.last):16.67;camera.last=now;
    const blend=1-Math.exp(-dt/95);
    camera.x+=(camera.tx-camera.x)*blend;camera.y+=(camera.ty-camera.y)*blend;
    if(Math.abs(camera.tx-camera.x)+Math.abs(camera.ty-camera.y)<.0003){camera.x=camera.tx;camera.y=camera.ty;paint();camera.last=0;return;}
    paint();camera.frame=requestAnimationFrame(draw);
  };
  const start=()=>{if(!state.current.frame&&!document.hidden)state.current.frame=requestAnimationFrame(draw);};
  const reset=()=>{const camera=state.current;if(camera.frozen)return;camera.tx=0;camera.ty=0;if(camera.enabled)start();};
  useLayoutEffect(()=>{
    const camera=state.current;camera.enabled=enabled;camera.frozen=frozen;
    if(!enabled){stop();camera.tx=camera.x;camera.ty=camera.y;if(!frozen){camera.x=camera.y=camera.tx=camera.ty=0;paint();}}
  },[enabled,frozen]);
  useLayoutEffect(()=>{
    const leave=()=>reset();
    const visibility=()=>{if(!document.hidden)return;const camera=state.current;stop();if(!camera.frozen){camera.x=camera.y=camera.tx=camera.ty=0;paint();}};
    window.addEventListener('blur',leave);document.addEventListener('visibilitychange',visibility);
    return()=>{stop();window.removeEventListener('blur',leave);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return {reset,move:event=>{
    const camera=state.current;if(!camera.enabled||event.pointerType==='touch'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    const rect=ref.current.getBoundingClientRect();
    camera.tx=Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5));
    camera.ty=Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5));start();
  }};
}
