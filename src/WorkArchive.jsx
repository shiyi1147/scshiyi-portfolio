import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import './WorkArchive.css';

const categories = [['all','全部'],['interface','智能表盘'],['motion','AI 影像'],['illustration','系列插画'],['brand','品牌设计'],['web','网页设计'],['spatial','3D 建模'],['wallpaper','壁纸作品']];
export default function WorkArchive({ projects, hidden, onOpen }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const counts = useMemo(() => Object.fromEntries(categories.map(([id]) => [id, id === 'all' ? projects.length : projects.filter(p => p.group === id).length])), [projects]);
  const visible = useMemo(() => projects.filter(p => (category === 'all' || p.group === category) && `${p.title} ${p.category} ${p.eyebrow}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [projects, category, query]);
  const reset = () => { setCategory('all'); setQuery(''); };
  return <section id="archive" hidden={hidden} className="workArchive" aria-label="全部作品库">
    <div className="archiveHeading">
      <div><p className="archiveEyebrow">SHI YI / PROJECT ARCHIVE</p><h1>更多想象，<br/><span>在这里展开。</span></h1><p className="archiveIntro">从智能表盘到品牌、插画与动态影像，<br className="archiveDesktopBreak"/>探索完整的项目与系列目录。</p></div>
      <div className="archiveTotal"><strong>{String(projects.length).padStart(2,'0')}</strong><span>个项目与系列</span><a href="#top">返回 5 组精选 <ArrowUpRight size={14}/></a></div>
    </div>
    <div className="archiveToolbar">
      <div className="archiveFilters" aria-label="全部作品分类">{categories.map(([id,label]) => <button key={id} type="button" aria-pressed={category===id} onClick={() => setCategory(id)}>{label}<span>{counts[id]}</span></button>)}</div>
      <div className="archiveSearch"><Search size={16} aria-hidden="true"/><input type="search" aria-label="搜索作品" placeholder="搜索项目名称" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button type="button" aria-label="清空搜索" onClick={()=>setQuery('')}><X size={15}/></button>}</div>
    </div>
    <div className="archiveResults"><p role="status">{category==='all' ? '全部作品' : categories.find(([id])=>id===category)[1]} <span>/ {visible.length} 个项目与系列</span></p><span>同一系列内的画面合并展示</span></div>
    <div className="archiveGrid">{visible.map(p => <button type="button" className="archiveCard" key={p.id} onClick={()=>onOpen(p.id,visible.map(item=>item.id))} aria-label={`查看${p.title}`} style={{'--card-accent':p.accent}}>
      <div className="archiveCardImage"><img loading="lazy" decoding="async" src={p.preview || p.cover} alt=""/><span className="archiveCardNumber">{p.number}</span><span className="archiveCardExplore">探索项目 <ArrowUpRight size={16}/></span><span className="archiveCardCount">{p.items.filter(i=>i.video).length ? `${p.items.filter(i=>i.video).length} 部影像` : `${p.items.length} 幅预览`}</span></div>
      <div className="archiveCardCaption"><div><span>{categories.find(([id])=>id===p.group)?.[1]}</span><h2>{p.title}</h2></div><ArrowUpRight size={19}/></div>
    </button>)}</div>
    {visible.length===0 && <div className="archiveEmpty"><h2>暂时没有匹配的作品</h2><p>试试其他名称，或回到完整目录。</p><button type="button" onClick={reset}>查看全部作品 <ArrowUpRight size={15}/></button></div>}
    <div className="archiveEnd"><span>作品持续生长，探索不止于此。</span><a href="#contact">聊聊新的可能 <ArrowUpRight size={15}/></a></div>
  </section>;
}
