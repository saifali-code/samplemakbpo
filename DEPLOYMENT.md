# Deploy the React + Vite website

This project deploys as static files. No backend, database, or Node process is required on the public hosting server.

## Build locally

1. Open the project in VS Code and run `npm install` with Node 22.12 or newer.
2. Copy `.env.example` to `.env.local` and set the four public EmailJS identifiers. Set `VITE_SITE_URL` to your real HTTPS origin, without a trailing page path.
3. Run:

   ```bash
   npm run build
   npm run check
   npm test
   npm run preview
   ```

4. Open the exact preview URL Vite prints, usually http://localhost:4173/. Test navigation, both forms, calls/WhatsApp, the map button, and appearance controls.
5. Upload the **contents of `dist`** to the domain root on your static host. Keep all page folders, assets, and generated root files together. Do not upload `node_modules`, `.env.local`, or the source project as the public document root.

The supplied `dist` was built without your EmailJS IDs. Rebuild with your own configuration before expecting email delivery. Test actual inbox receipt after deployment and allow the public origin in EmailJS.

## Git-based hosting

- **Vercel:** import the project, use the Vite preset, select Node 22.12+ or a supported later version, add the `VITE_` settings, and deploy. `vercel.json` supplies `npm run build`, the `dist` output directory, clean URLs, and trailing slashes.
- **Netlify:** import the project and set the same public environment values. `netlify.toml` supplies the build command, publish directory, and Node 22. Generated `_headers` applies caching and basic response headers where supported.
- **Other static hosts / cPanel:** build locally and upload `dist` contents. Configure the custom not-found page as `404.html` if your host exposes that setting. Every intended route has its own `index.html`, so there is no dependency on an Express route fallback.

The project is configured for a domain root. If deploying under a subdirectory, update Vite's `base`, asset paths, router basename, canonical URLs, and static export paths together.

## SEO setup

The build emits complete page HTML before JavaScript executes, then React hydrates it. Each route has its own heading and text, title, description, canonical URL, Open Graph/Twitter tags, and relevant structured data. The sitemap uses `VITE_SITE_URL`, with `https://makbpotelecommunications.com` as the editable default production origin.

Use the public HTTPS domain for `VITE_SITE_URL`, rebuild, and check that `sitemap.xml` and `robots.txt` contain that domain. An authenticated private preview is not a publicly crawlable production website. Search engines decide indexing, rankings, and rich results; metadata alone cannot guarantee them.

The sample Team page is deliberately `noindex` until you replace its profiles and set `teamIsPlaceholder` to `false`. The appearance gallery is also kept out of the search index. All 42 pages still exist and are linked in the visible website sitemap. Structured data contains the provided business details, without guessed coordinates, ratings, certifications, founders, or official social profiles.

U.S. focus and PKT shift hours are stated in the copy and Organization description. A weekly opening-hours schedule is not invented because the actual working days were not supplied.

## Performance behaviour

Production JavaScript and CSS are minified. Secondary routes, chatbot, EmailJS, and WebGL use separate chunks. The chatbot loads on opening; EmailJS loads on configured submission; Google Maps loads on request. Suitable desktops can load WebGL after idle, while mobile and constrained devices use the animated CSS 3D background.

The logo is about 24 KB in WebP, the mobile facade about 86 KB, and the two WOFF2 fonts about 103 KB combined. The original source assets remain included but are not the primary UI downloads. Results depend on the host's compression, caching, network and device. Generated caching headers are hints; verify your chosen host honours them.
