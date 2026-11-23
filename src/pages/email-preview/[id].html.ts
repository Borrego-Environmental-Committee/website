import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderEmail } from '../../lib/email';
import { announcementMeeting, type Announcement } from '../../lib/news';
import { absolute, articlePath, path } from '../../lib/paths';
import { group } from '../../site';

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.EMAIL_PREVIEW !== '1') return [];
  const entries = await getCollection('news', ({ data }) => data.email);
  return entries.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props, site, url }) => {
  if (process.env.EMAIL_PREVIEW !== '1') return new Response(null, { status: 404 });

  const { entry } = props as { entry: Announcement };
  const destination = site ?? url;
  return new Response(renderEmail({
    groupName: group.name,
    title: entry.data.title,
    description: entry.data.description,
    sample: entry.data.sample,
    articleUrl: absolute(articlePath(entry.id), destination),
    imageUrl: absolute(path(entry.data.image.path), destination),
    imageAlt: entry.data.image.alt,
    meeting: announcementMeeting(entry),
  }), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
};
