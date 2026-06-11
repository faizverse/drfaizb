# Website Redesign — Design Spec
**Date:** 2026-06-11  
**Scope:** Visual redesign of `website/styles.css` only. Zero changes to `website/index.html` content, structure, or copy.

---

## Summary of Approved Decisions

| Dimension | Decision |
|---|---|
| Layout direction | Navy + White (navy hero, light body) |
| Typography | Serif upright headings + italic serif pull-quotes |
| Card style | Bordered with 3px top-accent rule |

---

## Color Palette

Replace all existing CSS custom properties with the following:

```css
:root {
  --bg:           #f4f7fb;   /* light grey — default section bg */
  --bg-alt:       #ffffff;   /* white — alternating section bg */
  --bg-hero:      #1a2744;   /* deep navy — hero + footer + navbar */
  --text:         #1a2744;   /* navy — primary text */
  --text-2:       #4a5568;   /* slate — body text */
  --text-3:       #64748b;   /* grey — meta/captions */
  --gold:         #c9a84c;   /* gold — primary accent (replaces --blue) */
  --gold-dark:    #a8872e;   /* dark gold — hover states */
  --gold-light:   #e8c97a;   /* light gold — gradient pair */
  --divider:      #d0dae8;   /* border colour */
  --radius-l:     8px;       /* card/large radius (was 18px) */
  --radius-m:     4px;       /* small card radius (was 12px) */
  --radius-s:     3px;       /* button/tag radius (was 980px pill) */
  --shadow-s:     0 1px 6px rgba(26,39,68,0.08);
  --shadow-m:     0 4px 20px rgba(26,39,68,0.12);
  --font:         -apple-system, "SF Pro Text", Inter, system-ui, sans-serif;
  --font-serif:   Georgia, 'Times New Roman', serif;
  --navy:         #1a2744;   /* alias for --text; used in border-top accents */
}
```

---

## Section Background Pattern

Sections alternate between `--bg` (#f4f7fb) and `--bg-alt` (#fff). Hero and footer use `--bg-hero` (#1a2744).

| Section | Background |
|---|---|
| `#hero` | `--bg-hero` (navy) |
| `#about` | `--bg-alt` (white) |
| `#research` | `--bg` (light grey) |
| `#innovation` | `--bg-alt` (white) |
| `#teaching` | `--bg` (light grey) |
| `#leadership` | `--bg-alt` (white) |
| `#press` | `--bg` (light grey) |
| `#awards` | `--bg-alt` (white) |
| `#community` | `--bg` (light grey) |
| `#publications` | `--bg-alt` (white) |
| `#contact` | `--bg` (light grey) |
| `footer` | `--bg-hero` (navy) |

Remove all `::before` / `::after` radial-gradient glow pseudo-elements from sections — these are the current purple/cyan ambient blobs.

---

## Typography

### Headings (h1–h4)
```css
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
  letter-spacing: -0.01em;  /* reduce from current -0.04em */
}
```

### Section title
```css
.section-title { font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 2.6rem); }
.section-title span { color: var(--gold); }
```

### Pull-quote / statement (italic serif accent)
```css
.about-statement {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.5rem, 2.8vw, 2.1rem);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text);
  border-left: 3px solid var(--gold);
  padding-left: 1.5rem;
}
```

### Hero tagline (italic serif)
```css
.hero-tagline {
  font-family: var(--font-serif);
  font-style: italic;
  color: #8fb0cc;         /* soft blue-grey on navy bg */
  border-left: 2px solid var(--gold);
  padding-left: 1rem;
}
```

### `.grad` gradient text utility
Replace the purple/cyan gradient with gold:
```css
.grad {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### `.gold-line` divider
Currently `display: none` — activate it as the section separator below titles:
```css
.gold-line {
  display: block;
  width: 48px;
  height: 3px;
  background: var(--gold);
  margin: 0.85rem 0 2rem;
  border-radius: 2px;
}
```

---

## Navigation

### Navbar — always navy
```css
#navbar {
  background: var(--bg-hero);
  border-bottom: 1px solid rgba(201,168,76,0.2);
}
/* Remove the .scrolled frosted-glass rule entirely — navbar stays navy always */
```

Nav logo: Georgia serif, gold colour.  
Nav links: `color: #a0b8d0` default, `color: #c9a84c` active, `color: #fff` hover.  
Active underline: gold (`var(--gold)`).

### Mobile menu
```css
.mobile-menu {
  background: var(--bg-hero);
  border-bottom: 1px solid rgba(201,168,76,0.2);
  backdrop-filter: none;  /* remove blur */
}
```

---

## Hero Section

```css
#hero {
  background: var(--bg-hero);
  padding: 6rem 0 5rem;
  position: relative;
  overflow: hidden;
}

/* Gold accent bar across the very bottom of the hero */
#hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--gold), var(--gold-light), var(--gold));
  pointer-events: none;
}

/* Remove the existing ::before and ::after radial glow blobs */
```

Hero text colours on navy background:
- `.hero-pre`: `color: var(--gold); letter-spacing: 0.18em`
- `.hero-headline` words: gold gradient (`.grad` class already applied in HTML)
- `.hero-tagline`: italic serif, `color: #8fb0cc`

### Hero photo frame
```css
.hero-photo-ring {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  border-radius: var(--radius-m);  /* 4px — less rounded */
  box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,168,76,0.3);
}
```

### Hero stat cards
```css
.hero-stat-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(201,168,76,0.25);
  border-top: 3px solid var(--gold);
  border-radius: var(--radius-m);
  backdrop-filter: none;   /* remove glass blur */
}
.hero-stat-card .stat-number { font-family: var(--font-serif); }
```

---

## Card System

All existing glassmorphism cards (`var(--glass-bg)`, `backdrop-filter: blur`) are replaced with bordered cards:

```css
/* Base card pattern — apply to .area-card, .ip-card, .highlight-card, .project-card, .admin-card, .pub-card, .press-card, .media-item, .ext-link, .contact-item */
background: var(--bg-alt);           /* #fff */
border: 1px solid var(--divider);    /* #d0dae8 */
border-radius: var(--radius-m);      /* 4px */
backdrop-filter: none;
```

**Top-accent rule** — two variants used as category markers:
- Navy top: `border-top: 3px solid var(--navy)` — for primary content cards (research areas, IP, admin roles)
- Gold top: `border-top: 3px solid var(--gold)` — for funding/project cards and highlight cards

**Hover state** (all cards):
```css
transition: box-shadow 0.2s ease, transform 0.2s ease;
/* hover: */
box-shadow: var(--shadow-m);
transform: translateY(-2px);
```
No `border-color` change on hover (current glow effect removed).

---

## Publications — Ruled / Editorial Style

Publications use a ruled list layout instead of card boxes, fitting the academic journal context.

The HTML structure inside `.pub-card` is: `<span.pub-year>` followed by several siblings (`h4`, `.pub-authors`, `.pub-venue`, `.pub-tags` / `.pub-link-row`). Using `display: flex` would put all six siblings in a horizontal row. Use **CSS grid** with explicit column assignments instead:

```css
.pub-list {
  border-top: 2px solid var(--text);  /* navy top rule */
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pub-card {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--divider);
  border-radius: 0;
  backdrop-filter: none;
  padding: 1.1rem 0;
  /* Grid: year in col 1, everything else stacks in col 2 */
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 0 1.25rem;
  align-items: start;
}

/* Year becomes a left-column label */
.pub-year {
  grid-column: 1;
  grid-row: 1 / span 10;   /* span all content rows */
  align-self: start;
  text-align: right;
  background: none;
  border-radius: 0;
  padding: 0.2rem 0 0;
  color: var(--gold);
  font-size: 0.72rem;
  font-weight: 700;
}

/* All other pub-card direct children go in column 2 */
.pub-card > h4,
.pub-card > .pub-authors,
.pub-card > .pub-venue,
.pub-card > .pub-tags,
.pub-card > .pub-link-row {
  grid-column: 2;
}
```

Publication title stays `font-family: var(--font-serif)`. Tag pills (Journal/Media) keep their current shape but use muted bg (`#eef1f7` / `#fef9ee`).

Filter buttons: active state uses `background: var(--bg-hero); color: #fff; border-color: var(--bg-hero)`.

---

## Accent Colour Substitutions

Every occurrence of the current purple (`#a78bfa`, `rgba(167,139,250,…)`) and cyan (`#38bdf8`, `rgba(56,189,248,…)`) is replaced with gold equivalents:

| Was | Becomes |
|---|---|
| `var(--blue)` / `#a78bfa` | `var(--gold)` / `#c9a84c` |
| `var(--blue-dark)` / `#9061f9` | `var(--gold-dark)` / `#a8872e` |
| `var(--purple)` / `#38bdf8` | `var(--gold-light)` / `#e8c97a` |
| `rgba(167,139,250, X)` | `rgba(201,168,76, X)` |
| `rgba(56,189,248, X)` | `rgba(232,201,122, X)` |

---

## Scroll Progress Bar + Back-to-Top

```css
#scroll-progress {
  background: linear-gradient(to right, var(--gold), var(--gold-light));
}

#back-to-top {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--bg-hero);  /* navy icon on gold button */
  box-shadow: 0 4px 16px rgba(201,168,76,0.4);
}
```

---

## Buttons

```css
.btn-primary {
  background: var(--gold);
  color: var(--bg-hero);  /* navy text on gold */
}
.btn-primary:hover { background: var(--gold-dark); }

.btn-secondary {
  color: var(--gold);
  border-color: var(--gold);
}
.btn-secondary:hover { background: var(--gold); color: var(--bg-hero); }

/* In the hero context, secondary button gets white text styling */
#hero .btn-secondary { color: var(--gold); border-color: var(--gold); }
```

---

## Consulting & Collab Cards

The left-border accent rule on `.consulting-card`:
```css
border-left: 3px solid var(--gold);  /* was var(--blue) */
```

---

## Scrollbar

```css
::-webkit-scrollbar-track { background: #e8edf4; }
::-webkit-scrollbar-thumb { background: rgba(26,39,68,0.2); }
::-webkit-scrollbar-thumb:hover { background: var(--gold); }
```

---

## Layout Corrections

### `.about-highlights` — 3-column grid
The HTML has 3 highlight cards (Glasgow, UNITEN, MCKK) but the current CSS uses `repeat(4, 1fr)`, leaving an empty column. Fix:
```css
.about-highlights { grid-template-columns: repeat(3, 1fr); }
```

### Card backgrounds
All content cards use `background: #ffffff` explicitly. The section-level alternating backgrounds (`--bg` / `--bg-alt`) provide the visual rhythm; cards stand out purely via the 1px border and top-accent rule regardless of which section they're in.

Exception: `.course-card`, `.media-item`, `.youtube-box`, `.admin-card`, and `.community-card` (which sit on white `--bg-alt` sections) use `background: var(--bg)` (#f4f7fb) so they read as distinct from their white parent.

---

## What Does NOT Change

- All HTML content, copy, links, structure — untouched
- `script.js` — untouched (JS logic is colour/style-agnostic)
- All `data-target`, `data-type`, `data-filter` attributes — untouched
- Responsive breakpoints — same media queries, same column collapse rules
- Intersection Observer animations (`.fade-in`, `.visible`) — same
- Image elements, `<picture>`, `loading` attributes — untouched
- SEO, JSON-LD, meta tags — untouched

---

## Files Changed

| File | Change |
|---|---|
| `website/styles.css` | Full rewrite of token values and component styles — structure and selector names preserved |
| `website/index.html` | **No changes** |
| `website/script.js` | **No changes** |
