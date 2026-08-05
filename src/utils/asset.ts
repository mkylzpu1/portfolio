export function withBaseUrl(path: string): string {
  if (!path) return '';

  // 外部URLはそのまま返す
  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  // BASE_URLが "/" の場合は何もしない
  if (!base) {
    return path.startsWith('/') ? path : `/${path}`;
  }

  // 既にBASE_URLが付いている場合はそのまま返す
  if (path === base || path.startsWith(`${base}/`)) {
    return path;
  }

  // BASE_URLを付与
  return `${base}/${path.replace(/^\//, '')}`;
}
