// A fresh URL is used only after an explicit retry, including cached HTTP errors.
export default function retryMediaUrl(src, attempt) {
  if (!attempt || !src) return src;
  const url = new URL(src, window.location.href);
  url.searchParams.set('retry', String(attempt));
  return url.href;
}
