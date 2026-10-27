// Curate the exhibition without changing the full source gallery or plan reader.
// Page numbers use the physical PDF order, including cover and contents.
const selections = {
  'archive-sanfu': [
    { page: 12, label: '角色解构 · FUFU', chapter: 'IP 设计', caption: '从品牌多彩标识提取魔方与配色，形成魔法师 FUFU 的角色识别。' },
    { page: 27, label: '角色延展 · 动作与表情', chapter: 'IP 设计', caption: '围绕同一角色延展姿态和表情，保持服饰、配色与魔方元素的一致性。' },
    { page: 13, label: '品牌故事 · 漫画叙事', chapter: '漫画叙事', caption: '用连续漫画交代角色与日常生活的关系，连接“不拘一格看世界”的主题。' },
    { page: 28, label: '海报与包装 · 视觉应用', chapter: '海报与包装', caption: '将角色与场景插画延展到三张海报和包装示意，形成统一的视觉系列。' },
  ],
  'archive-yunnan': [
    { page: 13, label: '三重奏 · IP 角色设定', chapter: 'IP 设计', caption: '以牙刷、牙膏、漱口水为原型塑造三位角色，将产品特点融入音乐伙伴设定。' },
    { page: 25, label: '主视觉 · 海报与主题场景', chapter: '主视觉', caption: '以同一套角色和柔和配色组织礼盒、卡片主视觉及主题场景示意。' },
    { page: 20, label: '互动卡片与礼盒包装', chapter: '包装与周边', caption: '将牙刷 IP 延展为互动卡片与礼盒包装，呼应“三重惊喜等你刷”的活动主题。' },
    { page: 26, label: 'IP 周边 · 日常应用', chapter: '包装与周边', caption: '把角色应用到拖鞋、化妆包、毛巾、杯具、鼠标垫和钥匙扣等周边示意。' },
  ],
};

export function withSelectedVisuals(project) {
  const selection = selections[project.id];
  if (!selection) return project;
  return {
    ...project,
    browseLabel: '精选视觉',
    items: selection.map(({ page, ...content }) => ({ ...project.items[page - 1], ...content, sourcePage: page })),
  };
}
