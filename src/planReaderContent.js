import manifest from './planReaderManifest.json';

const plans = Object.fromEntries(Object.entries(manifest).map(([document, plan]) => [document, {
  ...plan,
  pages: plan.pages.map(page => ({ ...page, src: `${import.meta.env.BASE_URL}${page.src}`, small: `${import.meta.env.BASE_URL}${page.small}` })),
}]));

export function getPlanReader(project) {
  return plans[project.document?.split('/').pop().split(/[?#]/)[0]] || null;
}
