# EmailJS — two forms, no backend

The React app uses `@emailjs/browser` through `src/services/submissions.js`. There are exactly two form types: **Contact** and **Careers**. Partnership enquiries are Contact messages with a selected topic. No EmailJS IDs were supplied; delivery is inactive until you configure your own account. Failed or unconfigured submissions keep the entered values and never show a false success.

## 1. Connect an email service

Sign in at https://www.emailjs.com/ and connect your email service. Confirm it can deliver to **info@makbpotelecommunications.com**. Copy the Service ID and account Public Key.

All `VITE_` values are public browser settings. Never put a private key, SMTP credential, or mailbox password in them.

## 2. Create Contact and Careers templates

Create one template for each form with these settings:

| Setting | Value |
| --- | --- |
| To Email | Fixed `info@makbpotelecommunications.com` |
| Reply To | `{{reply_to}}` |
| From Email | Your connected service's verified/default sender |
| From Name | `MAK Website` |
| Contact subject | `MAK enquiry: {{subject}}` |
| Careers subject | `MAK application: {{position}} — {{from_name}}` |

Use the enquirer's address for Reply To, not as the From Email sender.

Contact body:

```text
New MAK website enquiry
Name: {{from_name}}
Email: {{reply_to}}
Phone / WhatsApp: {{phone}}
Company: {{company}}
Topic: {{subject}}

Message:
{{message}}

Permission: {{consent}}
Submitted: {{submitted_at}}
Page: {{page_url}}
Form: {{form_type}}
```

Careers body:

```text
New MAK career application
Position: {{position}}
Full name: {{from_name}}
Email: {{reply_to}}
Phone / WhatsApp: {{phone}}
City: {{city}}
Experience: {{experience}}

Introduction:
{{message}}

Permission: {{consent}}
Submitted: {{submitted_at}}
Page: {{page_url}}
Form: {{form_type}}
```

There are no attachments. Applicants select Junior Closer, Closer, or Validators without uploading a CV.

## 3. Configure the React app

Copy `.env.example` to `.env.local` in the project root:

```dotenv
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_actual_contact_template_id
VITE_EMAILJS_CAREERS_TEMPLATE_ID=your_actual_careers_template_id
VITE_SITE_URL=https://makbpotelecommunications.com
```

Replace all example values with actual dashboard identifiers. Restart `npm run dev` after changes. For hosting, run `npm run build` again and upload the updated `dist`. Vite embeds these public values at build time. `.env.local` is ignored by Git and is not supplied in this ZIP.

## 4. Allow origins

In EmailJS allow your local origin, normally `http://localhost:5173`, and your real production HTTPS origin. Allow a separate preview origin if testing there. Dashboard labels and available controls depend on your account and plan. Keep account/template limits appropriate to your traffic.

The app includes validation, consent, a honeypot, sending feedback, and a short duplicate-send cooldown. These are browser conveniences; apply origin and usage controls in EmailJS too.

## 5. Verify actual delivery

1. Test each template in the EmailJS dashboard.
2. Submit a Contact enquiry from React, including a partnership topic if desired.
3. Submit a Careers application. Wait at least 30 seconds between successful submissions.
4. Confirm both messages arrive in the correct inbox and Reply addresses the applicant/enquirer.
5. Repeat on the deployed HTTPS origin after allowing it in EmailJS.

SDK success means EmailJS accepted a request; receiving inbox delivery still needs verification. This project was tested with missing settings and an injected SDK test double. A live email test was not possible without your account identifiers.

Official documentation: https://www.emailjs.com/docs/sdk/send/ and https://www.emailjs.com/docs/sdk/installation/.
