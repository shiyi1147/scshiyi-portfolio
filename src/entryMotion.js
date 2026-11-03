// Resume the existing muted preview; retain its decoder, buffered data and time.
export default function createEntryMotion(entry,onBlocked) {
  const videos=entry.videos || [],pending=new Map();
  let running=false,disposed=false,wanted=false;
  const cancel=()=>{pending.forEach((request,video)=>{if(request.video)video.cancelVideoFrameCallback?.(request.id);else cancelAnimationFrame(request.id);});pending.clear();};
  const paintVisible=video=>entry.media.forEach(item=>{
    if(item.source!==video||!item.canvas.isConnected)return;
    const flight=item.canvas.closest('.screenFlight');
    if(!flight||flight.style.display!=='none')item.paint();
  });
  const next=video=>{
    if(!running||disposed)return;
    const tick=()=>{pending.delete(video);if(!running||disposed)return;paintVisible(video);next(video);};
    if(video.requestVideoFrameCallback)pending.set(video,{video:true,id:video.requestVideoFrameCallback(tick)});
    else pending.set(video,{video:false,id:requestAnimationFrame(tick)});
  };
  const stop=()=>{running=false;cancel();entry.paintAll();videos.forEach(video=>video.pause());};
  const pause=()=>{wanted=false;stop();};
  const play=()=>{
    if(disposed)return;wanted=true;
    if(document.hidden||running)return;
    running=true;
    videos.forEach(video=>{video.play().then(()=>{if(!running||disposed)return;if(!pending.has(video))next(video);}).catch(()=>{if(running){pause();onBlocked?.();}});});
  };
  const visibility=()=>{if(document.hidden)stop();else if(wanted)play();};
  document.addEventListener('visibilitychange',visibility);
  return {play,pause,dispose:()=>{
    if(disposed)return;pause();disposed=true;document.removeEventListener('visibilitychange',visibility);
    videos.forEach(video=>{const root=video.closest('.immersiveWork');if(root?.dataset.motion==='active'&&!document.hidden)video.play().catch(()=>{});});
  }};
}
