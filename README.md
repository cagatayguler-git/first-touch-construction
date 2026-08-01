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

- The **contact form posts to [Web3Forms](https://web3forms.com)** via `fetch`, so the visitor stays
  on the page. Enquiries are emailed to whichever address the access key is registered to.
  The key lives in the `access_key` hidden input in `index.html` — it is a public,
  submit-only identifier, safe to keep in the repo, and can be rotated from the Web3Forms
  dashboard if it ever gets abused. A hidden `botcheck` honeypot field filters basic spam.
- Phone (`07743 516554`) and email (`kutay@firsttouchconstruction.co.uk`) are the **live** contact
  details.
- Images are photo renders of the brand logo and real project work supplied by the client.

## Deploy

Live at **https://firsttouchconstruction.co.uk** (and `www.`), hosted on **Cloudflare Pages**
in the account that also holds the domain, so DNS and SSL are managed in one place.

There is no Git integration yet, so **pushing to `main` does not deploy**. Deploys are direct
uploads of the static files:

```bash
# from the repo root, with CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID exported
rm -rf dist && mkdir dist
cp index.html dist/ && cp -R css js assets dist/
npx wrangler pages deploy dist --project-name first-touch-construction --branch main
```

Only site files are copied into `dist/` — the README and `.git` are deliberately left out so they
are not served. To get deploy-on-push instead, connect the repo under
**Workers & Pages → first-touch-construction → Settings → Builds** (framework preset *None*,
empty build command, output directory `/`); that requires GitHub access for the Cloudflare account.

Cloudflare's zone-level **Email Address Obfuscation** (Scrape Shield) rewrites the `mailto:` links
at the edge and decodes them in the browser, so the address is hidden from scrapers. It needs
JavaScript — with JS off the contact email reads `[email protected]`. Turn it off under
**Scrape Shield** if a plain `mailto:` is preferred.
