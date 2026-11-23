import { meetingDate, meetingTime, type Meeting } from '../meetings.ts';

interface EmailContent {
  groupName: string;
  title: string;
  description: string;
  sample: boolean;
  articleUrl: string;
  imageUrl: string;
  imageAlt: string;
  meeting?: Meeting;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    };
    return entities[character];
  });
}

export function renderEmail(content: EmailContent) {
  const title = escapeHtml(content.title);
  const description = escapeHtml(content.description);
  const name = escapeHtml(content.groupName);
  const meeting = content.meeting;
  const meetingDetails = meeting ? `
    <h2 style="font:700 21px/1.3 Georgia,serif;margin:24px 0 8px;">Meeting details</h2>
    <p style="margin:0 0 12px;"><strong>${escapeHtml(meeting.topic)}</strong><br>
    ${escapeHtml(meetingDate(meeting))} · ${escapeHtml(meetingTime(meeting))}<br>On Zoom</p>
    <p style="margin:0 0 12px;">${escapeHtml(meeting.description)}</p>
    ${meeting.zoomUrl ? `<p style="margin:0 0 16px;"><a style="color:#803522;font-weight:bold;" href="${escapeHtml(meeting.zoomUrl)}">${escapeHtml(meeting.zoomLabel ?? 'Join on Zoom')}</a></p>` : ''}
  ` : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#eee6d8;color:#232c31;font:16px/1.6 Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${description}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eee6d8">
    <tr><td align="center" style="padding:22px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#fffdf7" style="max-width:600px;">
        <tr><td bgcolor="#24373e" style="padding:16px 24px;color:#fffdf7;font:700 19px Georgia,serif;">${name}</td></tr>
        <tr><td><img width="600" src="${escapeHtml(content.imageUrl)}" alt="${escapeHtml(content.imageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>
        <tr><td style="padding:24px;">
          ${content.sample ? '<p style="margin:0 0 10px;color:#803522;font-weight:bold;">Sample newsletter</p>' : ''}
          <h1 style="font:700 31px/1.2 Georgia,serif;margin:0 0 12px;">${title}</h1>
          <p style="margin:0 0 12px;">${description}</p>
          ${meetingDetails}
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr><td bgcolor="#a14630" style="border-radius:5px;">
              <a href="${escapeHtml(content.articleUrl)}" style="display:inline-block;padding:12px 17px;color:#fff;text-decoration:underline;font-weight:bold;">Read the full announcement</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td bgcolor="#e4e9db" style="padding:16px 24px;font-size:14px;">
          ${name}<br>
          <a href="{$unsubscribe}" style="color:#803522;">Unsubscribe</a>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}
