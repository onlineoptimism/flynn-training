# OO AI Training Course

Internal AI training course for Online Optimism staff, hosted at [learncowork.onlineoptimism.com](https://learncowork.onlineoptimism.com).

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

## File Structure

```
flynn-training/
├── index.html          # Course overview + intro video
├── module-0.html       # Welcome to the AI Tools Family
├── module-1.html       # Claude Chat
├── module-2.html       # Claude Cowork (department tab walkthroughs)
├── module-3.html       # Claude Code
├── module-3-1.html     # GitHub + Cloudflare Deploy (step-by-step)
├── module-4.html       # Final Project + celebration screen
├── styles.css          # Full design system (colors, typography, components)
├── nav.js              # Sidebar navigation builder + mobile toggle
└── progress.js         # Module completion, prompt saving, tab switching
```

## Local Development

No build step needed. Open any `.html` file directly in a browser, or run a local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub under the `onlineoptimism` org.
2. Log in to [pages.cloudflare.com](https://pages.cloudflare.com) with the OO Cloudflare account.
3. Click **Create application** > **Connect to Git** > select this repo.
4. Leave all build settings blank (static HTML, no build command needed).
5. Click **Deploy**. The site goes live at a `*.pages.dev` URL automatically.

## Adding the DNS CNAME for Flynn

To point `learncowork.onlineoptimism.com` at the Cloudflare Pages deployment:

1. In the Cloudflare Pages project, go to **Settings** > **Custom domains**.
2. Add `learncowork.onlineoptimism.com`.
3. Since `onlineoptimism.com` is already on Cloudflare DNS, the CNAME record is created automatically.
4. SSL is provisioned automatically. No extra configuration needed.

**Manual DNS entry** (if needed):

| Type  | Name            | Target                              |
|-------|-----------------|-------------------------------------|
| CNAME | learncowork     | `<project-name>.pages.dev`          |

## Brand Notes

- Colors: `#006037` (deep green), `#00bf6f` (bright green), `#f3fae0` (grello)
- Headings: Roboto Mono Bold, uppercase
- Body: Roboto
- Accent: Playwrite GB S (decorative only, never headings or body)
- Cards: `border: 4px solid #000; border-radius: 6px; box-shadow: -8px 8px 0px #000`

## Progress Tracking

All progress is stored in `localStorage` with the prefix `oo-course-`. No server required. Completions persist across sessions on the same browser/device.
