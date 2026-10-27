import assets from './selectedVisualAssets.json';

// Artwork is extracted from the source PDFs. The full reader keeps its own pages.
const selections = {
  'archive-sanfu': [
    { label: 'FUFU · 魔法师角色', chapter: 'IP 设计', layout: 'hero', works: [['fufu', 'FUFU 魔法师角色']], caption: '多彩魔方、夸张帽型与格纹服饰，形成 FUFU 的角色识别。' },
    { label: 'FUFU · 多面日常', chapter: 'IP 设计', layout: 'poses', works: [['fufu-flight', '飞行姿态'], ['fufu-everyday', '日常造型'], ['fufu-travel', '出游姿态'], ['fufu-forest', '森林探索姿态']], caption: '从日常造型到出游、飞行和探索，让同一角色拥有不同的情绪与姿态。' },
    { label: '品牌故事 · 漫画叙事', chapter: '漫画叙事', layout: 'hero', works: [['comic', 'FUFU 品牌故事漫画']], caption: '用连续漫画展开角色故事，连接“不拘一格看世界”的主题。' },
    { label: '系列海报 · 走进日常', chapter: '海报设计', layout: 'poster', works: [['poster-travel', 'FUFU 出游主题海报']], caption: '将 FUFU 放入出游场景，用明快配色和生活细节延展角色故事。' },
    { label: '系列海报 · 探索新世界', chapter: '海报设计', layout: 'poster', works: [['poster-forest', 'FUFU 森林探索主题海报']], caption: '以森林、花朵与提灯构成探索场景，延续角色的魔法师设定。' },
    { label: '包装延展 · 系列应用', chapter: '包装设计', layout: 'objects', works: [['pack-flat', 'FUFU 长盒包装效果'], ['pack-travel', '出游主题包装效果'], ['pack-forest', '森林主题包装效果']], caption: '将系列插画应用到不同盒型，用同一组角色和配色保持识别一致。' },
  ],
  'archive-yunnan': [
    { label: '三重奏 · 音乐伙伴', chapter: 'IP 设计', layout: 'lineup', works: [['character-blue', '水墩墩角色'], ['character-pink', '刷彩彩角色'], ['character-green', '高乐乐角色']], caption: '将牙刷、牙膏、漱口水拟人化为三位音乐伙伴，以圆润造型和柔和配色建立角色关系。' },
    { label: '主题主视觉 · 三位伙伴的合奏', chapter: '海报与场景', layout: 'hero', works: [['key-visual', '了不起的三重奏主题主视觉']], caption: '以三位伙伴为画面中心，将音乐符号、产品与主题文字组织在同一画面中。' },
    { label: '角色海报 · 水墩墩', chapter: '海报与场景', layout: 'poster', works: [['poster-blue', '水墩墩角色主题海报']], caption: '放大单个角色，以蓝绿色渐变、音符和产品特征延续系列视觉。' },
    { label: '主题场景 · 让角色进入空间', chapter: '海报与场景', layout: 'scene', works: [['theme-scene', '三重奏主题场景效果']], caption: '将平面角色延展到主题场景，以音乐舞台、互动装置和统一配色串联空间。' },
    { label: '互动礼盒 · 包装与卡片', chapter: '包装与周边', layout: 'duo', works: [['gift-box', '三重奏礼盒包装效果'], ['cards', '三重奏互动卡片效果']], caption: '将三位角色应用到礼盒与互动卡片，让包装和活动内容保持统一。' },
    { label: 'IP 周边 · 日常陪伴', chapter: '包装与周边', layout: 'objects', works: [['mouse-pad', '三重奏鼠标垫效果'], ['cosmetic-bag', '三重奏化妆包效果'], ['mug', '三重奏杯具效果']], caption: '选取鼠标垫、化妆包与杯具，展示角色在不同日常物品上的应用。' },
  ],
};

export function withSelectedVisuals(project) {
  const selection = selections[project.id];
  if (!selection) return project;
  const source = assets[project.id.replace('archive-', '')].assets;
  const base = import.meta.env?.BASE_URL || '/';
  return {
    ...project,
    browseLabel: '精选视觉',
    visualSurface: project.id === 'archive-sanfu' ? '#eeeede' : '#dbe7e1',
    items: selection.map(({ works, ...content }) => {
      const artworks = works.map(([key, label]) => ({ ...source[key], src: `${base}${source[key].src}`, thumb: `${base}${source[key].thumb}`, label }));
      return { ...content, src: artworks[0].src, thumb: artworks[0].thumb, sourcePage: artworks[0].sourcePage, artworks };
    }),
  };
}
