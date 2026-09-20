import previewMap from './homePreviewMap.json';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function WatchfaceCarousel({ project, playing }) {
  const slides = useMemo(() => {
    const preview = item => {const key=item.src.replace(import.meta.env.BASE_URL,'');return {...item,src:previewMap[key] ? import.meta.env.BASE_URL+previewMap[key] : item.src};};
    if (project.id !== "archive-watchfaces") return project.items.filter(item => item.src && !item.video).map(preview);
    const seen = new Set();
    return project.items.filter(item => {
      if (!item.src.includes('/watchfaces/') || !item.label.includes('方形') || seen.has(item.sourceProjectId)) return false;
      seen.add(item.sourceProjectId); return true;
    }).map(preview);
  }, [project]);
  const host = useRef(null);
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const move = event => {
      const box = host.current?.getBoundingClientRect();
      setHovered(Boolean(box && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom));
    };
    const leave = () => setHovered(false);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, []);
  const active = playing && !hovered && !hidden;
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    if (!active || slides.length < 2) return;
    let cancelled = false;
    const next = (index + 1) % slides.length;
    const image = new Image(); image.src = slides[next].src;
    const ready = image.decode().then(() => true, () => false);
    const timer = setTimeout(async () => {
      if (await ready && !cancelled) { setPrevious(index); setIndex(next); }
    }, 2000);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [active, index, slides]);
  useEffect(() => {
    const timer = setTimeout(() => setPrevious(null), 700);
    return () => clearTimeout(timer);
  }, [index]);
  if (!slides.length) return <img src={project.cover} alt={project.name}/>;
  return <div ref={host} className="watchfaceCarousel" data-count={slides.length} data-index={index} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <span className="watchfaceCarouselKicker">{project.id === "archive-watchfaces" ? "WATCHFACE COLLECTION" : project.id === "archive-summer-3d" ? "SUMMER 3D SCENES" : "SEASONAL ILLUSTRATIONS"}</span>
    {previous !== null && <img className="watchfaceCarouselImage is-outgoing" src={slides[previous].src} alt="" aria-hidden="true"/>}
    <img key={slides[index].src} className="watchfaceCarouselImage is-incoming" src={slides[index].src} alt={slides[index].label} draggable="false"/>
    <div className="watchfaceCarouselCaption"><span>{slides[index].sourceTitle || project.name}</span><small>{String(index + 1).padStart(2,'0')} / {slides.length}</small></div>
    <div className="watchfaceCarouselTrack"><span key={index} style={{animationPlayState:active?'running':'paused'}}/></div>
  </div>;
}
