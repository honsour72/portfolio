# Recruiter portfolio specification

Status: approved design and functional direction. Local implementation comes before any deployment.

## Goal

Build a bilingual recruiter-first portfolio for Mikhail Rogozin. The site should make his current backend level, verified engineering work and relocation readiness understandable within a short recruiter scan, while offering detailed case studies for technical readers.

## Audience

Primary audience:

- international recruiters hiring Senior Backend Engineers;
- engineering managers and technical interviewers;
- companies that can hire internationally or support relocation.

Secondary audience:

- conference and teaching organisers;
- readers of Mikhail's technical articles;
- future immigration advisers reviewing public professional evidence.

The site is a hiring portfolio. It is not an immigration page and should not discuss visa strategy, military service, family circumstances or politics.

## Positioning

- Display name: `Mikhail Rogozin` in English and `Михаил Рогозин` in Russian.
- Primary role: `Senior Backend Engineer · Python & Go`.
- Official current role inside the Avito experience entry: `Backend Engineer, L4`.
- Current direction: senior backend work with architecture and technical leadership.
- Management, Principal Engineer and CTO are possible future directions, not present titles.
- Location: `Saint Petersburg, Russia · Open to relocation`.

## Information architecture

### Public routes

- `/` redirects to `/en/`.
- `/en/`
- `/ru/`
- `/en/work/workforce-attrition/`
- `/ru/work/workforce-attrition/`
- `/en/work/scailium-observability/`
- `/ru/work/scailium-observability/`

### Download routes

- `/files/cv/mikhail-rogozin-cv-en-compact.pdf`
- `/files/cv/mikhail-rogozin-cv-en-extended.pdf`
- `/files/cv/mikhail-rogozin-cv-ru-compact.pdf`
- `/files/cv/mikhail-rogozin-cv-ru-extended.pdf`
- `/files/certificates/startup-hackathon-2021.pdf`
- `/files/certificates/leaders-of-digital-transformation-2023.pdf`

## Homepage order

1. Header and language switch.
2. Hero with portrait, role, summary, location and two actions.
3. Evidence strip.
4. Two selected-work cards.
5. Compact career timeline.
6. Technical profile.
7. Teaching and mentoring.
8. Articles and public work.
9. Hackathon awards.
10. LinkedIn recommendations.
11. Education.
12. About and contact.
13. Footer.

The final homepage should be roughly 20 to 25 percent shorter than the generated concept image. Early experience and supporting evidence may use compact disclosure patterns, but all content must remain reachable without JavaScript.

## Case-study structure

Each case page contains:

1. Case hero.
2. Role, company, period and stack.
3. Verified results.
4. Overview and context.
5. Constraints.
6. Decision.
7. Public-safe architecture diagram.
8. Personal contribution and team boundary.
9. Delivery or testing evidence.
10. Outcome.
11. Lessons.
12. Previous or next case navigation.

The Avito page uses a light editorial treatment with cobalt accents. The SCAILIUM page uses a dark graphite hero and metric strip, followed by a light article body.

## Visual system

Direction: editorial precision.

- Canvas: warm off-white `#F5F4EF`.
- Main ink: `#111318`.
- Dark surface: `#171A20`.
- Accent: cobalt `#315EFB`.
- Light accent: `#E8EDFF`.
- White surface: `#FFFFFF`.
- Rules and borders: neutral gray close to `#DADBDD`.
- Display face: Instrument Sans.
- Body face: Inter.
- Labels and metrics: IBM Plex Mono.
- Fonts must be self-hosted through project dependencies.
- Use large editorial headings, an asymmetric grid, generous whitespace and thin rules.
- Avoid gradients, glassmorphism, neon, decorative code, stock illustrations and a company-logo wall.
- Avoid repeated generic card grids. Use different composition for work, experience, teaching and evidence.
- Motion must be subtle and disabled by `prefers-reduced-motion`.

## Images and evidence

### Portraits

- Hero portrait source: `/Users/myrogozin/Documents/Codex/2026-09-04/bn/portfolio-prototype/dist/assets/mikhail-hero.jpg`.
- Secondary Avito-event image source: `/Users/myrogozin/Documents/Codex/2026-09-04/bn/portfolio-prototype/dist/assets/mikhail-avito.jpg`.
- Preserve the photographs. Do not generate or retouch Mikhail's face.
- Produce responsive local formats and reserve image dimensions to prevent layout shift.

### Certificates

- Startup Hackathon source: `/Users/myrogozin/Documents/профы/StartUp Hackathon.pdf`.
- Leaders of Digital Transformation source: `/Users/myrogozin/Documents/профы/лцт.pdf`.
- Use the prepared page previews from `tmp/pdfs/startup-1.png` and `tmp/pdfs/lct-1.png` as thumbnails.
- Each thumbnail opens an accessible full-screen viewer.
- Each card also offers the original PDF as a direct download.
- The viewer closes through a visible button, Escape and backdrop click, and restores focus to its opener.

### Recommendations

- Do not use profile photos.
- Use monograms `EK` and `AS`.
- Names link to the clean LinkedIn profile URLs.
- English pages show the original excerpts.
- Russian pages show a translation and state that the original is available on LinkedIn.

## Copy rules

- Source of truth: `docs/portfolio-copy-deck.md`.
- English is the default locale.
- Russian copy is authored for Russian readers, not rendered as a literal machine translation.
- Keep first-person contribution separate from team results.
- Prefer concrete verbs, systems, dates and verified numbers.
- Do not add motivational slogans, fake thematic endings or corrective `not X, but Y` constructions.
- Do not use the phrases `Real systems. Measurable impact.`, `ownership beyond code` or similar generated taglines.
- Footer, English: `Built with AI assistance. The content and final decisions are mine.`
- Footer, Russian: `Сайт создан с помощью ИИ. За содержание и финальные решения отвечаю я.`
- Public Avito product name is only `internal workforce budgeting platform` or `budgeting tool`.
- Exclude the intern budgeting case entirely.
- Exclude internal Avito names, links, repositories and screenshots.
- Exclude the disputed PostgreSQL index story.
- Keep Kafka generic. Do not claim GraphQL, PostgreSQL replication or partitioning, Hexagonal Architecture, formal on-call ownership or Kubernetes platform administration.

## Language behaviour

- English is the default language.
- The language switch links to the equivalent page in the other locale.
- The current locale is indicated with text and `aria-current`, not color alone.
- Language selection does not depend on geolocation.
- Each language downloads CVs in the same language.
- Navigation, accessibility labels, metadata and structured data are localised.
- Add `hreflang` links for `en`, `ru` and `x-default`.

## CV behaviour

- No photo.
- No phone number.
- Email: `m@rogozin-pro.ru`.
- English is the default download language.
- Header and contact sections expose a CV menu with compact and extended variants.
- Compact CV is the primary option and must fit one page.
- Extended CV must fit two pages.
- Generate all four PDFs from versioned HTML or structured content in the repository.
- PDF text must remain selectable.
- PDFs must include clickable links and useful document metadata.

## External links

- Email: `mailto:m@rogozin-pro.ru`
- LinkedIn: `https://www.linkedin.com/in/michael-rogozin/`
- Personal Telegram: `https://t.me/honsour72`
- Telegram channel: `https://t.me/it_helper_s`
- Habr: `https://habr.com/ru/users/honsour72/`
- GitHub: `https://github.com/honsour72`
- YouTube: `https://www.youtube.com/@ITHelpers170`
- Profi.ru: `https://profi.ru/profile/RogozinMU/`
- Evgeni Koifman: `https://www.linkedin.com/in/evgeni-koifman-8a76141/`
- Aviv Shemesh: `https://www.linkedin.com/in/aviv-shemesh/`

GitHub should not receive prominent placement until the profile is cleaned up. The link may remain in structured contact data or the extended CV.

## Accessibility

- Meet WCAG 2.2 AA for color contrast, focus visibility and keyboard operation.
- Use semantic landmarks and a skip link.
- All interactive elements must work by keyboard.
- Certificate dialogs must have accessible names, focus trapping and focus restoration.
- Images need meaningful alternative text or empty alt text when decorative.
- Do not rely on hover to reveal required information.
- Respect reduced-motion preferences.

## Performance

- Static output only for the first release.
- No client framework hydration for content that works in HTML.
- Use JavaScript only for the mobile navigation, CV menu and certificate viewer.
- Optimise local images and use responsive formats.
- Self-host fonts and limit font weights.
- Avoid third-party analytics in the first release.

## SEO and metadata

- Unique title and description for each route.
- Canonical URL and locale alternates.
- Open Graph and Twitter metadata.
- A generated sitemap and robots file.
- JSON-LD `Person` data on the homepage with public profile links only.
- Case-study structured metadata may use `Article` if it accurately describes the page.
- Do not expose unpublished internal evidence in source or metadata.

## Responsive behaviour

- Desktop target: 1440 px concept composition.
- Content width: approximately 1200 px.
- Tablet layouts must preserve hierarchy without horizontal scrolling.
- Mobile layouts stack the hero copy before the portrait.
- Metrics wrap into two columns or a horizontal accessible list.
- Case tables of contents become an in-flow section on small screens.
- Tap targets must be at least 44 by 44 CSS pixels.

## Browser support

Support current stable versions of Chrome, Edge, Firefox and Safari, plus recent mobile Safari and Chrome for Android. Progressive enhancement must preserve navigation, language switching, CV downloads and certificate downloads when JavaScript is unavailable.

## Non-goals for this release

- CMS or admin panel.
- Blog search, tags or filters.
- Comments or newsletter.
- Contact form.
- Live social counters.
- Automatic translation.
- Immigration or visa pages.
- Publication or DNS changes before explicit approval of the local result.

## Acceptance criteria

- Every public route builds successfully in both languages.
- The homepage and both case studies match the approved visual direction.
- All public text comes from the copy deck without invented claims.
- Language switches preserve the equivalent page.
- CV menu links to the correct compact and extended PDF for each locale.
- Four CV PDFs exist, contain selectable text and match their page limits.
- Both certificate viewers work with mouse and keyboard, and both original PDFs download.
- All external links use the confirmed URLs.
- Automated tests cover locale routes, navigation, CV selection, certificate dialog behaviour and reduced-motion handling.
- The static build passes Astro checks, automated tests and a production build.
- Local browser review covers desktop and mobile layouts before any publication.
