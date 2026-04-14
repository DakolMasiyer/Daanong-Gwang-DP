# /assets/images/

Place all site images here as .webp files.
JPEG fallbacks optional but not required for modern browsers.

---

## NAMING CONVENTION

  project-slug--still-01.webp
  project-slug--still-02.webp
  project-slug--card.webp       ← card thumbnail (1440×630)
  daanong-portrait.webp         ← about page portrait

## REQUIRED FILES

### Site-wide
  daanong-portrait.webp         1440 × 630  (about page, full-bleed)
  og-image.webp                 1200 × 630  (Open Graph / social share)
  favicon.png                   512 × 512   (square, will be cropped to circle by browsers)

### Project card thumbnails  (1440 × 630 — 16:7)
  silence-of-the-harmattan--card.webp
  between-two-rivers--card.webp
  no-fixed-address--card.webp
  atlas-campaign--card.webp
  last-dry-season--card.webp
  meridian--card.webp
  luma-x-campaign--card.webp
  still-water--card.webp

### Project stills  (1440 × 630 for hero still, 720 × 405 for grid)
  silence-of-the-harmattan--still-01.webp  (1440 × 630)
  silence-of-the-harmattan--still-02.webp  (720 × 405)
  silence-of-the-harmattan--still-03.webp  (720 × 405)
  silence-of-the-harmattan--still-04.webp  (720 × 405)
  silence-of-the-harmattan--still-05.webp  (720 × 405)
  silence-of-the-harmattan--still-06.webp  (720 × 405)

  [repeat pattern for all 8 projects]

---

## EXPORT SETTINGS

  Format:     WebP
  Quality:    80–85
  Card size:  1440 × 630 px
  Still hero: 1440 × 630 px
  Still grid: 720 × 405 px
  Portrait:   1440 × 630 px (crop top-biased)

## PERFORMANCE NOTES

- All images use loading="lazy" except hero/above-fold assets
- Explicit width + height attributes are already set on all <img> tags
- Do NOT exceed 300KB per card image at 1440px wide
- Do NOT exceed 150KB per grid still at 720px wide
