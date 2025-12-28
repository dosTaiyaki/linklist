# LinkList - AI Coding Agent Instructions

## Project Overview
**LinkList** is a lightweight, vanilla JavaScript link management web app with no backend dependencies. It's a personal link collection tool (like Linktree) that stores data locally using `localStorage` and runs entirely in the browser.

**Technology Stack:**
- HTML5, CSS3, Vanilla JavaScript
- LocalStorage API for data persistence
- Google Fonts (Inter), local SVG/PNG icons
- Google Analytics (GA4)
- GitHub Pages compatible

---

## Architecture & Key Patterns

### Data Flow
- **Storage:** LocalStorage key `linklist_data` stores JSON array of link objects
- **Link Object Structure:** `{ id (timestamp), name, url, category, favicon (Google Favicons API URL) }`
- **Retrieval:** `getLinks()` and `saveLinks()` wrap localStorage with error handling
- **On Load:** `checkAndFixLinks()` ensures all links have favicon URLs (backward compatibility)

### UI Rendering Pipeline
1. `renderLinkList()` → Groups links by category → Creates sections → Populates grid
2. Interactive features applied per-card via `applyInteractiveFeatures()` (hover shadow, ripple animation)
3. Category grouping uses reducer pattern: `links.reduce((acc, link) => { /* group by category */ })`

### Styling Philosophy
- **Responsive:** CSS `clamp()` for fluid sizing across viewports (containers, fonts, spacing)
- **Theme:** Light background with Taiyakidos brand colors (sky blue #87ceeb primary)
- **Interactive Feedback:** 
  - Ripple animations on click via `pointerdown` event
  - Smooth box-shadow transitions on hover/active states
  - Parallax scroll effect on `.container`
- **SNS Link Colors:** Individual `.link-card.{platform}` classes (twitter, instagram, youtube, discord, note, misskey, threads, mail)

---

## Critical Functions & Workflows

### Adding/Managing Links
- `addNewLink(name, url, category)` - Adds link with auto-generated favicon URL; requires form submission or programmatic call
- **URL Handling:** Auto-prepends `https://` if protocol missing
- **Favicon:** Generated via `generateFaviconUrl()` using Google API `https://www.google.com/s2/favicons?domain=`
- **Fallback:** Broken favicon images trigger `onerror` to load `images/default_link_icon.svg`

### Interactive Features
- **Ripple Effect:** Pointer-down creates radial `scale` animation at click point (600ms duration)
- **Hover:** 0.12s `box-shadow` transition + slight scale down (0.995)
- **Active State:** Scale 0.985 for press-down feedback
- **Parallax Scroll:** `translateY` transform on container at `0.05 * scrollOffset`

### Key DOM Element IDs (from HTML)
- `#theme-toggle` - Theme switcher button (light/dark mode)
- `#link-container` - Main container for rendering link sections (reference in `renderLinkList()`)
- `.links` - Parent `<ul>` for static SNS links in HTML (distinct from dynamic link-grid)

---

## Important Conventions & Notes

### LocalStorage Data Integrity
- Always use `getLinks()`/`saveLinks()` wrapper functions; direct localStorage access risks JSON parse errors
- Function includes try/catch and console error logging for debugging
- Link IDs are `Date.now()` timestamps (ensure uniqueness when adding programmatically)

### Page Load Sequence
1. GA4 script loads asynchronously
2. DOM content parsed
3. `DOMContentLoaded` fires:
   - Title/subtitle fade-in animations (opacity + translateY transitions)
   - Favicon URL check via `checkAndFixLinks()`
   - `renderLinkList()` renders dynamic categories
   - Scroll parallax listener attached with requestAnimationFrame throttling

### Favicon Handling
- All dynamically-rendered links use favicon URLs
- Static SNS links in HTML use local `/ico/*.png` files (X.png, Instagram.png, etc.)
- Favicon size hardcoded to 32px via `ICON_SIZE` constant (adjust if Google API URL changes)

### CSS Naming
- BEM-inspired: `.link-card`, `.link-name`, `.favicon-icon`, `.delete-btn`, `.link-grid`, `.link-section`
- Safe area inset padding for notched devices (iPhone)
- Platform-specific colors use class names matching `href` domains or explicit SNS classes

---

## When Extending This Codebase

- **Adding Features:** Ensure data persists via `saveLinks()` after mutations
- **UI Changes:** Use CSS `clamp()` for responsive values; test on mobile viewports
- **New Interactions:** Leverage `applyInteractiveFeatures()` pattern for reusable card behavior
- **Favicon Failures:** Validate Google Favicons API responses; fallback always needed for custom/obscure domains
- **Animations:** Use `requestAnimationFrame` for scroll performance (see parallax implementation)

---

## File Reference Map
- **[index.html](index.html)** - Static structure, theme toggle, profile header, footer
- **[js/scriptsapp.js](js/scriptsapp.js)** - All JS logic: storage, rendering, interactivity
- **[css/style.css](css/style.css)** - Responsive design, theme colors, animations
- **[assets/images/](assets/images/)** - Avatar & placeholder images
- **[ico/](ico/)** - SNS platform icons (PNG files)
