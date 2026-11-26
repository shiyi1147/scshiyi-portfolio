import directoryCovers from './watchfaceDirectoryCovers.json';

export default function watchfaceCover(item) {
  const cover = directoryCovers[item.sourceProjectId];
  const base = import.meta.env.BASE_URL;
  const source = item.still || item.detail || item.src;
  if (cover && `${base}${cover.display}` === item.src && `${base}${cover.source}` === source) {
    return `${base}assets/watchface-directory/${cover.file}`;
  }
  return item.still || item.src;
}
