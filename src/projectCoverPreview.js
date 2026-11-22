export default function projectCoverPreview(project) {
  const coverItem = project.items.find(item => item.src === project.cover);
  return coverItem?.thumb || project.cover;
}
