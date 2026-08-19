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

## ⚠️ Before going live — paste the Web3Forms key

Both forms (contact + CMT registration) are wired to **Web3Forms** and send to
whichever address the access key is registered to. They are **not live yet**:
the key is still a placeholder.

**To activate:**

1. Make sure `info@chanceforlifeinc.com` actually receives mail (send it a test).
2. Go to <https://web3forms.com>, enter `info@chanceforlifeinc.com` — they email you an access key.
3. In `site/js/main.js`, replace the placeholder on the `WEB3FORMS_ACCESS_KEY` line.
4. Push. Submit a real test through the live site and confirm it arrives.

Until the key is set, the forms show an error pointing visitors to the phone
number and email — they never claim a message sent when it didn't.

The access key is not a secret; it only identifies the destination and is
visible in page source by design. Each form carries a hidden `botcheck`
honeypot to filter bots.

**Keep the forms intake-only.** Name, email, phone, reason for contact —
never protected health information. The privacy note on the contact page
tells visitors this, and the practice should honour it too.

## Notes

- **Images** in `site/images/` are web-optimized. The full-size originals are kept locally and excluded from this repo — see `.gitignore`. Keep new photos under ~1900px wide, JPEG ~82%.
- **Cache-busting:** image URLs may carry a `?v=` marker. Bump it whenever you replace an image so returning visitors don't see the cached old one.
- **Accessibility:** keyboard navigable, visible focus states, labelled icons, and `prefers-reduced-motion` respected. Responsive down to 375px.
- Deeper build detail lives in [`site/README.md`](site/README.md).
