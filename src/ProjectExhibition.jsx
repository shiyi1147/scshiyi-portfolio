import RefractiveBackdrop from './DeferredBackdrop';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useReducedMotion } from './ImmersiveWork';
import './ProjectExhibition.css';
import ImageLightbox from './ImageLightbox';
import WatchfaceExhibition from './WatchfaceExhibition';
import ExhibitionTransition from './ExhibitionTransition';

const pad = n => String(n).padStart(2, '0');

function ExhibitionVideo({ item, paused, onError }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    return () => { video.pause(); video.removeAttribute('src'); video.load(); };
  }, [item.video]);
  useEffect(() => { if (paused) videoRef.current?.pause(); }, [paused]);
  return <video ref={videoRef} src={item.video} poster={item.src} controls playsInline preload="metadata" tabIndex={0} aria-label={`${item.label}播放器`} onError={onError} />;
}

function StandardProjectExhibition({ project, onClose, onNextProject, entryRect }) {
  const [view, setView] = useState('intro');
  const [frame, setFrame] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [direction, setDirection] = useState(1);
  const [infoOpen, setInfoOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const previousRef = useRef(null);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);
  const thumbRefs = useRef([]);
  const gesture = useRef(null);
  const navigation = useRef(null);
  const closing = useRef(false);
  const reduced = useReducedMotion();
  const item = project.items[frame];
  const isIntro = view === 'intro';
  const notes = !isIntro && item.sourceProjectId ? { ...project, title:item.sourceTitle, summary:item.sourceSummary, details:item.sourceDetails, eyebrow:item.sourceEyebrow } : project;
  const chapters = project.items.reduce((list, image, index) => {
    if (image.chapter && !list.some(chapter => chapter.label === image.chapter)) list.push({ label: image.chapter, index });
    return list;
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (reduced) { onClose(); return; }
    gsap.to(rootRef.current, { opacity: 0, duration: .38, ease: 'power2.in', onComplete: onClose });
  }, [onClose, reduced]);

  const select = (index) => {
    if (index < 0) { setView('intro'); return; }
    const next = Math.min(project.items.length - 1, index);
    if (!isIntro && next === frame) return;
    setDirection(next >= frame ? 1 : -1);
    setPrevious(isIntro ? null : frame);
    setFrame(next); setView('gallery'); setImageError(false);
  };
  const step = delta => {
    if (isIntro) { if (delta > 0) select(0); }
    else select(frame + delta);
  };
  navigation.current = { step, infoOpen, zoomOpen, close };

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const origin=entryRect ? `inset(${Math.max(0,entryRect.top)}px ${Math.max(0,innerWidth-entryRect.left-entryRect.width)}px ${Math.max(0,innerHeight-entryRect.top-entryRect.height)}px ${Math.max(0,entryRect.left)}px)` : 'inset(5% 4% 5% 4%)';
      gsap.fromTo(rootRef.current, { opacity: entryRect ? 1 : 0, clipPath: origin }, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .85, ease: 'power3.inOut', clearProps: 'clipPath' });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, entryRect]);

  // The title introduces the project, then leaves the artwork unobstructed.
  // The controls remain available throughout; reduced motion skips the title.
  useLayoutEffect(() => {
    if (!isIntro || reduced || project.poster) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.fromTo('.exhibitionTitle span', { yPercent: 95, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .85, stagger: .1, delay: .15, ease: 'power3.out' });
      timeline.to('.exhibitionTitle', { opacity: 0, duration: .75, ease: 'power2.inOut' }, 2.25);
    }, rootRef);
    return () => ctx.revert();
  }, [isIntro, reduced, project.poster]);

  useLayoutEffect(() => {
    if (isIntro || reduced || !imageRef.current) return;
    const ctx = gsap.context(() => {
      if (previousRef.current) gsap.to(previousRef.current, { xPercent: direction * -7, scale: .96, opacity: 0, duration: .65, ease: 'power2.inOut' });
      gsap.fromTo(imageRef.current, { xPercent: direction * 9, scale: 1.04, opacity: 0, clipPath: direction > 0 ? 'inset(0 0 0 12%)' : 'inset(0 12% 0 0)' }, { xPercent: 0, scale: 1, opacity: 1, clipPath: 'inset(0 0 0 0)', duration: .8, ease: 'power3.out', clearProps: 'transform,opacity,clipPath' });
    }, rootRef);
    return () => ctx.revert();
  }, [frame, isIntro, reduced, direction]);

  // Keep the active thumbnail visible without scrolling the locked document.
  useEffect(() => {
    const node = thumbRefs.current[frame];
    if (!node || isIntro) return;
    const rail = node.parentElement;
    rail.scrollTo({ left: node.offsetLeft - rail.clientWidth / 2 + node.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
  }, [frame, isIntro, reduced]);

  // Only load nearby full-size works; distant frames use their existing thumbnails.
  useEffect(() => {
    [frame - 1, frame + 1].filter(index => index >= 0 && index < project.items.length).forEach(index => {
      const image = new Image(); image.src = project.items[index].src;
    });
  }, [frame, project.items]);

  useEffect(() => {
    const root = rootRef.current;
    const previousFocus = document.activeElement;
    const pageRoot = document.getElementById('root');
    const wasInert = pageRoot.inert;
    const previousOverflow = document.body.style.overflow;
    pageRoot.inert = true;
    document.body.style.overflow = 'hidden';
    root.querySelector('button')?.focus({ preventScroll: true });
    const handleKey = event => {
      const current = navigation.current;
      if (current.zoomOpen || document.fullscreenElement) return;
      if (event.target.closest?.('video') && !['Escape', 'Tab'].includes(event.key)) return;
      if (event.key === 'Escape') { event.preventDefault(); current.infoOpen ? setInfoOpen(false) : current.close(); }
      if (!current.infoOpen && ['ArrowRight', 'ArrowDown', 'PageDown', 'ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault(); current.step(['ArrowRight', 'ArrowDown', 'PageDown'].includes(event.key) ? 1 : -1);
      }
      if (event.key === 'Tab') {
        const scope = current.infoOpen ? infoRef.current : root;
        const nodes = Array.from(scope.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')).filter(node => node.getClientRects().length > 0);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    let lastWheel = 0, amount = 0;
    const handleWheel = event => {
      if (event.ctrlKey || navigation.current.zoomOpen || navigation.current.infoOpen || event.target.closest('.exhibitionThumbnails, video')) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel < 800) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      amount += delta * (event.deltaMode === 1 ? 16 : 1);
      if (Math.abs(amount) < 45) return;
      navigation.current.step(amount > 0 ? 1 : -1); amount = 0; lastWheel = now;
    };
    root.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    return () => {
      root.removeEventListener('wheel', handleWheel); window.removeEventListener('keydown', handleKey);
      pageRoot.inert = wasInert; document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (infoOpen) infoRef.current?.querySelector('button')?.focus();
    else if (infoButtonRef.current && document.activeElement === document.body) infoButtonRef.current.focus();
  }, [infoOpen]);

  const pointerMove = event => {
    if (zoomOpen || event.pointerType !== 'mouse' || reduced) return;
    const r = rootRef.current.getBoundingClientRect();
    rootRef.current.style.setProperty('--ex', ((event.clientX - r.left) / r.width - .5).toFixed(3));
    rootRef.current.style.setProperty('--ey', ((event.clientY - r.top) / r.height - .5).toFixed(3));
  };
  const pointerDown = event => {
    if (event.button !== 0 || event.target.closest('button,a,video,.exhibitionReadingNote')) return;
    gesture.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerUp = event => {
    const start = gesture.current; gesture.current = null;
    if (!start) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return createPortal(<section ref={rootRef} data-project={project.id} className={`exhibition ${project.id?.startsWith('archive-') ? 'is-archive' : ''} ${isIntro ? 'is-intro' : 'is-gallery'} ${project.poster ? 'has-poster' : ''} ${infoOpen ? 'has-info' : ''} ${chapters.length ? 'has-narrative' : ''} ${!isIntro && item.video ? 'has-video' : ''}`} role="dialog" aria-modal="true" aria-label={project.title} style={{ '--ex-accent': project.accent || '#c5f9e9' }} onPointerMove={pointerMove}>
    <div className="exhibitionBackdrop" aria-hidden="true"><RefractiveBackdrop src={isIntro ? (project.poster?.backgroundLandscape || project.cover) : (item.thumb || item.src)} mobileSrc={isIntro ? project.poster?.backgroundPortrait : undefined} reduced={reduced} /></div>
    <div className="exhibitionVignette" aria-hidden="true" />
    <div className="exhibitionGrain" aria-hidden="true" />
    <header className="exhibitionHeader">
      <div className="exhibitionProjectMark"><span>SHI YI / {project.number || '06'}</span><h2>{project.title}</h2></div>
      <button type="button" className="exhibitionClose" onClick={close} aria-label="关闭展厅"><X size={20}/><span>返回作品</span></button>
      <button ref={infoButtonRef} type="button" className="exhibitionInfoButton" onClick={() => setInfoOpen(true)} aria-expanded={infoOpen} aria-controls="exhibition-info">项目说明 <span>+</span></button>
    </header>
    <div className="exhibitionGestureArea" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { gesture.current = null; }}>
      {isIntro ? <div className="exhibitionIntroBody">
        {project.poster ? <picture className="exhibitionPoster"><source media="(max-aspect-ratio: 4/5)" srcSet={project.poster.portrait}/><img src={project.poster.landscape} alt={project.poster.alt} draggable="false" fetchPriority="high"/></picture> : <div className="exhibitionTitle" aria-hidden="true">{project.displayTitle.map((line,index)=><div key={index}><span>{line}</span></div>)}</div>}
        <div className="exhibitionIntroCopy"><span>{project.eyebrow}</span><p>{project.summary}</p><div className="exhibitionIntroActions"><button type="button" onClick={() => select(0)}>浏览作品 <ArrowDown size={14}/></button>{project.document && <a href={project.document} target="_blank" rel="noreferrer">{project.documentLabel || '完整策划案'} <ArrowUpRight size={14}/></a>}</div></div>
        <span className="exhibitionScrollHint">SCROLL TO DISCOVER <i /></span>
      </div> : <div className="exhibitionGalleryBody">
        {chapters.length > 0 && <nav className="exhibitionChapters" aria-label="案例阅读章节">{chapters.map((chapter,index)=><button key={chapter.label} type="button" aria-current={item.chapter === chapter.label ? 'step' : undefined} onClick={() => select(chapter.index)}><span>{pad(index+1)}</span>{chapter.label}</button>)}</nav>}
        <div className="exhibitionFrameMeta" key={frame} aria-live="polite"><span>{notes.eyebrow}</span><h3>{item.label}</h3>{item.caption && <p className="exhibitionReadingNote">{item.caption}</p>}</div>
        <div className="exhibitionImageStage">
          {!reduced && previous !== null && previous !== frame && <div className="exhibitionFrame exhibitionPrevious" ref={previousRef} aria-hidden="true"><img src={project.items[previous].src} alt="" /></div>}
          <div className="exhibitionFrame exhibitionCurrent" key={frame} ref={imageRef}>
            <>{item.video ? <ExhibitionVideo item={item} paused={infoOpen} onError={() => setImageError(true)} /> : <img src={item.src} alt={`${project.title} · ${item.label}`} draggable="false" onError={() => setImageError(true)} />}</>
            {imageError && <div className="exhibitionImageError">{item.video ? '视频暂时无法载入' : '图片暂时无法载入'}<a href={item.video || item.src} target="_blank" rel="noreferrer">{item.video ? '打开视频' : '打开大图'} <ArrowUpRight size={14}/></a></div>}
          </div>
        </div>
        <div className="exhibitionFrameCaption"><span>FRAME {pad(frame + 1)} / {pad(project.items.length)}<i>{item.video ? '播放 / 全屏观看' : '拖动 / 滚动切换'}</i></span><>{item.video ? <a href={item.video} target="_blank" rel="noreferrer">打开视频 <ArrowUpRight size={13}/></a> : <button type="button" onClick={() => setZoomOpen(true)} aria-haspopup="dialog">放大查看 <ArrowUpRight size={13}/></button>}</></div>
      </div>}
    </div>
    <aside className="exhibitionProgress" aria-label="展厅画面导航"><button type="button" className={isIntro ? 'is-active' : ''} onClick={() => setView('intro')} aria-label="返回项目封面" aria-current={isIntro ? 'step' : undefined}><i/><span>INTRO</span></button>{project.items.map((image,index)=><button key={image.src} type="button" className={!isIntro && frame === index ? 'is-active' : ''} onClick={() => select(index)} aria-label={`转到${image.label}`} aria-current={!isIntro && frame === index ? 'step' : undefined}><i/><span>{pad(index+1)}</span></button>)}</aside>
    {!isIntro && <nav className="exhibitionThumbnails" aria-label="选择作品图片">{project.items.map((image,index)=><button ref={node=>{thumbRefs.current[index]=node;}} type="button" key={image.src} className={frame===index?'is-active':''} aria-pressed={frame===index} aria-label={`查看${image.label}`} onClick={() => select(index)}><img src={image.thumb || image.src} alt="" loading="lazy" draggable="false"/><span>{pad(index+1)}</span></button>)}</nav>}
    <footer className="exhibitionFooter">
      <button type="button" className="exhibitionBack" onClick={isIntro ? close : () => setView('intro')}><ArrowLeft size={13}/>{isIntro ? '全部作品' : '项目封面'}</button>
      <div className="exhibitionControls"><button type="button" onClick={() => step(-1)} disabled={isIntro} aria-label="上一张作品"><ChevronLeft size={18}/></button><span aria-live="polite">{isIntro ? 'OVERVIEW' : `${pad(frame+1)} / ${pad(project.items.length)}`}</span><button type="button" onClick={() => step(1)} disabled={!isIntro && frame === project.items.length - 1} aria-label="下一张作品"><ChevronRight size={18}/></button></div>
      <button type="button" className="exhibitionNextProject" onClick={onNextProject}>下个项目 <ArrowUpRight size={13}/></button>
    </footer>
    {zoomOpen && <ImageLightbox src={item.detail || item.src} label={item.label} backgroundRef={rootRef} onClose={() => setZoomOpen(false)} />}
    {infoOpen && <div className="exhibitionInfoScrim" onClick={event=>{if(event.target===event.currentTarget)setInfoOpen(false);}}><aside ref={infoRef} id="exhibition-info" className="exhibitionInfoPanel" aria-label="项目说明"><div className="exhibitionInfoHeader"><span>PROJECT NOTES</span><button type="button" onClick={() => setInfoOpen(false)} aria-label="关闭项目说明"><X size={20}/></button></div><p className="exhibitionEyebrow">{notes.eyebrow}</p><h3>{notes.title}</h3><p className="exhibitionSummary">{notes.summary}</p><dl>{notes.details.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{project.document && <a className="exhibitionDocument" href={project.document} target="_blank" rel="noreferrer">{project.documentLabel || '查看完整策划案 PDF'} <ArrowUpRight size={16}/></a>}</aside></div>}
  </section>, document.body);
}

export default function ProjectExhibition(props) {
  return <ExhibitionTransition entry={props.entryRect} onClose={props.onClose}>{close => props.project.id === "archive-watchfaces" ? <WatchfaceExhibition {...props} onClose={close}/> : <StandardProjectExhibition {...props} project={props.entryRect?.src ? {...props.project, cover:props.entryRect.src} : props.project} entryRect={null} onClose={close}/>}</ExhibitionTransition>;
}
