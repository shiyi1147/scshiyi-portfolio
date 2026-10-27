import useProjectLink from './useProjectLink';
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';

import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  Menu,
  Sparkles,
} from 'lucide-react';

import './styles.css';
import ImmersiveWork from './ImmersiveWork';
import ContactActions from './ContactActions';
import InternshipAvailability from './InternshipAvailability';
import { resumeDownloadUrl, resumeDownloadName } from './resumeAsset';
const ProjectExhibition = lazy(() => import('./ProjectExhibition')); 
import { portfolioProjects as sourcePortfolioProjects } from './portfolioContent';
import { archiveProjects as sourceArchiveProjects } from './archiveContent';
import { withBoboPoster } from './boboPoster';
import { withWatchfaceCollection } from './watchfaceCollection';
import { NavigationTransition, usePortfolioNavigation } from './NavigationMotion';
import SiteEntrance from './SiteEntrance';

const portfolioProjects = withBoboPoster(sourcePortfolioProjects);
const archiveProjects = withWatchfaceCollection(withBoboPoster(sourceArchiveProjects), import.meta.env.BASE_URL);
const spatialShowcase = ['archive-shanhai', 'archive-vcg', 'archive-film', 'archive-watchfaces'].map(id => archiveProjects.find(project => project.id === id));



const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;

const scenes = [
  {
    key: 'venice',
    label: 'Visual',
    index: '01',
    title: ['Shi Yi', 'Portfolio'],
    workWords: ['AI Visual', 'UX/UI', 'Brand Strategy'],
    caption: '石宜的个人作品集首页，聚焦 AI 视觉设计、用户体验与交互设计、品牌视觉策略设计。',
    eyebrow: 'Shi Yi / AI Visual Designer',
    screenTitle: 'Portfolio overview',
    video: asset('hero-visual-0804.mp4'),
    ambient: asset('project-scene.mp4'),
    tint: '#74ffef',
    bloom: '#0a3734',
    fog: '#020506',
    signal: { amplitude: 0.09, speed: 1, spread: 180, ribbonWidth: 2.4, density: 96 },
  },
  {
    key: 'canal',
    label: 'Motion',
    index: '02',
    title: ['AI Visual', 'Designer'],
    workWords: ['Motion', 'Rhythm', 'Narrative'],
    caption: '探索 AI 与视觉创意的更多可能，用沉浸式网页框架承载个人表达与作品展示。',
    eyebrow: 'AI Visual / Interaction / Branding',
    screenTitle: 'Visual direction focus',
    video: asset('project-campaign.mp4'),
    ambient: asset('project-brand.mp4'),
    tint: '#8cd8ff',
    bloom: '#0d243f',
    fog: '#03060a',
    signal: { amplitude: 0.06, speed: 0.82, spread: 150, ribbonWidth: 1.9, density: 82 },
  },
  {
    key: 'studio',
    label: 'Brand',
    index: '03',
    title: ['Creative', 'Explorer'],
    workWords: ['Creative', 'Direction', 'Digital Portfolio'],
    caption: '网站用于求职与作品展示，希望让招聘方快速看到我的审美判断、设计能力与创意潜力。',
    eyebrow: 'Personal Website / Job Seeking',
    screenTitle: 'Creative profile overview',
    video: asset('hero-visual.mp4'),
    ambient: asset('project-scene.mp4'),
    tint: '#b6ffcf',
    bloom: '#163225',
    fog: '#030705',
    signal: { amplitude: 0.11, speed: 1.18, spread: 205, ribbonWidth: 2.9, density: 112 },
  },
];

const indexCards = [
  ['AI 视觉设计', '结合生成式工具与画面控制能力，探索更高效也更有辨识度的视觉表达。'],
  ['用户体验与交互', '关注信息层级、浏览节奏和交互反馈，让视觉展示也具备清晰的阅读体验。'],
  ['品牌视觉策略', '从风格、情绪、场景适配到传播表达，建立更完整的品牌画面方向。'],
  ['求职作品集', '通过网页与 PDF 双载体，让招聘方可以快速浏览，也能完整查看作品资料。'],
];

const workCategories = ['Featured', 'AI Visual', 'UX/UI', 'Branding', 'Strategy', 'Experiments'];
const workNav = ['Work', 'About', 'Resume'];
const titleSlots = [
  'workTitleFrontier',
  'workTitleWithin',
  'workTitleRick',
  'workTitleMorty',
  'workTitleCurrents',
  'workTitleVr',
  'workTitleMuseum',
  'workTitleOf',
  'workTitleWeed',
];
const makeWorkItems = (labels, solidIndexes, sceneOffset = 0) => labels.map((label, index) => ({
  label,
  href: index < 2 ? '#indexContent' : index < 6 ? '#top' : '#contactContent',
  className: titleSlots[index],
  sceneIndex: (index + sceneOffset) % scenes.length,
  tone: solidIndexes.includes(index) ? 'solid' : 'outline',
}));
const workBoards = [
  {
    category: 'Featured',
    focusIndex: 2,
    items: makeWorkItems(['Selected', 'Works', 'Portfolio', 'Update', 'Coming', 'Soon', 'Visual', 'Cases', 'Archive'], [2, 3], 0),
  },
  {
    category: 'AI Visual',
    focusIndex: 6,
    items: makeWorkItems(['AI Concepts', 'Image Prompt', 'Scene Draft', 'Visual Tone', 'Look Dev', 'Style Frame', 'AI Poster', 'Key Shot', 'Mood Board'], [6], 1),
  },
  {
    category: 'UX/UI',
    focusIndex: 4,
    items: makeWorkItems(['UX Flow', 'Interface', 'User Path', 'Wireframe', 'Interaction', 'Prototype', 'Journey', 'Scenario', 'Testing'], [4], 2),
  },
  {
    category: 'Branding',
    focusIndex: 3,
    items: makeWorkItems(['Brand World', 'Identity Kit', 'KV System', 'Visual Language', 'Launch Frame', 'Poster Grid', 'Social Pack', 'Brand Motion', 'Campaign Page'], [2, 3], 0),
  },
  {
    category: 'Strategy',
    focusIndex: 5,
    items: makeWorkItems(['Brand Audit', 'Visual Map', 'Narrative', 'System View', 'Positioning', 'Strategy', 'Tone Board', 'Audience', 'Insight'], [5], 1),
  },
  {
    category: 'Experiments',
    focusIndex: 1,
    items: makeWorkItems(['Shader Test', 'Liquid Form', 'Noise Study', 'Signal Trails', 'Type Motion', 'Frame System', 'Realtime Loop', 'Visual Lab', 'Process Notes'], [1, 2], 2),
  },
];

const categoryWorkMap = workBoards.map((board) => board.focusIndex);
const systemSignals = [
  { value: '01', label: 'AI 视觉设计', text: '熟悉 AI 生成、风格探索、画面整合与视觉统一，适合概念表达与高效内容产出。' },
  { value: '02', label: '用户体验与交互', text: '关注页面浏览逻辑、信息层级和交互节奏，让展示型网站也具备良好可读性。' },
  { value: '03', label: '品牌视觉策略', text: '从视觉语言、调性判断到传播场景适配，建立更完整的品牌表达系统。' },
  { value: '04', label: '创意探索能力', text: '持续探索 AI 与视觉创意的更多可能，兼顾实验性、表达力与实际落地。' },
];
const sectionNotes = [
  ['求职定位', '当前网站用于求职展示，目标方向为 AI视觉设计师、用户体验与交互设计、品牌视觉策略设计。'],
  ['工作方式', '擅长从参考拆解、风格探索到最终统一输出，把抽象需求转成更完整的视觉结果。'],
  ['项目能力', '适合参与视觉概念、网页氛围、品牌包装、数字内容和体验展示相关项目。'],
];
const profileRows = [
  { label: '姓名', value: '石宜', text: '个人网站将作为求职作品集首页与长期更新的展示入口。' },
  { label: '求职方向', value: 'AI视觉 / 交互体验 / 品牌策略', text: '希望进入更重视创意表达、品牌感知与数字体验的岗位。' },
  { label: '一句话介绍', value: '探索 AI 与视觉创意的更多可能', text: '把技术、视觉和叙事感结合成更有记忆点的作品表达。' },
  { label: '联系与材料', value: '1483399012@qq.com / PDF作品集', text: '网站负责快速浏览，PDF 适合投递、面试或完整查看项目资料。' },
];

const featuredProjects = [
  { id: 'shanhai', number: '01', title: '山海经视觉插画设计', period: '2026.9 - 2026.10', discipline: '主题插画 / 东方幻想视觉', description: '以《山海经》神话意象为灵感，构建具有幻想感与视觉张力的东方题材插画系列。', role: '主题设定、画面风格探索、角色与意象表现、系列视觉统一。', cover: asset('projects/shanhai-cover.jpg') },
  { id: 'nutrition', number: '02', title: '营养快线品牌创意策划', period: '2025.4 - 2025.9', discipline: '品牌策略 / 整合传播', description: '围绕品牌传播与年轻化表达展开创意策划，探索更具话题性与视觉识别度的品牌沟通方式。', role: '品牌洞察、创意概念、传播主题、视觉方向与提案整合。', document: asset('documents/nutrition-brand-plan.pdf'), documentLabel: '查看策划案 PDF' },
  { id: 'yunnan', number: '03', title: '云南白药品牌传播策划', period: '2024.4 - 2024.9', discipline: '品牌传播 / 视觉策略', description: '结合品牌特征与传播语境，提出更系统的品牌传播策略与视觉表达方向。', role: '品牌分析、传播策略、创意方向、视觉提案与项目整合。', document: asset('documents/yunnan-brand-plan.pdf'), documentLabel: '查看策划案 PDF' },
  { id: 'watchface', number: '04', title: '智能手表表盘视觉设计', period: '2025 - 2026', discipline: 'UI 视觉 / 智能穿戴', description: '围绕智能穿戴设备的使用场景，进行多风格表盘视觉设计探索，覆盖科技感、治愈系、像素风与萌趣主题。', role: '表盘主题设定、界面视觉设计、信息排版、色彩风格探索、多尺寸适配。', cover: asset('projects/watchface-cover.png') },
  { id: 'solar', number: '05', title: '岁时绮境 · 二十四节气插画', period: '2026.6 - 2026.7', discipline: '系列插画 / 东方自然美学', description: '以二十四节气为主题，通过插画语言表现四时变化、自然意象与东方审美氛围。', role: '主题梳理、插画创作、色彩系统、系列画面统一与延展。', cover: asset('projects/solar-terms-cover.jpg') },
];
const caseStudies = {
  shanhai: { eyebrow: 'SERIES ILLUSTRATION / 2026', title: '山海经视觉插画设计', summary: '以东方神话意象为起点，围绕角色、山川与异兽展开系列插画创作，在统一的色彩氛围中建立具有叙事感的幻想世界。', details: [['项目目标', '以现代视觉语言重新演绎《山海经》的神话想象与东方气质。'], ['我的职责', '主题设定、画面风格探索、角色与意象表现、系列视觉统一。'], ['设计过程', '从意象提取、构图实验到色彩与光影控制，逐步扩展为完整的系列画面。'], ['项目成果', '完成 17 幅横幅插画，形成可用于展陈、内容传播与视觉延展的系列作品。']], gallery: 'shanhai' },
  nutrition: { eyebrow: 'BRAND CAMPAIGN / 2025', title: '营养快线品牌创意策划', summary: '围绕品牌年轻化表达展开研究与整合传播提案，以统一的创意概念连接主视觉、海报与衍生物料。', details: [['项目目标', '探索更具话题性与视觉识别度的年轻化品牌沟通方式。'], ['我的职责', '品牌洞察、创意概念、传播主题、视觉方向与提案整合。'], ['设计过程', '完成品牌研究、策略梳理、主视觉及系列物料的完整设计路径。'], ['项目成果', '带领 4 人团队完成品牌调研及全案视觉设计，获第 17 届全国大学生广告艺术大赛全国优秀奖，作品收录大赛年鉴。']], document: asset('documents/nutrition-brand-plan.pdf') },
  watchface: { eyebrow: 'UI VISUAL / 2025 - 2026', title: '智能手表表盘视觉设计', summary: '面向智能穿戴场景进行多主题表盘视觉设计，让时间、健康数据与功能信息在有限界面中清晰呈现。', details: [['项目目标', '兼顾主题表达、信息可读性与智能穿戴设备的实际使用场景。'], ['我的职责', '使用 Figma 进行主题设定、界面视觉、信息排版、配色与多尺寸适配。'], ['设计过程', '围绕不同主题梳理时间、健康数据与功能信息的阅读优先级，再完成视觉方案与迭代交付。'], ['项目成果', '月均完成约 8 款表盘设计与交付，保持多主题方案的风格统一与阅读效率。']] },
  vcg: { eyebrow: 'AI VISUAL CONTENT / 2026', title: '视觉中国壁纸内容设计', summary: '使用 AI 工具参与静态与动态壁纸的规模化内容生产，在高频更新中维持主题的视觉一致性。', details: [['项目目标', '支持数字内容平台持续更新的静态与动态壁纸素材供给。'], ['我的职责', '参与提示词构建、素材生成、筛选、后期优化与动态节奏调整。'], ['设计过程', '围绕主题探索构图、色彩、光影与动态节奏，并通过人工筛选与优化控制成品质量。'], ['项目成果', '日均完成约 72 张静态壁纸、30 条动态壁纸的制作与优化。']] },
};
const watchfaceGallery = [
  { label: '橙能引擎', src: asset('projects/watchfaces/orange-engine.png') },
  { label: '蓝境', src: asset('projects/watchfaces/blue-realm.png') },
  { label: '赤曜仪表', src: asset('projects/watchfaces/red-dial.png') },
  { label: '霓虹萌咪', src: asset('projects/watchfaces/neon-cat.png') },
  { label: '像素动物', src: asset('projects/watchfaces/pixel-animal.png') },
  { label: '月兔团圆', src: asset('projects/watchfaces/moon-rabbit.png') },
];
const wallpaperGallery = Array.from({ length: 8 }, (_, index) => ({
  label: `AI WALLPAPER / ${String(index + 1).padStart(2, '0')}`,
  src: asset(`projects/wallpapers/wallpaper-${String(index + 1).padStart(2, '0')}.webp`),
}));
const nutritionGallery = [
  { label: '封面', src: asset('projects/nutrition/nutrition-01.webp') },
  { label: '品牌洞察', src: asset('projects/nutrition/nutrition-06.webp') },
  { label: '传播策略', src: asset('projects/nutrition/nutrition-12.webp') },
  { label: '主视觉', src: asset('projects/nutrition/nutrition-18.webp') },
  { label: '物料延展', src: asset('projects/nutrition/nutrition-24.webp') },
  { label: '提案收束', src: asset('projects/nutrition/nutrition-29.webp') },
];
const shanhaiGallery = Array.from({ length: 17 }, (_, index) => {
  const fileName = `shanhai-${String(index + 1).padStart(2, '0')}.jpg`;
  return { label: `山海经系列 / ${String(index + 1).padStart(2, '0')}`, src: asset(`projects/shanhai/${fileName}`), thumb: asset(`projects/shanhai/thumbs/${fileName}`) };
});

function App() {
  const [entering, setEntering] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && new URLSearchParams(window.location.search).get('view') !== 'overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const [caseSequence, setCaseSequence] = useState([]);
  const [caseEntryRect, setCaseEntryRect] = useState(null);
  const validProjectIds = useMemo(()=>new Set([...portfolioProjects,...archiveProjects,...sourceArchiveProjects].map(p=>p.id)),[]);
  const clearEntry = useCallback(()=>setCaseEntryRect(null),[]);
  const [caseId,setCaseId,syncProjectLink] = useProjectLink(validProjectIds,clearEntry);
  const { page, targetPage, navigating, shellRef, overlayRef, handleNavigationClick } = usePortfolioNavigation(() => {setMenuOpen(false);syncProjectLink();});

  const stages = portfolioProjects;
  const selectedCase = useMemo(() => {
    if (!caseId) return null;
    return [...stages, ...archiveProjects, ...sourceArchiveProjects].find(project => project.id === caseId) || null;
  }, [caseId]);
  const nextCase = useMemo(() => {
    const projects = [...stages, ...archiveProjects, ...sourceArchiveProjects];
    const defaultSequence = caseId?.startsWith('archive-')
      ? [...spatialShowcase, ...archiveProjects.filter(project => !spatialShowcase.some(featured => featured.id === project.id))]
      : stages;
    const ids = (caseSequence.includes(caseId) ? caseSequence : defaultSequence.map(project => project.id))
      .filter(id => projects.some(project => project.id === id));
    const index = ids.indexOf(caseId);
    return index >= 0 && ids.length > 1 ? projects.find(project => project.id === ids[(index + 1) % ids.length]) : null;
  }, [caseId, caseSequence]);

  return (
    <main ref={shellRef} onClick={handleNavigationClick} className="workAtlas" data-page={page} aria-busy={navigating} style={{ '--accent': stages[0].accent, '--stage-surface': stages[0].surface }}>
      <div className="workAtlasPointerLight" aria-hidden="true" />
      <div className="workAtlasGrain" aria-hidden="true" />
      <NavigationTransition overlayRef={overlayRef} targetPage={targetPage} />
      <header className="workAtlasHeader">
        <a className="workAtlasBrand" href="#top" aria-label="返回作品集顶部">SHI YI<span>STUDIO</span></a>
        <nav className={`workAtlasNav ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
          <a href="#top" aria-current={targetPage === 'top' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>WORK</a>
          <a href="#about" aria-current={targetPage === 'about' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#resume" aria-current={targetPage === 'resume' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>RESUME</a>
          <a href="#contact" aria-current={targetPage === 'contact' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <button className="workAtlasMenu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "关闭导航" : "打开导航"}><Menu size={18} /><span>MENU</span></button>
      </header>

      <ImmersiveWork hidden={page !== 'top'} suspended={Boolean(caseId) || page !== 'top'} stages={archiveProjects} featured={spatialShowcase} onOpen={(id, ids, rect) => {
        setCaseEntryRect(rect);
        setCaseSequence(ids);
        setCaseId(id);
      }} />

      <section id="about" hidden={page !== 'about'} className="workAtlasAbout">
        <p className="workAtlasEyebrow">ABOUT THE PRACTICE</p>
        <div className="workAtlasAboutGrid">
          <div>
            <h2>设计是沟通的艺术</h2>
            <p>我是石宜，吉首大学视觉传达设计专业 2027 届学生，关注 AI 视觉与 UI 设计。曾参与视觉中国 vivo 壁纸设计及小米智能穿戴表盘外包项目。</p>
            <p>熟练使用 Photoshop、Illustrator、Figma，并结合 AI 工作流开展创作。具备内容策划与数据复盘能力，注重视觉表现、信息传达与使用体验。</p>
          </div>
          <div className="workAtlasCapabilityList" aria-label="专业能力">
            <span>01 <b>BRAND VISUAL</b> 品牌视觉</span>
            <span>02 <b>UI DESIGN</b> UI 视觉</span>
            <span>03 <b>AIGC CONTENT</b> AI 内容设计</span>
            <span>04 <b>MOTION</b> 动态视觉</span>
          </div>
        </div>
      </section>
      <section id="resume" hidden={page !== 'resume'} aria-label="经历与教育">
      <div className="workAtlasResume">
        <p className="workAtlasEyebrow">SELECTED EXPERIENCE</p>
        <div className="workAtlasResumeHeading"><span>2025 - 2026</span><h2>实习经历</h2></div>
        <div className="workAtlasExperienceGrid">
          <article><p className="workAtlasResumeDate">2026.05 - 2026.08</p><h3>视觉中国</h3><p className="workAtlasResumeRole">AI VISUAL DESIGN INTERN / vivo 项目组 · 静态与动态壁纸</p><ul><li>围绕 vivo 壁纸主题调整构图、色彩与光影，优化动态节奏与视觉连贯性。</li><li>使用小云雀搭建视频生成工作流，参与工具配置与模型选择；整理可复用提示词模板，结合可灵 AI、Seedance、Gemini 开展生成测试、素材筛选与后期优化。</li><li>个人独立完成制作与优化，日均最终交付约 <strong>72 张静态壁纸</strong>、<strong>30 条动态壁纸</strong>。</li></ul><button className="workAtlasInlineCase" type="button" onClick={() => { setCaseSequence(archiveProjects.map(project => project.id)); setCaseId('archive-vcg'); }}>查看案例档案 <ArrowUpRight size={15} /></button></article>
          <article><p className="workAtlasResumeDate">2025.12 - 2026.04</p><h3>吉林变刻科技有限公司</h3><p className="workAtlasResumeRole">UI DESIGN INTERN / 小米智能穿戴表盘外包项目</p><ul><li>使用 Figma 完成表盘界面、配色、图形与信息层级方案。</li><li>梳理时间、健康数据与功能信息的阅读优先级，兼顾视觉表现与使用效率。</li><li>月均完成约 <strong>8 款表盘</strong> 的设计与交付，配合需求迭代保持多主题方案的统一性。</li></ul></article>
        </div>
      </div>
      <div id="credentials" className="workAtlasCredentials">
        <p className="workAtlasEyebrow">PROJECTS / EDUCATION / TOOLS</p>
        <div className="workAtlasCredentialsGrid">
          <article className="workAtlasCredentialProjects">
            <p className="workAtlasCredentialLabel">SELECTED PROJECTS</p><h2>项目与荣誉</h2>
            <div><b>营养快线品牌创意策划</b><span>2025.09｜领队，带领 4 人团队完成品牌调研及全案视觉设计</span><span>第 17 届全国大学生广告艺术大赛</span><span className="workAtlasProjectAward">全国优秀奖｜作品收录大赛年鉴</span></div>
            <div><b>广告艺术大赛命题创作</b><span>2024.09｜队员，参与命题创意、系列海报及宣传物料设计</span><span>第 15 届湖南省大学生广告艺术大赛</span><span className="workAtlasProjectAward">湖南省三等奖</span></div>
            <div><b>校学生会主席</b><span>2023.09 - 2025.06｜主导活动主视觉及传播物料设计，累计完成 20 余件设计内容</span><span>统筹校级活动 30 余场，累计服务 5,000 余名师生</span></div>
          </article>
          <article><p className="workAtlasCredentialLabel">EDUCATION</p><h3>吉首大学</h3><span>视觉传达设计｜本科｜2025 - 至今</span><h3>长沙民政职业技术大学</h3><span>视觉传达设计｜专科｜2022 - 2025</span></article>
          <article><p className="workAtlasCredentialLabel">TOOLS</p><p className="workAtlasTools">ChatGPT · Procreate · Figma<br />Illustrator · Photoshop<br />After Effects · Premiere Pro · 剪映<br />InDesign · C4D<br />AI 图像生成与辅助设计</p></article>
        </div>
      </div>
      </section>
      <footer id="contact" hidden={page !== 'contact'} className="workAtlasContact">
        <p className="workAtlasEyebrow">START A CONVERSATION</p>
        <a className="contactStatement" href="mailto:1483399012@qq.com"><span>设计不只是美学</span><span>更是解决问题</span></a>
        <div className="workAtlasContactAvailability"><p className="workAtlasContactRole">求职方向 · AI 视觉 / UI 设计实习</p><InternshipAvailability /></div>
        <a className="workAtlasResumeDownload" href={resumeDownloadUrl} download={resumeDownloadName}>下载简历 PDF <ArrowDown size={16} /></a>
        <ContactActions />
        <span>1483399012@qq.com / 13347214948 / SHI YI / 2026</span>
      </footer>
      {entering && <SiteEntrance onComplete={() => setEntering(false)} />}
      {selectedCase && <Suspense fallback={<div className="exhibitionLoading" role="status">正在打开作品…<button type="button" onClick={() => setCaseId(null)}>返回首页</button></div>}><ProjectExhibition key={caseId} project={selectedCase} nextProject={nextCase} entryRect={caseEntryRect} onClose={() => {setCaseId(null);setCaseEntryRect(null);}} onNextProject={() => {
        setCaseEntryRect(null);
        if (nextCase) setCaseId(nextCase.id);
      }} /></Suspense>}
    </main>
  );
}

// Reuse the root during Vite updates so preview edits do not remount it twice.
const portfolioRoot = import.meta.hot?.data.portfolioRoot || createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.data.portfolioRoot = portfolioRoot;
portfolioRoot.render(<App />);
