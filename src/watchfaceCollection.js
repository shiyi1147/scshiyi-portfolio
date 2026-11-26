// Group the homepage index without modifying the original watchface records.
const playful = new Set(['面包心情','多吃蔬菜','今日有喵','宠趣时光','萌宠暖绒','霓虹萌咪','喵趣涂鸦','雪跃时光','月兔团圆','像素动物','猫伴朝夕','萌爪时光','鸭探长','摸鱼战甲','霓光心晴']);
const technology = new Set(['橙能引擎','曜界','虹辉星澜','蓝境','赤曜仪表','能量脉冲','冷萃时刻','幻夜时刻','赤速仪表','霓虹机舱','荧光脉动','霓光脉冲']);
export const featuredWatchfaces = new Map([
  ['archive-watch-32', '手电光束动效'],
  ['archive-bobo', 'ChatGPT + Figma · 已上线'],
  ['archive-shixu', 'ChatGPT + Figma · 已上线'],
]);
const directoryOrder = [
  ...featuredWatchfaces.keys(), 'archive-watch-26',
  'archive-watch-34', 'archive-watch-29', 'archive-watch-31',
  'archive-watch-25', 'archive-watch-13', 'archive-watch-33', 'archive-watch-27',
  'archive-watch-18', 'archive-watch-37', 'archive-watch-23', 'archive-watch-11',
  'archive-watch-36', 'archive-watch-16', 'archive-watch-39', 'archive-watch-21',
  'archive-watch-04', 'archive-watch-09', 'archive-watch-22', 'archive-watch-38',
  'archive-watch-19', 'archive-watch-05', 'archive-watch-30', 'archive-watch-28',
  'archive-watch-01', 'archive-watch-10', 'archive-watch-14', 'archive-watch-35',
  'archive-watch-02', 'archive-watch-17', 'archive-watch-08', 'archive-watch-06',
  'archive-watch-07', 'archive-watch-12', 'archive-watch-15', 'archive-watch-20',
];
const directoryRank = new Map(directoryOrder.map((id, index) => [id, index]));
const rank = project => directoryRank.get(project.id) ?? directoryRank.size;

export function withWatchfaceCollection(projects, baseUrl = '/') {
  const watches = projects.filter(project => project.group === 'interface');
  if (!watches.length) return projects;
  const chapterFor = project => ['archive-bobo','archive-shixu'].includes(project.id) ? project.name : playful.has(project.name) ? '趣味角色' : technology.has(project.name) ? '数字科技' : '简约日常';
  const chapters = ['心情啵啵','时序方舟','趣味角色','数字科技','简约日常'];
  const ordered = chapters.flatMap(chapter => watches.filter(project => chapterFor(project) === chapter))
    .sort((a, b) => rank(a) - rank(b));
  const collection = {
    id:'archive-watchfaces', name:'腕间万象', title:'腕间万象', group:'interface', category:'WATCHFACE DESIGN',
    watchfaceCount:watches.length,
    contextLabel:'含已上线案例',
    accent:'#bff3df', color:'#bff3df', surface:'#111c1d', number:'02', displayTitle:['腕间万象'],
    cover:baseUrl+'assets/posters/watchfaces/collection-featured.webp', preview:baseUrl+'assets/posters/watchfaces/collection-featured-thumb.webp',
    eyebrow:'智能表盘 / 多主题视觉设计', note:watches.length+' 款表盘 / 角色 · 科技 · 日常',
    summary:'表盘视觉设计、信息排版与多尺寸适配。鸭探长用光束引导读时，时序方舟展示三种屏形和息屏布局。',
    details:[['作品构成',watches.length+' 款表盘，保留各款名称、不同外形及已有展示图。'],['重点案例','鸭探长用手电光束逐步照亮时间与天气。心情啵啵与时序方舟已上线，制作时使用 ChatGPT 辅助生成部分元素，并在 Figma 中手动修改与整理。'],['阅读方式','在作品目录按风格筛选，选择一款表盘后浏览它的图片；设计说明中保留该款作品的具体信息。']],
    items:ordered.flatMap(project => project.items.map(item => ({...item,
      chapter:chapterFor(project), sourceProjectId:project.id, sourceTitle:project.title,
      sourceSummary:project.summary, sourceDetails:project.details, sourceEyebrow:project.eyebrow,
      label:item.label.includes(project.name) ? item.label : project.name+' · '+item.label
    })))
  };
  let inserted = false;
  return projects.flatMap(project => {
    if (project.group !== 'interface') return [project];
    if (inserted) return [];
    inserted = true;
    return [collection];
  });
}
