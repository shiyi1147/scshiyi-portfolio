import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './SpatialStage.css';
import WatchfaceCarousel from './WatchfaceCarousel';
import WallpaperCarousel from './WallpaperCarousel';
import landingMedia from './landingMedia.json';
import LandingImage from './LandingImage';
import filmPreview from './filmPreviewMedia.json';

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
export function stageMedia(project,variant=innerWidth<=760?'mobile':'desktop') {
  if (project.id === 'archive-shanhai') return { bobo:false, src:asset(landingMedia.shanhai[innerWidth <= 760 ? 'mobile' : 'desktop'].src.replace(/^assets\//,'')) };
  if (project.id === 'archive-vcg') return { bobo:false, src:project.items[0]?.thumb || project.cover };
  const bobo = project.id === 'archive-bobo' || project.id === 'watchface';
  const film = project.items.find(item => item.video);
  const preview=project.id==='archive-film'&&film?.video?.endsWith(filmPreview.source) ? filmPreview[variant] : null;
  return { bobo, src: bobo ? asset('posters/bobo/home-landscape.webp') : (film?.src || project.cover), video: preview?asset(preview.src.replace(/^assets\//,'')):film?.video };
}

// One image-coordinate system keeps the photographed bezel and live content aligned.
const PLATE = { width:1672, height:941 };
const SCREEN = [[542,284],[1174,282],[1177,600],[538,600]];
function screenTransform() {
  const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=SCREEN;
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3;
  const dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3;
  const det=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/det,h=(dx1*dy3-dx3*dy1)/det;
  const a=x1-x0+g*x1,b=x3-x0+h*x3,d=y1-y0+g*y1,e=y3-y0+h*y3;
  return `matrix3d(${[a/640,d/640,0,g/640,b/320,e/320,0,h/320,0,0,1,0,x0,y0,0,1].join(',')})`;
}
const SCREEN_TRANSFORM=screenTransform();
function plateLayout(width,height) {
  const portrait=width/height<.95;
  const cover=Math.max(width/PLATE.width,height/PLATE.height);
  const scale=portrait?Math.min(cover,(width-36)/640):cover;
  return { scale, x:portrait?width/2-856*scale:(width-PLATE.width*scale)/2,
    y:portrait?Math.max(height*.43-442*scale,198-284*scale):(height-PLATE.height*scale)/2, portrait };
}

function ScreenMedia({ project, playing }) {
  const [variant]=useState(()=>innerWidth<=760?'mobile':'desktop');
  const media=stageMedia(project,variant), videoRef=useRef(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const video=videoRef.current;if(!video)return;
    const sync=()=>{if(playing&&!document.hidden){video.play().catch(()=>{});}else video.pause();};
    sync();document.addEventListener('visibilitychange',sync);
    return()=>{document.removeEventListener('visibilitychange',sync);video.pause();};
  },[playing,media.video]);
  useEffect(()=>{const video=videoRef.current;return()=>{if(video){video.pause();video.removeAttribute('src');video.load();}};},[media.video]);
  if(project.id === 'archive-vcg') return <WallpaperCarousel project={project} playing={playing}/>;
  if(['archive-watchfaces','archive-solar','archive-solar-life','archive-solar-nature','archive-summer-3d'].includes(project.id)) return <WatchfaceCarousel project={project} playing={playing}/>;
  if(media.bobo)return <div className="spatialBobo"><img className="spatialBoboAtmosphere" src={asset('posters/bobo/atmosphere-landscape.webp')} alt=""/><img className="spatialBoboMain" src={asset('posters/bobo/watchface-original.png')} alt="心情啵啵方形表盘"/><img className="spatialBoboRound" src={asset('posters/bobo/watchface-round-original.png')} alt="心情啵啵圆形表盘"/></div>;
  return <>{media.video&&!failed?<video ref={videoRef} src={media.video} poster={media.src} muted loop playsInline preload="metadata" aria-label={`${project.name}静音预览`} onError={()=>setFailed(true)}/>:<LandingImage src={media.src} alt={`${project.name}作品预览`} decoding="async" fetchPriority="high" draggable="false"/>}</>;
}

export default function SpatialStage({ project, paused, cameraPaused=paused, onOpen, screenRef, instant=false, intent }) {
  const [layers,setLayers]=useState([project]);
  const host=useRef(null);
  const mediaMounted=useRef(false);
  const [layout,setLayout]=useState(()=>plateLayout(innerWidth,innerHeight));
  const depth=!layout.portrait;
  const scene=asset(landingMedia.scene[layout.portrait ? 'mobile' : 'desktop'].src.replace(/^assets\//,''));
  const filterId=`cyber-despill-${useId().replace(/[^a-zA-Z0-9_-]/g,'')}`;
  useLayoutEffect(()=>{
    const observer=new ResizeObserver(([entry])=>{const {width,height}=entry.contentRect;if(width&&height)setLayout(plateLayout(width,height));});
    observer.observe(host.current);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{if(project.poster){const image=new Image();image.src=window.matchMedia('(max-aspect-ratio: 4/5)').matches?project.poster.portrait:project.poster.landscape;}},[project]);
  useLayoutEffect(()=>{
    setLayers(old=>old.at(-1).id===project.id?old:[...old.filter(item=>item.id!==project.id).slice(-2),project]);
    const timer=setTimeout(()=>setLayers([project]),720);return()=>clearTimeout(timer);
  },[project]);
  useLayoutEffect(()=>{
    const nodes=[...host.current.querySelectorAll('.spatialMedia')];
    nodes.forEach(node=>{
      const current=node.dataset.project===project.id;
      if(!node.dataset.transitionReady){
        gsap.set(node,{opacity:mediaMounted.current?0:1,filter:mediaMounted.current?'blur(2px)':'blur(0px)',scale:mediaMounted.current?1.012:1});
        node.dataset.transitionReady='true';
      }
      gsap.to(node,{opacity:current?1:0,filter:current?'blur(0px)':'blur(2px)',scale:current?1:1.006,duration:paused||instant?0:current?.5:.4,ease:'power2.inOut',overwrite:true});
    });
    mediaMounted.current=true;
    return()=>gsap.killTweensOf(nodes);
  },[layers,project.id,paused,instant]);
  return <div ref={host} className={`spatialStage cyberStage ${paused?'is-paused':''} ${cameraPaused?'is-camera-paused':''} ${depth?'has-depth':'is-portrait'}`} style={{'--scene-tint':project.accent}}>
    <svg className="cyberFilterDefinitions" aria-hidden="true" width="0" height="0"><defs>
      <clipPath id={`${filterId}-room`} clipPathUnits="objectBoundingBox"><path clipRule="evenodd" d="M0 0H1V1H0Z M.32 .286V.665H.715V.286Z"/></clipPath>
      <clipPath id={`${filterId}-frame`} clipPathUnits="objectBoundingBox"><path d="M.31 .276H.723V.643L.742 .682H.292L.31 .643Z"/></clipPath>
      <filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 1.7 -0.7 0 -0.04" result="greenMask"/>
        <feComponentTransfer in="greenMask" result="greenSelect"><feFuncA type="linear" slope="4"/></feComponentTransfer>
        <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="neutral"/>
        <feComposite in="neutral" in2="greenSelect" operator="in" result="neutralGreen"/>
        <feComposite in="SourceGraphic" in2="greenSelect" operator="out" result="originalRest"/>
        <feMerge><feMergeNode in="originalRest"/><feMergeNode in="neutralGreen"/></feMerge>
      </filter>
      <filter id={`${filterId}-static`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="1" seed="8"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncR type="linear" slope="3.8" intercept="-1.4"/>
          <feFuncG type="linear" slope="3.8" intercept="-1.4"/>
          <feFuncB type="linear" slope="3.8" intercept="-1.4"/>
        </feComponentTransfer>
      </filter>
    </defs></svg>
    <LandingImage className="cyberAmbientBackdrop" src={scene} decoding="async" alt="" aria-hidden="true" style={{filter:`url(#${filterId}) blur(16px) brightness(.36)`}}/>
    <div className="cyberRig">
      <div className="cyberWorld" data-scale={layout.scale} style={{width:PLATE.width,height:PLATE.height,transform:`translate(${layout.x}px,${layout.y}px) scale(${layout.scale})`}}>
        <div className="cyberDepthLayer cyberDistant"><LandingImage className="cyberPlate cyberRoomPlate" src={scene} decoding="async" alt="" aria-hidden="true" style={{filter:`url(#${filterId})`,clipPath:depth?`url(#${filterId}-room)`:undefined}}/></div>
        <div className="cyberFloorTint" aria-hidden="true"/>
        <div className="cyberSurroundMask" aria-hidden="true"/>
        <div className="cyberDepthLayer cyberScreenAssembly">
        {depth&&<LandingImage className="cyberPlate cyberFramePlate" src={scene} decoding="async" alt="" aria-hidden="true" style={{filter:`url(#${filterId})`,clipPath:`url(#${filterId}-frame)`}}/>}
        {depth&&<div className="cyberSurroundMask" aria-hidden="true" style={{clipPath:`url(#${filterId}-frame)`}}/>}
        <div className="spatialScreenAnchor"><button type="button" className="spatialScreen" ref={screenRef} style={{transform:SCREEN_TRANSFORM}} onPointerEnter={intent?.enter} onPointerLeave={intent?.leave} onPointerDown={intent?.down} onFocus={intent?.focus} onClick={onOpen} aria-label={`进入${project.title}展厅`}>
          <div className="spatialLiveMedia">{layers.map(layer=><div key={layer.id} data-project={layer.id} className={`spatialMedia ${layer.id===project.id?'is-current':'is-previous'}`}><ScreenMedia project={layer} playing={!paused&&layer.id===project.id}/></div>)}</div>
          <div className="spatialBootSignal" aria-hidden="true">
            <svg className="spatialBootNoise" width="640" height="320" viewBox="0 0 640 320" preserveAspectRatio="none"><rect width="640" height="320" filter={`url(#${filterId}-static)`}/></svg>
            <span className="spatialBootScanlines"/>
          </div>
          <span className="spatialScreenEdge" aria-hidden="true"/>
        </button></div>
        </div>
        {depth&&<div className="cyberDepthLayer cyberNear"><LandingImage className="cyberPlate cyberNearPlate" src={scene} decoding="async" alt="" aria-hidden="true" style={{filter:`url(#${filterId}) brightness(.35)`}}/></div>}
      </div>
    </div>
    <div className="spatialVignette" aria-hidden="true"/>
  </div>;
}
