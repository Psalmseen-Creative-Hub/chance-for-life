# Chance For Life Inc. — Website

Website for **Chance For Life Inc.**, a faith-inspired, community-centered mental health practice serving Maryland by telehealth and in person.

Hand-built static site — HTML, CSS, and vanilla JavaScript. No framework, no build step, no dependencies to install.

🌐 chanceforlifeinc.com · 📞 202-487-9587 · ✉️ info@chanceforlifeinc.com

---

## Preview it locally

Everything lives in [`site/`](site/). Serve that folder with anything static:

```bash
cd site && python -m http.server 8899
```

Then open <http://localhost:8899>. You can also just double-click `site/index.html`, though a local server matches production more closely.

## Pages

| File | Page |
|------|------|
| `site/index.html` | Home — 3-image hero slideshow, five service pillars, founder, testimonial |
| `site/about.html` | About — mission, story, approach, Meet the Founder |
| `site/services.html` | Services — overview grid plus deep-dive sections for each service |
| `site/cmt-training.html` | CMT Training — highlights, pricing, prerequisites, registration form |
| `site/faq.html` | FAQ — accordion |
| `site/contact.html` | Get in Touch — contact form, details, how it works |

Shared across every page: `site/css/styles.css` (design system), `site/js/main.js` (all interactions), `site/images/`.

## Deploying

The site is fully static, so it works anywhere: Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any shared host.

- **Publish directory:** `site`
- **Build command:** none

## ⚠️ Before going live

**The forms do not send yet.** Both the contact form and the CMT registration form validate input and show a confirmation, but nothing is delivered — they're in demo mode, marked with a `data-demo` attribute in the HTML.

A static site can't send email on its own. Pick a handler, point it at **info@chanceforlifeinc.com**, then remove `data-demo` so the browser submits normally:

- **[Web3Forms](https://web3forms.com)** or **[Formspree](https://formspree.io)** — works on any host, no backend
- **Netlify Forms** — add a `netlify` attribute to the `<form>` tag, if hosting there

Keep the HIPAA notice on the contact form. It's for intake interest only, never protected health information.

## Notes

- **Images** in `site/images/` are web-optimized. The full-size originals are kept locally and excluded from this repo — see `.gitignore`. Keep new photos under ~1900px wide, JPEG ~82%.
- **Cache-busting:** image URLs may carry a `?v=` marker. Bump it whenever you replace an image so returning visitors don't see the cached old one.
- **Accessibility:** keyboard navigable, visible focus states, labelled icons, and `prefers-reduced-motion` respected. Responsive down to 375px.
- Deeper build detail lives in [`site/README.md`](site/README.md).
