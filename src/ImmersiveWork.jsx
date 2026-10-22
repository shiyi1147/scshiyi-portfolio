import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { ArrowDown, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, Monitor } from 'lucide-react';
import './ImmersiveWork.css';
import SpatialStage, { stageMedia } from './SpatialStage';
import './SpatialIndex.css';
import WorkArchive from './WorkArchive';
import InternshipAvailability from './InternshipAvailability';

const filters = [['all','ALL WORK','全部'], ['interface','INTERFACE','表盘'], ['motion','MOTION','影像'], ['illustration','ILLUSTRATION','插画'], ['brand','BRANDING','品牌'], ['web','WEB DESIGN','网页'], ['spatial','3D DESIGN','建模'], ['wallpaper','WALLPAPER','壁纸']];

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

// Selection responds immediately; decoded media follows without a blank screen.
export default function ImmersiveWork({ stages, featured, onOpen, hidden = false, suspended = false }) {
  const [filter, setFilter] = useState('all');
  const [overview, setOverview] = useState(() => new URLSearchParams(window.location.search).get('view') === 'overview');
  const [active, setActive] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const cursorRef = useRef(null);
  const screenRef = useRef(null);
  const imageCache = useRef(new Map());
  const gesture = useRef(null);
  const suppressClickUntil = useRef(0);
  const scrollFrame = useRef(0);
  const pendingSelection = useRef({timer:0,version:0});
  const scrollActivity = useRef({timer:0,active:false,manual:false});
  const wheelState = useRef({target:0,running:false});
  const [motionPaused, setMotionPaused] = useState(false);
  const reduced = useReducedMotion();
  const featuredIds = useMemo(() => new Set(featured.map(work => work.id)), [featured]);
  const ordered = useMemo(() => {
    const ranks = new Map(featured.map((work, index) => [work.id, index]));
    return [...stages].sort((a, b) => (ranks.get(a.id) ?? featured.length) - (ranks.get(b.id) ?? featured.length));
  }, [stages, featured]);
  const counts = useMemo(() => Object.fromEntries(filters.map(([key]) => [key, key === 'all' ? stages.length : stages.filter(work => work.group === key).length])), [stages]);
  const visible = useMemo(() => ordered.filter(work => filter === 'all' || work.group === filter), [ordered, filter]);
  const selected = visible.find(work => work.id === active) || visible[0];
  const preview = visible.find(work => work.id === previewId) || visible[0];
  const position = String(visible.findIndex(work => work.id === selected.id) + 1).padStart(2, '0');
  const previewPosition = String(visible.findIndex(work => work.id === preview.id) + 1).padStart(2, '0');
  const prepareImage = work => {
    const src = stageMedia(work).src;
    if (!imageCache.current.has(src)) {
      const image = new Image();
      image.src = src;
      imageCache.current.set(src, image.decode().catch(() => imageCache.current.delete(src)));
    }
    return imageCache.current.get(src);
  };
  const cancelSelection = () => {
    clearTimeout(pendingSelection.current.timer);pendingSelection.current.version++;
  };
  const requestSelection = (id, delay=100) => {
    const candidate=visible.find(work=>work.id===id);
    if(!candidate || (candidate.id===selected.id && candidate.id===preview.id))return;
    cancelSelection();
    setActive(candidate.id);
    const version=pendingSelection.current.version;
    const prepare=async()=>{
      if(delay && wheelState.current.running){pendingSelection.current.timer=setTimeout(prepare,80);return;}
      let deadline;
      await Promise.race([prepareImage(candidate),new Promise(resolve=>{deadline=setTimeout(resolve,900);})]);
      clearTimeout(deadline);
      if(pendingSelection.current.version===version)setPreviewId(candidate.id);
    };
    pendingSelection.current.timer=setTimeout(prepare,delay);
  };
  useEffect(() => {
    const index = visible.findIndex(work => work.id === preview.id);
    [visible[index], visible[index + 1]].filter(Boolean).forEach(prepareImage);
  }, [preview.id, visible]);
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
  const changeView = next => {
    cancelSelection();
    gsap.killTweensOf(listRef.current);
    wheelState.current.running = false;
    setOverview(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set('view', 'overview');
    else url.searchParams.delete('view');
    window.history.replaceState(window.history.state, '', url);
  };
  const openFromOverview = id => {
    cancelSelection();
    onOpen(id, visible.map(work => work.id), null);
  };
  useEffect(() => {
    const sync = () => setOverview(new URLSearchParams(window.location.search).get('view') === 'overview');
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const syncScroll = () => {
    settleScroll();
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current=requestAnimationFrame(()=>{
      if(suspended||hidden||overview||scrollActivity.current.manual)return;
      const list=listRef.current, center=list.scrollTop+list.clientHeight/2;
      let closest=0,distance=Infinity;
      Array.from(list.children).forEach((row,index)=>{const delta=Math.abs(row.offsetTop+row.offsetHeight/2-center);if(delta<distance){distance=delta;closest=index;}});
      if(visible[closest])requestSelection(visible[closest].id,180);
    });
  };
  useEffect(()=>()=>{cancelAnimationFrame(scrollFrame.current);clearTimeout(pendingSelection.current.timer);pendingSelection.current.version++;clearTimeout(scrollActivity.current.timer);gsap.killTweensOf(listRef.current);},[]);
  useEffect(()=>{if(hidden||suspended||overview)cancelSelection();},[hidden,suspended,overview]);
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
    if (hidden || suspended || overview) return;
    const root = rootRef.current;
    const wheel = event => {
      if(event.ctrlKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || event.target.closest('.immersiveFilters, .immersiveMobileFilters'))return;
      const list=listRef.current;
      if (!list || !event.deltaY) return;
      event.preventDefault();
      if (reduced) {
        list.scrollTop += event.deltaY * (event.deltaMode===1?18:event.deltaMode===2?list.clientHeight:1);
      } else {
        const state=wheelState.current;
        if(!state.running)state.target=list.scrollTop;
        state.target=Math.max(0,Math.min(list.scrollHeight-list.clientHeight,state.target+event.deltaY*(event.deltaMode===1?18:event.deltaMode===2?list.clientHeight:1)));
        state.running=true;
        gsap.to(list,{scrollTop:state.target,duration:.48,ease:'power3.out',overwrite:true,onComplete:()=>{state.running=false;}});
      }
    };
    root.addEventListener('wheel', wheel, {passive:false});
    return () => {root.removeEventListener('wheel', wheel);gsap.killTweensOf(listRef.current);wheelState.current.running=false;};
  }, [hidden, suspended, reduced, overview]);
  const chooseFilter = key => {cancelSelection();cancelAnimationFrame(scrollFrame.current);clearTimeout(scrollActivity.current.timer);scrollActivity.current.active=false;scrollActivity.current.manual=false;setFilter(key);setActive(null);setPreviewId(null);};
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
  const touchStart = event => {
    if (event.touches.length !== 1) { gesture.current = null; return; }
    if (suspended || hidden || overview || event.target.closest('.immersiveList, .immersiveFilters, .immersiveMobileFilters, .immersiveFooter, .immersivePosition, .immersiveViewSwitch')) return;
    const touch = event.touches[0];
    gesture.current = { x:touch.clientX, y:touch.clientY };
  };
  const touchEnd = event => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || event.touches.length || suspended || hidden || overview) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX-start.x, dy = touch.clientY-start.y;
    if (Math.abs(dy)>44 && Math.abs(dy)>Math.abs(dx)*1.2) {
      suppressClickUntil.current = Date.now()+500;
      selectRelative(dy<0?1:-1);
    }
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
    if(reduced || motionPaused || suspended || hidden || overview){
      rootRef.current?.style.setProperty('--mx',0);rootRef.current?.style.setProperty('--my',0);
    }
  },[reduced,motionPaused,suspended,hidden,overview]);
  const pointerMove = event => {
    if (reduced || motionPaused || suspended || hidden || overview || event.pointerType==='touch') return;
    const rect=rootRef.current.getBoundingClientRect();
    rootRef.current.style.setProperty('--mx',Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5)).toFixed(3));
    rootRef.current.style.setProperty('--my',Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5)).toFixed(3));
    if (cursorRef.current) gsap.to(cursorRef.current,{x:event.clientX-rect.left,y:event.clientY-rect.top,duration:.45,ease:'power3.out',overwrite:true});
  };
  return <section id="top" data-view={overview?'overview':'exhibition'} data-motion={reduced || motionPaused || suspended || hidden || overview ? 'paused' : 'active'} data-filter={filter} hidden={hidden} ref={rootRef} className={`immersiveWork is-spatial ${entered ? 'is-entered' : ''}`} style={{'--work-tint':selected.color,'--work-count':visible.length}} onPointerMove={pointerMove} onPointerLeave={resetPointer} onTouchStart={touchStart} onTouchEnd={touchEnd} onTouchCancel={()=>{gesture.current=null;}} onClickCapture={event=>{if(Date.now()<suppressClickUntil.current){event.preventDefault();event.stopPropagation();}}} aria-label="石宜作品">
    {overview&&<div className="immersiveOverviewTopline">WORK INDEX <span>/ {String(stages.length).padStart(2,'0')} 个项目与系列</span></div>}
    <div className="immersiveViewSwitch" role="group" aria-label="作品浏览方式">
      <button type="button" aria-pressed={!overview} onClick={()=>changeView(false)}><Monitor size={14} aria-hidden="true"/><span>沉浸展厅</span></button>
      <button type="button" aria-pressed={overview} onClick={()=>changeView(true)}><LayoutGrid size={14} aria-hidden="true"/><span>作品总览</span></button>
    </div>
    <div className="immersiveExhibition" hidden={overview}>
    <SpatialStage project={preview} paused={reduced || motionPaused || suspended || hidden || overview} screenRef={screenRef} onOpen={()=>open(preview.id)} />
    <div className="immersiveGrid" aria-hidden="true" />
    <div className="immersiveHeading"><h1>石宜 <span aria-hidden="true">/</span> AI 视觉与交互设计</h1><InternshipAvailability /></div>
    <aside className="immersiveFilters" aria-label="作品分类">
      <span className="immersiveMicro">EXPLORE THE WORK</span>
      <div className="immersiveFilterItems">{filters.map(([key,en,zh])=><button key={key} type="button" aria-pressed={filter===key} onClick={()=>chooseFilter(key)}><span>{en}<b className="immersiveCategoryCount">{String(counts[key]).padStart(2,'0')}</b></span><small>{zh}</small><i /></button>)}</div>
      <span className="immersiveFilterCount">{String(visible.length).padStart(2,'0')} PROJECTS</span>
    </aside>
    <div className="immersiveMobileFilters" aria-label="作品分类">
      <button type="button" aria-pressed={filter==='all'} onClick={()=>chooseFilter('all')}>全部 <span className="immersiveCategoryCount">{String(counts.all).padStart(2,'0')}</span></button>
      <label className={`immersiveCategorySelect ${filter!=='all'?'is-active':''}`}>
        <select aria-label="选择作品分类" value={filter==='all'?'':filter} onChange={event=>chooseFilter(event.target.value)}>
          <option value="" disabled>分类选择</option>
          {filters.slice(1).map(([key,,zh])=><option key={key} value={key}>{zh} · {counts[key]}</option>)}
        </select>
        <ChevronDown size={15} aria-hidden="true" />
      </label>
    </div>
    <div className="immersiveList" ref={listRef} role="region" aria-label="作品名称列表，可独立滚动" tabIndex={0} onKeyDown={listKeys} onScroll={syncScroll}>
      {visible.map(work=><button type="button" key={work.id} className={`immersiveWorkRow ${selected.id===work.id?'is-active':''}`} onPointerEnter={e=>{if(e.pointerType!=='touch'&&!wheelState.current.running&&!scrollActivity.current.active)requestSelection(work.id);}} onFocus={()=>requestSelection(work.id,0)} onClick={()=>open(work.id)} aria-label={`查看${work.title}`} aria-description={featuredIds.has(work.id)?'精选作品':undefined}>
        <span className="immersiveWorkNumber">{String(visible.indexOf(work) + 1).padStart(2, '0')}</span>
        <span className="immersiveWorkName" style={{'--name-size': `${Math.min(6.4, 36 / Array.from(work.name || work.title).length)}vw`}}>{work.name || work.title}</span>
        <span className="immersiveWorkEnglish">{featuredIds.has(work.id)&&<small className="immersiveFeaturedBadge">精选</small>}{work.en || work.category}</span>
        <ArrowUpRight className="immersiveRowArrow" aria-hidden="true" />
      </button>)}
    </div>
    <div className="immersiveInfo" key={preview.id} aria-live="polite"><span>{previewPosition} / {String(visible.length).padStart(2,'0')} — {preview.category}</span><p>{preview.note || preview.eyebrow}</p><button type="button" onClick={()=>open(preview.id)}>探索项目 <ArrowUpRight size={15}/></button></div>
    <div className="immersivePosition" aria-label="切换预览作品"><button type="button" aria-label="上一个项目预览" onClick={()=>selectRelative(-1)}><ChevronLeft size={15}/></button><span>{position}<i> / {String(visible.length).padStart(2,'0')}</i></span><button type="button" aria-label="下一个项目预览" onClick={()=>selectRelative(1)}><ChevronRight size={15}/></button></div>
    <div className="immersiveBrowseHint"><ArrowDown size={13} aria-hidden="true"/><span className="immersiveDesktopHint">滚动浏览作品</span><span className="immersiveTouchHint">上下滑动切换作品</span></div>
    <div className="immersiveFooter"><button className="spatialMotionToggle" type="button" aria-pressed={motionPaused || reduced} disabled={reduced} onClick={()=>setMotionPaused(value=>!value)}>{motionPaused || reduced ? '动态预览已暂停' : '暂停动态预览'}</button><span>VISUAL. INTERACTION. POSSIBILITY.</span><a className="immersiveAboutLink" href="#about">了解我 <ArrowUpRight size={13}/></a><a href="mailto:1483399012@qq.com">LET’S TALK <ArrowUpRight size={12}/></a></div>
    <div ref={cursorRef} className="immersiveCursor" aria-hidden="true"><span>VIEW</span></div>
    <span className="immersiveEdgeLabel" aria-hidden="true">SHI YI — DESIGN & EXPLORATION — 2026</span>
    </div>
    <WorkArchive projects={ordered} visible={visible} featuredIds={featuredIds} category={filter} counts={counts} onCategoryChange={chooseFilter} hidden={!overview} onOpen={openFromOverview}/>
  </section>;
}

