# /assets/video/

This folder is intentionally minimal.
All video is embedded via Vimeo or YouTube — no self-hosted video files.

---

## WHAT BELONGS HERE (if needed)

  poster-fallback.webp    ← static fallback poster for hero if Vimeo fails to load
                            Size: 1920 × 1080, WebP, < 200KB

---

## WHAT DOES NOT BELONG HERE

  Do NOT place .mp4, .mov, or .webm files here.
  Video self-hosting is not part of this project.
  All video is served via Vimeo (preferred) or YouTube (fallback).

---

## VIMEO IDs TO REPLACE

  Replace placeholder VIDEO IDs in HTML with real Vimeo IDs once supplied.

  Page                              Variable to update
  ─────────────────────────────     ──────────────────────────────────────
  index.html (hero)                 Vimeo background embed src
  work/silence-of-the-harmattan     Vimeo iframe src
  work/between-two-rivers           Vimeo iframe src
  work/no-fixed-address             Vimeo iframe src
  work/atlas-campaign               Vimeo iframe src
  work/last-dry-season              Vimeo iframe src
  work/meridian                     Vimeo iframe src
  work/luma-x-campaign              Vimeo iframe src
  work/still-water                  Vimeo iframe src

  Hero embed format (autoplay, muted, looping background):
  https://player.vimeo.com/video/VIDEO_ID?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0

  Project embed format (manual play):
  https://player.vimeo.com/video/VIDEO_ID?autoplay=0&loop=0&title=0&byline=0&portrait=0
