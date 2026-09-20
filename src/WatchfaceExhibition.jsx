import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import './WatchfaceExhibition.css';

const variantInfo = {
  '赤曜仪表':'3 款配色', '悠然一刻':'3 款配色', '云端漫游':'4 个场景',
  '雪境初光':'3 个场景', '冷萃时刻':'日间 / 夜间', '雪跃时光':'4 种造型',
  '像素动物':'6 种动物', '时光相伴':'2 款画面'
};
const frameLabel = item => item.label.split(' · ').slice(1).join(' · ') || item.label;
const categories = ['全部', '重点案例', '趣味角色', '数字科技', '简约日常'];
export default function WatchfaceExhibition({ project, onClose }) {
  const designs = useMemo(() => {
    const groups = new Map();
    project.items.forEach(item => {
      if (!groups.has(item.sourceProjectId)) groups.set(item.sourceProjectId, {
        id:item.sourceProjectId, title:item.sourceTitle, summary:item.sourceSummary,
        details:item.sourceDetails || [], eyebrow:item.sourceEyebrow,
        category:['心情啵啵','时序方舟'].includes(item.chapter) ? '重点案例' : item.chapter, items:[]
      });
      groups.get(item.sourceProjectId).items.push(item);
    });
    return [...groups.values()];
  }, [project]);
  const [filter, setFilter] = useState('全部');
  const [selectedId, setSelectedId] = useState(null);
  const [frame, setFrame] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rootRef = useRef(null), notesRef = useRef(null), backRef = useRef(null), notesButton = useRef(null);
  const cardRefs = useRef(new Map()), directoryRef = useRef(null), gesture = useRef(null), nav = useRef(null);
  const selected = designs.find(design => design.id === selectedId);
  const item = selected?.items[frame];
  const visible = designs.filter(design => filter === '全部' || design.category === filter);
  const selectFrame = index => { setFrame(Math.max(0, Math.min(selected.items.length - 1, index))); setImageError(false); };
  const back = () => {
    const id = selectedId; setSelectedId(null); setFrame(0); setNotesOpen(false);
    requestAnimationFrame(() => cardRefs.current.get(id)?.focus({ preventScroll:true }));
  };
  const closeNotes = () => { setNotesOpen(false); requestAnimationFrame(() => notesButton.current?.focus()); };
  nav.current = { selected, frame, notesOpen, zoomOpen, back, closeNotes, onClose, step:delta=>selectFrame(frame+delta) };

  useEffect(() => {
    const previousFocus = document.activeElement, page = document.getElementById('root');
    const wasInert = page.inert, overflow = document.body.style.overflow;
    page.inert = true; document.body.style.overflow = 'hidden';
    rootRef.current.querySelector('button')?.focus({ preventScroll:true });
    const key = event => {
      const state = nav.current;
      if (state.zoomOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault(); state.notesOpen ? state.closeNotes() : state.selected ? state.back() : state.onClose();
      }
      if (state.selected && !state.notesOpen && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','PageUp','PageDown'].includes(event.key)) {
        event.preventDefault(); state.step(['ArrowRight','ArrowDown','PageDown'].includes(event.key) ? 1 : -1);
      }
      if (event.key === 'Tab') {
        const scope = state.notesOpen ? notesRef.current : rootRef.current;
        const nodes = [...scope.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')].filter(n => n.getClientRects().length);
        const first = nodes[0], last = nodes.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    let wheelAt = 0, amount = 0, lastEvent = 0;
    const wheel = event => {
      const state = nav.current;
      if (!state.selected || state.notesOpen || state.zoomOpen || event.ctrlKey || !event.target.closest('.wcArtwork')) return;
      event.preventDefault(); const now = performance.now();
      if (now-wheelAt < 650) return;
      if (now-lastEvent > 180) amount = 0;
      lastEvent = now;
      amount += (Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX) * (event.deltaMode===1 ? 16 : 1);
      if (Math.abs(amount) >= 45) { state.step(amount>0 ? 1 : -1); wheelAt=now; amount=0; }
    };
    const root = rootRef.current;
    root.addEventListener('wheel',wheel,{passive:false}); window.addEventListener('keydown',key);
    return () => { root.removeEventListener('wheel',wheel); window.removeEventListener('keydown',key); page.inert=wasInert; document.body.style.overflow=overflow; previousFocus?.focus({preventScroll:true}); };
  }, []);
  useEffect(() => { if (selectedId) backRef.current?.focus({preventScroll:true}); }, [selectedId]);
  useEffect(() => { if (notesOpen) notesRef.current?.querySelector('button')?.focus(); }, [notesOpen]);
  useEffect(() => {
    if (!selected) return;
    [frame-1,frame+1].filter(i=>i>=0&&i<selected.items.length).forEach(i=>{ const image=new Image(); image.src=selected.items[i].src; });
  }, [selected,frame]);
  // Keep the active image visible when a design has more thumbnails than the rail fits.
  useEffect(() => {
    const rail = rootRef.current?.querySelector('.wcThumbs');
    const active = rail?.querySelector('[aria-pressed="true"]');
    if (!active) return;
    const box = rail.getBoundingClientRect(), thumb = active.getBoundingClientRect();
    if (thumb.left < box.left || thumb.right > box.right) {
      rail.scrollTo({left:rail.scrollLeft + thumb.left - box.left - (rail.clientWidth - thumb.width) / 2,behavior:'auto'});
    }
  }, [selectedId,frame]);
  const startSwipe = event => {
    if (event.button!==0 || event.target.closest('button,a')) return;
    gesture.current={x:event.clientX,y:event.clientY};event.currentTarget.setPointerCapture(event.pointerId);
  };
  const endSwipe = event => {
    const start=gesture.current;gesture.current=null;if(!start)return;
    const dx=event.clientX-start.x,dy=event.clientY-start.y,delta=Math.abs(dx)>Math.abs(dy)?dx:dy;
    if(Math.abs(delta)>45)nav.current.step(delta<0?1:-1);
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return createPortal(<section className="wcShell" ref={rootRef} role="dialog" aria-modal="true" aria-label="腕间万象展厅">
    <header className="wcHeader"><span className="wcBrand">SHI YI <i>/</i> WATCHFACE COLLECTION</span><button type="button" className="wcClose" onClick={onClose} aria-label="关闭展厅"><span>返回首页</span><X size={20}/></button></header>
    <div className="wcDirectory" ref={directoryRef} hidden={Boolean(selected)}>
      <div className="wcDirectoryHeading"><div><p className="wcEyebrow">{designs.length} DESIGNS · SMALL SCREENS, MANY STORIES</p><h1>腕间万象</h1><p>从角色表情到数字仪表，探索腕上小屏幕的不同表达。</p></div><span className="wcDirectoryCount">{designs.length} <small>款表盘</small></span></div>
      <nav className="wcFilters" aria-label="表盘风格分类">{categories.map(category=><button type="button" key={category} aria-pressed={filter===category} onClick={()=>{setFilter(category);directoryRef.current.scrollTop=0;}}>{category}<span>{category==='全部'?designs.length:designs.filter(d=>d.category===category).length}</span></button>)}</nav>
      <div className="wcGrid">{visible.map(design=><button type="button" className={`wcCard ${design.category==='重点案例'?'is-featured':''}`} key={design.id} ref={node=>{if(node)cardRefs.current.set(design.id,node);else cardRefs.current.delete(design.id);}} onClick={()=>{setSelectedId(design.id);setFrame(0);setImageError(false);}} aria-label={`查看${design.title}`}>
        <div className="wcCardArt"><img src={design.items[0].thumb||design.items[0].src} alt="" loading="lazy" decoding="async" draggable="false"/>{design.category==='重点案例'&&<span className="wcFeaturedTag">重点案例</span>}</div>
        <div className="wcCardCaption"><div><h2>{design.title}</h2><span className="wcVersionInfo">{variantInfo[design.title] || `${design.items.length} 张预览`}</span><p>{design.category==='重点案例'?'ChatGPT + Figma · 已上线':design.category}</p></div><ArrowUpRight size={19}/></div>
      </button>)}</div><p className="wcDirectoryEnd">选择一款表盘，查看完整设计与细节。</p>
    </div>
    {selected&&<div className="wcDetail">
      <div className="wcDetailTop"><button type="button" ref={backRef} onClick={back}><ArrowLeft size={16}/>返回目录</button><span>{selected.category}</span></div>
      <div className="wcDetailBody">
        <div className="wcArtwork" onPointerDown={startSwipe} onPointerUp={endSwipe} onPointerCancel={()=>{gesture.current=null;}}>
          <img key={item.src} src={item.src} alt={item.label} draggable="false" onError={()=>setImageError(true)}/>
          {imageError&&<a className="wcImageError" href={item.src} target="_blank" rel="noreferrer">图片暂未载入，打开原图</a>}
          <button type="button" className="wcZoom" onClick={()=>setZoomOpen(true)} aria-label="放大查看作品">放大查看<ArrowUpRight size={14}/></button>
        </div>
        <aside className="wcDescription"><p className="wcEyebrow">{selected.eyebrow}</p><h2>{selected.title}</h2><p className="wcSummary">{selected.summary}</p><div className="wcFrameNote"><h3>{item.label}</h3>{item.caption&&<p>{item.caption}</p>}</div><button type="button" className="wcNotesButton" ref={notesButton} onClick={()=>setNotesOpen(true)} aria-haspopup="dialog">设计说明 <span>+</span></button></aside>
      </div>
      <footer className="wcDetailFooter"><nav className="wcThumbs" aria-label="当前表盘图片">{selected.items.map((image,index)=><button type="button" key={image.src} aria-label={`查看第${index+1}张：${image.label}`} aria-pressed={frame===index} onClick={()=>selectFrame(index)}><img src={image.thumb||image.src} alt="" loading="lazy" decoding="async"/><span>{frameLabel(image)}</span></button>)}</nav><div className="wcPaging"><button type="button" onClick={()=>selectFrame(frame-1)} disabled={frame===0} aria-label="上一张作品"><ChevronLeft size={19}/></button><span aria-live="polite">{frame+1} / {selected.items.length}</span><button type="button" onClick={()=>selectFrame(frame+1)} disabled={frame===selected.items.length-1} aria-label="下一张作品"><ChevronRight size={19}/></button></div></footer>
    </div>}
    {notesOpen&&selected&&<div className="wcNotesScrim" onClick={e=>{if(e.target===e.currentTarget)closeNotes();}}><aside className="wcNotes" ref={notesRef} role="dialog" aria-modal="true" aria-label="设计说明"><header><span>DESIGN NOTES</span><button type="button" onClick={closeNotes} aria-label="关闭设计说明"><X size={20}/></button></header><h2>{selected.title}</h2><p>{selected.summary}</p><dl>{selected.details.map(([label,value])=><React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>)}</dl></aside></div>}
    {zoomOpen&&item&&<ImageLightbox src={item.detail||item.src} label={item.label} backgroundRef={rootRef} onClose={()=>setZoomOpen(false)}/>}
  </section>,document.body);
}
