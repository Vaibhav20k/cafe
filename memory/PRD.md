# SARAI — Specialty Indian Coffee House (PRD)

## Original Problem Statement
"i want to generate a cafe website it should feel premium and not ai slop also it should be interactive and should have a good scroll animation which should be reactive and engaging it is specifically for a cafe take inspiration of any good cafe it should contain a menu use demo data for the menu and an ai to ask"

User choices: vibe = warm minimal + dark & moody espresso bar + bold modern (fused); demo cafe name invented ("SARAI", सराय — a resting house for travellers); AI = they will supply an OpenRouter API key later, for now just the button + framework; also include story + location/hours; "it should depict a story and it should be an Indian cafe".

## Architecture
- Frontend: React 19 (CRA/craco) + Tailwind + framer-motion + lenis (smooth momentum scroll) + sonner toasts.
  - Components: Preloader (SVG logo draw + curtain lift), Cursor (blend-mode dot), Navbar (glass on scroll, mobile overlay), Hero (masked line-by-line reveal, mouse-tilt arch image, parallax ghost सराय, floating roast card), MarqueeRibbon (slow editorial), StorySection (parallax image pair, metric tiles, Bean/Soil/Extraction tabs), RitualSection (4 brew methods, animated dials), MenuSection (Mongo-backed menu, category tabs with layoutId pill, search, cursor-follow image preview, order toasts), LocationHours (live IST open status, hours grid, amenities, reservation form), Footer (kinetic display type, newsletter), AiChatWidget (SSE streaming chat, quick prompts, OpenRouter-ready).
- Backend: FastAPI on 0.0.0.0:8001, all routes under /api.
  - GET /api/health — status + chat mode.
  - GET /api/menu — seeds `menu_items` collection (17 demo items, ₹180–₹420) on first call, serves from Mongo.
  - POST /api/chat — SSE streaming. If OPENROUTER_API_KEY is set in backend env: streams from OpenRouter (model via OPENROUTER_MODEL, default openai/gpt-4o-mini) with full cafe+menu system prompt and Mongo-stored history. Else: local demo sommelier (keyword responder over menu data) that streams word-by-word.
  - Chat messages persisted in `chat_messages` (session_id, role, content, ts).
- Design: /app/design_guidelines.json (obsidian #0B0908, brass #E0A96D, terracotta, Playfair Display + Cormorant Garamond + Plus Jakarta Sans + Space Mono + Rozha One Devanagari accent). Original SVG arch logo used in nav, footer, and favicon.

## User Personas
- Café visitor (mobile-first): browses menu, checks hours/open status, gets directions.
- Curious coffee drinker: asks the AI sommelier for recommendations, pairings, kaapi vs flat white.
- Owner (later): swaps demo data, adds OpenRouter key, deploys.

## Core Requirements (static)
1. Premium, non-AI-slop design for an Indian specialty cafe. ✓
2. Interactive scroll: lenis momentum + framer-motion reveals + parallax + preloader. ✓
3. Menu with demo data (₹). ✓
4. AI to ask (chat framework; OpenRouter-ready; demo responder until key added). ✓
5. Story + location/hours sections. ✓

## Implemented (2026-11-22)
- Full single-page site (all sections above), backend chat+menu API, Mongo seeding, chat persistence, favicon/logo, film-grain overlay, live open/closed status, reservation + newsletter demo flows.
- (2026-11-22, later) Claude AI integration: /api/chat now streams from Anthropic Claude Sonnet 5.5 via emergentintegrations LlmChat with the Emergent Universal Key (EMERGENT_LLM_KEY). Priority chain: Claude → OpenRouter (if OPENROUTER_API_KEY set) → demo sommelier. Header badge shows "Live on Claude". Markdown stripped in chat bubbles.

## Backlog / Remaining
- P1: Persist reservations to backend (currently demo toast only); newsletter capture.
- P1: Real gallery section; Instagram feed; Spotify embed.
- P2: Multi-page (menu PDF, events/cuppings), i18n (Hindi copy), analytics.

## Next Tasks
1. Wire OpenRouter key (secrets card) and verify live-mode streaming.
2. Save reservations + newsletter emails to Mongo collections.
3. Add a real photo gallery / space section.

## Credentials
- None required. No auth in the app. OPENROUTER_API_KEY is intentionally not set (demo mode active).
