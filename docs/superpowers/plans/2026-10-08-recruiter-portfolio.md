# Recruiter Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual static Astro portfolio with two detailed case studies, four downloadable CV PDFs and accessible evidence interactions for international backend-engineering recruitment.

**Architecture:** Astro generates every public route as static HTML from typed English and Russian content modules. Shared layouts and small focused components provide the editorial visual system; framework hydration is avoided, and short progressive-enhancement scripts handle only navigation, CV menus and certificate dialogs. CVs use dedicated print routes backed by the same structured content and a Playwright script that exports deterministic PDFs.

**Tech Stack:** Astro 7.3.7, TypeScript 6.0.3, CSS, Vitest 5.0.3, Playwright 1.64.0, Astro Sitemap 3.7.4, axe-core Playwright 4.13.0, PDF.js 6.4.299, Sharp 0.35.5, Cheerio 1.2.0, Fontsource 5.3.0

**Spec:** `docs/portfolio-spec.md`

## Global Constraints

- `docs/portfolio-spec.md` is the binding functional and visual specification.
- `docs/portfolio-copy-deck.md` is the only source of public wording and factual claims.
- English is the default locale; every public content route has matching `/en/` and `/ru/` output.
- Public Avito product naming is limited to `internal workforce budgeting platform` or `budgeting tool`.
- Exclude the intern budgeting case, internal Avito names, internal links, internal repository references and private screenshots.
- Exclude the disputed PostgreSQL index story and unsupported claims listed in the spec.
- Keep personal contribution separate from team results.
- Preserve the supplied photographs; do not generate or retouch Mikhail's face.
- Use no client UI framework and no third-party analytics.
- JavaScript is limited to the mobile navigation, CV menu and certificate viewer.
- All required information and downloads remain reachable without JavaScript.
- Meet WCAG 2.2 AA for contrast, focus visibility and keyboard operation.
- Respect `prefers-reduced-motion`.
- Keep this phase local. Do not publish, change DNS or modify the current production site.

## Review Focus

- A user who changes language on a case page reaches the same case in the other locale; Task 1 adds route-map tests and Task 3 adds browser assertions.
- A keyboard user can open and close a certificate dialog, return focus to the opener and still download the original PDF; Task 4 adds Playwright coverage.
- A visitor without JavaScript can navigate, switch language and download CVs and certificates; Task 4 adds a JavaScript-disabled browser test.
- Compact and extended CV exports remain exactly one and two pages with selectable text; Task 5 adds PDF page-count and text-content tests.
- Narrow mobile viewports have no horizontal overflow and preserve visible focus states; Task 6 adds browser assertions at 375 px width.

---

### Task 1: Astro foundation and typed content model

**Files:**

- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/env.d.ts`
- Create: `src/lib/types.ts`
- Create: `src/lib/i18n.ts`
- Create: `src/content/portfolio.ts`
- Create: `src/content/cases.ts`
- Create: `src/content/cv.ts`
- Create: `src/pages/index.astro`
- Create: `src/pages/[lang]/index.astro`
- Create: `src/pages/[lang]/work/[slug]/index.astro`
- Create: `tests/content.test.ts`
- Create: `tests/i18n.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**

- Produces: `Locale = 'en' | 'ru'`.
- Produces: `locales`, `defaultLocale`, `isLocale()`, `alternatePath()` and `cvLinksForLocale()` in `src/lib/i18n.ts`.
- Produces: typed `portfolioByLocale`, `casesByLocale` and `cvByLocale` data consumed by all later tasks.
- Produces: static route enumeration for both locales and both case slugs.

- [ ] **Step 1: Initialise package metadata and exact dependencies**

Set scripts for `dev`, `check`, `test`, `build`, `test:e2e`, `generate:cv` and `verify`. Pin every package named in the plan header to its exact version. Use `@astrojs/sitemap`, `@axe-core/playwright`, `pdfjs-dist`, `sharp`, `cheerio`, `@fontsource/instrument-sans`, `@fontsource/inter` and `@fontsource/ibm-plex-mono` for the capabilities assigned to them in later tasks. Add no client UI framework.

- [ ] **Step 2: Write failing locale and content-contract tests**

Assert exactly two locales, four case routes, equivalent alternate paths, locale-matched compact and extended CV paths, required external URLs, absence of the intern case and forbidden public terms, and equality of stable evidence values across translations.

- [ ] **Step 3: Run the tests and verify the expected failure**

Run: `pnpm test --run tests/i18n.test.ts tests/content.test.ts`

Expected: FAIL because the typed modules and exports do not exist.

- [ ] **Step 4: Implement the typed content and route model**

Transcribe public wording from `docs/portfolio-copy-deck.md`. Keep UI labels, homepage sections, case sections, link destinations and CV data typed. Do not add prose that is absent from the copy deck.

- [ ] **Step 5: Implement minimal static route shells**

`/` must emit a static redirect to `/en/`. Dynamic locale and case routes must use `getStaticPaths()` and reject unsupported values at build time. Route shells may render plain diagnostic headings until later tasks provide layouts.

- [ ] **Step 6: Run foundation checks**

Run: `pnpm test --run tests/i18n.test.ts tests/content.test.ts && pnpm astro check && pnpm build`

Expected: all tests pass, Astro reports no errors and the build emits all five route families.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json .gitignore src tests vitest.config.ts
git commit -m "feat: scaffold bilingual portfolio content"
```

### Task 2: Shared editorial design system and homepage

**Files:**

- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/EvidenceStrip.astro`
- Create: `src/components/SelectedWork.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/TechnicalProfile.astro`
- Create: `src/components/Teaching.astro`
- Create: `src/components/PublicWork.astro`
- Create: `src/components/Awards.astro`
- Create: `src/components/Recommendations.astro`
- Create: `src/components/Education.astro`
- Create: `src/components/AboutContact.astro`
- Create: `src/styles/global.css`
- Create: `src/assets/mikhail-hero.jpg`
- Create: `src/assets/mikhail-avito.jpg`
- Modify: `src/pages/[lang]/index.astro`
- Create: `tests/homepage.test.ts`

**Interfaces:**

- Consumes: `portfolioByLocale`, locale helpers and case paths from Task 1.
- Produces: `BaseLayout` with localised metadata, canonical URL inputs, alternate links and shared header/footer slots.
- Produces: complete bilingual homepage HTML used by later browser and accessibility tests.

- [ ] **Step 1: Write failing rendered-homepage tests**

Render both locales and assert the approved hero identity, evidence strip, two case links, all required section landmarks, monogram recommendation cards, confirmed external links, language-matched CV menu and approved footer sentence. Assert forbidden generated slogans and unsupported claims are absent.

- [ ] **Step 2: Run the homepage tests and verify failure**

Run: `pnpm test --run tests/homepage.test.ts`

Expected: FAIL because the layout and components do not exist.

- [ ] **Step 3: Add the shared layout, fonts and design tokens**

Implement the approved off-white, graphite and cobalt system with self-hosted Instrument Sans, Inter and IBM Plex Mono. Include semantic landmarks, skip link, visible focus styles, reduced-motion rules and responsive container primitives.

- [ ] **Step 4: Copy and optimise the two approved photographs**

Copy the exact supplied sources into `src/assets`. Use Astro image handling for responsive output, explicit dimensions and suitable alt text. Do not edit the faces or replace the files with generated images.

- [ ] **Step 5: Implement the homepage components**

Use the section order and copy in the spec. Keep early experience compact, preserve the light Avito and dark SCAILIUM contrast, and avoid a repeated generic-card layout. The page must work as complete HTML before interaction scripts run.

- [ ] **Step 6: Run homepage and build checks**

Run: `pnpm test --run tests/homepage.test.ts && pnpm astro check && pnpm build`

Expected: all pass with no missing route, type or asset errors.

- [ ] **Step 7: Commit**

```bash
git add src tests package.json pnpm-lock.yaml
git commit -m "feat: build bilingual portfolio homepage"
```

### Task 3: Detailed case-study pages and architecture diagrams

**Files:**

- Create: `src/layouts/CaseLayout.astro`
- Create: `src/components/CaseHero.astro`
- Create: `src/components/CaseMetricStrip.astro`
- Create: `src/components/CaseTableOfContents.astro`
- Create: `src/components/ArchitectureDiagram.astro`
- Create: `src/components/CaseNavigation.astro`
- Modify: `src/pages/[lang]/work/[slug]/index.astro`
- Modify: `src/styles/global.css`
- Create: `tests/cases.test.ts`
- Create: `tests/e2e/case-navigation.spec.ts`
- Create: `playwright.config.ts`

**Interfaces:**

- Consumes: `casesByLocale`, `alternatePath()` and `BaseLayout` from Tasks 1 and 2.
- Produces: public-safe diagram variants `attrition` and `observability` selected through a typed component prop.
- Produces: four complete case-study pages and same-case locale navigation.

- [ ] **Step 1: Write failing case content and route tests**

Assert each case contains its approved title, role, stack, evidence, sections, diagram labels, team boundary and next or previous case link in both locales. Assert no internal names or unsupported claims enter the rendered output.

- [ ] **Step 2: Write failing same-case language-switch browser test**

At both case routes, activate the language switch and assert the browser reaches the equivalent case in the other locale, not the homepage.

- [ ] **Step 3: Run the tests and verify failure**

Run: `pnpm test --run tests/cases.test.ts && pnpm build && pnpm test:e2e -- tests/e2e/case-navigation.spec.ts`

Expected: FAIL because the case layout, diagrams and navigation are incomplete.

- [ ] **Step 4: Implement the case layout and visual variants**

Use a light Avito composition and a graphite SCAILIUM hero with a light article body. Keep the desktop table of contents sticky and place it in normal flow on smaller screens.

- [ ] **Step 5: Implement deterministic public-safe diagrams**

Use semantic HTML and CSS or project-local SVG. Labels must come from the typed case data. Do not represent internal service topology or invent product screenshots.

- [ ] **Step 6: Implement the full bilingual case copy and navigation**

Render only the approved copy deck text, including the confirmed lessons. Preserve the distinction between Mikhail's contribution and the work done by other engineers.

- [ ] **Step 7: Run case checks**

Run: `pnpm test --run tests/cases.test.ts && pnpm astro check && pnpm build && pnpm test:e2e -- tests/e2e/case-navigation.spec.ts`

Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add src tests playwright.config.ts
git commit -m "feat: add bilingual engineering case studies"
```

### Task 4: Certificate viewer, navigation interactions and metadata

**Files:**

- Create: `public/files/certificates/startup-hackathon-2021.pdf`
- Create: `public/files/certificates/leaders-of-digital-transformation-2023.pdf`
- Create: `public/images/certificates/startup-hackathon-2021.png`
- Create: `public/images/certificates/leaders-of-digital-transformation-2023.png`
- Create: `src/components/CertificateGallery.astro`
- Create: `src/components/CvMenu.astro`
- Create: `src/components/MobileNavigation.astro`
- Create: `src/components/SeoMetadata.astro`
- Create: `src/components/PersonJsonLd.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/Awards.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`
- Create: `tests/e2e/interactions.spec.ts`
- Create: `tests/seo.test.ts`

**Interfaces:**

- Consumes: locale-specific labels and download paths from Task 1.
- Produces: accessible `data-certificate-dialog` and `data-cv-menu` interaction contracts.
- Produces: canonical, `hreflang`, Open Graph, Twitter and JSON-LD metadata for every public route.

- [ ] **Step 1: Write failing interaction and metadata tests**

Cover keyboard and pointer dialog opening, Escape and backdrop closing, focus restoration, CV menu selection by locale, mobile navigation, JavaScript-disabled download access, canonical URLs, alternates and JSON-LD public fields.

- [ ] **Step 2: Run the tests and verify failure**

Run: `pnpm test --run tests/seo.test.ts && pnpm build && pnpm test:e2e -- tests/e2e/interactions.spec.ts`

Expected: FAIL because the evidence assets, interactions and metadata are incomplete.

- [ ] **Step 3: Copy the exact certificate sources and previews**

Copy the two original PDFs and prepared PNG previews to the public paths named above. Keep filenames stable and ASCII-only.

- [ ] **Step 4: Implement progressive-enhancement interactions**

Without JavaScript, CV and certificate downloads remain ordinary links. With JavaScript, the CV control exposes both variants and certificate thumbnails open the full-screen viewer. Implement focus trapping, focus restoration, Escape handling and reduced-motion-safe transitions.

- [ ] **Step 5: Implement localised metadata and sitemap support**

Add canonical and alternate links, social metadata, homepage `Person` JSON-LD, robots and sitemap generation. Include only public profile links and public copy.

- [ ] **Step 6: Run interaction and metadata checks**

Run: `pnpm test --run tests/seo.test.ts && pnpm astro check && pnpm build && pnpm test:e2e -- tests/e2e/interactions.spec.ts`

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add public src tests astro.config.mjs package.json pnpm-lock.yaml
git commit -m "feat: add portfolio evidence interactions and metadata"
```

### Task 5: Compact and extended bilingual CV PDFs

**Files:**

- Create: `src/layouts/CvLayout.astro`
- Create: `src/components/cv/CvHeader.astro`
- Create: `src/components/cv/CvExperience.astro`
- Create: `src/components/cv/CvEducation.astro`
- Create: `src/components/cv/CvEvidence.astro`
- Create: `src/pages/cv/[lang]/[variant].astro`
- Create: `src/styles/cv.css`
- Create: `scripts/generate-cv.mjs`
- Create: `tests/cv-content.test.ts`
- Create: `tests/cv-pdf.test.ts`
- Create: `public/files/cv/.gitkeep`

**Interfaces:**

- Consumes: `cvByLocale` and `cvLinksForLocale()` from Task 1.
- Produces: print routes for `en|ru` and `compact|extended` with `noindex` metadata.
- Produces: the four exact PDF paths declared in the spec.

- [ ] **Step 1: Write failing CV content tests**

Assert no phone or photo, the correct email and locale, the approved current title, compact versus extended section sets, clickable public links and absence of unsupported claims.

- [ ] **Step 2: Write failing generated-PDF tests**

Use a PDF parser to assert that all four files exist after generation, compact files have one page, extended files have two pages, text can be extracted and each document contains the correct name and email.

- [ ] **Step 3: Run the tests and verify failure**

Run: `pnpm test --run tests/cv-content.test.ts tests/cv-pdf.test.ts`

Expected: FAIL because the print routes and PDF files do not exist.

- [ ] **Step 4: Implement the shared CV layouts**

Use the same typography and color system in a restrained print composition. Compact CVs prioritise current role, the two strongest cases, technical profile, education and contact links. Extended CVs add full experience, teaching, awards and public work. Enforce A4 print sizing and explicit page-break rules.

- [ ] **Step 5: Implement deterministic PDF export**

Build the site, serve the static output locally inside the generation script, open each print route with Playwright and write the four PDFs to the public paths. Add document title, author and subject metadata where the PDF toolchain permits it.

- [ ] **Step 6: Generate and verify the PDFs**

Run: `pnpm build && pnpm generate:cv && pnpm test --run tests/cv-content.test.ts tests/cv-pdf.test.ts`

Expected: four PDFs, correct page counts, selectable text and passing content assertions.

- [ ] **Step 7: Rebuild with the generated files and verify links**

Run: `pnpm build && pnpm test:e2e -- tests/e2e/interactions.spec.ts`

Expected: every CV menu link returns a locale-matched PDF.

- [ ] **Step 8: Commit**

```bash
git add src scripts tests public/files/cv package.json pnpm-lock.yaml
git commit -m "feat: generate bilingual compact and extended CVs"
```

### Task 6: Accessibility, responsive browser review and release packaging

**Files:**

- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `tests/e2e/links.spec.ts`
- Create: `docs/verification/local-release.md`
- Modify: files identified by the failing checks

**Interfaces:**

- Consumes: the complete site and CV artifacts from Tasks 1 to 5.
- Produces: a repeatable local verification record and a clean static `dist/` package.

- [ ] **Step 1: Add final browser checks**

Cover WCAG-critical automated rules, heading order, landmarks, visible focus, reduced-motion media behaviour, keyboard-only navigation, no horizontal overflow at 375 px, equivalent content at tablet and desktop widths, all internal routes and confirmed external link destinations.

- [ ] **Step 2: Run the full automated verification**

Run: `pnpm verify`

Expected: type checks, content tests, production build, PDF generation and browser tests all pass.

- [ ] **Step 3: Review visible desktop pages**

Inspect `/en/`, `/ru/` and both English case pages at a 1440 px viewport. Compare hierarchy, spacing, light/dark case contrast, real certificate previews and both supplied photographs against the approved direction.

- [ ] **Step 4: Review visible mobile pages**

Inspect the homepage, both case variants, navigation, CV menu and certificate viewer at 375 px. Confirm no clipped text, hidden controls, overflow or focus loss.

- [ ] **Step 5: Record verification evidence**

Write exact commands, results, reviewed routes, viewport sizes and any accepted limitations to `docs/verification/local-release.md`. Do not claim production verification.

- [ ] **Step 6: Run a clean final build**

Run: `pnpm verify && pnpm build`

Expected: all checks pass and `dist/` contains the complete local release.

- [ ] **Step 7: Commit**

```bash
git add src tests docs public package.json pnpm-lock.yaml
git commit -m "test: verify responsive accessible portfolio release"
```
