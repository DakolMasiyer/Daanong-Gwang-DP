# /assets/fonts/

Currently empty. The site uses system font stack:
  'Helvetica Neue', Helvetica, Arial, sans-serif

---

## IF CUSTOM WEBFONTS ARE ADDED

Place .woff2 files here (woff2 only — widest support, smallest size).
Add @font-face declarations to DESIGN_SYSTEM.css before the body rule.

Example:

  @font-face {
    font-family: 'CustomFont';
    src: url('/assets/fonts/customfont-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

Always use font-display: swap to prevent invisible text during load.
Preload critical font files in <head> with:
  <link rel="preload" href="/assets/fonts/customfont-regular.woff2" as="font" type="font/woff2" crossorigin />
