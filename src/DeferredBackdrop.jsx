import React, { useEffect, useState } from 'react';

// The exhibition remains usable while the optional WebGL effect downloads.
export default function DeferredBackdrop(props) {
  const [Effect, setEffect] = useState(null);
  useEffect(() => {
    if (props.reduced) return;
    let alive = true;
    const timer = window.setTimeout(() => {
      import('./RefractiveBackdrop').then(module => {
        if (alive) setEffect(() => module.default);
      }).catch(() => { /* Keep the static background when offline or interrupted. */ });
    }, 1500);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [props.reduced]);
  if (Effect && !props.reduced) return <Effect {...props} />;
  return <div className="immersiveBackdrop" aria-hidden="true">
    <picture>
      {props.mobileSrc && <source media="(max-aspect-ratio: 4/5)" srcSet={props.mobileSrc} />}
      <img className="immersiveFallback" src={props.src} alt="" fetchPriority="high" />
    </picture>
    <div className="immersiveShade" />
  </div>;
}
