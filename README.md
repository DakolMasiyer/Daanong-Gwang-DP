# Da'anong Gyang — Cinematographer Portfolio
## Project README

Static HTML/CSS/JS site. Deployed via Netlify.

---

## FILE STRUCTURE

```
/
├── index.html                        Homepage
├── work.html                         Work listing + filter
├── about.html                        About + Contact
│
├── work/
│   ├── project.css                   Shared project page styles
│   ├── silence-of-the-harmattan.html
│   ├── between-two-rivers.html
│   ├── no-fixed-address.html
│   ├── atlas-campaign.html
│   ├── last-dry-season.html
│   ├── meridian.html
│   ├── luma-x-campaign.html
│   └── still-water.html
│
├── assets/
│   ├── images/
│   │   └── README.md                 Image naming + export specs
│   ├── video/
│   │   └── README.md                 Video embed IDs to replace
│   └── fonts/
│       └── README.md                 Webfont instructions (if needed)
│
├── DESIGN_SYSTEM.css                 Tokens, typography, spacing, motion, components
├── site.css                          Shared page-level styles (header, nav, video embed)
└── site.js                           Shared JS (nav, scroll reveal, tabs, page transitions)
```

---

## CSS LOAD ORDER

Every page must load stylesheets in this exact order:

```html
<link rel="stylesheet" href="DESIGN_SYSTEM.css" />
<link rel="stylesheet" href="site.css" />
<!-- project pages only: -->
<link rel="stylesheet" href="work/project.css" />
```

For pages inside /work/, paths are relative:
```html
<link rel="stylesheet" href="../DESIGN_SYSTEM.css" />
<link rel="stylesheet" href="../site.css" />
<link rel="stylesheet" href="project.css" />
```

---

## NAVIGATION WIRING

All pages share the same header + nav overlay HTML.
`aria-current="page"` is set on the matching nav link per page.

| Page          | aria-current set on |
|---------------|---------------------|
| index.html    | Home link           |
| work.html     | Work link           |
| work/*.html   | Work link           |
| about.html    | About link          |

---

## PROJECT CARD → PROJECT PAGE CHAIN

Cards on index.html and work.html link to work/*.html project pages.
Project pages end with a "Next Project" link forming a continuous loop:

```
silence-of-the-harmattan
  → between-two-rivers
    → no-fixed-address
      → atlas-campaign
        → last-dry-season
          → meridian
            → luma-x-campaign
              → still-water
                → silence-of-the-harmattan  (loops back)
```

---

## ADDING A NEW PROJECT

1. Duplicate any file in /work/ and rename to the project slug.
2. Update: title, category, year, director, production, Vimeo ID,
   stills images, credits, details copy, tech specs.
3. Update the Next Project link on the preceding project page.
4. Add a new card to work.html card-stack with correct data-category.
5. Add a new card to the homepage work preview in index.html.
6. Add card image to /assets/images/ as project-slug--card.webp.
7. Add stills to /assets/images/ as project-slug--still-01.webp etc.

---

## REPLACING PLACEHOLDER CONTENT

### Vimeo IDs
See /assets/video/README.md for the full list of embeds to update.

### Images
All pages currently use Unsplash placeholder URLs.
Replace each src with the correct /assets/images/ path once real assets are ready.
See /assets/images/README.md for naming conventions and export specs.

### About page
- Replace portrait image src with /assets/images/daanong-portrait.webp
- Update bio copy, clients list, awards list
- Update email, social links, and IMDb URL in the contact block

---

## DEPLOYMENT (NETLIFY)

1. Push repo to GitHub.
2. Connect repo to Netlify.
3. Build command: leave blank (static site).
4. Publish directory: / (root).
5. No environment variables required.

Netlify will serve index.html at the root automatically.

---

## PERFORMANCE CHECKLIST (pre-launch)

- [ ] All Vimeo IDs replaced with real IDs
- [ ] All placeholder images replaced with real .webp assets
- [ ] All images ≤ 300KB at full size
- [ ] favicon.png added to root
- [ ] og-image.webp added to /assets/images/
- [ ] <meta og:image> tags added to all pages
- [ ] DESIGN_SYSTEM.css, site.css, site.js, work/project.css minified
- [ ] Netlify deploy preview tested on mobile and desktop
- [ ] All nav links tested (internal page transitions)
- [ ] Filter bar tested on work.html
- [ ] All tab panels tested on each project page
- [ ] Scroll reveal tested (disable JS to verify content is still accessible)
- [ ] Keyboard navigation tested (Tab, Enter, Escape)
