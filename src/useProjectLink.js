import {useCallback,useEffect,useState} from 'react';
const pageHash=()=>location.hash.slice(1).split('?')[0] || 'top';
export default function useProjectLink(validIds,onHistory) {
 const read=()=>{const id=new URLSearchParams(location.hash.split('?')[1]||'').get('work');return validIds.has(id)?id:null;};
 const [id,setId]=useState(read);
 const sync=useCallback(()=>{setId(read());onHistory();},[validIds,onHistory]);
 useEffect(()=>{window.addEventListener('popstate',sync);window.addEventListener('hashchange',sync);return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync);};},[sync]);
 const select=next=>{
  if(next===null){
   if(history.state?.portfolioProject){history.back();return;}
   history.replaceState(null,'','#'+pageHash());setId(null);return;
  }
  if(!validIds.has(next))return;
  const url='#'+pageHash()+'?work='+encodeURIComponent(next);
  if(read())history.replaceState(history.state,'',url);
  else history.pushState({...history.state,portfolioProject:true},'',url);
  setId(next);
 };
 return [id,select,sync];
}
