# Borrego Environmental Committee

An Astro website for a volunteer desert environmental group. The site is hosted by the Borrego-Environmental-Committee GitHub account.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
npm run build
npm run verify
```

Commit the generated `package-lock.json` after the first successful install. To check a GitHub Pages project subpath locally, use the same values for both commands.

```sh
SITE_URL=https://example.github.io SITE_BASE=/desert-website npm run build
SITE_URL=https://example.github.io SITE_BASE=/desert-website npm run verify
```

## Edit the website

| What changes | Where to edit |
| --- | --- |
| Group name, contact address, social links, and public MailerLite embed values | `src/site.ts` |
| Confirmed Zoom schedule and previous topics | `src/meetings.ts` |
| Announcements and news | `src/content/news/` |
| Images | `public/images/` |
| Shared design | `src/styles/global.css` |

Use full ISO timestamps with an explicit UTC offset and the intended IANA time zone for meetings. Keep old events in `events` so past articles can still display the meeting information. Put historical topics without a full event record in `previous`. Publish a new build after changing dates, crossing a meeting date, or wanting a future-dated post to appear on this static site.

## Publish to GitHub Pages

1. Connect the GitHub account that can administer the Borrego repository and grant Codex access to that repository. Create a public website repository for GitHub Free if there is no existing one.
2. In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Put the website files on `main`. The workflow builds Astro, checks the generated internal links, and deploys to Pages. The Pages configuration provides the public origin and project subpath automatically.
4. Verify the homepage, all three sample articles, and Contact & Subscribe at the deployment URL shown by Actions. Review the GitHub Pages site after each approved announcement.

## Set up MailerLite

Connect the remote MailerLite server to Codex and authorize its browser flow. Restart or open a Codex session that loads the new server.

```sh
codex mcp add mailerlite --url https://mcp.mailerlite.com/mcp
codex mcp login mailerlite
```

For GitHub's direct MCP server, follow the [GitHub Codex configuration guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md). Keep credentials in the environment or the OAuth credential store.

Inspect existing forms and groups first. Reuse an appropriate group and form. If a new embedded form is needed, keep email required, first name optional, and use a Subscribe button. Enable double opt-in, reCAPTCHA where available, and a success message asking the subscriber to check their inbox. MailerLite's [embedded form guide](https://www.mailerlite.com/help/how-to-create-an-embedded-form) shows the settings to complete in the dashboard if the account's MCP tools omit them.

Copy the account ID and the exact `data-form` value from MailerLite's JavaScript embed into `src/site.ts`. Optionally include the public hosted form URL. Redeploy and test with an address you authorize for testing. Check the form's confirmation message, confirmation email, and the intended group. Verify the active forms count remains within the [MailerLite Free plan allowance](https://www.mailerlite.com/help/free-plan-update-faq). Use standard Free-plan form features and check compatibility after the trial.

## Publish an announcement

Ask Codex to write the announcement and provide any confirmed meeting details or links. Codex prepares the Markdown article and previews the article and email for review. Say “Publish this announcement to the website and create a MailerLite draft” when ready. For a site-only post, say “Publish this on the website only.”

Each article uses its filename as the public URL slug. Use the sample meeting post as a reference. Set `draft: true` until approved, then supply the actual publication date and set `draft: false`. Set `email: true` when an email is requested. For meeting coverage, `meetingStartsAt` points to the corresponding schedule entry. The email shares the title, description, image, and meeting fields from the site article and links to the full text.

To preview the sample email or a new email, build with the public site's settings.

```sh
SITE_URL=https://example.github.io SITE_BASE=/desert-website npm run email:preview
```

Open `.email-preview/email-preview/upcoming-monthly-zoom-meeting.html` for the sample. Preview builds also render draft article pages under `.email-preview/news/`. For a working local preview of both, run `EMAIL_PREVIEW=1 npm run preview` with the same `SITE_URL` and `SITE_BASE` values. Review the subject, article URL, meeting details, image, sender, group, unsubscribe link, and postal footer before sending.

When MailerLite permits campaign draft creation with HTML, Codex creates a regular draft and returns the dashboard link. If the plan limits campaign creation or raw HTML, use the prepared HTML and newsletter copy in the MailerLite dashboard's available editor. Verify that MailerLite added the account postal address and that its unsubscribe link resolves before using the draft. Sending stays with the group.

## Images

The four original illustrations in `public/images/` were created with the built-in ImageGen tool and compressed as JPEGs. They depict an illustrative desert sunset, desert ridges with saguaros, a tortoise, and spring flowers. They do not represent a documented event or exact location and have no third-party photo attribution. Record the creator, source, and license for any replacement photography.

### Image generation prompts

- **Sunset hero:** Photorealistic Sonoran desert panorama at an apricot and dusty coral sunset. A dark saguaro rises at right, with layered slate blue mountain ridges and low-contrast space for a headline at left.
- **Article images:** Realistic natural-history editorial photographs of ochre ridges with saguaros, a desert tortoise walking through scrub, and violet lupines and orange poppies backdropped by soft hills. Subjects come from separately cropped frames in an ImageGen contact sheet.
