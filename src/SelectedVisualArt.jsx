import React, { useRef } from 'react';
import './SelectedVisualArt.css';

export default function SelectedVisualArt({ item, surface, onOpen, onStep, onError }) {
  const gesture = useRef(null);
  const swiped = useRef(false);
  const start = event => {
    if (event.button !== 0) return;
    swiped.current = false;
    gesture.current = { x:event.clientX, y:event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const end = event => {
    const origin = gesture.current; gesture.current = null;
    if (!origin) return;
    const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
    const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    if (Math.abs(delta) > 45) { swiped.current = true; onStep?.(delta < 0 ? 1 : -1); }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className={`selectedVisualArt layout-${item.layout}`} style={{ '--visual-surface': surface }}>
    {item.artworks.map((artwork, index) => <button type="button" key={artwork.src} className="selectedVisualPiece" onPointerDown={start} onPointerUp={end} onPointerCancel={() => { gesture.current = null; swiped.current = true; }} onClick={() => { if (!swiped.current) onOpen?.(index); swiped.current = false; }} tabIndex={onOpen ? 0 : -1} aria-label={`放大查看${artwork.label}`} aria-haspopup="dialog">
      <img src={artwork.src} width={artwork.width} height={artwork.height} alt={artwork.label} draggable="false" onError={onError}/>
      {item.artworks.length > 1 && <span>{artwork.label}</span>}
    </button>)}
  </div>;
}
