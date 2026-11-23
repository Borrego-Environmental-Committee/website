import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.SITE_BASE || '').replace(/\/$/, '');
const origin = new URL(process.env.SITE_URL || 'http://localhost:4321').origin;
const dist = 'dist';
for (const file of [
  'index.html', 'about/index.html', 'meetings/index.html', 'news/index.html',
  'contact/index.html', '404.html', 'sitemap-index.xml', 'robots.txt', 'favicon.svg',
]) {
  assert(existsSync(join(dist, file)), `Missing output file: ${file}`);
}
assert(!existsSync(join(dist, 'email-preview')), 'Email preview leaked into the public build');

const pages = readdirSync(dist, { recursive: true })
  .filter((file) => file.endsWith('.html'));
for (const file of pages) {
  const html = readFileSync(join(dist, file), 'utf8');
  assert.equal([...html.matchAll(/<h1[\s>]/gi)].length, 1, `Expected one h1 in ${file}`);
  assert(html.includes('name="description"'), `Missing description in ${file}`);
  assert(html.includes('property="og:image"'), `Missing social image in ${file}`);
  for (const [, link] of html.matchAll(/(?:href|src|content)="([^"]+)"/g)) {
    if (!(link.startsWith('/') && !link.startsWith('//')) && !link.startsWith(`${origin}/`)) continue;
    const { pathname } = new URL(link, origin);
    assert(pathname.startsWith(`${base}/`), `Link ${link} escapes the base path in ${file}`);
    const target = decodeURIComponent(pathname.slice(base.length + 1));
    const exists = pathname.endsWith('/')
      ? existsSync(join(dist, target, 'index.html'))
      : existsSync(join(dist, target));
    assert(exists || file === '404.html' && target === '404', `Broken link ${link} in ${file}`);
  }
}
console.log(`Verified ${pages.length} HTML pages and internal links at ${base || '/'}.`);
