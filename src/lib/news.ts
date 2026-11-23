import { getCollection, type CollectionEntry } from 'astro:content';
import { meetingSchedule } from '../meetings';

export type Announcement = CollectionEntry<'news'>;

export async function publishedNews() {
  const preview = process.env.EMAIL_PREVIEW === '1';
  const today = new Date().toISOString().slice(0, 10);
  const posts = await getCollection('news', ({ data }) =>
    preview || (!data.draft && (!data.published || data.published <= today)),
  );
  return posts.sort((a, b) =>
    (b.data.published ?? '').localeCompare(a.data.published ?? '')
    || a.id.localeCompare(b.id),
  );
}

export function announcementMeeting(entry: Announcement) {
  const startsAt = entry.data.meetingStartsAt;
  if (!startsAt) return undefined;

  const meeting = meetingSchedule.events.find((item) => item.startsAt === startsAt);
  if (!meeting) {
    throw new Error(`Announcement "${entry.id}" references a meeting missing from src/meetings.ts: ${startsAt}`);
  }
  return meeting;
}
