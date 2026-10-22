// Group the homepage index without modifying the original watchface records.
const playful = new Set(['面包心情','多吃蔬菜','今日有喵','宠趣时光','萌宠暖绒','霓虹萌咪','喵趣涂鸦','雪跃时光','月兔团圆','像素动物']);
const technology = new Set(['橙能引擎','曜界','虹辉星澜','蓝境','赤曜仪表','能量脉冲','冷萃时刻']);
export function withWatchfaceCollection(projects, baseUrl = '/') {
  const watches = projects.filter(project => project.group === 'interface');
  if (!watches.length) return projects;
  const chapterFor = project => ['archive-bobo','archive-shixu'].includes(project.id) ? project.name : playful.has(project.name) ? '趣味角色' : technology.has(project.name) ? '数字科技' : '简约日常';
  const chapters = ['心情啵啵','时序方舟','趣味角色','数字科技','简约日常'];
  const ordered = chapters.flatMap(chapter => watches.filter(project => chapterFor(project) === chapter));
  const collection = {
    id:'archive-watchfaces', name:'腕间万象', title:'腕间万象', group:'interface', category:'WATCHFACE DESIGN',
    watchfaceCount:watches.length,
    contextLabel:'含已上线案例',
    accent:'#bff3df', color:'#bff3df', surface:'#111c1d', number:'02', displayTitle:['腕间万象'],
    cover:baseUrl+'assets/posters/watchfaces/collection.webp', preview:baseUrl+'assets/posters/watchfaces/collection-thumb.webp',
    eyebrow:'智能表盘 / 多主题视觉设计', note:watches.length+' 款表盘 / 角色 · 科技 · 日常',
    summary:'从角色表情到数字仪表，探索腕上小屏幕的不同视觉表达。先看心情啵啵与时序方舟两个重点案例，再按风格浏览其他表盘。',
    details:[['作品构成',watches.length+' 款表盘，保留各款名称、不同外形及已有展示图。'],['重点案例','心情啵啵与时序方舟已上线；使用 ChatGPT 辅助生成部分元素，并在 Figma 中手动修改与整理。'],['阅读方式','在作品目录按风格筛选，选择一款表盘后浏览它的图片；设计说明中保留该款作品的具体信息。']],
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
