# Dr. Muhammad Faiz Bukhori — personal site (V3)

Static single-page site. No build step, no dependencies.

## Files
- `index.html` — the whole page (inline styles + one `<style>` block + a small scroll-spy script)
- `assets/` — photographs, lecture stills and press images

## Publishing with GitHub Pages
1. Create a repository and upload the contents of this folder to its root (or to `/docs`).
2. Repository → **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)` (or `/docs`).
3. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

For a custom domain, add a `CNAME` file containing the domain and point a DNS CNAME record at `<user>.github.io`.

## Editing
- Text and links: edit `index.html` directly — each section is a `<section id="...">` in page order.
- Theme: the colour tokens are the CSS variables at the top of the `<style>` block (`--brand`, `--accent`, `--gold`, `--photo-filter`).
- Photographs render in full colour; set `--photo-filter: grayscale(1) contrast(1.08)` for the black-and-white treatment.
