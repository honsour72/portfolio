# Production release verification

Date: 2026-10-09

## Deployment

- Public URL: `https://m-rogozin.ru`
- Host: the existing Timeweb VPS at `195.133.66.155`
- Release: `20261009-6d57aad`
- Static root: `/var/www/m-rogozin/current`
- Release directory: `/var/www/m-rogozin/releases/20261009-6d57aad`
- Versioned Nginx source: `deploy/nginx/m-rogozin.ru.conf`
- DNS was not changed.

The static Astro build replaced the Nginx proxy for the main domain. The previous Gunicorn application and `website.service` remain active but are no longer on the public request path, providing a fast rollback target.

## Rollback

- Previous static release: `/var/www/m-rogozin/releases/20261009-3961fee-r2`
- Previous Nginx configuration: `/etc/nginx/sites-available/website.backup-20261009-3961fee-r2`
- Restore that file to `/etc/nginx/sites-available/website`, run `nginx -t`, then reload Nginx.
- The old application socket remains at `/home/michael/code/website/website.sock`.

## Production checks

- Nginx configuration validation passed before reload.
- The root URL returns the English homepage directly with HTTP 200, without a redirect or URL change.
- The original site favicon was restored at `/favicon.ico`; its SHA-256 is `ecbc2730414377749fca66c3d88af69924cdeeb4b3cc55093174d9c78aa0f4c1`.
- The root page, English and Russian homepages, all four case-study pages, four CV PDFs and two certificate PDFs returned successful responses over HTTPS.
- The compact English CV returned `application/pdf` with the expected generated size.
- The approved English and Russian featured-case headings and footer text were present in the public responses.
- Security headers include HSTS, `nosniff`, a restrictive referrer policy, disabled camera/microphone/geolocation permissions, frame denial and a content security policy.
- Browser console inspection on both homepage locales reported no warnings or errors.

## Automated production browser gate

Command: `pnpm test:production`

- 41 Playwright tests passed against `https://m-rogozin.ru`.
- axe-core reported no WCAG A/AA violations on both homepages and all four case-study pages.
- Responsive checks passed at 375 px, 768 px and 1440 px.
- Keyboard navigation, reduced motion, certificate dialogs, locale-preserving case navigation, CV menus and JavaScript-disabled navigation/downloads passed.

## Packaging note

The first staged archive contained macOS AppleDouble metadata and was rejected before activation. The `r2` archive was created without extended attributes and verified clean before extraction. The first staged directory never entered the public request path.

The first attempt to switch to `20261009-6d57aad` triggered the automatic rollback because the post-switch verification command contained a shell quoting error. The public site remained on the previous release. The corrected verification command then completed successfully and the release was activated.
