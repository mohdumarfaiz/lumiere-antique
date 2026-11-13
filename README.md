# Lumiere Antique — B2B Portfolio Website

A responsive Next.js App Router website for Lumiere Antique, designed as a premium, editorial B2B portfolio with a catalogue-first structure and a future e-commerce path.

## Included
- Responsive homepage and mobile navigation
- Collections landing page and category anchors
- Individual product detail route template
- Our Story and Capabilities pages
- Trade enquiry and contact pages
- Static-compatible hosted form submission
- SEO metadata and responsive styling

## Run locally

1. Install Node.js 20.9+.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` after creating the form (see below).
4. Run `npm run dev` and open http://localhost:3000.

## Enable enquiry delivery

Create the Formspree form and set its submission URL as `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local` and as a GitHub Actions repository variable with the same name. Until the endpoint is configured, the form reports that it is not connected; it never displays a success message unless Formspree accepts the submission.

## Before publishing — important content checklist

The first build uses editorial placeholder photography and sample catalogue entries. Replace them with approved Lumiere Antique assets and verified product information before launch.

- Replace the sample product entries in `lib/products.ts` with approved product data and original product photography.
- Replace all Unsplash URLs with owned/licensed high-resolution brand and product photographs.
- Confirm and add the actual company story, manufacturing capabilities, quality processes and export details. Current wording intentionally avoids unsupported claims.
- Add the real business email, phone/WhatsApp, address and social links.
- Update `metadataBase` in `app/layout.tsx` and set `NEXT_PUBLIC_SITE_URL` to the actual domain.
- Add favicon, Open Graph image and final logo files.
- Configure the hosted form endpoint and test enquiry delivery end-to-end.
- Add privacy policy, cookie notice if applicable, and any required legal/business disclosures.

## Deploy to GitHub Pages

The `Deploy to GitHub Pages` workflow builds the static site and publishes `out/` whenever a commit reaches `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

- The default project URL uses the repository path automatically (for example, `https://OWNER.github.io/REPOSITORY/`).
- For a custom domain, add a repository Actions variable named `CUSTOM_DOMAIN` with only the hostname (for example, `www.example.com`). The workflow will build at the domain root and add the `CNAME` file to the Pages artifact. Configure the matching DNS records at your domain provider and add/verify the domain in GitHub Pages settings.
- `NEXT_PUBLIC_BASE_PATH` can override path detection for a special setup. Leave it unset for automatic behavior; use an empty value for a root-hosted deployment.
- Local development remains `npm run dev` at `http://localhost:3000`.

The site uses Next.js static export; its enquiry form posts directly to the configured Formspree endpoint.

## Future commerce

Product data is centralised in `lib/products.ts`, and product detail routes already exist. This gives a clean foundation for adding a CMS or database, buyer-specific pricing, cart, checkout, payments and order management later.
