# PR×ESG — Marketing site

A static, animated 4-page marketing site. No build step, no dependencies — plain HTML/CSS/JS.

**Live:** https://kishan0088.github.io/prxesg/

```
index.html      Home / overview + animated intelligence-loop hero
problem.html    The Problem + animated "race" visual
solution.html   The Solution + animated flow + weeks→minutes meter
impact.html     The Impact + count-up stats, TAM rings, ARR bars
404.html        Branded not-found page
styles.css      Design system + motion layer
app.js          Scroll progress, reveals, count-ups, spotlight, meters
favicon.svg     Brand mark
robots.txt      Crawler rules + sitemap pointer
sitemap.xml     4 URLs
.nojekyll       Serve files as-is on GitHub Pages
```

## How it's deployed

Repo `Kishan0088/prxesg`, GitHub Pages from `main` / root. Because it's a *project* page it lives at the `/prxesg/` subpath — all links are relative, so it works there without changes.

To update: edit files and push to `main`; Pages rebuilds in ~1 minute.

## Switching to a custom domain (prxesg.com) later

1. Add a file named `CNAME` (no extension) containing `prxesg.com`.
2. At your registrar add four `A` records for the apex → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`, and a `CNAME` for `www` → `kishan0088.github.io`.
3. **Settings → Pages** → set custom domain to `prxesg.com`, enable **Enforce HTTPS**.
4. Update the absolute URLs in the `<link rel="canonical">` / OpenGraph tags, `sitemap.xml`, and `robots.txt` from `kishan0088.github.io/prxesg/` to `prxesg.com/`.

## Notes

- **Motion** respects `prefers-reduced-motion` — all animation is disabled for users who ask for it.
- **Contact:** the CTA uses `mailto:hello@prxesg.com`. Make sure that inbox exists, or swap it for a form.
- **Social share image:** no `og:image` yet — link previews are text-only. Add a 1200×630 PNG if you want a rich card.
