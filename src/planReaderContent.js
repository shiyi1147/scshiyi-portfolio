import manifest from './planReaderManifest.json';

const titles = {
  'nutrition-brand-plan.pdf': '营养快线',
  'sanfu-brand-plan.pdf': '三福',
  'yunnan-brand-plan.pdf': '云南白药',
};

// Page numbers refer to the physical PDF order, including cover and contents.
const chapters = {
  'nutrition-brand-plan.pdf': [
    ['封面与目录', 1], ['背景分析', 4], ['消费者洞察', 8], ['主题解析', 10],
    ['营销方案', 13], ['创意执行', 23], ['媒介排期与预算', 26],
  ],
  'sanfu-brand-plan.pdf': [
    ['封面与目录', 1], ['概念推导', 4], ['市场分析', 5], ['消费者洞察', 9],
    ['营销策略与 IP', 11], ['活动总览', 14], ['媒介选择', 25],
    ['创意执行', 27], ['排期预算', 29], ['策划附录', 30],
  ],
  'yunnan-brand-plan.pdf': [
    ['封面与目录', 1], ['主题推导', 4], ['市场调研', 5], ['消费者分析', 9],
    ['营销提案', 11], ['IP 形象', 13], ['开启三重奏', 14],
    ['奏响三重旋律', 17], ['共赏三重盛典', 22], ['创意执行', 24], ['媒介与预算', 27],
  ],
};

const plans = Object.fromEntries(Object.entries(manifest).map(([document, plan]) => [document, {
  ...plan,
  title: titles[document],
  chapters: chapters[document].map(([label, page]) => ({ label, page })),
  pages: plan.pages.map(page => ({ ...page, src: `${import.meta.env.BASE_URL}${page.src}`, small: `${import.meta.env.BASE_URL}${page.small}` })),
}]));

export function getPlanReader(project) {
  return plans[project.document?.split('/').pop().split(/[?#]/)[0]] || null;
}
