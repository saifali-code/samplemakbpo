# MAK BPO — complete React project

React 19 + Vite + React Router, with Motion animations, an always-visible header Light/Dark toggle, and an animated Three.js/CSS architectural background. This is a component-based React frontend: real JSX pages, reusable components, hooks, routing, state, and editable source. There is **no application backend or database**.

## Run in VS Code

1. Install Node.js **22.12 or newer** from https://nodejs.org/ and VS Code from https://code.visualstudio.com/. Use the current Node LTS.
2. Extract the ZIP. In VS Code select **File → Open Folder → MAK-BPO-React**, the folder containing `package.json`. Do not open only `dist`.
3. Select **Terminal → New Terminal** and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the Local URL printed by Vite, normally **http://localhost:5173/**. Keep the terminal running. Saved source changes update the browser automatically.
5. Press **Ctrl+C** to stop. On subsequent visits, run `npm run dev` again.

If Windows PowerShell blocks `npm.ps1`, choose **Command Prompt** in the VS Code terminal dropdown, or use `npm.cmd install` and `npm.cmd run dev`. Do not change security settings. An optional `START-WEBSITE.bat` launcher is included.

Detailed setup and troubleshooting: [RUN_IN_VSCODE.md](RUN_IN_VSCODE.md).

## Activate the two EmailJS forms

The site runs immediately, but actual email delivery needs your own EmailJS account identifiers. They were not supplied. Until configured, the form reports that the message was not sent and retains entered values.

1. Copy `.env.example` to `.env.local` beside `package.json`.
2. Replace the four blank EmailJS values with your account's Public Key, Service ID, Contact Template ID, and Careers Template ID. Set `VITE_SITE_URL` to your final HTTPS origin.
3. Configure both templates to deliver to `info@makbpotelecommunications.com`, allow the development and production origins in EmailJS, then restart Vite.
4. Test Contact and Careers and confirm actual inbox delivery.

Exactly two forms exist: **Contact** and **Careers**. Partnership enquiries use Contact with “Partnership / collaboration” selected. Careers offers Junior Closer, Closer, and Validators. There is no CV upload. The chatbot composer is not a third form.

Full template bodies and dashboard settings: [docs/EMAILJS-SETUP.md](docs/EMAILJS-SETUP.md). Never put a private key, SMTP credential, or mailbox password in this frontend.

## Included experience

- 42 routes and a custom not-found screen: Home, About, Team, Services, 12 service details, Campaigns, 6 campaign details, Careers, 3 job details, Life at MAK, Partnership, Our Approach, Quality, Contact, FAQs, Insights, 3 articles, Themes, Privacy, Terms, Accessibility, and Sitemap.
- Detailed Final Expense, IUL, Auto Insurance, and ACA **campaign support** pages. Additional BPO capabilities and industry examples are scoped as topics to discuss with MAK; no invented credentials, client claims, statistics, or testimonials.
- Five selectable palettes: Orbit Blue, Aurora Mint, Midnight Violet, Ember Gold, and Ocean Cyan. Each supports Light, Dark, and Auto appearance. The signature palette retains the blue signboard and white logo branding.
- The supplied building and actual signboard as a photo-textured, dimensional **homepage background only**. Three.js loads after an idle period on suitable desktop devices with WebGL2; mobile, reduced-motion, constrained, and unsupported devices use the animated CSS 3D presentation. The unseen side walls and roof are estimated from the single supplied image.
- A single header Light/Dark button that switches the entire site and remembers the choice, including on phones and tablets.
- Animated headline entrances, stars and trails, light sweeps, orbital lines, scroll reveals, marquees, card interactions, filter transitions, a progress bar, and chatbot transitions.
- Responsive mobile, tablet, and laptop layouts, reduced-motion support, and a hero pause control.
- An active local FAQ chatbot for hiring, location, services, partnerships, and applications; call/WhatsApp actions; ten social profile buttons with editable dummy links; an on-demand Google map and directions.
- Source, lockfile, original assets, local fonts, tests, setup guides, and a prebuilt `dist` export.

## Confirmed MAK information

MAK is based in Satellite Town, Rawalpindi, Pakistan, and specialises in U.S. insurance campaign support. The stated Pakistan shift is **6:00 PM–5:00 AM PKT (UTC+05:00), ending the following morning**. Working days and interview appointments still need direct confirmation; no seven-day schedule or single U.S. time-zone conversion is invented. The confirmed openings are Junior Closer, Closer, and Validators.

## Edit the project

| Change | File |
| --- | --- |
| Company, services, campaigns, roles, FAQs, articles | `src/data/content.mjs` |
| Official social URLs and theme descriptions | `src/config/site.js` |
| Team profiles and optional photographs | `src/data/team.mjs` |
| Chatbot answers | `src/data/chat.mjs` |
| Form fields and feedback | `src/components/EmailForm.jsx` |
| Public EmailJS configuration | `.env.local`, `src/config/emailjs.js` |
| Future backend adapter | `src/services/submissions.js` |
| Homepage | `src/pages/Home.jsx` |
| Building | `src/components/BuildingBackground.jsx`, `src/graphics/createBuildingScene.js` |
| Styling and responsive rules | `src/styles/base.css`, `src/styles/react.css`, `src/styles/experience.css`, `src/styles/motion-upgrade.css` |
| Route metadata and export list | `src/data/routes.mjs` |
| Policy copy | `src/data/legal.mjs` |

The ten social buttons deliberately use reserved `example.com` dummy URLs. Replace them in `src/config/site.js`. Edit team names, roles, biographies, and optional photo paths in `src/data/team.mjs`; the current profiles are clearly labelled samples. After adding real team details, set `teamIsPlaceholder` to `false` and update the Team description in `src/data/routes.mjs`.

## Build and preview

```bash
npm run build
npm run check
npm test
npm run preview
```

Open Vite's preview URL, normally http://localhost:4173/. Upload the **contents of `dist`** to a static host at the domain root. The build generates physical entry files for all 42 routes, supporting direct visits without an application server. Every page is pre-rendered into complete HTML at build time, then hydrated by React in the browser. No deployment server is needed. Configure `404.html` as the host's not-found page if required.

`VITE_SITE_URL` is read from `.env.local` during build for metadata and sitemap generation. Changing public environment values requires rebuilding the deployed app.

## SEO and loading performance

Pages contain full headings and readable content in their built HTML, unique titles/descriptions, canonical URLs, social preview metadata, and relevant JSON-LD. A sitemap and robots file are generated. The sample team page is `noindex` until its placeholder flag is removed; appearance settings stay out of the search index. No ranking or rich-result guarantee is made.

Routes are split into separate chunks, the chatbot loads on opening, EmailJS loads on a configured submission, and Google Maps loads only on request. Logo/photo derivatives use WebP, fonts use WOFF2 with swap, and built JS/CSS are minified. Original image/font files remain included for editing and provenance.

Deployment and SEO instructions: [DEPLOYMENT.md](DEPLOYMENT.md). Customisation guide: [CUSTOMISE.md](CUSTOMISE.md).

## Backend later

This is the **React frontend portion of MERN**. Express, MongoDB, authentication, and server hosting are intentionally not included. Add a separate server later and replace `src/services/submissions.js` while keeping the form components. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Read [docs/VERIFICATION.md](docs/VERIFICATION.md) for test results and limits, and [docs/THIRD-PARTY-NOTICES.md](docs/THIRD-PARTY-NOTICES.md) for asset and dependency notices.
