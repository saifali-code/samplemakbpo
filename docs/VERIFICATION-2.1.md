# React delivery verification — version 2.1

Verified 1 November 2026. Build runtime: Node 24.22.1. Project requirement: Node 22.12 or newer.

## Passed

- Production Vite build: **42 fully pre-rendered React pages and a custom 404**, with route-specific module preloads, metadata, JSON-LD, robots, sitemap, and hosting headers.
- **903 source/build checks** verify actual page HTML, a single H1 and canonical URL, structured data, existing local assets, the published shift, and exactly two form destinations.
- **70 passing tests** cover chatbot matching and new company facts, SEO metadata/schema, and both submission types, validation, configuration and failure propagation.
- Production browser checks: all 42 pages at 360, 768, and 1440 CSS pixels (**126 page/viewport combinations**), plus nine key pages in Light/Ocean at all three widths (**27 more**). No horizontal overflow. No first-party application console errors were observed.
- Two initial heading-count observations landed during React loading transitions. Both were rechecked after hydration and had one visible H1; every built HTML file independently contains exactly one H1.
- All five palette controls changed the actual CSS theme. Light, Dark, and Auto were exercised. Light-mode navigation and hero contrast were visually corrected and reviewed.
- Contact and Careers are the only form pages. Partnership uses Contact. No CV uploader exists. The unconfigured Contact form reported “not sent” and retained entered details.
- The browser chatbot correctly answered the Pakistan night-shift question with **6:00 PM–5:00 AM PKT, ending the following morning**, and explicitly explained that there is no Pakistan daytime shift.
- The contact map had no iframe initially, created one on request with the supplied address query, and returned to the overview using its back control.
- The Team page displays four clearly labelled samples and a `noindex` directive. All ten footer social links use editable dummy destinations.
- The homepage contains one decorative building background. Other routes contain no background model. Phone layouts use CSS 3D; no foreground model viewer or controls are added.

## Asset and loading changes

| Asset | Previous source asset | UI derivative |
| --- | ---: | ---: |
| MAK logo | 606,598 bytes PNG | 23,874 bytes WebP |
| Two fonts combined | 301,376 bytes TTF | 103,140 bytes WOFF2 |
| Mobile building facade | 244,388 bytes original JPEG | 86,302 bytes WebP |

The final main entry is about 451.6 KB minified / 144.9 KB gzip, with shared content in a separate roughly 9.5 KB gzip chunk. Secondary routes, chatbot, EmailJS SDK, and the optional Three.js renderer are split out. These are build/file-size measurements, not a Lighthouse score or a claim of measured load time on every device. Actual delivery depends on host compression, caching, connection and hardware.

## Owner configuration and practical limits

- Live inbox delivery still requires the owner's EmailJS identifiers and an actual inbox test. No live test email was sent from this environment.
- Replace the deliberately supplied social dummy URLs and sample team profiles before presenting them as official. Set `teamIsPlaceholder = false` once real team details are complete.
- The browser environment did not offer usable WebGL2. CSS 3D was visually checked and the Three.js chunk builds; hardware WebGL output still needs a capable-device check.
- The front and sign preserve the original photograph. Unseen building surfaces and depth are approximated, because only a front photo was supplied.
- Google Maps is an external address search. Its external map rendering and exact location match depend on Google and the visitor's network. A location overview and direct map/directions links remain available; coordinates were not guessed.
- SEO pages must be served on a public domain to be crawlable. The owner-private preview retains its access setting. The appearance gallery and placeholder team page are intentionally excluded from the search sitemap.

`previews/` contains design captures. The ZIP includes source, lockfile, assets, documentation and `dist`; it excludes dependencies, Git metadata, private settings and temporary review harnesses.
