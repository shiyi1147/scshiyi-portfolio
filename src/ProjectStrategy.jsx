import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './ProjectStrategy.css';

export default function ProjectStrategy({ project, onBrowse }) {
  return <section className="exhibitionBrief projectStrategy" aria-label="项目核心策略" tabIndex={0}>
    <header className="projectStrategyHeading"><p>{project.eyebrow}</p><h3>{project.items[0].label}</h3><span>{project.achievementLabel}</span></header>
    <div className="projectStrategyLayout">
      <figure><img src={project.cover} alt={`${project.name}比赛提案主视觉`} width="1500" height="1061"/><figcaption>团队比赛提案 · 团队共同成果</figcaption></figure>
      <div className="projectStrategyCopy"><p className="projectStrategyLabel">核心策略</p><ol>{project.strategy.map(([title,text],index)=><li key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol>
        <div className="projectStrategyActions"><button type="button" onClick={onBrowse}>浏览作品 <ArrowDown size={14} aria-hidden="true"/></button>{project.document&&<a href={project.document} target="_blank" rel="noreferrer">完整策划案 <ArrowUpRight size={14} aria-hidden="true"/></a>}</div>
      </div>
    </div>
  </section>;
}
