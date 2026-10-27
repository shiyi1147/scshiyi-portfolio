import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowUp, Download, List, Maximize2, X } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import './PlanReader.css';

const PlanPage = memo(function PlanPage({ page, index, total, scrollRef, onZoom }) {
  const figureRef = useRef(null);
  const [near, setNear] = useState(index === 0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (near) return;
    if (!window.IntersectionObserver) { setNear(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { root: scrollRef.current, rootMargin: '650px 0px' });
    observer.observe(figureRef.current);
    return () => observer.disconnect();
  }, [near, scrollRef]);
  const label = `策划案第 ${index + 1} 页`;
  return <figure ref={figureRef} className="planReaderPage" data-page={index + 1} aria-label={label} tabIndex={-1}>
    <button type="button" className={`planReaderPageImage ${loaded ? 'is-loaded' : ''}`} style={{ aspectRatio: `${page.width} / ${page.height}` }} onClick={() => onZoom(page, index)} disabled={!loaded || failed} aria-label={`放大查看${label}`} aria-haspopup="dialog">
      {near && <img key={attempt} src={page.small} srcSet={`${page.small} 900w, ${page.src} ${page.width}w`} sizes="(max-width: 760px) 100vw, (max-width: 1120px) calc(100vw - 64px), 1040px" width={page.width} height={page.height} decoding="async" alt={label} onLoad={() => { setLoaded(true); setFailed(false); }} onError={() => setFailed(true)} />}
      {!loaded && !failed && <span className="planReaderPagePlaceholder" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      {loaded && <span className="planReaderZoom" aria-hidden="true"><Maximize2 size={15}/> 放大</span>}
    </button>
    {failed && <div className="planReaderError" role="status"><p>这一页暂时无法载入</p><button type="button" onClick={() => { setFailed(false); setLoaded(false); setAttempt(value => value + 1); }}>重新加载</button></div>}
    <figcaption><span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><span>点按页面放大</span></figcaption>
  </figure>;
});

export default function PlanReader({ project, plan, backgroundRef, initialScroll = 0, onClose }) {
  const rootRef = useRef(null);
  const closeRef = useRef(onClose);
  const zoomRef = useRef(false);
  const zoomOrigin = useRef(0);
  const contentsRef = useRef(null);
  const [zoom, setZoom] = useState(null);
  const [current, setCurrent] = useState(1);
  closeRef.current = onClose;
  zoomRef.current = Boolean(zoom);
  const openZoom = useCallback((page, index) => { zoomOrigin.current = index; setZoom({ page, index }); }, []);
  const close = () => closeRef.current(rootRef.current.scrollTop);
  const closeZoom = () => {
    const destination = zoom.index + 1, changed = zoom.index !== zoomOrigin.current;
    setZoom(null);
    if (changed) queueMicrotask(() => {
      const page = rootRef.current?.querySelector(`[data-page="${destination}"]`);
      page?.scrollIntoView({ block: 'start', behavior: 'instant' });
      page?.focus({ preventScroll: true });
    });
  };

  useLayoutEffect(() => {
    const root = rootRef.current, background = backgroundRef.current;
    const previousFocus = document.activeElement, previousInert = background?.inert;
    if (background) background.inert = true;
    root.scrollTop = initialScroll;
    root.querySelector('button').focus({ preventScroll: true });
    let frame;
    const update = () => {
      const edge = root.getBoundingClientRect().top + Math.min(root.clientHeight * .35, 240);
      const pages = [...root.querySelectorAll('.planReaderPage')];
      const index = pages.findIndex(page => page.getBoundingClientRect().bottom > edge);
      setCurrent(index < 0 ? plan.pages.length : index + 1);
      const distance = root.scrollHeight - root.clientHeight;
      root.style.setProperty('--reading-progress', String(distance > 0 ? root.scrollTop / distance : 1));
    };
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const onKey = event => {
      if (zoomRef.current) return;
      // The exhibition underneath also handles arrows and Escape. Reading keeps
      // native scrolling and owns its own exit and focus cycle.
      event.stopImmediatePropagation();
      if (event.key === 'Escape') {
        event.preventDefault();
        if (contentsRef.current?.open) { contentsRef.current.open = false; contentsRef.current.querySelector('summary').focus(); }
        else closeRef.current(root.scrollTop);
      }
      if (event.key === 'Tab') {
        const nodes = [...root.querySelectorAll('button:not(:disabled), a[href], select, summary')].filter(node => node.getClientRects().length);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = event => { if (contentsRef.current?.open && !contentsRef.current.contains(event.target)) contentsRef.current.open = false; };
    update();
    root.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', outside, true);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      window.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', outside, true);
      if (background) background.inert = previousInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [backgroundRef, initialScroll, plan]);

  const jump = value => rootRef.current.querySelector(`[data-page="${value}"]`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  const activeChapter = plan.chapters.findLastIndex(chapter => chapter.page <= current);
  return createPortal(<section ref={rootRef} className="planReader" role="dialog" aria-modal="true" aria-labelledby="plan-reader-title" aria-describedby="plan-reader-subtitle" tabIndex={0} style={{ '--plan-accent': project.accent || '#bdd6b8' }}>
    <header className="planReaderToolbar">
      <button type="button" onClick={close} aria-label="返回项目展厅"><ArrowLeft size={18}/><span>返回作品</span></button>
      <div className="planReaderTools">
        <label className="planReaderPosition"><span>阅读进度</span><select aria-label="跳转策划案页面" value={current} onChange={event => jump(event.target.value)}>{plan.pages.map((page, index) => <option key={page.src} value={index + 1}>{String(index + 1).padStart(2, '0')} / {String(plan.pages.length).padStart(2, '0')}</option>)}</select></label>
        <details ref={contentsRef} className="planReaderContents"><summary><List size={15} aria-hidden="true"/>目录</summary><nav className="planReaderContentsPanel" aria-label="策划案章节目录"><header><span>章节目录</span><button type="button" aria-label="关闭章节目录" onClick={() => { contentsRef.current.open = false; contentsRef.current.querySelector('summary').focus(); }}><X size={16}/></button></header>{plan.chapters.map((chapter, index) => <button key={chapter.page} type="button" aria-current={activeChapter === index ? 'location' : undefined} onClick={() => { contentsRef.current.open = false; jump(chapter.page); contentsRef.current.querySelector('summary').focus({ preventScroll: true }); }}><span>{chapter.label}</span><small>第 {String(chapter.page).padStart(2, '0')} 页</small></button>)}</nav></details>
      </div>
      <a href={project.document} download={`${project.name}完整策划案.pdf`}><Download size={16}/><span>下载 PDF</span></a>
      <div className="planReaderProgress" aria-hidden="true"/>
    </header>
    <article className="planReaderArticle">
      <header className="planReaderHeading"><p><span>SHI YI / FULL PROPOSAL</span><span>完整策划案 · {plan.pages.length} 页</span></p><h2 id="plan-reader-title">{plan.title || project.name}</h2><p id="plan-reader-subtitle" className="planReaderSubtitle">品牌策划 · 完整方案</p><span>上下滑动阅读，点按页面可放大查看</span></header>
      <div className="planReaderPages">{plan.pages.map((page, index) => <PlanPage key={page.src} page={page} index={index} total={plan.pages.length} scrollRef={rootRef} onZoom={openZoom}/>)}</div>
      <footer className="planReaderEnd"><p>已读完全部 {plan.pages.length} 页</p><div><button type="button" onClick={close}><ArrowLeft size={15}/>返回作品</button><button type="button" onClick={() => rootRef.current.scrollTo({ top: 0, behavior: 'instant' })}>回到顶部<ArrowUp size={15}/></button></div></footer>
    </article>
    {zoom && <ImageLightbox src={zoom.page.src} label={`${plan.title || project.name} · 第 ${zoom.index + 1} 页`} backgroundRef={rootRef} onClose={closeZoom} navigation={{ index: zoom.index, total: plan.pages.length, onChange: index => setZoom({ page: plan.pages[index], index }) }}/>}
  </section>, document.body);
}
