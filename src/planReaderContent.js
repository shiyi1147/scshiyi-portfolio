import manifest from './planReaderManifest.json';

const titles = {
  'nutrition-brand-plan.pdf': '营养快线',
  'sanfu-brand-plan.pdf': '三福',
  'yunnan-brand-plan.pdf': '云南白药',
};

const plans = Object.fromEntries(Object.entries(manifest).map(([document, plan]) => [document, {
  ...plan,
  title: titles[document],
  pages: plan.pages.map(page => ({ ...page, src: `${import.meta.env.BASE_URL}${page.src}`, small: `${import.meta.env.BASE_URL}${page.small}` })),
}]));

export function getPlanReader(project) {
  return plans[project.document?.split('/').pop().split(/[?#]/)[0]] || null;
}
