# Run in VS Code, step by step

1. Install **Node.js 22.12 or later**, preferably the current LTS, from https://nodejs.org/. npm is included. Install VS Code from https://code.visualstudio.com/.
2. Extract the entire ZIP. Keep all folders together; do not edit inside the ZIP viewer.
3. In VS Code choose **File → Open Folder** and select `MAK-BPO-React`. Explorer should show `package.json`, `src`, `public`, and `vite.config.js`.
4. Choose **Terminal → New Terminal**. Check the tools:

   ```bash
   node --version
   npm --version
   ```

5. Install dependencies from inside the project folder:

   ```bash
   npm install
   ```

   Internet access is needed for the first install. `node_modules` is intentionally excluded from the ZIP; npm recreates it using the package manifest and lockfile.

6. Start the React development server:

   ```bash
   npm run dev
   ```

7. Open **http://localhost:5173/**, or Vite's exact printed Local URL if the port is occupied. Do not double-click `index.html` or use the Live Server extension.
8. Edit JSX/CSS in `src`, save, and inspect the browser. Leave the terminal open. Stop with **Ctrl+C**. Later you only need `npm run dev`, unless dependencies change.

On Windows, `START-WEBSITE.bat` can install missing dependencies and start Vite. If PowerShell blocks `npm.ps1`, select **Command Prompt** from the terminal dropdown, or use `npm.cmd install` and `npm.cmd run dev`.

## Connect EmailJS

1. Copy `.env.example` to **`.env.local`** beside `package.json`, retaining the leading dot.
2. Add your EmailJS Public Key, Service ID, Contact Template ID, and Careers Template ID. Never enter private keys or mail passwords.
3. Set `VITE_SITE_URL` to your final HTTPS domain.
4. Follow `docs/EMAILJS-SETUP.md` to configure the two dashboard templates and allowed origins.
5. Stop Vite with **Ctrl+C**, then restart `npm run dev` so it reads the new settings.
6. Test Contact and Careers, wait 30 seconds between successful submissions, and confirm actual emails arrive.

The two forms use one connected email service. Partnership enquiries share Contact. No CV upload or third partnership form exists.

## Production upload

```bash
npm run build
npm run check
npm test
npm run preview
```

Open the preview URL, normally **http://localhost:4173/**. Upload the contents of `dist` to the root of a static hosting account. Keep its `assets`, page directories, and generated root files together. Do not upload `node_modules` or `.env.local`.

The included `dist` snapshot was built without your EmailJS identifiers. After adding them, rebuild before uploading. No MongoDB, Express, database, or backend startup is needed.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `node` / `npm` not recognised | Install Node, close VS Code fully, and reopen it. |
| Unsupported Node version | Install Node 22.12+ or a later supported LTS. |
| `package.json` not found | Open the extracted folder containing it and check the terminal path. |
| `vite` not found | Run `npm install` inside the project. |
| Port 5173 occupied | Use the different Local URL Vite prints; allow that origin in EmailJS. |
| Blank page from an HTML file | Use `npm run dev` rather than the file viewer. |
| Form says online submission is being connected | Fill `.env.local`, check both template IDs, then restart Vite. |
| EmailJS rejects delivery | Check IDs, allowed domains, quota, recipient, and dashboard template tests. |
| Local email works but hosted email fails | Rebuild with the values and allow the hosted origin in EmailJS. |
| Google map unavailable | Use the supplied Open in Google Maps / Get directions links. |
