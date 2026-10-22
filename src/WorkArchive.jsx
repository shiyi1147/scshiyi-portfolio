import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import { resumeDownloadUrl, resumeDownloadName } from './resumeAsset';
import InternshipAvailability from './InternshipAvailability';
import './WorkArchive.css';

const categories = [['all','全部'],['interface','智能表盘'],['motion','AI 影像'],['illustration','系列插画'],['brand','品牌设计'],['web','网页设计'],['spatial','3D 建模'],['wallpaper','壁纸作品']];
const pad = value => String(value).padStart(2,'0');

export default function WorkArchive({ projects, visible, featuredIds, category, counts, onCategoryChange, hidden, onOpen }) {
  const pane = useRef(null);
  useEffect(() => { if (pane.current) pane.current.scrollTop = 0; }, [category]);
  return <section id="work-overview" hidden={hidden} ref={pane} className="workArchive" aria-label="作品总览">
    <div className="archiveHeading">
      <div><p className="archiveEyebrow">A COLLECTION OF VISUAL EXPLORATIONS</p><h1>作品总览</h1><p className="archiveIntro">石宜 / AI 视觉与交互设计</p><InternshipAvailability /></div>
      <div className="archiveTotal"><strong>{pad(projects.length)}</strong><span>项目与系列 / 持续探索中</span></div>
    </div>
    <div className="archiveToolbar">
      <div className="archiveFilters" aria-label="总览作品分类">{categories.map(([id,label]) => <button key={id} type="button" aria-pressed={category===id} onClick={()=>onCategoryChange(id)}>{label}<span>{pad(counts[id])}</span></button>)}</div>
      <label className="archiveMobileSelect"><span>作品分类</span><select aria-label="总览作品分类" value={category} onChange={event=>onCategoryChange(event.target.value)}>{categories.map(([id,label])=><option key={id} value={id}>{label} · {counts[id]}</option>)}</select><ChevronDown size={15} aria-hidden="true"/></label>
      <div className="archiveResultCount" role="status">{pad(visible.length)} <span>个项目与系列</span></div>
    </div>
    <div className="archiveGrid">{visible.map((project,index)=><button type="button" className="archiveCard" key={project.id} data-project={project.id} data-group={project.group} onClick={()=>onOpen(project.id)} aria-label={`查看${project.title}`} aria-description={[project.contextLabel,project.achievementLabel,project.watchfaceCount?`${project.watchfaceCount} 款表盘`:null].filter(Boolean).join('，')||undefined} style={{'--card-accent':project.accent}}>
      <div className="archiveCardImage"><img loading={index<3?'eager':'lazy'} decoding="async" src={project.preview||project.cover} alt="" width="640" height="400"/>{featuredIds.has(project.id)&&<span className="archiveFeatured">精选</span>}{project.watchfaceCount>0&&<span className="archiveCollectionCount">{project.watchfaceCount} 款表盘</span>}<span className="archiveCardExplore">查看项目 <ArrowUpRight size={19} aria-hidden="true"/></span></div>
      <div className="archiveCardCaption"><div><h3>{project.name||project.title}</h3><span>{categories.find(([id])=>id===project.group)?.[1]}<i>/</i>{pad(projects.findIndex(item=>item.id===project.id)+1)}</span>{(project.achievementLabel||project.contextLabel)&&<span className={`archiveProjectContext${project.achievementLabel?' is-achievement':''}`}>{project.achievementLabel||project.contextLabel}</span>}</div><ArrowUpRight size={19} aria-hidden="true"/></div>
    </button>)}</div>
    <div className="archiveEnd">
      <span>SHI YI / DESIGN & EXPLORATION</span>
      <div className="archiveEndActions">
        <a className="archiveResumeDownload" href={resumeDownloadUrl} download={resumeDownloadName}>下载简历 PDF <ArrowDown size={15} aria-hidden="true"/></a>
        <a href="#contact">聊聊新的可能 <ArrowUpRight size={15} aria-hidden="true"/></a>
      </div>
      <span className="archiveEndNote"><ArrowDown size={12} aria-hidden="true"/> 已展示当前分类全部项目</span>
    </div>
  </section>;
}
