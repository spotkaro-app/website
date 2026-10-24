# SPOTKARO — Cinematic Landing Page

A responsive Next.js landing page concept built around a cinematic urban signal aesthetic:
- Asphalt black, warm paper, signal orange and restrained yellow
- Animated canvas city grid with interactive mouse proximity, moving route signals and glowing nodes
- Framer Motion hero typography, scroll choreography, floating task signals and reveal transitions
- Interactive two-flow switcher: Request a Task / Find Work Nearby
- Hover/click mission selector with animated image transitions
- Animated ticker, orbital diagrams, responsive navigation and reduced-motion support
- Launch email form demo saves addresses to browser localStorage only

## Run locally

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Deploy. No environment variables are required for this landing page demo.

## Important production notes

- The launch form is intentionally a frontend demo and stores submissions only in the visitor's local browser. Connect it to an API/CRM before collecting real launch signups.
- Photos are loaded from Unsplash URLs and Google Fonts are imported remotely. For production control, download licensed/approved assets into `public/` and self-host fonts.
- The app presents task types as examples and includes venue permission/safety caveats. Do not imply all task categories are universally permitted.
- No authentication, task backend, payments, or worker dispatch is included: this deliverable is the marketing landing page only.
- Replace placeholder app-store links with real store links when available.
- Brand/domain/trademark clearance should be completed before public launch.
