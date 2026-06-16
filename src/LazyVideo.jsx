import { useEffect, useRef, useState } from 'react';

export default function LazyVideo({ src, rootMargin = '420px', loadDelay = 0, ...props }) {
  const ref = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let timerId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (loadDelay > 0) {
            timerId = window.setTimeout(() => setIsReady(true), loadDelay);
          } else {
            setIsReady(true);
          }
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerId);
    };
  }, [loadDelay, rootMargin]);

  return (
    <video
      ref={ref}
      src={isReady ? src : undefined}
      preload={isReady ? 'metadata' : 'none'}
      {...props}
    />
  );
}
