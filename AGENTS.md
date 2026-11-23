# Maintaining the desert environmental group site

This is an Astro static site for GitHub Pages. The intended GitHub owner is Borrego-Environmental-Committee. Resolve the real repository and Pages URL using a connected GitHub MCP. Reuse the authorized existing repository when present. Use GitHub MCP for repository reads and writes when the connected tool supports the operation. Use GitHub repository admin settings for Pages features outside its tool coverage.

## Announcements

- Draft in `src/content/news/<descriptive-slug>.md` with `draft: true`. The filename is the stable article ID. Include the title, concise description, category, image path and alt text, related article IDs, and an actual publication date for real stories.
- Confirm the date, time zone, topic, and public Zoom registration or join URL for a real meeting. Use `src/meetings.ts` as the shared record and reference it by exact `meetingStartsAt` timestamp in the article. Keep event records used by old articles. Leave unconfirmed details blank or explicitly forthcoming.
- Use original or licensed images, optimize web files, and record attribution in the README when needed. Leave sample content visibly labeled.
- Set `email: true` for an email announcement. Build both previews with `npm run email:preview`, setting `SITE_URL` and `SITE_BASE` from the verified Pages URL. The web preview and email use the same Markdown frontmatter and meeting data. Share both previews, plus the proposed email subject and audience, for approval. For web-only announcements, preview the web page and omit the campaign.
- Once the user approves publishing, set `draft: false`, build and verify, then publish through GitHub. Use the approved branch or pull request workflow. Verify the Pages run and the public article and image URLs.
- After approval, check the verified MailerLite sender and matching subscriber group via MCP. Use an idempotent draft name based on the article slug and check for an existing draft before creating one. When supported, create or update a regular HTML campaign **draft**, verify its status and audience, and return the actual dashboard link. On restricted plans, provide ready-to-use HTML, subject, preheader, and plain-language newsletter copy from the same source. Never schedule or send an email as part of this workflow. The user reviews and sends in MailerLite.
- If the user asks for email about an existing article, reuse the published article or add its email flag locally for a preview without republishing unless the article itself changes.

## Meetings, form, and subscribers

- Update meetings in `src/meetings.ts`. Add only confirmed and approved public details. Share a preview if requested and publish when authorized.
- Use MailerLite MCP to list existing groups and forms before creating anything. Keep the Free plan in mind. Use MailerLite for storage, consent, confirmation, unsubscribes, and delivery.
- Add only public form embed values to `src/site.ts`. Leave signup visibly unavailable until the real form is ready. Keep credentials and private subscriber data out of the repo.
- For subscriber counts, verify the designated group and ask MailerLite MCP for aggregate active counts. State the group and status counted. Use account-wide totals only when requested.
- Keep `npm run build` and `npm run verify` passing at the Pages base path. Verify the relevant deployed pages after approved changes.
