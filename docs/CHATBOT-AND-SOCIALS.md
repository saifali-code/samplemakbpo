# Chatbot, social links, and direct contact

`src/components/Chatbot.jsx` is a working local FAQ assistant using `src/data/chat.mjs`. It needs no AI provider, paid API key, backend, or login. It answers questions about the full Rawalpindi address, Pakistan night shift (6 PM–5 AM PKT), U.S. campaign focus, roles, applications, services, partnerships, sample team, colour controls, calls, WhatsApp, and email. Unknown questions are directed to the team rather than answered with invented facts.

Chat messages exist only in React memory in the current tab. Closing the panel, changing routes, or refreshing clears that conversation. “New chat” resets it. The local matcher does not send typed questions to an AI service or inbox. Following an external contact/share link uses the chosen service.

Update `src/data/content.mjs` and the relevant `src/data/chat.mjs` answers when hiring or company information changes. Run `npm test` after editing matching logic. The composer is an input and button, not a third form.

## Social profiles

All ten profile controls are ordinary HTTPS links in `socials` in `src/config/site.js`: Facebook, Instagram, LinkedIn, X, YouTube, TikTok, Threads, Pinterest, Snapchat, and Telegram. They currently use reserved `example.com` dummy links, as requested. Replace each with its actual MAK profile URL. Sample links are identified in accessible labels and marked `nofollow`; they are not represented as verified accounts in SEO data.

## Direct contact

- Call: `tel:+923364703667`
- WhatsApp: `https://wa.me/923364703667`
- Email: `info@makbpotelecommunications.com`

These links are included in the persistent contact dock and relevant chatbot answers. Phone handling depends on the device/calling app; WhatsApp opens its own service. Neither needs a website backend.
