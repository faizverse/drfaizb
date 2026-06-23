# MCKK-Inspired Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle `website/styles.css` to a navy + white heritage aesthetic inspired by MCKK, with zero changes to HTML, JS, or content.

**Architecture:** All changes are in `website/styles.css` only. The strategy is: (1) replace `:root` tokens first so variable-based colour changes cascade automatically, then (2) make targeted edits section-by-section for hardcoded values, structural changes, and glassmorphism removal.

**Tech Stack:** Vanilla CSS, no preprocessor. Verify visually using `python3 -m http.server 8080` from `website/`.

**Spec:** `website/docs/superpowers/specs/2026-06-11-website-redesign-design.md`

---

## Files Changed

- **Modify:** `website/styles.css` — all tasks

---

### Task 1: Replace design tokens (`:root` block)

This single edit cascades the majority of colour changes automatically. All `var(--bg)`, `var(--text)`, `var(--blue)`, etc. references update instantly.

**Files:**
- Modify: `website/styles.css:1–22`

- [ ] **Step 1: Replace the `:root` block**

Find and replace the entire tokens section in `website/styles.css`:

```
/* old_string to find — exact block from line 1 to the closing brace */
/* ============================================================
   TOKENS
   ============================================================ */
:root {
  --bg:         #0a0f1e;
  --bg-alt:     #0d1525;
  --text:       #f1f5f9;
  --text-2:     #94a3b8;
  --text-3:     #64748b;
  --blue:       #a78bfa;
  --blue-dark:  #9061f9;
  --purple:     #38bdf8;
  --divider:    rgba(255,255,255,0.08);
  --radius-l:   18px;
  --radius-m:   12px;
  --radius-s:   980px;
  --shadow-s:   0 2px 12px rgba(0,0,0,0.3);
  --shadow-m:   0 4px 24px rgba(0,0,0,0.5);
  --glass-bg:   rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.08);
  --font: -apple-system, "SF Pro Display", "SF Pro Text", Inter, system-ui, sans-serif;
}
```

Replace with:

```css
/* ============================================================
   TOKENS
   ============================================================ */
:root {
  --bg:           #f4f7fb;
  --bg-alt:       #ffffff;
  --bg-hero:      #1a2744;
  --text:         #1a2744;
  --text-2:       #4a5568;
  --text-3:       #64748b;
  --gold:         #c9a84c;
  --gold-dark:    #a8872e;
  --gold-light:   #e8c97a;
  --navy:         #1a2744;
  --divider:      #d0dae8;
  --radius-l:     8px;
  --radius-m:     4px;
  --radius-s:     3px;
  --shadow-s:     0 1px 6px rgba(26,39,68,0.08);
  --shadow-m:     0 4px 20px rgba(26,39,68,0.12);
  --glass-bg:     #ffffff;
  --glass-border: #d0dae8;
  --font: -apple-system, "SF Pro Text", Inter, system-ui, sans-serif;
  --font-serif:   Georgia, 'Times New Roman', serif;
}
```

- [ ] **Step 2: Start dev server and verify the token cascade**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
python3 -m http.server 8080
```

Open `http://localhost:8080`. Expected at this stage: page body is now light grey, text is dark navy, the purple accent is gone but some elements may look broken (navbar transparent over light page, hero has lost its dark background). This is expected — subsequent tasks fix those.

- [ ] **Step 3: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: replace design tokens with navy+gold heritage palette"
```

---

### Task 2: Body, scrollbar, section border, `.grad`, `.gold-line`

**Files:**
- Modify: `website/styles.css` — RESET & BASE, LAYOUT UTILITIES, GRADIENT TEXT UTILITY sections

- [ ] **Step 1: Update scrollbar colours**

Find:
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #070c18; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue); }
```

Replace with:
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #e8edf4; }
::-webkit-scrollbar-thumb { background: rgba(26,39,68,0.2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold); }
```

- [ ] **Step 2: Update the section border-top rule and section backgrounds**

Find:
```css
section { padding: 6rem 0; }
#research, #innovation, #teaching, #leadership, #press, #awards, #community, #publications, #contact {
  border-top: 1px solid rgba(167,139,250,0.07);
}
.gold-line { display: none; }
```

Replace with:
```css
section { padding: 6rem 0; }
#research, #innovation, #teaching, #leadership, #press, #awards, #community, #publications, #contact {
  border-top: 1px solid var(--divider);
}

/* Section background pattern — alternating white / light-grey */
#about      { background: var(--bg-alt); }
#innovation { background: var(--bg-alt); }
#leadership { background: var(--bg-alt); }
#awards     { background: var(--bg-alt); }
#publications { background: var(--bg-alt); }
#research   { background: var(--bg); }
#teaching   { background: var(--bg); }
#press      { background: var(--bg); }
#community  { background: var(--bg); }
#contact    { background: var(--bg); }

.gold-line {
  display: block;
  width: 48px;
  height: 3px;
  background: var(--gold);
  margin: 0.85rem 0 2rem;
  border-radius: 2px;
}
```

- [ ] **Step 3: Update `.grad` gradient utility to gold**

Find:
```css
.grad {
  background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Replace with:
```css
.grad {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 4: Fix existing explicit section bg declarations that used --bg-alt for dark sections**

Find:
```css
#research { background: var(--bg-alt); position: relative; overflow: hidden; }
```
Replace with:
```css
#research { background: var(--bg); position: relative; overflow: hidden; }
```

Find:
```css
#teaching { background: var(--bg-alt); }
```
Replace with:
```css
#teaching { background: var(--bg); }
```

Find:
```css
#awards { background: var(--bg-alt); }
```
Replace with:
```css
#awards { background: var(--bg-alt); }
```
(No change needed — awards stays white. But verify the line exists.)

Find:
```css
#press { background: var(--bg-alt); }
#press .press-grid { margin-top: 2rem; }
```
Replace with:
```css
#press { background: var(--bg); }
#press .press-grid { margin-top: 2rem; }
```

Find:
```css
#contact { background: var(--bg-alt); position: relative; overflow: hidden; }
```
Replace with:
```css
#contact { background: var(--bg); position: relative; overflow: hidden; }
```

Find:
```css
#leadership { background: var(--bg-alt); }
```
Replace with:
```css
#leadership { background: var(--bg-alt); }
```
(No change needed — leadership stays white.)

- [ ] **Step 5: Verify in browser**

Reload `http://localhost:8080`. Expected: sections now alternate between white and light grey. The gold rule lines appear under section headings. Body text is readable dark navy.

- [ ] **Step 6: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: set section backgrounds, activate gold-line, fix grad to gold"
```

---

### Task 3: Typography — serif headings + italic pull-quotes

**Files:**
- Modify: `website/styles.css` — TYPOGRAPHY section

- [ ] **Step 1: Update h1–h4 to serif**

Find:
```css
h1, h2, h3, h4 {
  font-family: var(--font);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--text);
}
```

Replace with:
```css
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text);
}
```

- [ ] **Step 2: Update `.section-title` for serif sizing**

Find:
```css
.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 1rem;
}

.section-title span { color: var(--blue); }
```

Replace with:
```css
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 0;
}

.section-title span { color: var(--gold); }
```

- [ ] **Step 3: Update `.about-statement` to italic serif**

Find:
```css
.about-statement {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.15;
  color: var(--text);
}
```

Replace with:
```css
.about-statement {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.5rem, 2.8vw, 2.1rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.4;
  color: var(--text);
  border-left: 3px solid var(--gold);
  padding-left: 1.5rem;
}
```

- [ ] **Step 4: Update `.hero-tagline` to italic serif**

Find:
```css
.hero-tagline {
  font-size: 1.05rem;
  font-style: italic;
  color: var(--text-2);
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 2.25rem;
  padding-left: 0.85rem;
  border-left: 2px solid rgba(167,139,250,0.4);
}
```

Replace with:
```css
.hero-tagline {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-style: italic;
  color: #8fb0cc;
  font-weight: 400;
  letter-spacing: 0;
  margin-bottom: 2.25rem;
  padding-left: 0.85rem;
  border-left: 2px solid var(--gold);
}
```

- [ ] **Step 5: Update `.hero-pre` label colour**

Find:
```css
.hero-pre {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-2);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
```

Replace with:
```css
.hero-pre {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}
```

- [ ] **Step 6: Update `.hero-headline` letter-spacing for serif**

Find:
```css
.hero-headline {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.95;
  margin-bottom: 1rem;
}
```

Replace with:
```css
.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.0;
  margin-bottom: 1rem;
}
```

- [ ] **Step 7: Verify in browser**

Reload `http://localhost:8080`. Expected: all headings display in Georgia serif. The About section pull-quote is italic with a gold left border. The hero headline shows as large serif. The hero tagline is italic.

- [ ] **Step 8: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: switch headings to serif, italic pull-quote, gold hero labels"
```

---

### Task 4: Navigation — always-navy

**Files:**
- Modify: `website/styles.css` — NAVIGATION section

- [ ] **Step 1: Make navbar always-navy, remove frosted-glass `.scrolled` rule**

Find:
```css
#navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

#navbar.scrolled {
  background: rgba(10,15,30,0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(167,139,250,0.12);
}
```

Replace with:
```css
#navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: var(--bg-hero);
  border-bottom: 1px solid rgba(201,168,76,0.2);
  transition: box-shadow 0.3s ease;
}

#navbar.scrolled {
  box-shadow: 0 2px 12px rgba(26,39,68,0.15);
}
```

- [ ] **Step 2: Update nav logo to Georgia serif + gold**

Find:
```css
.nav-logo {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--blue), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Replace with:
```css
.nav-logo {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gold);
}
```

- [ ] **Step 3: Update nav link colours for navy background**

Find:
```css
.nav-links a {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-2);
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
  position: relative;
  padding-bottom: 2px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1.5px;
  background: var(--blue);
  border-radius: 1px;
  transition: width 0.2s ease;
}

.nav-links a:hover { color: var(--text); }
.nav-links a.active { color: var(--text); }
.nav-links a.active::after { width: 100%; }
```

Replace with:
```css
.nav-links a {
  font-size: 0.78rem;
  font-weight: 500;
  color: #a0b8d0;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.2s ease;
  position: relative;
  padding-bottom: 2px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1.5px;
  background: var(--gold);
  border-radius: 1px;
  transition: width 0.2s ease;
}

.nav-links a:hover { color: #fff; }
.nav-links a.active { color: var(--gold); }
.nav-links a.active::after { width: 100%; }
```

- [ ] **Step 4: Update mobile menu — remove backdrop-filter, use navy**

Find:
```css
.mobile-menu {
  display: none;
  position: fixed;
  top: 52px; left: 0; right: 0;
  background: rgba(10,15,30,0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 1.5rem 2rem;
  flex-direction: column;
  gap: 1.25rem;
  z-index: 999;
  border-bottom: 1px solid rgba(167,139,250,0.12);
}
.mobile-menu.open { display: flex; }
.mobile-menu a { font-size: 1rem; color: var(--text-2); font-weight: 500; letter-spacing: -0.01em; }
.mobile-menu a:hover { color: var(--text); }
```

Replace with:
```css
.mobile-menu {
  display: none;
  position: fixed;
  top: 52px; left: 0; right: 0;
  background: var(--bg-hero);
  padding: 1.5rem 2rem;
  flex-direction: column;
  gap: 1.25rem;
  z-index: 999;
  border-bottom: 1px solid rgba(201,168,76,0.2);
}
.mobile-menu.open { display: flex; }
.mobile-menu a { font-size: 1rem; color: #a0b8d0; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
.mobile-menu a:hover { color: #fff; }
```

- [ ] **Step 5: Verify in browser**

Reload `http://localhost:8080`. Expected: navbar is solid navy with gold logo text ("MFB" in Georgia serif). Nav links are muted blue-grey, active link is gold, hover is white. No frosted glass on scroll — navbar stays navy.

- [ ] **Step 6: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: always-navy navbar with serif gold logo and gold active state"
```

---

### Task 5: Hero section — remove glows, add gold bar, fix photo + stat cards

**Files:**
- Modify: `website/styles.css` — HERO section

- [ ] **Step 1: Replace hero background and remove radial-glow pseudo-elements**

Find:
```css
#hero {
  display: flex;
  align-items: center;
  padding: 7rem 0 5rem;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

#hero::before {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -5%;
  width: 40vw; height: 40vw;
  max-width: 500px; max-height: 500px;
  background: radial-gradient(ellipse, rgba(56,189,248,0.09) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

#hero::after {
  content: '';
  position: absolute;
  top: 5%;
  right: -5%;
  width: 55vw;
  height: 55vw;
  max-width: 700px; max-height: 700px;
  background: radial-gradient(ellipse, rgba(167,139,250,0.14) 0%, rgba(56,189,248,0.07) 45%, transparent 72%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

#hero .container { position: relative; z-index: 1; }
```

Replace with:
```css
#hero {
  display: flex;
  align-items: center;
  padding: 6rem 0 5rem;
  background: var(--bg-hero);
  position: relative;
  overflow: hidden;
}

#hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--gold), var(--gold-light), var(--gold));
  pointer-events: none;
  z-index: 2;
}

#hero .container { position: relative; z-index: 1; }
```

- [ ] **Step 2: Remove `.hero-photo-wrap::before` radial glow**

Find:
```css
.hero-photo-wrap::before {
  content: '';
  position: absolute;
  inset: -25%;
  background: radial-gradient(ellipse at center, rgba(167,139,250,0.15) 0%, rgba(56,189,248,0.08) 50%, transparent 75%);
  border-radius: 50%;
  pointer-events: none;
}
```

Replace with:
```css
.hero-photo-wrap::before { display: none; }
```

- [ ] **Step 3: Update hero photo ring — gold gradient, smaller radius**

Find:
```css
.hero-photo-ring {
  width: 260px; height: 320px;
  border-radius: 22px;
  padding: 3px;
  background: linear-gradient(135deg, var(--blue), var(--purple));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 60px rgba(167,139,250,0.2), 0 20px 40px rgba(0,0,0,0.4);
}

.hero-photo-ring img {
  width: 100%; height: 100%;
  border-radius: 19px;
  object-fit: cover;
  object-position: center top;
}
```

Replace with:
```css
.hero-photo-ring {
  width: 260px; height: 320px;
  border-radius: var(--radius-m);
  padding: 3px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,168,76,0.3);
}

.hero-photo-ring img {
  width: 100%; height: 100%;
  border-radius: 2px;
  object-fit: cover;
  object-position: center top;
}
```

- [ ] **Step 4: Update hero stat cards — gold top border, no backdrop-filter, serif numbers**

Find:
```css
.hero-stat-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 14px;
  padding: 0.85rem 0.6rem;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hero-stat-card:hover {
  border-color: rgba(167,139,250,0.25);
  box-shadow: 0 4px 20px rgba(167,139,250,0.08);
}

.hero-stat-card .stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.hero-stat-card .stat-label {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}
```

Replace with:
```css
.hero-stat-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(201,168,76,0.25);
  border-top: 3px solid var(--gold);
  border-radius: var(--radius-m);
  padding: 0.85rem 0.6rem;
  text-align: center;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.hero-stat-card:hover {
  box-shadow: var(--shadow-m);
  transform: translateY(-2px);
}

.hero-stat-card .stat-number {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
}

.hero-stat-card .stat-label {
  font-size: 0.62rem;
  font-weight: 600;
  color: #6a8fa8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}
```

- [ ] **Step 5: Remove `.hero-pill` purple background (rarely visible but tidy up)**

Find:
```css
.hero-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(167,139,250,0.08);
  color: var(--blue);
  border: 1px solid rgba(167,139,250,0.18);
  border-radius: var(--radius-s);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 14px;
  margin-bottom: 1.25rem;
}
```

Replace with:
```css
.hero-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(201,168,76,0.12);
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: var(--radius-s);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 14px;
  margin-bottom: 1.25rem;
}
```

- [ ] **Step 6: Verify in browser**

Reload `http://localhost:8080`. Expected: hero is solid deep navy with a 4px gold gradient bar at the bottom. Photo has a gold frame. Stat cards have gold top border. Headline "Research. Teaching. Innovation." shows in large gold gradient serif. No purple ambient glow anywhere in the hero.

- [ ] **Step 7: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: hero navy bg, gold accent bar, gold photo frame, gold stat cards"
```

---

### Task 6: Buttons + scroll utilities

**Files:**
- Modify: `website/styles.css` — BUTTONS, SCROLL PROGRESS BAR, BACK TO TOP FAB sections

- [ ] **Step 1: Update button styles**

Find:
```css
.btn-primary {
  background: var(--blue);
  color: #fff;
}
.btn-primary:hover {
  background: var(--blue-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(167,139,250,0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--blue);
  border: 1.5px solid var(--blue);
}
.btn-secondary:hover { background: var(--blue); color: #fff; transform: translateY(-1px); }
```

Replace with:
```css
.btn-primary {
  background: var(--gold);
  color: var(--bg-hero);
}
.btn-primary:hover {
  background: var(--gold-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(201,168,76,0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--gold);
  border: 1.5px solid var(--gold);
}
.btn-secondary:hover { background: var(--gold); color: var(--bg-hero); transform: translateY(-1px); }
```

- [ ] **Step 2: Update scroll progress bar to gold**

Find:
```css
#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(to right, var(--blue), var(--purple));
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
}
```

Replace with:
```css
#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(to right, var(--gold), var(--gold-light));
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
}
```

- [ ] **Step 3: Update back-to-top button to gold**

Find:
```css
#back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--purple));
  color: #fff;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(167,139,250,0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  transform: translateY(8px);
  z-index: 998;
  font-family: var(--font);
  display: flex;
  align-items: center;
  justify-content: center;
}

#back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#back-to-top:hover {
  box-shadow: 0 6px 20px rgba(167,139,250,0.5);
  transform: translateY(-2px);
}
```

Replace with:
```css
#back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--bg-hero);
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(201,168,76,0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  transform: translateY(8px);
  z-index: 998;
  font-family: var(--font);
  display: flex;
  align-items: center;
  justify-content: center;
}

#back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#back-to-top:hover {
  box-shadow: 0 6px 20px rgba(201,168,76,0.5);
  transform: translateY(-2px);
}
```

- [ ] **Step 4: Verify in browser**

Scroll down on `http://localhost:8080`. Expected: progress bar at top is gold. The "Get in Touch" button in the hero has a gold border and gold text. Back-to-top button is gold with a navy arrow.

- [ ] **Step 5: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: gold buttons, scroll progress bar, and back-to-top"
```

---

### Task 7: About section — highlights grid + highlight cards

**Files:**
- Modify: `website/styles.css` — ABOUT section

- [ ] **Step 1: Fix `.about-highlights` to 3-column grid (there are 3 cards, not 4)**

Find:
```css
.about-highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
}
```

Replace with:
```css
.about-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
}
```

- [ ] **Step 2: Update `.highlight-card` — bordered, remove glassmorphism**

Find:
```css
.highlight-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  padding: 1.1rem 1.25rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.highlight-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 8px 32px rgba(167,139,250,0.08); transform: translateY(-2px); }
```

Replace with:
```css
.highlight-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid var(--divider);
  border-top: 3px solid var(--navy);
  border-radius: var(--radius-m);
  padding: 1.1rem 1.25rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.highlight-card:hover { box-shadow: var(--shadow-m); transform: translateY(-2px); }
```

- [ ] **Step 3: Update `.highlight-icon` background**

Find:
```css
.highlight-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(167,139,250,0.08);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
```

Replace with:
```css
.highlight-icon {
  width: 40px; height: 40px;
  border-radius: 6px;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
```

- [ ] **Step 4: Verify in browser**

Scroll to About section on `http://localhost:8080`. Expected: three education cards (Glasgow, UNITEN, MCKK) fill 3 equal columns. Cards are white with a navy top border. The italic serif pull-quote shows on the left.

- [ ] **Step 5: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: about section - 3-col highlights, bordered cards, gold accent"
```

---

### Task 8: Research section — remove cyan glow, bordered area cards + project cards

**Files:**
- Modify: `website/styles.css` — RESEARCH section

- [ ] **Step 1: Remove the `#research::after` cyan radial glow**

Find:
```css
#research::after {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 400px; height: 400px;
  background: radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
```

Replace with:
```css
#research::after { display: none; }
```

- [ ] **Step 2: Update `.area-card` — bordered, navy top, remove glassmorphism**

Find:
```css
.area-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.area-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 8px 32px rgba(167,139,250,0.08); transform: translateY(-3px); }
```

Replace with:
```css
.area-card {
  background: #ffffff;
  border: 1px solid var(--divider);
  border-top: 3px solid var(--navy);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.area-card:hover { box-shadow: var(--shadow-m); transform: translateY(-3px); }
```

- [ ] **Step 3: Update `.project-card` — bordered, gold left accent**

Find:
```css
.project-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  padding: 1.25rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.project-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 8px 32px rgba(167,139,250,0.08); }
```

Replace with:
```css
.project-card {
  background: #ffffff;
  border: 1px solid var(--divider);
  border-left: 3px solid var(--gold);
  border-radius: 0 var(--radius-m) var(--radius-m) 0;
  padding: 1.25rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.project-card:hover { box-shadow: var(--shadow-m); transform: translateY(-2px); }
```

- [ ] **Step 4: Update `.project-funding` colour**

Find:
```css
.project-funding {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--blue);
}
```

Replace with:
```css
.project-funding {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
}
```

- [ ] **Step 5: Update `.project-years` colour**

Find:
```css
.project-years {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-3);
}
```

Replace with:
```css
.project-years {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gold);
}
```

- [ ] **Step 6: Update `.collab-card` and `.consulting-card`**

Find:
```css
.collab-card {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-l);
  overflow: hidden;
  margin-top: 1.25rem;
}
```

Replace with:
```css
.collab-card {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  background: #ffffff;
  border: 1px solid var(--divider);
  border-radius: var(--radius-l);
  overflow: hidden;
  margin-top: 1.25rem;
}
```

Find:
```css
.consulting-card {
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-left: 3px solid var(--blue);
  border-radius: var(--radius-m);
  padding: 0;
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 280px;
  overflow: hidden;
}
```

Replace with:
```css
.consulting-card {
  background: #ffffff;
  border: 1px solid var(--divider);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius-m);
  padding: 0;
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 280px;
  overflow: hidden;
}
```

- [ ] **Step 7: Verify in browser**

Scroll to Research section. Expected: light grey section bg. Three research area cards are white with navy top border. Funded project cards are white with a gold left border. No cyan glow. Funding amounts and years are gold.

- [ ] **Step 8: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: research section - bordered cards, remove cyan glow"
```

---

### Task 9: Innovation + Teaching + Leadership sections

**Files:**
- Modify: `website/styles.css` — INNOVATION & IP, TEACHING, LEADERSHIP & ADMINISTRATION sections

- [ ] **Step 1: Update `.ip-card` — bordered, navy top, remove glassmorphism**

Find:
```css
.ip-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.ip-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 8px 32px rgba(167,139,250,0.08); transform: translateY(-3px); }
```

Replace with:
```css
.ip-card {
  background: #ffffff;
  border: 1px solid var(--divider);
  border-top: 3px solid var(--navy);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.ip-card:hover { box-shadow: var(--shadow-m); transform: translateY(-3px); }
```

- [ ] **Step 2: Update `.ip-year` and `.role-badge` colours**

Find:
```css
.ip-year {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--blue);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}
```

Replace with:
```css
.ip-year {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}
```

Find:
```css
.role-badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--blue);
  background: rgba(167,139,250,0.08);
  border-radius: var(--radius-s);
  padding: 0.2rem 0.65rem;
}
```

Replace with:
```css
.role-badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--text);
  background: var(--bg);
  border-radius: var(--radius-s);
  padding: 0.2rem 0.65rem;
}
```

- [ ] **Step 3: Update `.course-card` — white bg on grey section**

Find:
```css
.course-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-m);
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  color: var(--text);
  font-weight: 500;
}
```

Replace with:
```css
.course-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid var(--divider);
  border-radius: var(--radius-m);
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  color: var(--text);
  font-weight: 500;
}
```

- [ ] **Step 4: Update `.course-dot` colour**

Find:
```css
.course-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
  flex-shrink: 0;
}
```

Replace with:
```css
.course-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}
```

- [ ] **Step 5: Update `.youtube-box` — white bg**

Find:
```css
.youtube-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-l);
  padding: 2rem 2.5rem;
  margin-top: 3rem;
}
```

Replace with:
```css
.youtube-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: #ffffff;
  border: 1px solid var(--divider);
  border-radius: var(--radius-l);
  padding: 2rem 2.5rem;
  margin-top: 3rem;
}
```

- [ ] **Step 6: Update `.admin-card` — light grey bg on white section**

Find:
```css
.admin-card {
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-m);
  padding: 1.5rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.admin-card:hover { box-shadow: var(--shadow-s); transform: translateY(-2px); }
```

Replace with:
```css
.admin-card {
  background: var(--bg);
  border: 1px solid var(--divider);
  border-top: 3px solid var(--navy);
  border-radius: var(--radius-m);
  padding: 1.5rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.admin-card:hover { box-shadow: var(--shadow-m); transform: translateY(-2px); }
```

- [ ] **Step 7: Update `.admin-period` badge colour**

Find:
```css
.admin-period {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--blue);
  background: rgba(167,139,250,0.08);
  border-radius: 4px;
  padding: 0.15rem 0.55rem;
  display: inline-block;
  margin-bottom: 0.65rem;
}
```

Replace with:
```css
.admin-period {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201,168,76,0.1);
  border-radius: 4px;
  padding: 0.15rem 0.55rem;
  display: inline-block;
  margin-bottom: 0.65rem;
}
```

- [ ] **Step 8: Verify in browser**

Check Innovation, Teaching, and Leadership sections. Expected: IP cards are white with navy top border. Course cards are white. Admin cards are light grey with navy top border. Date badges are gold.

- [ ] **Step 9: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: innovation, teaching, leadership sections - remove glassmorphism"
```

---

### Task 10: Awards + Press + Community sections

**Files:**
- Modify: `website/styles.css` — AWARDS, PRESS GRID, COMMUNITY sections

- [ ] **Step 1: Update `.timeline-year` colour**

Find:
```css
.timeline-year {
  flex-shrink: 0;
  width: 3.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--blue);
  letter-spacing: 0.03em;
  padding-top: 0.25rem;
  text-align: right;
}
```

Replace with:
```css
.timeline-year {
  flex-shrink: 0;
  width: 3.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.03em;
  padding-top: 0.25rem;
  text-align: right;
}
```

- [ ] **Step 2: Update `.timeline-item::before` divider line colour**

Find:
```css
.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 2.35rem;
  top: 2.1rem;
  bottom: 0;
  width: 1px;
  background: var(--divider);
}
```

Replace with:
```css
.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 2.35rem;
  top: 2.1rem;
  bottom: 0;
  width: 1px;
  background: var(--divider);
}
```
(No change needed — `--divider` is already updated by token swap.)

- [ ] **Step 3: Update `.media-item` — light grey bg on white awards section**

Find:
```css
.media-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--bg);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-m);
  padding: 1rem 1.15rem;
}
```

Replace with:
```css
.media-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--bg);
  border: 1px solid var(--divider);
  border-radius: var(--radius-m);
  padding: 1rem 1.15rem;
}
```

- [ ] **Step 4: Update `.press-card` — bordered, remove glassmorphism**

Find:
```css
.press-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.press-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 8px 32px rgba(167,139,250,0.08); transform: translateY(-2px); }
```

Replace with:
```css
.press-card {
  background: #ffffff;
  border: 1px solid var(--divider);
  border-top: 3px solid var(--navy);
  border-radius: var(--radius-m);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.press-card:hover { box-shadow: var(--shadow-m); transform: translateY(-2px); }
```

- [ ] **Step 5: Update `.community-card` — light grey bg**

Find:
```css
.community-card {
  background: var(--bg-alt);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.community-card:hover { box-shadow: var(--shadow-m); transform: translateY(-3px); }
```

Replace with:
```css
.community-card {
  background: var(--bg);
  border: 1px solid var(--divider);
  border-radius: var(--radius-l);
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.community-card:hover { box-shadow: var(--shadow-m); transform: translateY(-3px); }
```

- [ ] **Step 6: Update `.hsm-mention` background**

Find:
```css
.hsm-mention {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  background: var(--bg-alt);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-m);
  font-size: 0.82rem;
  color: var(--text-2);
  line-height: 1.6;
}
.hsm-mention svg { flex-shrink: 0; margin-top: 2px; color: #e05; opacity: 0.7; }
.hsm-mention a { color: var(--blue); }
```

Replace with:
```css
.hsm-mention {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  background: var(--bg-alt);
  border: 1px solid var(--divider);
  border-radius: var(--radius-m);
  font-size: 0.82rem;
  color: var(--text-2);
  line-height: 1.6;
}
.hsm-mention svg { flex-shrink: 0; margin-top: 2px; color: #e05; opacity: 0.7; }
.hsm-mention a { color: var(--gold); }
```

- [ ] **Step 7: Verify in browser**

Check Awards, Press, and Community sections. Expected: timeline years are gold. Press cards are white with navy top border. Community card is light grey. CRYsTaL section images display in their mosaic gallery.

- [ ] **Step 8: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: awards, press, community sections - remove glassmorphism, gold accents"
```

---

### Task 11: Publications — ruled editorial layout + CSS grid

This is the most structurally distinct change: publications become a ruled list (no card boxes) using CSS grid to position the year in a left column.

**Files:**
- Modify: `website/styles.css` — PUBLICATIONS section

- [ ] **Step 1: Remove `#publications::before` radial glow**

Find:
```css
#publications { position: relative; overflow: hidden; }
#publications::before {
  content: '';
  position: absolute;
  bottom: -60px; left: -60px;
  width: 380px; height: 380px;
  background: radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
```

Replace with:
```css
#publications { position: relative; overflow: hidden; }
```

- [ ] **Step 2: Update filter buttons — navy active state**

Find:
```css
.filter-btn {
  padding: 0.4rem 1rem;
  border-radius: var(--radius-s);
  border: 1px solid var(--divider);
  background: transparent;
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover { border-color: var(--blue); color: var(--blue); }
.filter-btn.active { background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.4); color: var(--blue); }
```

Replace with:
```css
.filter-btn {
  padding: 0.4rem 1rem;
  border-radius: var(--radius-s);
  border: 1px solid var(--divider);
  background: transparent;
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover { border-color: var(--navy); color: var(--text); }
.filter-btn.active { background: var(--bg-hero); color: #fff; border-color: var(--bg-hero); }
```

- [ ] **Step 3: Replace `.pub-list` and `.pub-card` with ruled + CSS-grid layout**

Find:
```css
.pub-list { display: flex; flex-direction: column; gap: 0.75rem; }

.pub-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  padding: 1.25rem 1.5rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.pub-card:hover { border-color: rgba(167,139,250,0.25); box-shadow: 0 4px 20px rgba(167,139,250,0.08); transform: translateX(3px); }
.pub-card.hidden { display: none; }
```

Replace with:
```css
.pub-list {
  border-top: 2px solid var(--text);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pub-card {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--divider);
  border-radius: 0;
  padding: 1.1rem 0;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 0 1.25rem;
  align-items: start;
  transition: background 0.15s ease;
}
.pub-card:hover { background: var(--bg); }
.pub-card.hidden { display: none; }
```

- [ ] **Step 4: Replace `.pub-year` pill with left-column label**

Find:
```css
.pub-year {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--blue);
  background: rgba(167,139,250,0.08);
  border-radius: 4px;
  padding: 0.15rem 0.55rem;
  margin-bottom: 0.55rem;
}
```

Replace with:
```css
.pub-year {
  grid-column: 1;
  grid-row: 1 / span 10;
  align-self: start;
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: right;
  color: var(--gold);
  background: none;
  border-radius: 0;
  padding: 0.2rem 0 0;
  margin-bottom: 0;
}
```

- [ ] **Step 5: Add grid-column rules for pub-card children**

After the `.pub-year` block, add the following CSS (find the `.pub-authors` rule and replace its context):

Find:
```css
.pub-authors {
  font-size: 0.78rem;
  color: var(--text-3);
  letter-spacing: -0.01em;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}
```

Replace with:
```css
.pub-card > h4,
.pub-card > .pub-authors,
.pub-card > .pub-venue,
.pub-card > .pub-tags,
.pub-card > .pub-link-row {
  grid-column: 2;
}

.pub-authors {
  font-size: 0.78rem;
  color: var(--text-3);
  letter-spacing: -0.01em;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}
```

- [ ] **Step 6: Update pub-card `h4` to serif and update tag colours**

Find:
```css
.pub-card h4 {
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.5;
  margin-bottom: 0.35rem;
}
```

Replace with:
```css
.pub-card h4 {
  font-family: var(--font-serif);
  font-size: 0.925rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0;
  line-height: 1.5;
  margin-bottom: 0.35rem;
}
```

Find:
```css
.tag-journal   { background: rgba(167,139,250,0.1);  color: var(--blue); }
.tag-conference{ background: rgba(56,189,248,0.1);  color: var(--purple); }
.tag-media     { background: rgba(52,199,89,0.1);  color: #34c759; }
```

Replace with:
```css
.tag-journal   { background: #eef1f7; color: var(--text); }
.tag-conference{ background: #eef1f7; color: var(--text); }
.tag-media     { background: #fef9ee; color: #a8872e; }
```

- [ ] **Step 7: Verify in browser**

Scroll to Publications section. Expected: white section bg. Publications are rendered as a ruled list with a 2px navy top rule. Year (e.g. "2026") appears in a narrow left column in gold. Title, authors, venue, tags stack in the right column. Filter buttons "All / Journals / Media" have a navy active state. Clicking "Journals" hides Media entries. Clicking "Media" hides Journal entries.

- [ ] **Step 8: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: publications - ruled editorial layout with CSS grid year column"
```

---

### Task 12: Contact section + Footer + SVG icon backgrounds

**Files:**
- Modify: `website/styles.css` — CONTACT, FOOTER, SVG ICON SYSTEM sections

- [ ] **Step 1: Remove `#contact::before` radial glow**

Find:
```css
#contact { background: var(--bg-alt); position: relative; overflow: hidden; }
#contact::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 500px; height: 500px;
  background: radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
```

Replace with:
```css
#contact { background: var(--bg); position: relative; overflow: hidden; }
```

- [ ] **Step 2: Update `.contact-item` — light grey bg, navy left border**

Find:
```css
.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  padding: 1rem 1.25rem;
}
```

Replace with:
```css
.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-alt);
  border: 1px solid var(--divider);
  border-left: 3px solid var(--navy);
  border-radius: 0 var(--radius-m) var(--radius-m) 0;
  padding: 1rem 1.25rem;
}
```

- [ ] **Step 3: Update `.contact-item-text` link hover**

Find:
```css
.contact-item-text a:hover { color: var(--blue); }
```

Replace with:
```css
.contact-item-text a:hover { color: var(--gold); }
```

- [ ] **Step 4: Update `.ext-link` — gold top border, remove glassmorphism**

Find:
```css
.ext-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-m);
  padding: 0.9rem 1.15rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.ext-link:hover { border-color: rgba(167,139,250,0.35); box-shadow: 0 4px 20px rgba(167,139,250,0.08); transform: translateX(3px); }
```

Replace with:
```css
.ext-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid var(--divider);
  border-top: 3px solid var(--gold);
  border-radius: var(--radius-m);
  padding: 0.9rem 1.15rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.ext-link:hover { box-shadow: var(--shadow-m); transform: translateX(3px); }
```

- [ ] **Step 5: Update `.ext-link-arrow` hover colour**

Find:
```css
.ext-link-arrow { font-size: 1rem; color: var(--text-3); transition: color 0.2s; }
.ext-link:hover .ext-link-arrow { color: var(--blue); }
```

Replace with:
```css
.ext-link-arrow { font-size: 1rem; color: var(--text-3); transition: color 0.2s; }
.ext-link:hover .ext-link-arrow { color: var(--gold); }
```

- [ ] **Step 6: Update footer to use `--bg-hero` (navy)**

Find:
```css
footer {
  background: var(--bg);
  border-top: 0.5px solid var(--divider);
  padding: 2rem 0;
  text-align: center;
}
footer p { font-size: 0.8rem; color: var(--text-3); }
footer a { color: var(--text-2); transition: color 0.2s; }
footer a:hover { color: var(--blue); }
```

Replace with:
```css
footer {
  background: var(--bg-hero);
  border-top: none;
  padding: 2rem 0;
  text-align: center;
}
footer p { font-size: 0.8rem; color: #6a8fa8; }
footer a { color: #a0b8d0; transition: color 0.2s; }
footer a:hover { color: var(--gold); }
```

- [ ] **Step 7: Update SVG icon box backgrounds**

Find:
```css
/* Area icon boxes */
.area-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: rgba(167,139,250,0.08);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
  flex-shrink: 0;
}
.area-icon svg { width: 22px; height: 22px; color: var(--blue); display: block; }

/* Highlight icon: already sized as 40px box in existing CSS — just add SVG sizing */
.highlight-icon svg { width: 20px; height: 20px; color: var(--blue); display: block; }

/* Community icon: override emoji sizing */
.community-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(167,139,250,0.08);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
  font-size: inherit;
}
.community-icon svg { width: 22px; height: 22px; color: var(--blue); display: block; }

/* Media icon: override emoji sizing */
.media-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: rgba(167,139,250,0.08);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  padding-top: 0;
}
.media-icon svg { width: 18px; height: 18px; color: var(--blue); display: block; }

/* Contact icon */
.contact-icon {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: inherit;
}
.contact-icon svg { width: 18px; height: 18px; color: var(--blue); display: block; }
```

Replace with:
```css
/* Area icon boxes */
.area-icon {
  width: 44px; height: 44px;
  border-radius: 6px;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
  flex-shrink: 0;
}
.area-icon svg { width: 22px; height: 22px; color: var(--text); display: block; }

.highlight-icon svg { width: 20px; height: 20px; color: var(--text); display: block; }

/* Community icon */
.community-icon {
  width: 44px; height: 44px;
  border-radius: 6px;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
  font-size: inherit;
}
.community-icon svg { width: 22px; height: 22px; color: var(--text); display: block; }

/* Media icon */
.media-icon {
  width: 36px; height: 36px;
  border-radius: 6px;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  padding-top: 0;
}
.media-icon svg { width: 18px; height: 18px; color: var(--text); display: block; }

/* Contact icon */
.contact-icon {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: inherit;
}
.contact-icon svg { width: 18px; height: 18px; color: var(--text); display: block; }
```

- [ ] **Step 8: Verify in browser**

Scroll to Contact and Footer. Expected: contact section is light grey. Contact items have a navy left border. External profile links have a gold top border. Footer is navy with muted blue-grey text and gold link hover.

- [ ] **Step 9: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: contact, footer, SVG icon backgrounds - final section pass"
```

---

### Task 13: Accent colour sweep + pub-link + highlight link colours

Catch any remaining hardcoded purple/cyan references that weren't addressed in prior tasks.

**Files:**
- Modify: `website/styles.css`

- [ ] **Step 1: Verify remaining purple/cyan references**

```bash
grep -n "167,139,250\|56,189,248\|a78bfa\|38bdf8\|9061f9\|var(--blue)\|var(--purple)\|var(--blue-dark)" /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website/styles.css
```

Expected output: only the token definitions at the top (lines 10–12 which are now the new gold values). If any other lines appear, fix them in this step.

- [ ] **Step 2: Update `.pub-link` colour**

Find:
```css
.pub-link {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--blue);
  letter-spacing: -0.01em;
  transition: opacity 0.2s;
}
.pub-link:hover { opacity: 0.7; }
```

Replace with:
```css
.pub-link {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: -0.01em;
  transition: opacity 0.2s;
}
.pub-link:hover { opacity: 0.7; }
```

- [ ] **Step 3: Update `.about-bio a` and `.highlight-text a` link colours**

Find:
```css
.highlight-text a {
  color: var(--blue);
  text-decoration: none;
}
.highlight-text a:hover { text-decoration: underline; }

.about-bio a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 500;
}
.about-bio a:hover { text-decoration: underline; }
```

Replace with:
```css
.highlight-text a {
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--divider);
}
.highlight-text a:hover { border-bottom-color: var(--gold); }

.about-bio a {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid rgba(201,168,76,0.4);
}
.about-bio a:hover { border-bottom-color: var(--gold); }
```

- [ ] **Step 4: Update `.section-label` colour**

Find:
```css
.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.5rem;
}
```

Replace with:
```css
.section-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.4rem;
}
```

- [ ] **Step 5: Update `.collab-meta` and `.consulting-meta` colours**

Find:
```css
.collab-meta {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.6rem;
}
```

Replace with:
```css
.collab-meta {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}
```

Find:
```css
.consulting-meta {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.6rem;
}
```

Replace with:
```css
.consulting-meta {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}
```

- [ ] **Step 6: Update `.press-title`, `.projects-title`, and `.level-title` colours**

Find:
```css
.press-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--blue);
  margin: 3rem 0 1.25rem;
}
```

Replace with:
```css
.press-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 3rem 0 1.25rem;
}
```

Find:
```css
.level-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 0.85rem;
}
```

Replace with:
```css
.level-title {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0;
  text-transform: none;
  color: var(--text-2);
  margin-bottom: 0.85rem;
}
```

- [ ] **Step 7: Final accent sweep verification**

```bash
grep -n "167,139,250\|56,189,248\|a78bfa\|38bdf8\|9061f9\|var(--blue)\b\|var(--purple)\b\|var(--blue-dark)\b" /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website/styles.css
```

Expected: zero results (the token definitions now use `--gold`/`--gold-dark`/`--gold-light`, and no selector should reference the old `var(--blue)` etc.). If results appear, fix them.

- [ ] **Step 8: Verify in browser**

Do a full scroll through the page. Expected: no purple or cyan visible anywhere. All accent colours are gold. All link underlines use gold on hover. Section labels are gold in small-caps style.

- [ ] **Step 9: Commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: accent colour sweep - replace all remaining purple/cyan with gold"
```

---

### Task 14: Responsive breakpoints review

Update responsive overrides that reference the old colour variables or glass effects.

**Files:**
- Modify: `website/styles.css` — RESPONSIVE section

- [ ] **Step 1: Update `.about-highlights` responsive rule to match 3-col correction**

Find (in the `@media (max-width: 1024px)` block):
```css
  .about-highlights { grid-template-columns: repeat(2, 1fr); }
```
No change needed — 2-col at tablet is still appropriate for 3 highlight cards.

Find (in the `@media (max-width: 480px)` block):
```css
  .about-highlights { grid-template-columns: 1fr; }
```
No change needed — 1-col on mobile is correct.

- [ ] **Step 2: Verify `.ip-copyright` border colour**

Find:
```css
.ip-copyright {
  font-size: 0.75rem;
  color: var(--text-3);
  letter-spacing: 0.01em;
  padding-top: 0.75rem;
  border-top: 0.5px solid var(--divider);
  margin-top: 0.75rem;
}
```

`var(--divider)` is now `#d0dae8` — appropriate for a light card. No change needed.

- [ ] **Step 3: Full responsive check in browser**

Resize the browser to 768px and then 480px. Check:
- Hero: photo hides on mobile, headline is centred ✓
- About: two-column grid collapses to single column ✓
- Research areas: 3-col → 1-col ✓
- Publications: ruled list still works with CSS grid (year + content columns) — confirm year column doesn't overflow on mobile

If the publication year column is too wide on mobile, add to the `@media (max-width: 768px)` block:
```css
  .pub-card { grid-template-columns: 2.5rem 1fr; }
  .pub-year { font-size: 0.65rem; }
```

- [ ] **Step 4: Final full-desktop visual QA**

Return browser to desktop width. Scroll through every section and confirm:
1. Navbar: navy, gold logo, gold active link
2. Hero: navy bg, gold headline gradient, gold accent bar at bottom, gold photo frame
3. About: white bg, italic serif pull-quote, 3-col highlights with navy top border
4. Research: grey bg, white bordered area cards, gold project dates
5. Innovation: white bg, white bordered IP cards with navy top
6. Teaching: grey bg, white course cards, gold dots
7. Leadership: white bg, grey admin cards with navy top border
8. Press: grey bg, white press cards with navy top
9. Awards: white bg, gold timeline years
10. Community: grey bg, CRYsTaL gallery intact
11. Publications: white bg, ruled list with gold year column, navy active filter
12. Contact: grey bg, navy-left-border contact items, gold-top ext-links
13. Footer: navy bg, muted text, gold hover

- [ ] **Step 5: Final commit**

```bash
cd /Users/mfaizb/Desktop/Claude-Code/DrFaiz-Website-V2/website
git add styles.css
git commit -m "style: responsive review and final visual QA pass"
```

---

## Self-review checklist

- [x] **Spec coverage:** All spec sections have corresponding tasks — tokens (T1), section backgrounds (T2), typography (T3), navigation (T4), hero (T5), buttons/utilities (T6), about (T7), research (T8), innovation/teaching/leadership (T9), awards/press/community (T10), publications (T11), contact/footer/SVG (T12), accent sweep (T13), responsive (T14).
- [x] **No placeholders:** All steps contain exact CSS.
- [x] **Type consistency:** CSS selector names match across all tasks (`.pub-card`, `.highlight-card`, etc. are consistent throughout).
- [x] **Publication grid:** Task 11 uses CSS grid with `grid-template-columns: 3.5rem 1fr` and explicit `grid-column: 2` for child elements — no flex ambiguity.
- [x] **`--navy` variable:** Defined in Task 1 tokens and used in card `border-top` rules throughout.
- [x] **Glass variables transitional:** `--glass-bg: #ffffff` and `--glass-border: #d0dae8` in Task 1 ensure no broken cards before individual task fixes.
