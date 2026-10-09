# Portfolio Upgrade Plan: Status

_Updated: 2026-10-09_

## ✅ Done

| Area | What changed |
|---|---|
| **Security** | Groq key moved server-side (`api/chat.js`, `api/tts.js`); CI fails if a key ever lands in the bundle |
| **Design** | Winter-arc ice theme: procedural cracked-ice texture, glass-ice cards, glints, sparkles, snowfall toggle, low-poly glacier art |
| **Content** | One source of truth (`src/data/portfolio.js`) shared by the site and the AI assistant; experience years computed from start date |
| **AI assistant** | Fixed retired model (now `openai/gpt-oss-120b`), conversation memory, stream parsing, audio memory leak; knows the roadmap is *planned* |
| **Roadmap** | "Building next" section with 6 planned projects, clearly labelled as not shipped |
| **Contact** | Real form via `api/contact.js` (Resend), honeypot + rate limit; falls back to mailto until configured |
| **UX** | Command palette (Ctrl/⌘+K), scroll progress bar, active-section nav, accessible modals, reduced-motion support |
| **Performance** | Initial JS 1.13 MB → ~415 kB; Three.js + chat lazy-loaded; images ~6 MB → ~500 kB including textures |
| **SEO / PWA** | OG image, JSON-LD Person, `robots.txt`, `sitemap.xml`, web manifest + icons |
| **Quality** | Vitest (18 tests: API validation, prompt safety, content integrity) + GitHub Actions CI |

## 🔑 Needs you (accounts and keys)

1. **Rotate the Groq key.** The old one was public in the previous build. Put the new one in `.env` as `GROQ_API_KEY` (not `VITE_…`).
2. **Deploy on Vercel** (the `api/` folder works with no config). Add `GROQ_API_KEY` and, optionally, `RESEND_API_KEY` in Project → Settings → Environment Variables.
3. **Contact form:** create a free [Resend](https://resend.com) account and set `RESEND_API_KEY`. To send from your own domain, verify it in Resend and set `CONTACT_FROM_EMAIL`.
4. **Analytics:** enable Vercel Analytics (one click) or add Plausible. Then you'll see which projects recruiters actually open.
5. **Push to GitHub** so CI runs on every commit.

## 🚀 Building next (roadmap projects)

When you ship one, move it from `roadmap` into `projects` in `src/data/portfolio.js` with real outcomes, links and a screenshot. Suggested order, with the best résumé impact first:

1. **RAG Eval Studio.** Open source, quick to an MVP, and shows evaluation maturity that few candidates have.
2. **Bharat Voice Agent.** Builds directly on Meera and LiveKit experience; a demo video is very shareable.
3. **PR Copilot.** A GitHub App that people can install; real users make for strong proof.
4. **AgentOps Console**, **Sentinel Vision**, **Orbit Watch.** Bigger builds; Sentinel and Orbit fit the defence focus.

For each: a public repo, a README with an architecture diagram, a 60-second demo video, and a short write-up.

## 💡 Future site ideas

- **Case-study pages** (`/work/<slug>`) with architecture diagrams, which need a router or a move to Astro/Next.
- **Blog (MDX)** for build logs of roadmap projects. Writing in public compounds.
- **Live GitHub activity** (pinned repos, contribution graph) fetched at build time.
- **Résumé PDF generated from `portfolio.js`**, so it never drifts from the site.
- **Playwright smoke tests** for nav, the command palette, the contact form and the chat.
- **Lighthouse CI budget** to keep performance from regressing.
