// Capture the current DOM scene before the exhibition pauses it. No new media.
export default function captureScreenEntry(screen,{fallbackImage,motionAllowed=true}={}) {
  const source = screen?.closest('.immersiveWork');
  const rect = screen?.getBoundingClientRect();
  if (!source || !rect?.width || !rect.height) return null;
  const portalWidth=screen.clientWidth, portalHeight=screen.clientHeight;
  const quad=[[0,0],[portalWidth,0],[portalWidth,portalHeight],[0,portalHeight]].map(([left,top])=>{
    const marker=document.createElement('span');
    marker.style.cssText=`position:absolute;left:${left}px;top:${top}px;width:0;height:0;pointer-events:none`;
    screen.append(marker);const point=marker.getBoundingClientRect();marker.remove();return [point.left,point.top];
  });
  const media=[];let released=false;
  const snapshot = (node,role) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return node.cloneNode(false);
    if (node.matches('.workArchive,.immersiveCursor')) return null;
    if (node.matches('img,video')) {
      const canvas = document.createElement('canvas');
      canvas.className = node.className;
      canvas.style.cssText = node.style.cssText;
      canvas.width = node.naturalWidth || node.videoWidth || 640;
      canvas.height = node.naturalHeight || node.videoHeight || 320;
      if(canvas.style.display==='none')canvas.style.display='block';
      const paint=()=>{
        if(released)return;
        const ready=node.naturalWidth || node.readyState>=2;
        const image=ready ? node : node.closest('.spatialMedia.is-current') ? fallbackImage : null;
        if(!image?.naturalWidth && !(image?.readyState>=2))return;
        const width=image.naturalWidth || image.videoWidth,height=image.naturalHeight || image.videoHeight;
        if(canvas.width!==width)canvas.width=width;if(canvas.height!==height)canvas.height=height;
        try{canvas.getContext('2d')?.drawImage(image,0,0,width,height);}catch{ /* Keep the existing frame. */ }
      };
      paint();
      const event=node.matches('video')?'loadeddata':'load';
      node.addEventListener(event,paint);
      media.push({source:node,canvas,role,video:node.matches('video'),paint,detach:()=>node.removeEventListener(event,paint)});
      return canvas;
    }
    const copy = node.cloneNode(false);
    node.childNodes.forEach(child => { const captured = snapshot(child,role); if (captured) copy.append(captured); });
    return copy;
  };
  const scene = snapshot(source,'scene');
  const surface=snapshot(screen,'surface');
  scene.removeAttribute('id');
  scene.removeAttribute('hidden');
  scene.setAttribute('aria-hidden', 'true');
  scene.inert = true;
  const frozen = '.cyberRig,.cyberDepthLayer,.spatialMedia,.watchfaceCarouselImage,.watchfaceCarouselTrack span,.spatialBoboMain,.spatialBoboRound';
  const originals = source.querySelectorAll(frozen), copies = scene.querySelectorAll(frozen);
  originals.forEach((node, index) => {
    const style = getComputedStyle(node), copy = copies[index];
    if (copy) Object.assign(copy.style, { transform: style.transform, translate: style.translate, opacity: style.opacity });
  });
  // Avoid duplicate SVG filter IDs while both scenes are mounted.
  const ids = new Map();
  scene.querySelectorAll('[id]').forEach(node => { const id = node.id; ids.set(id, 'flight-' + id); node.id = ids.get(id); });
  scene.querySelectorAll('[style],[filter]').forEach(node => {
    for (const attribute of ['style', 'filter']) {
      const value = node.getAttribute(attribute);
      if (value) node.setAttribute(attribute, value.replace(/url\(#([^)]*)\)/g, (match, id) => `url(#${ids.get(id) || id})`));
    }
  });
  const videos=[...new Set(media.filter(item=>item.video&&item.source.closest('.spatialMedia.is-current')).map(item=>item.source))];
  const entry={ kind:'screen', scene, surface, media, videos, motionAllowed, quad, portalWidth, portalHeight, listScroll:source.querySelector('.immersiveList')?.scrollTop || 0, left:rect.left, top:rect.top, width:rect.width, height:rect.height, viewportWidth:innerWidth, viewportHeight:innerHeight };
  entry.paintAll=()=>media.forEach(item=>item.paint());
  entry.release=()=>{entry.pauseMotion?.();released=true;media.forEach(item=>item.detach());};
  return entry;
}
