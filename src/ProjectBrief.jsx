import React, { useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import './ProjectBrief.css';
import WallpaperComparison from './WallpaperComparison';

export default function ProjectBrief({ project, onBrowse }) {
  const brief = project.brief;
  const comparisonRef = useRef(null);
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const comparisons = brief.comparisons || [];
  const comparison = comparisons[comparisonIndex] || comparisons[0];
  const motionIndex = project.items.findIndex(item => item.video);
  const motionCount = project.items.filter(item => item.video).length;
  return <section className="exhibitionBrief" aria-label="实习项目概览" tabIndex={0}>
    <header className="projectBriefHeading"><p>{brief.role}<span>{brief.period}</span></p><h3>{brief.headline}</h3><p className="projectBriefIntro">{brief.intro}</p></header>
    <div className="projectBriefColumns">
      <div>
        <div className="projectBriefMetrics"><p>{brief.metricsLabel}</p><div>{brief.metrics.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
        <h4 className="projectBriefWorkflowTitle">我的工作与制作流程</h4>
        <ol className="projectBriefWorkflow">{brief.workflow.map(([title,description],index)=><li key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h4>{title}</h4><p>{description}</p></div></li>)}</ol>
      </div>
      <aside className="projectBriefSelection">{brief.previewImages?.length ? <div className="projectBriefSelectionPreview">{brief.previewImages.map(item=><img key={item.src} src={item.src} alt={item.label}/>)}</div> : <img src={project.cover} alt="视觉中国实习项目静态壁纸选览"/>}<p>{brief.selectionNote}</p><div className="projectBriefActions"><button type="button" onClick={()=>onBrowse(0)}>浏览壁纸作品 <ArrowUpRight size={16} aria-hidden="true"/></button>{motionIndex>=0&&<button className="projectBriefMotion" type="button" onClick={()=>onBrowse(motionIndex)}><Play size={14} aria-hidden="true"/>观看动态壁纸<span>{motionCount} 条</span></button>}{comparison&&<button type="button" onClick={()=>comparisonRef.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>查看优化示意 <ArrowUpRight size={16} aria-hidden="true"/></button>}</div></aside>
    </div>
    {comparison&&<section className="projectBriefComparison" ref={comparisonRef} aria-labelledby="project-comparison-title">
      <header><div><p>VISUAL REFINEMENT / {String(comparisons.length).padStart(2,'0')} STUDIES</p><h3 id="project-comparison-title">从生成到成品</h3></div></header>
      <div className="projectBriefComparisonPicker" role="group" aria-label="选择优化示意">{comparisons.map((item,index)=><button key={item.id} type="button" aria-pressed={comparisonIndex===index} aria-controls="project-comparison-panel" aria-label={`查看${item.label}优化示意`} onClick={()=>setComparisonIndex(index)}><img src={item.thumb} alt="" loading="lazy" width="36" height="64"/><span><b>{item.label}</b><small>{item.focus}</small></span></button>)}</div>
      <p className="projectBriefComparisonCase" aria-live="polite">{String(comparisonIndex+1).padStart(2,'0')} / {String(comparisons.length).padStart(2,'0')}<span>{comparison.label} · {comparison.focus}</span></p>
      <div className="projectBriefComparisonBody" id="project-comparison-panel" role="region" aria-label={`${comparison.label}优化示意`}>
        <WallpaperComparison key={comparison.id} comparison={comparison}/>
        <aside className="projectBriefComparisonNotes"><h4>示意优化方向</h4><ol>{comparison.notes.map(([title,description],index)=><li key={title}><h5><span>{String(index+1).padStart(2,'0')}</span>{title}</h5><p>{description}</p></li>)}</ol></aside>
      </div>
    </section>}
  </section>;
}
