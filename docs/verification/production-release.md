# Production release verification

Date: 2026-10-10

## Deployment

- Public URL: `https://m-rogozin.ru`
- Host: the existing Timeweb VPS at `195.133.66.155`
- Release: `20261010-b0e9f82`
- Static root: `/var/www/m-rogozin/current`
- Release directory: `/var/www/m-rogozin/releases/20261010-b0e9f82`
- Archive SHA-256: `6ffdf9c7a42bda409dc69f40055a0664f2fd5eebdb9eb58a6cf329779a4b92e5`
- Versioned Nginx source: `deploy/nginx/m-rogozin.ru.conf`
- DNS was not changed.

The static Astro build replaced the Nginx proxy for the main domain. The previous Gunicorn application and `website.service` remain active but are no longer on the public request path, providing a fast rollback target.

## Rollback

- Previous static release: `/var/www/m-rogozin/releases/20261010-0eefbf5`
- Repoint `/var/www/m-rogozin/current` atomically to the previous release and run `nginx -t`.
- No Nginx configuration change was required for this release.

## Production checks

- Nginx configuration validation passed before activation.
- The root URL returns the English homepage directly with HTTP 200, without a redirect or URL change.
- The original site favicon was restored at `/favicon.ico`; its SHA-256 is `ecbc2730414377749fca66c3d88af69924cdeeb4b3cc55093174d9c78aa0f4c1`.
- The root page, English and Russian homepages, all four case-study pages, four CV PDFs and two certificate PDFs returned successful responses over HTTPS.
- The compact English CV returned `application/pdf` with the expected generated size.
- The approved English and Russian featured-case headings and footer text were present in the public responses.
- Security headers include HSTS, `nosniff`, a restrictive referrer policy, disabled camera/microphone/geolocation permissions, frame denial and a content security policy.
- Browser console inspection on both homepage locales reported no warnings or errors.
- The open navigation panel keeps 16 px viewport gutters without clipping on phone and tablet widths through 980 px.
- At 1024 px the mobile menu is hidden and the desktop navigation is visible.
- Featured-case visual panels are absent from stacked layouts through 980 px and return at the 1024 px desktop layout.
- Both certificate dialogs keep the title, full portrait image and download action inside the viewport without overlap.
- Long Russian headings, the public-work grid, hero actions and case metrics remain contained at 320 px.

## Automated production browser gate

Command: `pnpm test:production`

- 133 Playwright tests passed against `https://m-rogozin.ru`.
- axe-core reported no WCAG A/AA violations on both homepages and all four case-study pages.
- Horizontal-overflow checks passed on the root page, both localised homepages and all four localised case-study pages at 320 px, 360 px, 375 px, 390 px, 414 px, 600 px, 768 px, 820 px, 980 px, 1024 px and 1440 px.
- The open navigation panel passed at 320 px, 360 px, 375 px, 390 px, 414 px, 600 px, 768 px, 820 px and 980 px; the desktop transition passed at 1024 px.
- Both certificate dialogs passed internal geometry checks at 320 px, 375 px, 414 px and 600 px.
- The production layout was visually reviewed at 320 px and 768 px with stacked case cards, at 1024 px with the desktop case visuals, and at 320 px with each certificate dialog open.
- Keyboard navigation, reduced motion, certificate dialogs, locale-preserving case navigation, CV menus and JavaScript-disabled navigation/downloads passed.

## Packaging note

The archive was created with extended attributes disabled and checked for AppleDouble and `__MACOSX` entries before upload. Its SHA-256 was verified again on the host before extraction. The new release was staged and checked separately, then activated with an atomic symlink replacement. The previous static release remains available for rollback.
