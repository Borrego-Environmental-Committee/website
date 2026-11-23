export interface Meeting {
  topic: string;
  startsAt: string; // ISO timestamp with an explicit UTC offset
  timeZone: string; // IANA name, e.g. America/Phoenix
  description: string;
  zoomUrl?: string;
  zoomLabel?: string;
}

export const meetingSchedule = {
  frequency: 'Monthly on Zoom',
  events: [] as Meeting[],
  previous: [] as { topic: string; date: string }[], // Date as YYYY-MM-DD
};

export function upcomingMeetings(now = Date.now()) {
  return meetingSchedule.events
    .filter(({ startsAt }) => Date.parse(startsAt) >= now)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

export function meetingDate(meeting: Meeting) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: meeting.timeZone,
  }).format(new Date(meeting.startsAt));
}

export function meetingTime(meeting: Meeting) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: meeting.timeZone,
    timeZoneName: 'short',
  }).format(new Date(meeting.startsAt));
}
