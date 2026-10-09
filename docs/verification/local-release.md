# Local release verification

Date: 2026-10-10
Scope: local static build only. No deployment, DNS change or production validation was performed.

## Automated checks

- `pnpm check`: 59 files checked; 0 errors, 0 warnings and 0 hints.
- `pnpm test --run`: 7 test files and 40 tests passed.
- `pnpm build`: 11 static pages built successfully, including both locales, both case studies and four CV print routes.
- `pnpm generate:cv`: four bilingual CV PDFs generated.
- `pnpm test:e2e`: 133 Playwright tests passed.
- axe-core reported no WCAG A/AA violations on the English and Russian homepages and all four public case-study pages.
- Horizontal-overflow checks passed at 320 px, 360 px, 375 px, 390 px, 414 px, 600 px, 768 px, 820 px, 980 px, 1024 px and 1440 px for the root page, both localised homepages and all four localised case-study pages.
- The open navigation panel was verified at 320 px, 360 px, 375 px, 390 px, 414 px, 600 px, 768 px, 820 px and 980 px. It keeps 16 px viewport gutters without clipping or horizontal overflow.
- At 1024 px the mobile menu is hidden and the desktop navigation is visible.
- Featured-case visual panels are hidden throughout the stacked layout up to 980 px and remain visible in the desktop split layout from 1024 px.
- Both certificate viewers were verified at 320 px, 375 px, 414 px and 600 px: the title, full image and download action remain separate and inside the viewport without internal overflow.
- At 320 px the hero actions, long Russian section headings and case-study metrics use their narrow-screen stacked layouts.
- Keyboard focus, keyboard-only mobile navigation, reduced-motion behaviour, certificate dialogs, locale-preserving case navigation and CV menus passed.
- All internal pages, CV downloads and certificate downloads returned successful local responses.
- `/` renders the English homepage directly with a `200` response and does not change the browser URL.
- The original 256 × 256 favicon is included and linked from every page.
- The language switch keeps the fixed visual order `EN / RU` in both locales.
- Approved organisation names link to their public pages in the evidence, experience, case, teaching and CV views.

## CV output

| File | Pages | Size | Tagged | Selectable text |
| --- | ---: | --- | --- | --- |
| `mikhail-rogozin-cv-en-compact.pdf` | 1 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-en-extended.pdf` | 2 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-ru-compact.pdf` | 1 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-ru-extended.pdf` | 2 | A4 | Yes | Verified |

## Visual review

- Desktop: English homepage, Russian homepage, workforce-attrition case and SCAILIUM observability case.
- Mobile at 320 × 812: English and Russian homepages, both featured-case cards, long Russian section headings, the SCAILIUM metric strip and both certificate dialogs.
- Tablet: the featured-case cards were reviewed at 768 px without their desktop-only visual panels.
- Desktop transition: the featured-case cards were reviewed at 1024 px with their split layout and visual panels restored.
- Open navigation: visually reviewed at 375 px, 768 px and 980 px; the desktop navigation transition was reviewed at 1024 px.
- The revised featured-case headings were checked at desktop width and at 375 × 812 without horizontal overflow.
- The compact English CV and the first page of the extended English CV were reviewed as rendered pages.

## Public evidence checks

- The featured Habr article URL resolves to Mikhail Rogozin's `honsour72` profile and the expected SQL/PostgreSQL interview article.
- Automated link tests validate exact approved destinations. They do not guarantee future availability of third-party services.

## Accepted limitations

- This report proves the local build, generated artifacts and browser behaviour; it does not prove production hosting behaviour.
- Public counters and employer/project claims remain editorial data supplied or approved by the site owner. They should be refreshed when their source values change.
- The final code review was a self-review because the site owner explicitly requested work without subagents; no independent reviewer was used.
