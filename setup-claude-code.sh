#!/usr/bin/env bash
# ============================================================
# setup-claude-code.sh
# Da'anong Gyang Portfolio — Claude Code Setup
#
# Run this once after cloning the repo.
# It analyzes the codebase and prints a structured summary
# ready for Claude Code to consume.
#
# Usage:
#   chmod +x setup-claude-code.sh
#   ./setup-claude-code.sh
# ============================================================

set -e

BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

echo ""
echo -e "${BOLD}DA'ANONG GYANG PORTFOLIO — CLAUDE CODE SETUP${RESET}"
echo -e "${DIM}Static HTML/CSS/JS — No build step required${RESET}"
echo ""
echo "============================================================"


# ------------------------------------------------------------
# 1. FILE TREE
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}1. FILE TREE${RESET}"
echo ""
find . -not -path '*/\.*' \
       -not -path './daanong-gyang-portfolio.zip' \
       | sort \
       | sed 's|[^/]*/|  |g' \
       | sed 's|  \([^ ]\)|── \1|'


# ------------------------------------------------------------
# 2. FILE SIZES
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}2. FILE SIZES${RESET}"
echo ""
find . -type f -not -path '*/\.*' \
       -not -name '*.zip' \
       -not -name '*.md' \
       | sort \
       | while read f; do
           size=$(wc -c < "$f")
           lines=$(wc -l < "$f")
           printf "  %-52s %6d bytes  %4d lines\n" "$f" "$size" "$lines"
         done


# ------------------------------------------------------------
# 3. CSS VARIABLE INVENTORY
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}3. CSS CUSTOM PROPERTIES (DESIGN_SYSTEM.css)${RESET}"
echo ""
grep -E '^\s+--' DESIGN_SYSTEM.css | sed 's/;//' | sed 's/^ */  /'


# ------------------------------------------------------------
# 4. CSS CLASS INVENTORY
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}4. CSS CLASSES DEFINED${RESET}"
echo ""
echo -e "${DIM}  DESIGN_SYSTEM.css:${RESET}"
grep -Eo '^\.[a-z][a-zA-Z0-9_-]+' DESIGN_SYSTEM.css | sort -u | sed 's/^/    /'

echo ""
echo -e "${DIM}  site.css:${RESET}"
grep -Eo '^\.[a-z][a-zA-Z0-9_-]+' site.css | sort -u | sed 's/^/    /'

echo ""
echo -e "${DIM}  work/project.css:${RESET}"
grep -Eo '^\.[a-z][a-zA-Z0-9_-]+' work/project.css | sort -u | sed 's/^/    /'


# ------------------------------------------------------------
# 5. JS FUNCTIONS INVENTORY
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}5. JS FUNCTIONS (site.js)${RESET}"
echo ""
grep -E '^\s+function [a-zA-Z]+' site.js | sed 's/^ */  /'
echo ""
echo -e "${DIM}  Sections:${RESET}"
grep -E '^\s+/\* ---' site.js | sed 's|^ *\/\* *||;s| *-*\*\/||' | sed 's/^/    /'


# ------------------------------------------------------------
# 6. PAGE INVENTORY
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}6. PAGE INVENTORY${RESET}"
echo ""
for f in index.html work.html about.html work/*.html; do
  title=$(grep -m1 '<title>' "$f" | sed 's/.*<title>//;s/<\/title>.*//' | xargs)
  css=$(grep '<link rel="stylesheet"' "$f" | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"//' | tr '\n' ' ')
  js=$(grep '<script src' "$f" | grep -oE 'src="[^"]+"' | sed 's/src="//;s/"//' | tr '\n' ' ')
  aria=$(grep -c 'aria-current="page"' "$f" || true)
  printf "  ${BOLD}%-48s${RESET}\n" "$f"
  printf "    Title:   %s\n" "$title"
  printf "    CSS:     %s\n" "$css"
  printf "    JS:      %s\n" "$js"
  printf "    aria-current set: %s\n" "$aria"
  echo ""
done


# ------------------------------------------------------------
# 7. NAV WIRING CHECK
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}7. NAV WIRING CHECK${RESET}"
echo ""
echo -e "${DIM}  Checking aria-current='page' is set correctly on each page...${RESET}"
echo ""

check_nav() {
  local file=$1
  local expected_link=$2
  local found
  found=$(grep -c "aria-current=\"page\"" "$file" || true)
  local link_text
  link_text=$(grep "aria-current=\"page\"" "$file" | grep -oE '>.*<' | sed 's/>//;s/<.*//' | xargs || echo "none")
  if [ "$found" -gt 0 ]; then
    echo -e "  ${GREEN}✓${RESET}  $file → active: \"$link_text\""
  else
    echo -e "  ${YELLOW}✗${RESET}  $file → NO aria-current found"
  fi
}

check_nav "index.html" "Home"
check_nav "work.html" "Work"
check_nav "about.html" "About"
for f in work/*.html; do
  check_nav "$f" "Work"
done


# ------------------------------------------------------------
# 8. NEXT PROJECT CHAIN
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}8. NEXT PROJECT CHAIN${RESET}"
echo ""
for f in work/*.html; do
  next=$(grep -A2 'next-project__title' "$f" | grep -oE '>.*<' | head -1 | sed 's/>//;s/<.*//' | xargs || echo "none")
  next_href=$(grep 'next-project__link' "$f" | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"//' | xargs || echo "none")
  printf "  %-48s → %-32s (%s)\n" "$f" "$next" "$next_href"
done


# ------------------------------------------------------------
# 9. VIMEO IDs TO REPLACE
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}9. VIMEO PLACEHOLDER IDs${RESET}"
echo -e "${DIM}  All currently point to placeholder ID 1084887944${RESET}"
echo ""
grep -rn 'vimeo.com/video/' --include="*.html" . \
  | sed 's|/video/||' \
  | grep -oP '[^?]+' \
  | awk -F: '{printf "  %-48s line %-4s\n", $1, $2}'


# ------------------------------------------------------------
# 10. IMAGE PLACEHOLDERS
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}10. UNSPLASH PLACEHOLDER IMAGES${RESET}"
echo -e "${DIM}  Count per file — replace with /assets/images/*.webp${RESET}"
echo ""
for f in index.html work.html about.html work/*.html; do
  count=$(grep -c 'unsplash.com' "$f" 2>/dev/null || echo 0)
  if [ "$count" -gt 0 ]; then
    printf "  %-48s %2d placeholder(s)\n" "$f" "$count"
  fi
done


# ------------------------------------------------------------
# 11. ACCESSIBILITY SPOT CHECK
# ------------------------------------------------------------
echo ""
echo -e "${CYAN}${BOLD}11. ACCESSIBILITY SPOT CHECK${RESET}"
echo ""
echo -e "${DIM}  Checking for missing alt attributes on img tags...${RESET}"
echo ""
for f in index.html work.html about.html work/*.html; do
  img_total=$(grep -c '<img' "$f" 2>/dev/null || echo 0)
  img_with_alt=$(grep -c 'alt="' "$f" 2>/dev/null || echo 0)
  if [ "$img_total" -gt 0 ]; then
    printf "  %-48s %2d img tags, %2d with alt\n" "$f" "$img_total" "$img_with_alt"
  fi
done

echo ""
echo -e "${DIM}  Checking for lazy loading on non-hero images...${RESET}"
echo ""
for f in index.html work.html about.html work/*.html; do
  lazy=$(grep -c 'loading="lazy"' "$f" 2>/dev/null || echo 0)
  eager=$(grep -c 'loading="eager"' "$f" 2>/dev/null || echo 0)
  if [ "$((lazy + eager))" -gt 0 ]; then
    printf "  %-48s lazy: %2d  eager: %2d\n" "$f" "$lazy" "$eager"
  fi
done


# ------------------------------------------------------------
# 12. READY FOR CLAUDE CODE
# ------------------------------------------------------------
echo ""
echo "============================================================"
echo ""
echo -e "${BOLD}READY FOR CLAUDE CODE${RESET}"
echo ""
echo -e "  Repo is a ${BOLD}static HTML/CSS/JS site${RESET} — no build step, no npm."
echo -e "  All pages share: ${BOLD}DESIGN_SYSTEM.css → site.css → (project.css)${RESET}"
echo -e "  All interactivity is in: ${BOLD}site.js${RESET} (IIFE, no dependencies)"
echo ""
echo -e "  ${CYAN}Suggested Claude Code entry points:${RESET}"
echo ""
echo -e "  ${BOLD}To edit styles:${RESET}"
echo -e "    Design tokens    →  DESIGN_SYSTEM.css  (Section 1–4)"
echo -e "    Shared layout    →  site.css"
echo -e "    Project pages    →  work/project.css"
echo ""
echo -e "  ${BOLD}To edit behaviour:${RESET}"
echo -e "    All interactions →  site.js"
echo -e "    Filter logic     →  work.html  (inline <script> at bottom)"
echo ""
echo -e "  ${BOLD}To swap real assets:${RESET}"
echo -e "    Images           →  Replace unsplash.com URLs → /assets/images/*.webp"
echo -e "    Vimeo IDs        →  Replace 1084887944 → real ID in each .html file"
echo ""
echo -e "  ${BOLD}To deploy:${RESET}"
echo -e "    Push to GitHub → Connect to Netlify → Publish dir: ${BOLD}.${RESET} (root)"
echo -e "    Or: drag-drop the unzipped folder into Netlify deploy UI"
echo ""
echo "============================================================"
echo ""
