import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './SiteEntrance.css';

export default function SiteEntrance({ onComplete }) {
  const rootRef = useRef(null);
  const finishRef = useRef(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const shell = document.querySelector('main.workAtlas');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previousInert = shell.inert;
    const previousFocus = document.activeElement;
    const timers = new Set();
    const snapshots = new Map();
    let alive = true, finished = false, revealTimeline, frameObserver, frameRequest;
    const opening = gsap.timeline();
    const save = node => {
      if (snapshots.has(node)) return;
      snapshots.set(node, ['transform', 'opacity', 'will-change', 'display', 'clip-path'].map(key => [key, node.style.getPropertyValue(key), node.style.getPropertyPriority(key)]));
    };
    const restore = () => {
      snapshots.forEach((properties, node) => properties.forEach(([key, value, priority]) => value ? node.style.setProperty(key, value, priority) : node.style.removeProperty(key)));
      snapshots.clear();
      frameObserver?.disconnect();
      cancelAnimationFrame(frameRequest);
      shell.inert = previousInert;
      document.documentElement.classList.remove('portfolio-entering');
    };
    const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
    const finish = () => {
      if (!alive || finished) return;
      finished = true;
      opening.kill(); revealTimeline?.kill(); clearTimers(); restore();
      if (root.contains(document.activeElement)) {
        const focus = previousFocus !== document.body && previousFocus?.isConnected ? previousFocus : shell.querySelector('.workAtlasBrand');
        focus?.focus({ preventScroll: true });
      }
      completeRef.current();
    };
    finishRef.current = finish;
    if (motion.matches) { finish(); return; }
    shell.inert = true;
    document.documentElement.classList.add('portfolio-entering');
    root.querySelector('button').focus({ preventScroll: true });

    const frame = root.querySelector('.siteEntranceFrame');
    const number = root.querySelector('.siteEntranceNumber');
    const screen = shell.querySelector('#top .spatialScreen');
    const syncFrame = () => {
      if (!alive || finished || !screen || shell.dataset.page !== 'top') return;
      const bounds = screen.getBoundingClientRect();
      if (bounds.width && bounds.height) Object.assign(frame.style, {
        left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, transform: 'none',
      });
    };
    syncFrame();
    if (screen) {
      frameObserver = new ResizeObserver(() => {
        cancelAnimationFrame(frameRequest);
        frameRequest = requestAnimationFrame(syncFrame);
      });
      frameObserver.observe(screen.closest('.spatialStage'));
    }
    const count = { value: 0 };
    const sequenceDone = new Promise(resolve => opening.eventCallback('onComplete', resolve));
    opening.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power2.out' }, 0);
    opening.to(count, { value: 100, duration: 1.5, ease: 'power1.inOut', onUpdate: () => {
      number.textContent = String(Math.round(count.value));
      frame.style.setProperty('--entrance-progress', String(count.value / 100));
    } }, .2);
    opening.to({}, { duration: .18 });

    const delay = ms => new Promise(resolve => {
      const id = setTimeout(() => { timers.delete(id); resolve(); }, ms);
      timers.add(id);
    });
    const covers = [...shell.querySelectorAll('#top .cyberPlate, #top .spatialMedia img')];
    // Wait briefly for the real first image and typeface; never hold visitors indefinitely.
    const assets = Promise.allSettled([
      ...covers.map(image => image.decode?.() || Promise.resolve()),
      document.fonts?.load('400 12px "MiSans Portfolio"') || Promise.resolve(),
    ]);
    Promise.all([sequenceDone, Promise.race([assets, delay(2400)])]).then(() => {
      if (!alive || finished) return;
      opening.kill();
      root.dataset.phase = 'revealing';
      const page = shell.dataset.page || 'top';
      const pageNode = document.getElementById(page);
      const selector = page === 'top'
        ? '.immersiveHeading, .immersiveFilters, .immersiveWorkRow, .immersiveInfo > *, .immersivePosition, .immersiveFooter, .immersiveEdgeLabel'
        : 'h2, .workAtlasEyebrow, .workAtlasAboutGrid > div > p, .workAtlasCapabilityList span, .workAtlasResumeHeading, .workAtlasExperienceGrid > article, a';
      const content = [shell.querySelector('.workAtlasHeader'), ...pageNode.querySelectorAll(selector)].filter(Boolean);
      const background = pageNode.querySelector('.immersiveBackdrop');
      const signal = pageNode.querySelector('.spatialBootSignal');
      content.forEach(save); if (background) save(background);
      revealTimeline = gsap.timeline({ onComplete: finish });
      revealTimeline.to(number, { opacity: 0, duration: .28, ease: 'power2.in' }, 0);
      revealTimeline.to(frame, { opacity: 0, duration: .65, ease: 'power2.inOut' }, .32);
      revealTimeline.to(root.querySelector('.siteEntranceBlackout'), { opacity: 0, duration: .8, ease: 'power2.inOut' }, .18);
      if (signal) {
        // The numeric outline is aligned to the live screen; noise replaces it in place.
        const noise = signal.querySelector('.spatialBootNoise');
        const media = pageNode.querySelector('.spatialLiveMedia');
        const scenery = [...pageNode.querySelectorAll('.cyberPlate, .cyberAmbientBackdrop, .cyberFloorTint')];
        [signal, noise, media, ...scenery].forEach(save);
        revealTimeline.set(signal, { display: 'block', opacity: 1, clipPath: 'inset(0%)' }, 0);
        revealTimeline.fromTo(noise, { opacity: 0 }, { opacity: .72, duration: .45, ease: 'power2.out' }, .18);
        revealTimeline.fromTo(noise, { xPercent: -1, yPercent: 1 }, { xPercent: 1, yPercent: -1, duration: .09, repeat: 8, yoyo: true, ease: 'steps(1)' }, .25);
        revealTimeline.fromTo(scenery, { opacity: .02 }, { opacity: 1, duration: 1.6, ease: 'power2.inOut' }, .35);
        revealTimeline.fromTo(media, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.inOut' }, .8);
        revealTimeline.to(signal, { opacity: 0, duration: 1.1, ease: 'power2.inOut' }, .8);
        revealTimeline.set(signal, { display: 'none' }, 1.9);
        revealTimeline.fromTo(content, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: { amount: .25 }, ease: 'power3.out' }, 1.25);
      } else {
        if (background) revealTimeline.fromTo(background, { scale: 1.08 }, { scale: 1, duration: 1.1, ease: 'power3.out' }, .2);
        revealTimeline.fromTo(content, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: { amount: .25 }, ease: 'power3.out' }, .4);
      }
      revealTimeline.to(root.querySelector('.siteEntranceSkip'), { opacity: 0, duration: .2 }, signal ? 2.05 : 1);
    });
    // Escape, history navigation, motion preference changes, and a watchdog all release the gate.
    const keydown = event => {
      if (event.key === 'Escape') { event.preventDefault(); finish(); }
      if (event.key === 'Tab') { event.preventDefault(); root.querySelector('button').focus(); }
    };
    const preference = () => { if (motion.matches) finish(); };
    const watchdog = setTimeout(finish, 6500); timers.add(watchdog);
    window.addEventListener('keydown', keydown);
    window.addEventListener('hashchange', finish);
    window.addEventListener('popstate', finish);
    motion.addEventListener('change', preference);
    return () => {
      alive = false; opening.kill(); revealTimeline?.kill(); clearTimers(); restore();
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('hashchange', finish);
      window.removeEventListener('popstate', finish);
      motion.removeEventListener('change', preference);
      finishRef.current = null;
    };
  }, []);

  return createPortal(<div ref={rootRef} className="siteEntrance" role="dialog" aria-modal="true" aria-label="进入石宜的作品集" data-phase="opening">
    <div className="siteEntranceBlackout" aria-hidden="true" />
    <div className="siteEntranceFrame" aria-hidden="true">
      <span className="siteEntranceProgress siteEntranceProgressTop"/>
      <span className="siteEntranceProgress siteEntranceProgressRight"/>
      <span className="siteEntranceProgress siteEntranceProgressBottom"/>
      <span className="siteEntranceProgress siteEntranceProgressLeft"/>
      <span className="siteEntranceNumber">0</span>
    </div>
    <button type="button" className="siteEntranceSkip" onClick={() => finishRef.current?.()}>跳过动画 <span aria-hidden="true">↗</span></button>
  </div>, document.body);
}
