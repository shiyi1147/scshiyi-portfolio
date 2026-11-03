let pending;

export function loadProjectExhibition() {
  if (!pending) pending=import('./ProjectExhibition').catch(error=>{pending=null;throw error;});
  return pending;
}

export function warmProjectExhibition() {
  if (navigator.connection?.saveData) return;
  loadProjectExhibition().catch(()=>{});
}
