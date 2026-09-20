import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import './NavigationMotion.css';

const pages = ['top', 'about', 'resume', 'contact'];
const labels = { top: 'WORK', about: 'ABOUT', resume: 'RESUME', contact: 'CONTACT' };
const readPage = () => {
  const hash = window.location.hash.slice(1).split('?')[0];
  return hash === 'credentials' ? 'resume' : pages.includes(hash) ? hash : 'top';
};
const entranceSelectors = {
  top: '.immersiveHeading, .immersiveFilters, .immersiveWorkRow, .immersiveInfo, .immersiveFooter',
  about: '.workAtlasEyebrow, h2, .workAtlasAboutGrid > div > p, .workAtlasCapabilityList span',
  resume: '.workAtlasResume > .workAtlasEyebrow, .workAtlasResumeHeading, .workAtlasExperienceGrid > article',
  contact: '.workAtlasEyebrow, a, .workAtlasContact > span',
};

export function usePortfolioNavigation(onNavigate) {
  const [page, setPage] = useState(readPage);
  const [targetPage, setTargetPage] = useState(readPage);
  const [navigating, setNavigating] = useState(false);
  const shellRef = useRef(null);
  const overlayRef = useRef(null);
  const current = useRef(page);
  const requested = useRef(page);
  const active = useRef(false);
  const timeline = useRef(null);
  const touched = useRef(new Set());
  const transition = useRef(null);
  const notify = useRef(onNavigate);
  notify.current = onNavigate;

  useEffect(() => {
    if (window.location.hash === '#archive') window.history.replaceState(null, '', '#top');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const oldRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const clearStyles = () => {
      touched.current.forEach(node => {
        gsap.set(node, { clearProps: 'transform,transformOrigin,opacity,willChange' });
        node.inert = false;
      });
      touched.current.clear();
    };
    const commit = destination => {
      current.current = destination;
      flushSync(() => setPage(destination));
      document.documentElement.classList.toggle('portfolio-home', destination === 'top');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    const release = () => {
      clearStyles();
      gsap.set(overlayRef.current, { autoAlpha: 0, clearProps: 'clipPath' });
      document.documentElement.classList.remove('portfolio-transitioning');
      shellRef.current?.removeAttribute('data-transitioning');
      active.current = false;
      setNavigating(false);
    };
    const focusDestination = () => {
      // Do not move focus away from a navigation link while the visitor is using it.
      const focus = document.activeElement;
      if (focus === document.body || focus?.closest('[hidden]')) {
        const node = document.getElementById(current.current);
        node?.setAttribute('tabindex', '-1');
        node?.focus({ preventScroll: true });
      }
    };
    const instant = () => {
      timeline.current?.kill();
      release();
      commit(requested.current);
      focusDestination();
    };
    const run = destination => {
      requested.current = destination;
      setTargetPage(destination);
      notify.current?.();
      if (active.current) return; // A rapid sequence always resolves to the last selection.
      if (destination === current.current) return;
      if (motion.matches) { instant(); return; }
      active.current = true;
      setNavigating(true);
      shellRef.current.dataset.transitioning = 'true';
      document.documentElement.classList.add('portfolio-transitioning');
      const outgoing = document.getElementById(current.current);
      const forward = pages.indexOf(destination) >= pages.indexOf(current.current);
      const sign = forward ? 1 : -1;
      const overlay = overlayRef.current;
      outgoing.inert = true;
      touched.current.add(outgoing);
      gsap.set(outgoing, { transformOrigin: `50% ${window.scrollY + window.innerHeight / 2}px`, willChange: 'transform,opacity' });
      gsap.set(overlay, { autoAlpha: 1, clipPath: forward ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' });
      const trail = overlay.querySelector('.navigationTrail');
      const title = overlay.querySelector('.navigationTitle');
      const tl = gsap.timeline({ onComplete: () => {
        release();
        if (requested.current !== current.current) run(requested.current);
        else focusDestination();
      }});
      timeline.current = tl;
      tl.to(outgoing, { y: -sign * 22, scale: .975, opacity: .5, duration: .42, ease: 'power2.inOut' }, 0);
      tl.to(overlay, { clipPath: 'inset(0% 0% 0% 0%)', duration: .48, ease: 'power3.inOut' }, 0);
      tl.fromTo(trail, { xPercent: -115 * sign, opacity: .2 }, { xPercent: 115 * sign, opacity: .8, duration: 1.1, ease: 'power2.inOut' }, 0);
      tl.fromTo(title, { y: sign * 40, opacity: 0 }, { y: 0, opacity: .65, duration: .4, ease: 'power3.out' }, .1);
      tl.call(() => {
        const next = requested.current;
        gsap.set(outgoing, { clearProps: 'transform,transformOrigin,opacity,willChange' });
        commit(next);
        const incoming = document.getElementById(next);
        incoming.inert = true;
        touched.current.add(incoming);
        const children = Array.from(incoming.querySelectorAll(entranceSelectors[next]));
        children.forEach(node => touched.current.add(node));
        // Schedule after React has displayed the new view, under the fully closed curtain.
        tl.fromTo(incoming, { y: sign * 30, scale: 1.015, opacity: .65 }, { y: 0, scale: 1, opacity: 1, duration: .7, ease: 'power3.out' }, .56);
        tl.fromTo(children, { y: sign * 24, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: { amount: .18 }, ease: 'power3.out' }, .64);
      }, [], .48);
      tl.to(title, { y: -sign * 25, opacity: 0, duration: .35, ease: 'power2.in' }, .58);
      tl.to(overlay, { clipPath: forward ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)', duration: .66, ease: 'power3.inOut' }, .57);
    };
    transition.current = run;
    const syncHistory = () => run(readPage());
    const preferenceChanged = () => { if (motion.matches && active.current) instant(); };
    window.addEventListener('popstate', syncHistory);
    window.addEventListener('hashchange', syncHistory);
    motion.addEventListener('change', preferenceChanged);
    document.documentElement.classList.toggle('portfolio-home', current.current === 'top');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => {
      timeline.current?.kill(); clearStyles();
      window.removeEventListener('popstate', syncHistory);
      window.removeEventListener('hashchange', syncHistory);
      motion.removeEventListener('change', preferenceChanged);
      document.documentElement.classList.remove('portfolio-home', 'portfolio-transitioning');
      window.history.scrollRestoration = oldRestoration;
      transition.current = null;
    };
  }, []);

  const handleNavigationClick = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href').slice(1);
    const destination = hash === 'credentials' ? 'resume' : hash;
    if (!pages.includes(destination)) return;
    event.preventDefault();
    if (window.location.hash !== `#${hash}`) window.history.pushState(null, '', `#${hash}`);
    transition.current?.(destination);
  };
  return { page, targetPage, navigating, shellRef, overlayRef, handleNavigationClick };
}

export function NavigationTransition({ overlayRef, targetPage }) {
  return <div className="navigationTransition" ref={overlayRef} aria-hidden="true">
    <div className="navigationAtmosphere" />
    <div className="navigationTrail" />
    <div className="navigationTitle">{labels[targetPage]}</div>
    <span className="navigationCoordinates">SHI YI / {String(pages.indexOf(targetPage) + 1).padStart(2, '0')} — {labels[targetPage]}</span>
    <div className="navigationEdge" />
  </div>;
}
