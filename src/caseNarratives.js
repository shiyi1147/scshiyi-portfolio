// Reading notes are based on the existing proposal pages and portfolio credits.
// Campaign executions below are proposals, not claims of a launched campaign.
const nutritionNarrative = [
  { chapter: '问题', label: '品牌年轻化命题', caption: '如何让营养快线与年轻人建立新的沟通？以“告别脆皮，特种兵上线”为主题，展开品牌年轻化提案。' },
  { chapter: '洞察', label: '品牌环境分析', caption: '从政策、经济、社会与技术四个角度梳理品牌环境，为后续的主题与传播方向提供依据。' },
  { chapter: '创意', label: 'IP 角色设定', caption: '将饮料瓶盖、橙白配色与户外装备融入“特种兵”角色，让传播主题有一个可持续延展的视觉载体。' },
  { chapter: '设计', label: '联名传播提案', caption: '提出与《和平精英》联名的活动设想，将品牌主题延伸到游戏场景与互动体验中。' },
  { chapter: '设计', label: '传播物料延展', caption: '把角色与主题应用于 Citywalk 海报、包装、线下活动和闪屏页面，呈现统一的传播视觉。' },
  { chapter: '成果', label: '主题收束与项目成果', caption: '以“特种兵，元气上线！”收束完整提案。团队项目获第 17 届全国大学生广告艺术大赛全国优秀奖，并入选作品年鉴。' },
];

export function withCaseNarrative(id, items) {
  if (id !== 'nutrition') return items;
  return items.map((item, index) => ({ ...item, ...nutritionNarrative[index] }));
}
