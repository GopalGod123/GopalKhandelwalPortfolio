# Gopal Khandelwal — Portfolio

Personal site for a full-stack AI engineer: React 19, Vite, Tailwind CSS, framer-motion, Three.js, and an AI assistant powered by Groq.

## Run locally

```bash
npm install
cp .env.example .env   # then add your Groq key
npm run dev            # http://localhost:5173 (the /api routes run inside the dev server)
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server, including the `/api/chat` and `/api/tts` functions |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | ESLint |
| `npm test` | Vitest: API validation, prompt safety, content checks |

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Server only | Used by `api/chat.js` and `api/tts.js`. **Never prefix with `VITE_`**, or Vite will ship it to the browser. |
| `GROQ_CHAT_MODEL` | Server only, optional | Override the chat model (default `openai/gpt-oss-120b`). |
| `RESEND_API_KEY` | Server only, optional | Enables the contact form (`api/contact.js`). Without it the form falls back to mailto. |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Server only, optional | Recipient (defaults to the profile email) and verified sender. |

## Editing content

All copy lives in **[`src/data/portfolio.js`](src/data/portfolio.js)**: profile, metrics, projects, the `roadmap` of planned projects, experience, skills and education. When a roadmap project ships, move it into `projects` with real results. The AI assistant's knowledge is generated from the same file, so the site and the chatbot never drift apart.

Project illustrations are drawn in code (`src/components/ui/ProjectVisual.jsx`). To use a real screenshot instead, add `image: '/images/your-file.webp'` to a project.

Source photos live in `design/source-photos/`. Optimized versions are in `public/images/`.

## Deploying

The `api/` folder follows the Vercel serverless-function convention, so deploying to Vercel needs no configuration. Set `GROQ_API_KEY` in the project's environment variables. On another host (Netlify, Cloudflare), port the two handlers in `api/` to that platform's function format.

## Structure

```
api/                 serverless functions (chat streaming, text-to-speech, contact form)
src/data/            portfolio.js: the single source of content
src/components/
  layout/            Navbar, Footer
  sections/          Hero, Work, Experience, Stack, Lab, Roadmap, About, Credentials, Contact
  chat/              AI assistant (lazy-loaded)
  lab/               Three.js radar demo (lazy-loaded)
  ui/                shared primitives
src/lib, src/hooks   motion presets, scroll lock, active-section tracking
tests/               Vitest suites
```

See [docs/UPGRADE_PLAN.md](docs/UPGRADE_PLAN.md) for what's done, what needs your accounts, and what to build next.
