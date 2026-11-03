import { useEffect, useRef } from 'react';
import { warmProjectExhibition } from './projectExhibitionLoader';

export default function useProjectIntent(enabled=true) {
  const timer=useRef(0);
  const cancel=()=>{clearTimeout(timer.current);timer.current=0;};
  useEffect(()=>{if(!enabled)cancel();return cancel;},[enabled]);
  const warm=()=>{if(enabled)warmProjectExhibition();};
  return {
    enter:event=>{if(!enabled||event.pointerType==='touch')return;cancel();timer.current=setTimeout(warm,140);},
    leave:cancel,
    focus:()=>{cancel();warm();},
    down:event=>{if(event.pointerType==='touch'){cancel();warm();}},
    cancel,
  };
}
