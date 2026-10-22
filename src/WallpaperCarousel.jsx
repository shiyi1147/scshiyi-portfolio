import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function WallpaperCarousel({ project, playing }) {
  const slides = useMemo(() => project.items.filter(item => item.src).map(item => ({ ...item, preview:item.thumb || item.src })), [project]);
  const host = useRef(null), track = useRef(null), video = useRef(null);
  const elapsed = useRef(0), nextReady = useRef(false);
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const active = playing && !hovered && !hidden;
  const current = slides[index];
  const duration = current?.video ? 5400 : 3600;

  useEffect(() => {
    const move = event => {
      const box = host.current?.getBoundingClientRect();
      setHovered(Boolean(box && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom));
    };
    const leave = () => setHovered(false);
    const visibility = () => setHidden(document.hidden);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    nextReady.current = false;
    if (slides.length < 2) return;
    let cancelled = false;
    const image = new Image();
    image.src = slides[(index + 1) % slides.length].preview;
    image.decode().then(() => { if (!cancelled) nextReady.current = true; }, () => { if (!cancelled) nextReady.current = true; });
    return () => { cancelled = true; };
  }, [index, slides]);

  useEffect(() => {
    if (!active || slides.length < 2) return;
    let frame, last = performance.now();
    const tick = now => {
      elapsed.current = Math.min(duration, elapsed.current + now - last);
      last = now;
      if (track.current) track.current.style.transform = `scaleX(${elapsed.current / duration})`;
      if (elapsed.current >= duration && nextReady.current) {
        elapsed.current = 0;
        setPrevious(index);
        setIndex((index + 1) % slides.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, index, duration, slides]);

  useEffect(() => {
    const timer = setTimeout(() => setPrevious(null), 700);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active) element.play().catch(() => {});
    else element.pause();
    return () => element.pause();
  }, [active, index]);

  useEffect(() => {
    const element = video.current;
    return () => { if (element) { element.pause(); element.removeAttribute('src'); element.load(); } };
  }, [index]);

  if (!current) return <img src={project.cover} alt={project.name}/>;
  const imageClass = `watchfaceCarouselImage${previous !== null ? ' is-incoming' : ''}`;
  return <div ref={host} className="watchfaceCarousel wallpaperCarousel" data-count={slides.length} data-index={index} data-playing={active} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
    <span className="watchfaceCarouselKicker">{current.video ? 'MOTION WALLPAPER / VCG' : 'WALLPAPER COLLECTION / VCG'}</span>
    {previous !== null && <img className="watchfaceCarouselImage is-outgoing" src={slides[previous].preview} alt="" aria-hidden="true"/>}
    {current.video ? <video key={current.video} ref={video} className={imageClass} src={current.video} poster={current.preview} muted loop playsInline preload="metadata" aria-label={`${current.label}静音预览`}/> : <img key={current.preview} className={imageClass} src={current.preview} alt={current.label} draggable="false"/>}
    <div className="watchfaceCarouselCaption"><span>{current.label}</span><small>{String(index + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</small></div>
    <div className="watchfaceCarouselTrack"><span ref={track} key={index}/></div>
  </div>;
}
