import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './ImmersiveWork.css';
import SpatialStage, { stageMedia } from './SpatialStage';
import './SpatialIndex.css';

const filters = [['selected','SELECTED','精选'], ['all','ALL WORK','全部'], ['interface','INTERFACE','表盘'], ['motion','MOTION','影像'], ['illustration','ILLUSTRATION','插画'], ['brand','BRANDING','品牌'], ['web','WEB DESIGN','网页'], ['spatial','3D DESIGN','建模'], ['wallpaper','WALLPAPER','壁纸']];

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return reduced;
}

// A single GPU plane blends the work images with a soft, pointer-driven refraction.
// The image underneath remains visible if WebGL is unavailable or motion is reduced.
export default function ImmersiveWork({ stages, featured, onOpen, hidden = false, suspended = false }) {
  const [filter, setFilter] = useState(() => window.location.hash === '#archive' ? 'all' : 'selected');
  const [active, setActive] = useState(null);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const cursorRef = useRef(null);
  const screenRef = useRef(null);
  const scrollFrame = useRef(0);
  const pendingSelection = useRef({timer:0,version:0});
  const scrollActivity = useRef({timer:0,active:false,manual:false});
  const wheelState = useRef({target:0,running:false});
  const [motionPaused, setMotionPaused] = useState(false);
  const reduced = useReducedMotion();
  const visible = useMemo(() => filter === 'selected' ? featured : stages.filter(work => filter === 'all' || work.group === filter), [stages, featured, filter]);
  const selected = visible.find(work => work.id === active) || visible[0];
  const position = String(visible.findIndex(work => work.id === selected.id) + 1).padStart(2, '0');
  const cancelSelection = () => {
    clearTimeout(pendingSelection.current.timer);pendingSelection.current.version++;
  };
  const requestSelection = (id, delay=120) => {
    cancelSelection();
    const candidate=visible.find(work=>work.id===id);
    if(!candidate || candidate.id===selected.id)return;
    const version=pendingSelection.current.version;
    const prepare=async()=>{
      if(delay && wheelState.current.running){pendingSelection.current.timer=setTimeout(prepare,80);return;}
      // Decode a still/poster first so the new screen does not fade into an unloaded image.
      const image=new Image();image.src=stageMedia(candidate).src;
      let deadline;
      await Promise.race([image.decode().catch(()=>{}),new Promise(resolve=>{deadline=setTimeout(resolve,900);})]);
      clearTimeout(deadline);
      if(pendingSelection.current.version===version)setActive(candidate.id);
    };
    pendingSelection.current.timer=setTimeout(prepare,delay);
  };
  const settleScroll = () => {
    clearTimeout(scrollActivity.current.timer);scrollActivity.current.active=true;
    scrollActivity.current.timer=setTimeout(()=>{scrollActivity.current.active=false;scrollActivity.current.manual=false;},200);
  };
  const open = id => {
    cancelSelection();
    gsap.killTweensOf(listRef.current);wheelState.current.running=false;
    const rect=screenRef.current?.getBoundingClientRect();
    onOpen(id, visible.map(work => work.id), rect ? {left:rect.left,top:rect.top,width:rect.width,height:rect.height} : null);
  };
  const syncScroll = () => {
    settleScroll();
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current=requestAnimationFrame(()=>{
      if(suspended||hidden||scrollActivity.current.manual)return;
      const list=listRef.current, center=list.scrollTop+list.clientHeight/2;
      let closest=0,distance=Infinity;
      Array.from(list.children).forEach((row,index)=>{const delta=Math.abs(row.offsetTop+row.offsetHeight/2-center);if(delta<distance){distance=delta;closest=index;}});
      if(visible[closest])requestSelection(visible[closest].id,180);
    });
  };
  useEffect(()=>()=>{cancelAnimationFrame(scrollFrame.current);clearTimeout(pendingSelection.current.timer);pendingSelection.current.version++;clearTimeout(scrollActivity.current.timer);gsap.killTweensOf(listRef.current);},[]);
  useEffect(()=>{if(hidden||suspended)cancelSelection();},[hidden,suspended]);
  useEffect(()=>{const id=requestAnimationFrame(()=>setEntered(true));return ()=>cancelAnimationFrame(id);},[]);
  useEffect(()=>{
    const list = listRef.current;
    gsap.killTweensOf(list);wheelState.current.running=false;
    list.scrollTop = 0;
    if (reduced) return;
    // Bound the stagger even when the category contains dozens of projects.
    const animation=gsap.fromTo(list.children,{y:24,opacity:0},{y:0,opacity:1,duration:.65,stagger:{amount:.25},ease:'power3.out',clearProps:'transform,opacity'});
    return ()=>{animation.kill();gsap.set(list.children,{clearProps:'transform,opacity'});};
  },[filter,reduced]);
  useEffect(() => {
    if (hidden || suspended) return;
    const root = rootRef.current;
    const wheel = event => {
      if(event.ctrlKey)return;
      if(event.target.closest('.immersiveList')) {
        if(reduced)return;
        event.preventDefault();const list=listRef.current;
        const state=wheelState.current;
        if(!state.running)state.target=list.scrollTop;
        state.target=Math.max(0,Math.min(list.scrollHeight-list.clientHeight,state.target+event.deltaY*(event.deltaMode===1?18:event.deltaMode===2?list.clientHeight:1)));
        state.running=true;
        gsap.to(list,{scrollTop:state.target,duration:.6,ease:'power3.out',overwrite:true,onComplete:()=>{state.running=false;}});
      } else if (!event.target.closest('.immersiveFilterItems')) event.preventDefault();
    };
    const keys = event => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','PageDown','PageUp','Home','End',' '].includes(event.key)) return;
      if (event.target.closest?.('.immersiveList, .immersiveFilterItems, input, textarea, select')) return;
      if (event.key === ' ' && event.target.closest?.('button')) return;
      event.preventDefault();
    };
    root.addEventListener('wheel', wheel, {passive:false});
    document.addEventListener('keydown', keys);
    return () => {root.removeEventListener('wheel', wheel);document.removeEventListener('keydown', keys);gsap.killTweensOf(listRef.current);wheelState.current.running=false;};
  }, [hidden, suspended, reduced]);
  const chooseFilter = key => {cancelSelection();cancelAnimationFrame(scrollFrame.current);clearTimeout(scrollActivity.current.timer);scrollActivity.current.active=false;scrollActivity.current.manual=false;setFilter(key);setActive(null);};
  const selectRelative = delta => {
    gsap.killTweensOf(listRef.current);wheelState.current.running=false;
    const index=visible.findIndex(work=>work.id===selected.id);
    const next=(index+delta+visible.length)%visible.length;
    requestSelection(visible[next].id,0);
    scrollActivity.current.manual=true;settleScroll();
    const list=listRef.current, row=list.children[next];
    list.scrollTo({top:row.offsetTop-list.clientHeight/2+row.clientHeight/2,behavior:reduced?'auto':'smooth'});
  };
  const listKeys = event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.key === 'Tab') return;
    const list = listRef.current;
    gsap.killTweensOf(list);wheelState.current.running=false;
    let delta = 0;
    if (event.key === 'ArrowDown') delta=80;
    if (event.key === 'ArrowUp') delta=-80;
    if (event.key === 'PageDown' || (event.key===' ' && event.target===list)) delta=list.clientHeight*.8*(event.shiftKey?-1:1);
    if (event.key === 'PageUp') delta=-list.clientHeight*.8;
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();list.scrollTo({top:event.key==='Home'?0:list.scrollHeight,behavior:reduced?'auto':'smooth'});
    } else if (delta) {event.preventDefault();list.scrollBy({top:delta,behavior:reduced?'auto':'smooth'});}
  };
  const resetPointer = () => {
    const node=rootRef.current;if(!node)return;
    node.style.setProperty('--mx',0);node.style.setProperty('--my',0);
  };
  useEffect(()=>{
    const reset=()=>{
      const node=rootRef.current;if(!node)return;
      node.style.setProperty('--mx',0);node.style.setProperty('--my',0);
    };
    const visibility=()=>{if(document.hidden)reset();};
    window.addEventListener('blur',reset);document.addEventListener('visibilitychange',visibility);
    return()=>{window.removeEventListener('blur',reset);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  useEffect(()=>{
    if(reduced || motionPaused || suspended || hidden){
      rootRef.current?.style.setProperty('--mx',0);rootRef.current?.style.setProperty('--my',0);
    }
  },[reduced,motionPaused,suspended,hidden]);
  const pointerMove = event => {
    if (reduced || motionPaused || suspended || hidden || event.pointerType==='touch') return;
    const rect=rootRef.current.getBoundingClientRect();
    rootRef.current.style.setProperty('--mx',Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5)).toFixed(3));
    rootRef.current.style.setProperty('--my',Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5)).toFixed(3));
    if (cursorRef.current) gsap.to(cursorRef.current,{x:event.clientX-rect.left,y:event.clientY-rect.top,duration:.45,ease:'power3.out',overwrite:true});
  };
  return <section id="top" data-motion={reduced || motionPaused || suspended || hidden ? 'paused' : 'active'} data-filter={filter} hidden={hidden} ref={rootRef} className={`immersiveWork is-spatial ${entered ? 'is-entered' : ''}`} style={{'--work-tint':selected.color,'--work-count':visible.length}} onPointerMove={pointerMove} onPointerLeave={resetPointer} aria-label="石宜作品">
    <SpatialStage project={selected} paused={reduced || motionPaused || suspended || hidden} screenRef={screenRef} onOpen={()=>open(selected.id)} />
    <div className="immersiveGrid" aria-hidden="true" />
    <div className="immersiveHeading"><h1>石宜 · 设计应以人为本</h1><span>AI VISUAL DESIGN / PORTFOLIO</span></div>
    <aside className="immersiveFilters" aria-label="作品分类">
      <span className="immersiveMicro">EXPLORE THE WORK</span>
      <div className="immersiveFilterItems">{filters.map(([key,en,zh])=><button key={key} type="button" aria-pressed={filter===key} onClick={()=>chooseFilter(key)}><span>{en}</span><small>{zh}</small><i /></button>)}</div>
      <span className="immersiveFilterCount">{String(visible.length).padStart(2,'0')} {filter === 'selected' ? 'SELECTED' : 'PROJECTS'}</span>
    </aside>
    <div className="immersiveList" ref={listRef} role="region" aria-label="作品名称列表，可独立滚动" tabIndex={0} onKeyDown={listKeys} onScroll={syncScroll}>
      {visible.map(work=><button type="button" key={work.id} className={`immersiveWorkRow ${selected.id===work.id?'is-active':''}`} onPointerEnter={e=>{if(e.pointerType!=='touch'&&!wheelState.current.running&&!scrollActivity.current.active)requestSelection(work.id);}} onFocus={()=>{cancelSelection();setActive(work.id);}} onClick={()=>open(work.id)} aria-label={`查看${work.title}`}>
        <span className="immersiveWorkNumber">{String(visible.indexOf(work) + 1).padStart(2, '0')}</span>
        <span className="immersiveWorkName" style={{'--name-size': `${Math.min(6.4, 36 / Array.from(work.name || work.title).length)}vw`}}>{work.name || work.title}</span>
        <span className="immersiveWorkEnglish">{work.en || work.category}</span>
        <ArrowUpRight className="immersiveRowArrow" aria-hidden="true" />
      </button>)}
    </div>
    <div className="immersiveInfo" key={selected.id} aria-live="polite"><span>{position} / {String(visible.length).padStart(2,'0')} — {selected.category}</span><p>{selected.note || selected.eyebrow}</p><button type="button" onClick={()=>open(selected.id)}>探索项目 <ArrowUpRight size={15}/></button></div>
    <div className="immersivePosition" aria-label="切换预览作品"><button type="button" aria-label="上一个项目预览" onClick={()=>selectRelative(-1)}><ChevronLeft size={15}/></button><span>{position}<i> / {String(visible.length).padStart(2,'0')}</i></span><button type="button" aria-label="下一个项目预览" onClick={()=>selectRelative(1)}><ChevronRight size={15}/></button></div>
    <div className="immersiveFooter"><button className="spatialMotionToggle" type="button" aria-pressed={motionPaused || reduced} disabled={reduced} onClick={()=>setMotionPaused(value=>!value)}>{motionPaused || reduced ? '动态预览已暂停' : '暂停动态预览'}</button><span>VISUAL. INTERACTION. POSSIBILITY.</span><a className="immersiveAboutLink" href="#about">了解我 <ArrowUpRight size={13}/></a><a href="mailto:1483399012@qq.com">LET’S TALK <ArrowUpRight size={12}/></a></div>
    <div ref={cursorRef} className="immersiveCursor" aria-hidden="true"><span>VIEW</span></div>
    <span className="immersiveEdgeLabel" aria-hidden="true">SHI YI — DESIGN & EXPLORATION — 2026</span>
  </section>;
}

