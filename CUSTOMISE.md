# Make this MAK website your own

## Team profiles

Edit `src/data/team.mjs`. Each sample has a name, role, focus, introduction, and optional `photo` URL. Put a real photo in `public/assets/team/` and set, for example, `photo: '/assets/team/operations-lead.webp'`. Use only images and biographies you are authorised to publish.

After replacing all sample details, set `teamIsPlaceholder = false`. Update the Team description in `src/data/routes.mjs`. The sample notice disappears and the next build includes the team page in the search sitemap. Team profiles are never represented as invented real people in structured data.

## Social links

Open `src/config/site.js` and replace the ten `https://example.com/mak-bpo/...` URLs with your own official profiles. The buttons already work as links; the supplied URLs are deliberately dummy destinations. WhatsApp already uses MAK's supplied number.

## Company and shift information

`src/data/content.mjs` holds the company record and service/job/FAQ copy. The confirmed hours are 6:00 PM–5:00 AM PKT, ending the following morning. If hours change, update `company.hours`, `company.hoursDetail`, the relevant FAQ and career copy, and `src/data/chat.mjs`. Search for the old hours to keep the homepage, footer, jobs, metadata, and chatbot consistent.

## Appearance and motion

`src/config/site.js` defines five palette names and descriptions. CSS variables and shared appearance rules are in `src/styles/experience.css`; base layout and hero rules are in `base.css` and `react.css`. Light and Dark are explicit brightness modes; Auto follows the visitor's device setting. Preferences are stored locally in the browser. The single header toggle is `src/components/ModeToggle.jsx`; its control styling and enhanced building motion are in `src/styles/motion-upgrade.css`.

The hero model is a decorative background only. Keep it behind the content when adjusting layout. The mobile version uses CSS 3D to avoid downloading the large WebGL library. Motion respects the user's reduced-motion setting and the hero pause button.

## Images and fonts

The site uses pre-optimised WebP images and WOFF2 fonts. Original PNG, JPG, and TTF assets are retained. Replacing only an original file does not regenerate the derivative automatically; replace the corresponding WebP as well. The small mobile facade is `mak-headquarters-640.webp`. Font licence files are included.

## Forms and future backend

Contact and Careers are the only two forms. Edit shared fields in `src/components/EmailForm.jsx`. Add your public EmailJS identifiers in `.env.local`; template instructions are in `docs/EMAILJS-SETUP.md`. Partnership uses the Contact topic selector.

To add Express/MongoDB later, replace `src/services/submissions.js` with your API adapter. Keep private credentials on that future server.

After editing, run `npm run build`, `npm run check`, and `npm test`, then redeploy `dist`.
