# Chance For Life Inc. — Website

A hand-built static website (HTML / CSS / JS — no framework, no build step) for a faith-inspired, community-centered mental health practice serving Maryland.

## Run it locally

Any static server works. From this `site/` folder:

```bash
python -m http.server 8899
```

Then open http://localhost:8899. (Opening the files directly with `file://` also works, but a server is recommended so the fonts and JS behave exactly as in production.)

## Pages

| File | Page |
|------|------|
| `index.html` | Home — 3-image hero slideshow, the 5 service pillars, founder teaser, closing CTA |
| `about.html` | About — mission, our story, approach, Meet the Founder |
| `services.html` | Services — overview grid + deep-dive sections (Mental Health, Medically Fragile, Group Home, DDA Nursing) |
| `cmt-training.html` | CMT Training — highlights, pricing, and a registration form |
| `faq.html` | FAQ — accordion |
| `contact.html` | Get in Touch — HIPAA-conscious contact form, contact details, "how it works" |

Shared assets: `css/styles.css` (design system), `js/main.js` (all interactions), `images/`.

## Design system (at a glance)

- **Colors** — deep indigo `#2C285A`, plum `#3D2968`, sage `#6E8B4A`, warm cream `#F8F3EF`, soft lavender. Sampled from the brand flier; edit the tokens at the top of `css/styles.css` (`:root`) if exact brand values arrive later.
- **Type** — Fraunces (editorial serif) + Hanken Grotesk (body), loaded from Google Fonts.
- **Motif** — the logo's "tree-in-cupped-hands" drives the look: the hero image sits in a cradle-shaped frame, and section labels use a small leaf sprig (`images/leaf.svg`).

## Content status

Real details are now in place site-wide:

- **Founder** — Oluwakemi Fagbuyi, MSN, PMHNP-BC, with full bio (About + Home). Real headshot in `images/founder.jpg`.
- **CMT Training** — Initial $250 (standard) / Refresher $100, group rates on request, prerequisites (18+, English, employer/state eligibility), and payment (Zelle, Cash App, debit card, business check; registration confirmed once payment received).
- **Faith-inspired** copy — About + FAQ.
- **Insurance** — accepting insurance and Medicaid (Contact + FAQ).
- **WhatsApp** — `https://wa.me/12024879587` (top bar, footer, contact, floating button).
- **Socials** — Instagram + TikTok (`@chanceforlifeinc`), site-wide.
- **Copyright year** — auto-fills via JS, no action needed.

Still open before launch: **hosting choice** and **wiring the forms** (below). One testimonial is included on the Home page (shared with permission, kept anonymous for HIPAA); the layout can hold more as they come in.

## Wiring the forms (contact + CMT registration)

Right now both forms **validate and show a friendly confirmation but do not send** (they're in demo mode — see the note in `js/main.js`). A static site can't email on its own; pick one handler:

- **Formspree / Web3Forms** — easiest, works on any host. Set the form's `action` to your endpoint and `method="post"`, then remove the `data-demo` attribute so the browser submits normally.
- **Netlify Forms** — if you host on Netlify, add `netlify` to the `<form>` tag.
- **Serverless + email API** (Resend/SendGrid) — most control, most setup.

Deliver submissions to **info@chanceforlifeinc.com**. Keep the HIPAA note on the contact form — the form is for intake interest only, not protected health information.

## Images

The photos in `images/` were resized and compressed from the originals in `../Assets` (≈305 MB → ≈3 MB) so the site loads fast. If you swap in new photos, keep them web-sized (≤1900px wide, JPEG ~82% quality).

## Accessibility & performance notes

- Keyboard-navigable, visible focus rings, `aria-current` on the active nav item, labelled icons, and `prefers-reduced-motion` respected (animations disable).
- Fully responsive down to 375px, with a full-screen mobile menu.
- No external JS dependencies; the only third-party request is Google Fonts.
