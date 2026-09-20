import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
export default function RefractiveBackdrop({ src: landscapeSrc, mobileSrc, reduced }) {
  const [portrait, setPortrait] = useState(() => window.matchMedia('(max-aspect-ratio: 4/5)').matches);
  useEffect(() => {
    if (!mobileSrc) return;
    const query = window.matchMedia('(max-aspect-ratio: 4/5)');
    const update = () => setPortrait(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [mobileSrc]);
  const src = portrait && mobileSrc ? mobileSrc : landscapeSrc;
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
    camera.position.z = 1;
    const uniforms = {
      uFrom: { value: null }, uTo: { value: null }, uProgress: { value: 1 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uFromSize: { value: new THREE.Vector2(1, 1) }, uToSize: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(.5, .5) }, uTime: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({ uniforms,
      vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}',
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uFrom, uTo;
        uniform float uProgress, uTime;
        uniform vec2 uSize, uFromSize, uToSize, uMouse;
        vec2 cover(vec2 uv, vec2 size) {
          float screenAspect=uSize.x/uSize.y, imageAspect=size.x/size.y;
          vec2 scale=vec2(min(screenAspect/imageAspect,1.),min(imageAspect/screenAspect,1.));
          return (uv-.5)*scale+.5;
        }
        void main(){
          vec2 uv=(vUv-.5)*.94+.5;
          vec2 delta=vUv-uMouse;
          float lens=exp(-dot(delta,delta)*9.);
          uv+=delta*lens*.018+(uMouse-.5)*.018;
          float wave=sin(vUv.y*8.+uTime*.18)*sin(uProgress*3.14159265)*.055;
          vec2 drift=vec2(wave,cos(vUv.x*6.+uTime*.12)*.0018);
          vec4 a=texture2D(uFrom,cover(uv+drift*uProgress,uFromSize));
          vec4 b=texture2D(uTo,cover(uv-drift*(1.-uProgress),uToSize));
          float mixAmount=smoothstep(0.,1.,uProgress);
          vec3 col=mix(a.rgb,b.rgb,mixAmount);
          float gray=dot(col,vec3(.299,.587,.114));
          col=mix(vec3(gray),col,.58);
          gl_FragColor=vec4(col,1.);
          #include <colorspace_fragment>
        }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));
    mount.appendChild(renderer.domElement);
    const cache = new Map();
    const loader = new THREE.TextureLoader();
    let alive = true, request = 0, frame = 0, visible = true, hasTexture = false, current = null;
    const target = new THREE.Vector2(.5, .5);
    const start = performance.now();
    const resize = () => { const r=mount.getBoundingClientRect(); renderer.setSize(r.width,r.height); uniforms.uSize.value.set(r.width,r.height); };
    const onPointer = e => { const r=mount.getBoundingClientRect(); target.set(e.clientX/r.width,1-(e.clientY-r.top)/r.height); };
    const reset = () => target.set(.5,.5);
    const draw = () => {
      frame=0;
      if (!alive || !visible || document.hidden) return;
      uniforms.uMouse.value.lerp(target,.055);
      uniforms.uTime.value=(performance.now()-start)/1000;
      if (hasTexture) renderer.render(scene,camera);
      frame=requestAnimationFrame(draw);
    };
    const resume = () => { if (!frame && alive && visible && !document.hidden) frame=requestAnimationFrame(draw); };
    const observer = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume();});
    observer.observe(mount);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(mount);
    window.addEventListener('pointermove',onPointer,{passive:true});
    document.addEventListener('pointerleave',reset);
    document.addEventListener('visibilitychange',resume);
    const contextLost = e => { e.preventDefault(); visible=false; setReady(false); };
    renderer.domElement.addEventListener('webglcontextlost',contextLost);
    engineRef.current = { async select(url) {
      const id=++request;
      try {
        if (!cache.has(url)) cache.set(url,loader.loadAsync(url).then(texture=>{
          if (!alive) {texture.dispose();return null;}
          texture.colorSpace=THREE.SRGBColorSpace;
          texture.minFilter=THREE.LinearFilter;
          texture.generateMipmaps=false;
          return texture;
        }));
        const texture=await cache.get(url);
        if (!alive || id!==request || !texture) return;
        gsap.killTweensOf(uniforms.uProgress);
        uniforms.uFrom.value=current || texture;
        uniforms.uFromSize.value.set((current || texture).image.width,(current || texture).image.height);
        uniforms.uTo.value=texture;
        uniforms.uToSize.value.set(texture.image.width,texture.image.height);
        uniforms.uProgress.value=current ? 0 : 1;
        current=texture; hasTexture=true;
        if (uniforms.uProgress.value===0) gsap.to(uniforms.uProgress,{value:1,duration:1.15,ease:'power2.inOut'});
        renderer.render(scene,camera); setReady(true); resume();
      } catch { if (alive && id===request) setReady(false); }
    }};
    resize(); resume();
    return () => {
      alive=false; engineRef.current=null; cancelAnimationFrame(frame);
      gsap.killTweensOf(uniforms.uProgress);
      observer.disconnect(); resizeObserver.disconnect();
      window.removeEventListener('pointermove',onPointer);
      document.removeEventListener('pointerleave',reset);
      document.removeEventListener('visibilitychange',resume);
      renderer.domElement.removeEventListener('webglcontextlost',contextLost);
      cache.forEach(p=>p.then(t=>t?.dispose()).catch(()=>{}));
      geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();
      setReady(false);
    };
  }, [reduced]);
  useEffect(() => { engineRef.current?.select(src); }, [src, reduced]);
  return <div className="immersiveBackdrop" aria-hidden="true">
    <img className="immersiveFallback" src={src} alt="" fetchPriority="high" />
    <div ref={mountRef} className={`immersiveCanvas ${ready && !reduced ? 'is-ready' : ''}`} />
    <div className="immersiveShade" />
  </div>;
}

