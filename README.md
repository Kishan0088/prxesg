# PR×ESG — Marketing site

A static, animated 4-page marketing site. No build step, no dependencies — plain HTML/CSS/JS.

**Live:** https://prxesg.com/ (also served at https://kishan0088.github.io/prxesg/)

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

Repo `Kishan0088/prxesg`, GitHub Pages from `main` / root, custom domain **prxesg.com** (HTTPS enforced via Let's Encrypt). The `CNAME` file holds the domain; all page links are relative.

DNS at GoDaddy: apex `@` → four A records `185.199.108–111.153`; `www` → CNAME `kishan0088.github.io`. (The GoDaddy "WebsiteBuilder Site" A record must stay deleted — it hijacks the apex and breaks HTTPS.)

To update: edit files and push to `main`; Pages rebuilds in ~1 minute.

## Notes

- **Motion** respects `prefers-reduced-motion` — all animation is disabled for users who ask for it.
- **Contact:** the CTA uses `mailto:hello@prxesg.com`. Make sure that inbox exists, or swap it for a form.
- **Social share image:** no `og:image` yet — link previews are text-only. Add a 1200×630 PNG if you want a rich card.
