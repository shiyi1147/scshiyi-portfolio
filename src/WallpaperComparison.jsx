import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Pause, Play, X } from 'lucide-react';
import { useReducedMotion } from './ImmersiveWork';
import './WallpaperComparison.css';

const smooth = value => value * value * (3 - 2 * value);

export default function WallpaperComparison({ comparison }) {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const autoPlayed = useRef(false);
  const elapsed = useRef(0);
  const contentRef = useRef(null);
  const dialogRef = useRef(null);
  const fullscreenButtonRef = useRef(null);
  const fullscreenContext = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [mode, setMode] = useState('wipe');
  const [split, setSplit] = useState(50);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([beforeRef.current.decode(), afterRef.current.decode()]).then(() => {
      if (!cancelled) setReady(true);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [fullscreen]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= .4);
    }, { root: stageRef.current.closest('.exhibitionBrief'), threshold: [0, .4] });
    observer.observe(stageRef.current);
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); };
  }, [fullscreen]);

  useLayoutEffect(() => {
    if (!fullscreen) return;
    const saved = fullscreenContext.current;
    if (saved.background) saved.background.inert = true;
    dialogRef.current.querySelector('button')?.focus({ preventScroll: true });
    const onKey = event => {
      // Keep this dialog's keys away from the exhibition behind it.
      event.stopImmediatePropagation();
      if (event.key === 'Escape') {
        event.preventDefault(); setPlaying(false); setReady(false); setVisible(false); setFullscreen(false); return;
      }
      if (event.key !== 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')).filter(node=>node.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      if (saved.background) saved.background.inert = saved.wasInert;
      queueMicrotask(() => {
        if (saved.brief?.isConnected) saved.brief.scrollTop = saved.scrollTop;
        fullscreenButtonRef.current?.focus({ preventScroll: true });
      });
    };
  }, [fullscreen]);

  useEffect(() => {
    if (!ready || !visible || !pageVisible || reduced || mode !== 'wipe' || autoPlayed.current) return;
    autoPlayed.current = true;
    elapsed.current = 0;
    setSplit(100);
    setPlaying(true);
  }, [ready, visible, pageVisible, reduced, mode]);

  useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);

  useEffect(() => {
    if (!playing || !ready || !visible || !pageVisible || mode !== 'wipe') return;
    let frame, previous;
    const tick = time => {
      if (previous !== undefined) elapsed.current += time - previous;
      previous = time;
      const timeInCycle = elapsed.current;
      if (timeInCycle < 650) setSplit(100);
      else if (timeInCycle < 3250) setSplit(100 * (1 - smooth((timeInCycle - 650) / 2600)));
      else if (timeInCycle < 4150) setSplit(0);
      else if (timeInCycle < 4950) setSplit(50 * smooth((timeInCycle - 4150) / 800));
      else { setSplit(50); setPlaying(false); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, ready, visible, pageVisible, mode]);

  const stop = () => { autoPlayed.current = true; setPlaying(false); };
  const chooseMode = next => {
    if (mode === next) return;
    stop(); setSplit(50); setMode(next);
  };
  const togglePlayback = () => {
    autoPlayed.current = true;
    if (playing) { setPlaying(false); return; }
    elapsed.current = 0; setSplit(100); setPlaying(true);
  };

  const openFullscreen = () => {
    stop();
    const content = contentRef.current;
    const brief = content.closest('.exhibitionBrief');
    const background = content.closest('.exhibition');
    fullscreenContext.current = { brief, scrollTop: brief?.scrollTop || 0, background, wasInert: background?.inert };
    setPlaceholderHeight(content.getBoundingClientRect().height);
    setReady(false); setVisible(false); setFullscreen(true);
  };
  const closeFullscreen = () => { setPlaying(false); setReady(false); setVisible(false); setFullscreen(false); };

  const content = <div className="wallpaperComparison" ref={contentRef}>
    <div className="wallpaperComparisonToolbar">
      <div className="wallpaperComparisonModes" role="group" aria-label="对照方式">
        <button type="button" aria-pressed={mode==='wipe'} onClick={()=>chooseMode('wipe')}>擦拭动效</button>
        <button type="button" aria-pressed={mode==='side'} onClick={()=>chooseMode('side')}>并排对照</button>
      </div>
      <div className="wallpaperComparisonActions">{mode==='wipe'&&<button className="wallpaperComparisonPlay" type="button" onClick={togglePlayback} disabled={!ready} aria-pressed={playing}>{playing?<Pause size={13} aria-hidden="true"/>:<Play size={13} aria-hidden="true"/>}{playing?'暂停演示':'播放变化'}</button>}{!fullscreen&&<button ref={fullscreenButtonRef} className="wallpaperComparisonExpand" type="button" onClick={openFullscreen}><Maximize2 size={14} aria-hidden="true"/>全屏查看</button>}</div>
    </div>
    <div ref={stageRef} className={`wallpaperComparisonStage is-${mode}`} style={{'--comparison-split':`${split}%`}} aria-busy={!ready&&!failed}>
      <figure className="wallpaperComparisonBefore"><img ref={beforeRef} src={comparison.before} alt={comparison.beforeAlt} loading="lazy" width="941" height="1672"/>{(mode==='side'||split>=20)&&<figcaption>修改前</figcaption>}</figure>
      <figure className="wallpaperComparisonAfter"><img ref={afterRef} src={comparison.after} alt={comparison.afterAlt} loading="lazy" width="1440" height="2560"/>{(mode==='side'||split<=80)&&<figcaption>修改后</figcaption>}</figure>
      {mode==='wipe'&&<>
        <div className="wallpaperComparisonDivider" aria-hidden="true"><span>‹ ›</span></div>
        <input className="wallpaperComparisonRange" type="range" min="0" max="100" step="1" value={Math.round(split)} disabled={!ready} aria-label="拖动分界线对比 AI 模拟与成品" aria-valuetext={`AI 模拟 ${Math.round(split)}%，成品 ${100-Math.round(split)}%`} onFocus={stop} onPointerDown={stop} onKeyDown={stop} onChange={event=>{stop();setSplit(Number(event.target.value));}}/>
      </>}
      {!ready&&<p className="wallpaperComparisonLoading" role="status">{failed?'图片暂时无法载入':'图片加载中…'}</p>}
    </div>
  </div>;

  return fullscreen ? <><div className="wallpaperComparisonPlaceholder" aria-hidden="true" style={{height:placeholderHeight}}/>{createPortal(<section ref={dialogRef} className="wallpaperComparisonFullscreen" role="dialog" aria-modal="true" aria-labelledby="comparison-fullscreen-title" onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()} onPointerMove={event=>event.stopPropagation()}>
    <header className="wallpaperComparisonFullscreenHeader"><div><p>DETAIL COMPARISON</p><h2 id="comparison-fullscreen-title">{comparison.label} · 修改对照</h2></div><button type="button" onClick={closeFullscreen} aria-label="退出全屏对照"><X size={21} aria-hidden="true"/><span>退出全屏</span></button></header>
    {content}
  </section>,document.body)}</> : content;
}
