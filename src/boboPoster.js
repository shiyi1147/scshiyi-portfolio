const media = name => `${import.meta.env.BASE_URL}assets/posters/bobo/${name}`;
export const boboPoster = {
  landscape: media('poster-landscape.webp'),
  portrait: media('poster-portrait.webp'),
  homeLandscape: media('home-landscape.webp'),
  homePortrait: media('home-portrait.webp'),
  backgroundLandscape: media('atmosphere-landscape.webp'),
  backgroundPortrait: media('atmosphere-portrait.webp'),
  alt: '心情啵啵项目海报：把心情，戴在手腕上。薄荷绿色光环中的原始方形与圆形表盘。',
};
export const withBoboPoster = projects => projects.map(project =>
  ['watchface', 'archive-bobo'].includes(project.id)
    ? { ...project, poster: boboPoster, preview: boboPoster.homeLandscape, previewMobile: boboPoster.homePortrait }
    : project
);

