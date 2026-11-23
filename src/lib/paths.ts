export function path(relative = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${relative.replace(/^\//, '')}`;
}

export function articlePath(id: string) {
  return path(`news/${id}/`);
}

export function absolute(relative: string, site: URL) {
  return new URL(relative, site).href;
}

export function dateLabel(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));
}
