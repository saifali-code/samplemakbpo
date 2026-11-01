# Version 2.2 verification

Verified 1 November 2026. This update adds the single visible header Light/Dark toggle and strengthens the background building motion. The 42-page React + Vite frontend, two EmailJS forms, SEO export, company information, sample team and dummy social links remain included.

## Checks

- Production build passed. All **42 pages** are pre-rendered, with one H1, metadata, structured data, and canonical URLs.
- **905 source/build checks** and **70 regression tests** passed.
- The header and homepage were checked in Light and Dark at **320, 360, 390, 600, 768, 1024, 1100, and 1440 CSS pixels**. The button stayed visible and did not collide with the brand/navigation.
- A 320-pixel check found an older decorative orbit label extending beyond the viewport. Its position and the narrow-screen title sizing were corrected; both brightness modes were retested without horizontal overflow.
- Contact, Careers and Team were checked at **320, 768, and 1440 pixels**. Both intended forms remained present, Team had no form, and the model stayed exclusive to the homepage background. No document overflow occurred.
- The single toggle changed the document's actual brightness mode and its accessible target label; the setting survived reload. Tablet navigation opened and closed correctly, and Contact navigation reached the form.
- Two computed CSS 3D matrices taken at different moments differed, confirming that the model was moving. Pause changed its animation state to `paused`; its matrix stayed fixed while changing brightness. Resume reactivated it.
- No first-party application console errors were observed in these browser checks.

## Rendering and setup limits

The browser used for review did not expose usable WebGL2. The active CSS 3D presentation was visually and functionally checked. The enhanced Three.js scene builds but still needs a hardware WebGL check. Mobile and constrained devices deliberately keep CSS 3D to avoid the large renderer download.

The front/sign preserve the supplied image; hidden building surfaces remain approximated. Reduced-motion preferences suppress the animation. Viewport checks are not a claim of testing every physical device.

EmailJS identifiers still need to be supplied for live inbox delivery. Team profiles and ten social URLs remain clearly editable samples. These settings and deployment steps are covered by the included guides.

The full version 2.1 SEO, asset and all-route review is retained in `VERIFICATION-2.1.md`. Current animation/header checks are recorded in `motion-update-checks.json`; current previews are in `previews/`.
