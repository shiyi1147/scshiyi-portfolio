import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus, RotateCcw, ScanLine, X } from 'lucide-react';
import './ImageLightbox.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const INITIAL = { scale: 1, x: 0, y: 0 };

export default function ImageLightbox({ src, label, onClose, backgroundRef }) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const geometryRef = useRef({ width: 0, height: 0, imageWidth: 0, imageHeight: 0 });
  const cameraRef = useRef(INITIAL);
  const pointers = useRef(new Map());
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [geometry, setGeometry] = useState(geometryRef.current);
  const [camera, setCamera] = useState(INITIAL);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dragging, setDragging] = useState(false);

  const commit = useCallback(next => {
    const g = geometryRef.current;
    const scale = clamp(next.scale, 1, 8);
    const limitX = Math.max(0, (g.imageWidth * scale - g.width) / 2);
    const limitY = Math.max(0, (g.imageHeight * scale - g.height) / 2);
    const value = { scale, x: clamp(next.x, -limitX, limitX), y: clamp(next.y, -limitY, limitY) };
    cameraRef.current = value;
    setCamera(value);
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current, image = imageRef.current;
    if (!viewport || !image?.naturalWidth) return;
    const { width, height } = viewport.getBoundingClientRect();
    const fit = Math.min((width - 32) / image.naturalWidth, (height - 32) / image.naturalHeight, 1);
    const value = { width, height, imageWidth: image.naturalWidth * fit, imageHeight: image.naturalHeight * fit };
    geometryRef.current = value;
    setGeometry(value);
    commit(INITIAL);
  }, [commit]);

  const zoom = useCallback((factor, point = { x: 0, y: 0 }, drift = { x: 0, y: 0 }) => {
    const c = cameraRef.current;
    const scale = clamp(c.scale * factor, 1, 8);
    const ratio = scale / c.scale;
    commit({ scale, x: point.x - (point.x - c.x) * ratio + drift.x, y: point.y - (point.y - c.y) * ratio + drift.y });
  }, [commit]);

  const localPoint = event => {
    const r = viewportRef.current.getBoundingClientRect();
    return { x: event.clientX - r.left - r.width / 2, y: event.clientY - r.top - r.height / 2 };
  };
  const fitWidth = () => {
    const g = geometryRef.current;
    if (!g.imageWidth) return;
    const scale = clamp((g.width - 32) / g.imageWidth, 1, 8);
    commit({ scale, x: 0, y: Math.max(0, (g.imageHeight * scale - g.height) / 2) });
  };

  useLayoutEffect(() => {
    const background = backgroundRef.current;
    const previousInert = background?.inert;
    const previousFocus = document.activeElement;
    if (background) background.inert = true;
    rootRef.current.querySelector('button').focus({ preventScroll: true });
    const observer = new ResizeObserver(measure);
    observer.observe(viewportRef.current);
    const onWheel = event => {
      event.preventDefault();
      if (!imageRef.current?.naturalWidth) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? geometryRef.current.height : 1);
      zoom(Math.exp(-delta * .002), localPoint(event));
    };
    const viewport = viewportRef.current;
    viewport.addEventListener('wheel', onWheel, { passive: false });
    const onKey = event => {
      // The parent exhibition also listens globally: only this layer owns keys now.
      event.stopImmediatePropagation();
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); return; }
      if (event.key === 'Tab') {
        const nodes = Array.from(rootRef.current.querySelectorAll('button:not(:disabled), a[href]'));
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (['+', '=', '-', '0', 'Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        if (['0', 'Home'].includes(event.key)) commit(INITIAL);
        else if (['+', '=', '-'].includes(event.key)) zoom(event.key === '-' ? 1 / 1.35 : 1.35);
        else {
          const c = cameraRef.current, step = event.shiftKey ? 140 : 65;
          commit({ ...c, x: c.x + (event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0), y: c.y + (event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0) });
        }
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      observer.disconnect();
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey, true);
      if (background) background.inert = previousInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [backgroundRef, commit, measure, zoom]);

  const onPointerDown = event => {
    if (event.button !== 0 || !loaded || failed || event.target.closest('a,button')) return;
    event.preventDefault();
    pointers.current.set(event.pointerId, localPoint(event));
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const onPointerMove = event => {
    if (!pointers.current.has(event.pointerId)) return;
    const before = [...pointers.current.values()];
    const old = pointers.current.get(event.pointerId);
    const next = localPoint(event);
    pointers.current.set(event.pointerId, next);
    const after = [...pointers.current.values()];
    if (before.length === 1) {
      const c = cameraRef.current;
      commit({ ...c, x: c.x + next.x - old.x, y: c.y + next.y - old.y });
    } else {
      const midpoint = points => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
      const distance = points => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const a = midpoint(before), b = midpoint(after);
      zoom(distance(after) / Math.max(1, distance(before)), a, { x: b.x - a.x, y: b.y - a.y });
    }
  };
  const onPointerEnd = event => {
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(pointers.current.size > 0);
  };

  return createPortal(<section ref={rootRef} className="imageLightbox" role="dialog" aria-modal="true" aria-labelledby="image-lightbox-title" onPointerMove={event => event.stopPropagation()}>
    <header className="imageLightboxHeader"><div><span>DETAIL VIEW</span><h2 id="image-lightbox-title">{label}</h2></div><button type="button" onClick={onClose} aria-label="关闭大图"><X size={21} /><span>返回展厅</span></button></header>
    <div ref={viewportRef} className={`imageLightboxViewport ${dragging ? 'is-dragging' : ''}`} data-scale={camera.scale.toFixed(3)} data-x={camera.x.toFixed(1)} data-y={camera.y.toFixed(1)} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onLostPointerCapture={onPointerEnd} onDoubleClick={event => { if (loaded && !failed) cameraRef.current.scale > 1.1 ? commit(INITIAL) : zoom(2.5, localPoint(event)); }}>
      <img ref={imageRef} src={src} alt={label} draggable="false" onLoad={() => { setLoaded(true); measure(); }} onError={() => setFailed(true)} style={{ width: geometry.imageWidth || undefined, height: geometry.imageHeight || undefined, opacity: loaded && !failed ? 1 : 0, transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }} />
      {!loaded && !failed && <p className="imageLightboxStatus" role="status">正在载入大图…</p>}
      {failed && <div className="imageLightboxStatus" role="status">大图暂时无法载入<a href={src} target="_blank" rel="noreferrer">在新窗口打开图片</a></div>}
    </div>
    <footer className="imageLightboxFooter"><div className="imageLightboxTools" role="group" aria-label="大图缩放工具">
      <button type="button" aria-label="缩小图片" disabled={!loaded || failed || camera.scale <= 1} onClick={() => zoom(1 / 1.35)}><Minus size={19}/></button>
      <output aria-label="相对适屏比例">{Math.round(camera.scale * 100)}%</output>
      <button type="button" aria-label="放大图片" disabled={!loaded || failed || camera.scale >= 8} onClick={() => zoom(1.35)}><Plus size={19}/></button>
      <i/>
      <button type="button" disabled={!loaded || failed} onClick={fitWidth}><ScanLine size={17}/><span>适宽阅读</span></button>
      <button type="button" disabled={!loaded || failed} onClick={() => commit(INITIAL)}><RotateCcw size={17}/><span>复位</span></button>
    </div><p>滚轮 / 双指缩放 · 拖动查看 · 双击缩放 · 0 复位 · Esc 返回</p></footer>
  </section>, document.body);
}

