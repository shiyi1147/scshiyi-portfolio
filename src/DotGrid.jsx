import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './DotGrid.css';

const throttle = (func, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

export default function DotGrid({
  dotSize = 4,
  gap = 26,
  baseColor = '#234244',
  activeColor = '#19e6d2',
  proximity = 130,
  speedTrigger = 80,
  shockRadius = 220,
  shockStrength = 2.8,
  returnDuration = 1.1,
  className = '',
  style,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const visibleRef = useRef(false);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
    speed: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const cols = Math.max(1, Math.floor((width + gap) / cell));
    const rows = Math.max(1, Math.floor((height + gap) / cell));
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    dotsRef.current = Array.from({ length: rows * cols }, (_, index) => {
      const x = index % cols;
      const y = Math.floor(index / cols);
      return {
        cx: startX + x * cell,
        cy: startY + y * cell,
        xOffset: 0,
        yOffset: 0,
        active: false,
      };
    });
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();

    let resizeObserver;
    if ('ResizeObserver' in window && wrapperRef.current) {
      resizeObserver = new ResizeObserver(buildGrid);
      resizeObserver.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '220px' },
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId;
    let timeoutId;
    const proxSq = proximity * proximity;

    const draw = () => {
      if (!visibleRef.current) {
        timeoutId = window.setTimeout(draw, 250);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const distanceSq = dx * dx + dy * dy;

        let fill = baseColor;
        let radius = dotSize / 2;
        if (distanceSq <= proxSq) {
          const dist = Math.sqrt(distanceSq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          fill = `rgb(${r}, ${g}, ${b})`;
          radius += t * 2.2;
        }

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [activeRgb, baseColor, baseRgb, dotSize, proximity]);

  useEffect(() => {
    const releaseDot = (dot) => {
      gsap.to(dot, {
        xOffset: 0,
        yOffset: 0,
        duration: returnDuration,
        ease: 'elastic.out(1, 0.72)',
        onComplete: () => {
          dot.active = false;
        },
      });
    };

    const pushDot = (dot, x, y, strength) => {
      const dx = dot.cx - x;
      const dy = dot.cy - y;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const falloff = Math.max(0, 1 - dist / shockRadius);
      dot.active = true;

      gsap.killTweensOf(dot);
      gsap.to(dot, {
        xOffset: (dx / dist) * strength * falloff,
        yOffset: (dy / dist) * strength * falloff,
        duration: 0.38,
        ease: 'power3.out',
        onComplete: () => releaseDot(dot),
      });
    };

    const onMove = (event) => {
      if (!visibleRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const pointer = pointerRef.current;
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      const speed = Math.hypot((dx / dt) * 1000, (dy / dt) * 1000);

      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.speed = speed;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      if (speed < speedTrigger) return;

      for (const dot of dotsRef.current) {
        if (dot.active) continue;
        const dist = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (dist < proximity) {
          pushDot(dot, pointer.x, pointer.y, Math.min(56, speed * 0.018));
        }
      }
    };

    const onClick = (event) => {
      if (!visibleRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (const dot of dotsRef.current) {
        if (dot.active) continue;
        const dist = Math.hypot(dot.cx - x, dot.cy - y);
        if (dist < shockRadius) pushDot(dot, x, y, shockRadius * shockStrength);
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [proximity, returnDuration, shockRadius, shockStrength, speedTrigger]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
}
