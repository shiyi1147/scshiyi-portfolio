// Inlined into index.html by prepare-landing-assets.cjs, before the application.
(() => {
  const media = __LANDING_MEDIA__;
  const hash = location.hash.slice(1).split('?');
  const home = (!hash[0] || hash[0] === 'top') && !new URLSearchParams(hash[1] || '').has('work') && new URLSearchParams(location.search).get('view') !== 'overview';
  let seen = false;
  const sessionKey = 'portfolio-entrance-v3';
  try { seen = Boolean(sessionStorage.getItem(sessionKey)); } catch { /* Storage is optional. */ }
  const replay = ['127.0.0.1','localhost'].includes(location.hostname) && new URLSearchParams(location.search).get('intro') === 'preview';
  const play = home && (!seen || replay) && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.__portfolioEntrance = { play, sessionKey };
  if (play) {
    document.documentElement.classList.add('portfolio-entering');
    window.__portfolioEntrance.watchdog = setTimeout(() => document.documentElement.classList.remove('portfolio-entering'), 8000);
  }
  if (!home) return;
  const artwork = media.shanhai[innerWidth <= 760 ? 'mobile' : 'desktop'];
  const scenery = media.scene[innerWidth / innerHeight < .95 ? 'mobile' : 'desktop'];
  window.__portfolioLandingImages = new Map();
  [artwork, scenery].forEach(item => {
    const src = new URL(item.src, document.baseURI).href;
    // Share the downloaded bytes with every rendered copy, including when the
    // browser's HTTP cache is disabled. Document-owned blob URLs die on unload.
    const ready = fetch(src, { priority: 'high' }).then(response => {
      if (!response.ok) throw new Error('Preview unavailable');
      return response.blob();
    }).then(blob => URL.createObjectURL(blob)).catch(() => null);
    window.__portfolioLandingImages.set(src, ready);
  });
})();
