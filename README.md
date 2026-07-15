# First Touch Construction — Website

Marketing website for **First Touch Construction**, a newly established UK construction company
delivering residential, commercial and renovation projects with a focus on customer satisfaction,
quality craftsmanship, on-time delivery and transparent pricing.

Built as a fast, dependency-free static site (HTML + CSS + vanilla JS).

## Brand

- **Palette:** deep forest green `#14352a` + gold `#c9a227` (from the company logo)
- **Type:** Jost (geometric, matches the logo mark) for headings, Inter for body
- **Voice:** fresh, trustworthy, professional — "Building trust from the first touch."

## Structure

```
first-touch-construction/
├── index.html          # single-page site
├── css/styles.css      # design system + layout + responsive
├── js/main.js          # nav, scroll reveal, form demo
└── assets/             # logos, project photos, showcase video
```

### Sections
Hero · Trust bar · About · Services · Projects gallery · Why Us · Video showcase · Vision · Contact · Footer

## Run locally

No build step. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Notes

- The **contact form is a front-end demo** — it validates and confirms in the browser but does not
  send anywhere yet. Wire it to an email service (Formspree, Resend, a serverless function, etc.)
  and update the phone/email placeholders in `index.html` before going live.
- Phone (`+44 (0) 000 000 000`) and email (`hello@firsttouch.co.uk`) are **placeholders**.
- Images are photo renders of the brand logo and real project work supplied by the client.

## Deploy

Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Point the host at the
project root — no configuration required.
