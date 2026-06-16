import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 560,
  containerHeight = 210,
  animationDelay = 0.2,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(-8deg) translate(-184px, 6px)',
    'rotate(5deg) translate(-92px, -8px)',
    'rotate(-2deg) translate(0px, 12px)',
    'rotate(7deg) translate(92px, -6px)',
    'rotate(-5deg) translate(184px, 10px)',
  ],
  enableHover = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    if (transformStr === 'none') return 'rotate(0deg)';
    return `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/;
    const match = baseTransform.match(translateRegex);

    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = match[2] ?? '0';
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px, ${currentY}px)`);
    }

    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: `${getNoRotationTransform(baseTransform)} scale(1.06)`,
          duration: 0.42,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -78 : 78;
        const distance = Math.abs(hoveredIdx - i);

        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.42,
          ease: 'back.out(1.4)',
          delay: distance * 0.04,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.42,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <div
          key={src}
          className={`card card-${idx}`}
          style={{ transform: transformStyles[idx] ?? 'none' }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="image" src={src} alt="" />
        </div>
      ))}
    </div>
  );
}
