import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './SpatialStage.css';
import WatchfaceCarousel from './WatchfaceCarousel';

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
export function stageMedia(project) {
  const bobo = project.id === 'archive-bobo' || project.id === 'watchface';
  const film = project.items.find(item => item.video);
  return { bobo, src: bobo ? asset('posters/bobo/home-landscape.webp') : (film?.src || project.cover), video: film?.video };
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
    y:portrait?height*.43-442*scale:(height-PLATE.height*scale)/2, portrait };
}

function ScreenMedia({ project, playing }) {
  const media=stageMedia(project), videoRef=useRef(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const video=videoRef.current;if(!video)return;
    const sync=()=>{if(playing&&!document.hidden){video.play().catch(()=>{});}else video.pause();};
    sync();document.addEventListener('visibilitychange',sync);
    return()=>{document.removeEventListener('visibilitychange',sync);video.pause();};
  },[playing,media.video]);
  if(['archive-watchfaces','archive-solar','archive-solar-life','archive-solar-nature','archive-summer-3d'].includes(project.id)) return <WatchfaceCarousel project={project} playing={playing}/>;
  if(media.bobo)return <div className="spatialBobo"><img className="spatialBoboAtmosphere" src={asset('posters/bobo/atmosphere-landscape.webp')} alt=""/><img className="spatialBoboMain" src={asset('posters/bobo/watchface-original.png')} alt="心情啵啵方形表盘"/><img className="spatialBoboRound" src={asset('posters/bobo/watchface-round-original.png')} alt="心情啵啵圆形表盘"/></div>;
  return <>{media.video&&!failed?<video ref={videoRef} src={media.video} poster={media.src} muted loop playsInline preload="metadata" aria-label={`${project.name}静音预览`} onError={()=>setFailed(true)}/>:<img src={media.src} alt={`${project.name}作品预览`} draggable="false"/>}</>;
}

export default function SpatialStage({ project, paused, onOpen, screenRef }) {
  const [layers,setLayers]=useState([project]);
  const host=useRef(null);
  const mediaMounted=useRef(false);
  const [layout,setLayout]=useState(()=>plateLayout(innerWidth,innerHeight));
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
        gsap.set(node,{opacity:mediaMounted.current?0:1,filter:mediaMounted.current?'blur(5px)':'blur(0px)',scale:mediaMounted.current?1.015:1});
        node.dataset.transitionReady='true';
      }
      gsap.to(node,{opacity:current?1:0,filter:current?'blur(0px)':'blur(3px)',scale:current?1:1.008,duration:paused?0:current?.6:.5,ease:'power2.inOut',overwrite:true});
    });
    mediaMounted.current=true;
    return()=>gsap.killTweensOf(nodes);
  },[layers,project.id,paused]);
  return <div ref={host} className={`spatialStage cyberStage ${paused?'is-paused':''} ${layout.portrait?'is-portrait':''}`} style={{'--scene-tint':project.accent}}>
    <svg className="cyberFilterDefinitions" aria-hidden="true" width="0" height="0"><defs>
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
    <img className="cyberAmbientBackdrop" src={asset('scene/cyber-courtyard.webp')} alt="" aria-hidden="true" style={{filter:`url(#${filterId}) blur(16px) brightness(.36)`}}/>
    <div className="cyberRig">
      <div className="cyberWorld" data-scale={layout.scale} style={{width:PLATE.width,height:PLATE.height,transform:`translate(${layout.x}px,${layout.y}px) scale(${layout.scale})`}}>
        <img className="cyberPlate" src={asset('scene/cyber-courtyard.webp')} alt="" aria-hidden="true" style={{filter:`url(#${filterId})`}}/>
        <div className="cyberFloorTint" aria-hidden="true"/>
        <div className="cyberSurroundMask" aria-hidden="true"/>
        <div className="spatialScreenAnchor"><button type="button" className="spatialScreen" ref={screenRef} style={{transform:SCREEN_TRANSFORM}} onClick={onOpen} aria-label={`进入${project.title}展厅`}>
          <div className="spatialLiveMedia">{layers.map(layer=><div key={layer.id} data-project={layer.id} className={`spatialMedia ${layer.id===project.id?'is-current':'is-previous'}`}><ScreenMedia project={layer} playing={!paused&&layer.id===project.id}/></div>)}</div>
          <div className="spatialBootSignal" aria-hidden="true">
            <svg className="spatialBootNoise" width="640" height="320" viewBox="0 0 640 320" preserveAspectRatio="none"><rect width="640" height="320" filter={`url(#${filterId}-static)`}/></svg>
            <span className="spatialBootScanlines"/>
          </div>
          <span className="spatialScreenEdge" aria-hidden="true"/>
        </button></div>
      </div>
    </div>
    <div className="spatialVignette" aria-hidden="true"/>
  </div>;
}
