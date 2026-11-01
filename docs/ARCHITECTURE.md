# Architecture and future MERN backend

This is the React frontend portion of MERN. React renders all screens. Vite compiles JSX, CSS, and browser dependencies. React Router handles navigation. The build adds physical entry HTML files for all 42 routes to support direct links on static hosting. All routes are pre-rendered at build time, then hydrated by React. The deployed output remains static files, with no running renderer or application server.

| Area | Purpose |
| --- | --- |
| `src/main.jsx` | Creates or hydrates the React root with router and shared providers |
| `src/prerender.jsx` | Build-time renderer only, not a deployment backend |
| `src/App.jsx` | Shared layout and route declarations |
| `src/pages/` | Real JSX page components |
| `src/components/` | Shared navigation, cards, forms, chat, building, effects |
| `src/context/` | Theme and animation state |
| `src/data/` | Content, chatbot answers, policies, route metadata |
| `src/config/` | Public EmailJS values and social URLs |
| `src/services/submissions.js` | Delivery adapter, the future API boundary |
| `src/services/submission-core.mjs` | Validation and submission payloads |
| `src/graphics/` | Lazy-loaded Three.js scene |
| `public/assets/` | Original logo, building photo, local fonts |
| `scripts/` | Route export and project checks |
| `dist/` | Compiled static website |
| `tests/` | Chat and submission tests |

## Current forms

Contact and Careers call `sendSubmission(type, values)`. Contact also handles partnerships. Careers has three roles and no upload. The adapter calls EmailJS using public identifiers. No database, Express server, private mail credentials, or server startup exists.

## Add a backend later

1. Create a separate `server` project with Express and MongoDB and its own environment/hosting.
2. Add contact/application endpoints with server-side validation, abuse protection, suitable access control, storage, and email delivery.
3. Replace `sendSubmission` in `src/services/submissions.js` with a `fetch` call to those endpoints. Add a public API origin setting if needed.
4. Preserve its Promise contract: resolve on accepted requests and reject with a safe error. The existing React forms retain loading, feedback, reset, and value-retention behaviour.
5. Keep database connection strings and private credentials on the server. Rebuild the frontend.

## Building background

`BuildingBackground.jsx` mounts only inside the Home hero, is `aria-hidden`, and accepts no pointer interaction. It displays a photo-textured CSS 3D recreation first, then may load Three.js after idle on a suitable WebGL2 desktop. Mobile, reduced-motion, save-data, and constrained devices keep CSS 3D. React effects handle setup, pause, visibility, and cleanup.

The front and signboard preserve the supplied photograph. Side walls, roof, and depth are estimated because only one front image was supplied. This is an architectural presentation, not a measured CAD model.

Animations respect reduced-motion preferences. The hero also offers pause/resume. Star density and pixel ratio are capped, and rendering avoids work while hidden or outside the viewport.

## Loading boundaries

`App.jsx` lazily imports secondary page groups. `ContactDock.jsx` imports the chatbot only when opened. The EmailJS adapter imports its SDK only when a configured submission is sent. `LocationMap.jsx` embeds Google Maps on request and can return to its location overview. Route-specific module preloads help hydration of directly opened pages.

The build-time JSX compiler runs in middleware mode without opening an HTTP listener. It writes the page HTML, then closes. The `src/prerender.jsx` file is never an application server.

## Version 2.2 controls and motion

`ModeToggle.jsx` sits in the shared header on every route. It uses the same experience state as the palette panel, updates the actual site mode, and preserves the choice in browser storage. The compact navigation breakpoint keeps the control visible on tablet and phone widths.

The model adds more pronounced floating/yaw motion, a glass scan, sign lighting, orbit streams, and rising signals. A fine desktop pointer can add subtle parallax without intercepting foreground links. The WebGL scene adds a ground halo, light scan and small particle field; its animation clock holds its pose when paused. Mobile retains CSS 3D. Reduced-motion preferences and the hero pause control stop the decorative motion.
