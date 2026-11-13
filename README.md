# Lumiere Antique — B2B Portfolio Website

A responsive Next.js App Router website for Lumiere Antique, designed as a premium, editorial B2B portfolio with a catalogue-first structure and a future e-commerce path.

## Included
- Responsive homepage and mobile navigation
- Collections landing page and category anchors
- Individual product detail route template
- Our Story and Capabilities pages
- Trade enquiry and contact pages
- Enquiry API route wired for Resend email delivery
- SEO metadata and responsive styling

## Run locally

1. Install Node.js 20.9+.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env.local` and add the email settings (see below).
4. Run `npm run dev` and open http://localhost:3000.

## Enable enquiry delivery

Set these environment variables in `.env.local` and in the hosting provider:

- `RESEND_API_KEY`: API key from Resend
- `ENQUIRY_TO_EMAIL`: inbox that should receive enquiries
- `ENQUIRY_FROM_EMAIL`: verified sender address/domain in Resend

Without these values, the enquiry endpoint deliberately returns a clear configuration error; it does not pretend to have sent a lead.

## Before publishing — important content checklist

The first build uses editorial placeholder photography and sample catalogue entries. Replace them with approved Lumiere Antique assets and verified product information before launch.

- Replace the five sample product entries in `lib/products.ts` with real SKUs, approved product names, accurate materials, finishes, dimensions and descriptions.
- Replace all Unsplash URLs with owned/licensed high-resolution brand and product photographs.
- Confirm and add the actual company story, manufacturing capabilities, quality processes and export details. Current wording intentionally avoids unsupported claims.
- Add the real business email, phone/WhatsApp, address and social links.
- Update `metadataBase` in `app/layout.tsx` and set `NEXT_PUBLIC_SITE_URL` to the actual domain.
- Add favicon, Open Graph image and final logo files.
- Configure Resend and test enquiry delivery end-to-end.
- Add privacy policy, cookie notice if applicable, and any required legal/business disclosures.

## Deploy

Recommended: import the project into Vercel, set the environment variables, deploy, then connect the existing domain in Vercel's project settings. Add the DNS records Vercel provides at the domain registrar. The domain itself is not configured by this source package.

## Future commerce

Product data is centralised in `lib/products.ts`, and product detail routes already exist. This gives a clean foundation for adding a CMS or database, buyer-specific pricing, cart, checkout, payments and order management later.
