# Local release verification

Date: 2026-10-08  
Scope: local static build only. No deployment, DNS change or production validation was performed.

## Automated checks

- `pnpm check`: 58 files checked; 0 errors, 0 warnings and 0 hints.
- `pnpm test --run`: 7 test files and 36 tests passed.
- `pnpm build`: 11 static pages built successfully, including both locales, both case studies and four CV print routes.
- `pnpm generate:cv`: four bilingual CV PDFs generated.
- `pnpm test:e2e`: 40 Playwright tests passed.
- axe-core reported no WCAG A/AA violations on the English and Russian homepages and all four public case-study pages.
- Responsive checks passed at 375 px, 768 px and 1440 px for the English homepage and both English case-study pages.
- Keyboard focus, keyboard-only mobile navigation, reduced-motion behaviour, certificate dialogs, locale-preserving case navigation and CV menus passed.
- All internal pages, CV downloads and certificate downloads returned successful local responses.

## CV output

| File | Pages | Size | Tagged | Selectable text |
| --- | ---: | --- | --- | --- |
| `mikhail-rogozin-cv-en-compact.pdf` | 1 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-en-extended.pdf` | 2 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-ru-compact.pdf` | 1 | A4 | Yes | Verified |
| `mikhail-rogozin-cv-ru-extended.pdf` | 2 | A4 | Yes | Verified |

## Visual review

- Desktop: English homepage, Russian homepage, workforce-attrition case and SCAILIUM observability case.
- Mobile at 375 × 812: English homepage, workforce-attrition case and SCAILIUM observability case.
- The compact English CV and the first page of the extended English CV were reviewed as rendered pages.

## Public evidence checks

- The featured Habr article URL resolves to Mikhail Rogozin's `honsour72` profile and the expected SQL/PostgreSQL interview article.
- Automated link tests validate exact approved destinations. They do not guarantee future availability of third-party services.

## Accepted limitations

- This report proves the local build, generated artifacts and browser behaviour; it does not prove production hosting behaviour.
- Public counters and employer/project claims remain editorial data supplied or approved by the site owner. They should be refreshed when their source values change.
- The final code review was a self-review because the site owner explicitly requested work without subagents; no independent reviewer was used.
