import React, { useLayoutEffect, useRef, useState } from 'react';

export default function LandingImage({ src, style, ...props }) {
  const ref = useRef(null);
  const [decoded, setDecoded] = useState(false);
  useLayoutEffect(() => {
    let alive = true;
    const image = ref.current;
    setDecoded(false);
    const show = value => {
      if (!alive) return;
      image.src = value || src;
      image.decode().catch(() => {}).then(() => { if (alive) setDecoded(true); });
    };
    const ready = window.__portfolioLandingImages?.get(new URL(src, location.href).href);
    if (ready) ready.then(show);
    else show(src);
    return () => { alive = false; };
  }, [src]);
  return <img {...props} style={{ ...style, display: decoded ? style?.display : 'none' }} ref={ref} data-landing-src={src}/>;
}
