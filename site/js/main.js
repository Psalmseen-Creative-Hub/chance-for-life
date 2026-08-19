/* ============================================================
   Chance For Life Inc. — interactions
   ============================================================ */
(function () {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header state ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const menu = document.getElementById("mobileMenu");
  const openBtn = document.querySelector(".nav__toggle");
  const closeBtn = menu ? menu.querySelector(".close") : null;
  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (openBtn) openBtn.addEventListener("click", () => setMenu(true));
  if (closeBtn) closeBtn.addEventListener("click", () => setMenu(false));
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Hero slideshow (max 3) ---------- */
  const hero = document.querySelector(".hero__slides");
  if (hero) {
    const slides = Array.from(hero.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".hero__dots button"));
    let idx = 0, timer = null;
    const DUR = 5200;
    const go = (n) => {
      slides[idx].classList.remove("active");
      if (dots[idx]) dots[idx].classList.remove("active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active");
      if (dots[idx]) dots[idx].classList.add("active");
    };
    const start = () => { if (!prefersReduced && slides.length > 1) timer = setInterval(() => go(idx + 1), DUR); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    dots.forEach((d, i) => d.addEventListener("click", () => { stop(); go(i); start(); }));
    const media = document.querySelector(".hero__media");
    if (media) {
      media.addEventListener("mouseenter", stop);
      media.addEventListener("mouseleave", start);
    }
    start();
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const isOpen = item.getAttribute("aria-expanded") === "true";
      // close siblings in same list for a clean accordion
      const list = item.closest(".faq");
      if (list) {
        list.querySelectorAll('.faq__item[aria-expanded="true"]').forEach((sib) => {
          if (sib !== item) { sib.setAttribute("aria-expanded", "false"); const sa = sib.querySelector(".faq__a"); if (sa) sa.style.height = "0px"; }
        });
      }
      if (isOpen) { item.setAttribute("aria-expanded", "false"); a.style.height = "0px"; }
      else { item.setAttribute("aria-expanded", "true"); a.style.height = a.scrollHeight + "px"; }
    });
  });
  // keep open FAQ heights correct on resize
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      document.querySelectorAll('.faq__item[aria-expanded="true"] .faq__a').forEach((a) => {
        a.style.height = a.scrollHeight + "px";
      });
    }, 150);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Forms → Web3Forms ----------------------------------------
     Submissions are emailed to whichever address the access key below is
     registered to (info@chanceforlifeinc.com).

     TO GO LIVE: create a key at https://web3forms.com using
     info@chanceforlifeinc.com, then paste it in place of the placeholder.
     Nothing else needs changing.

     The key is not a secret — it only identifies where submissions go, and
     is visible in page source by design. The hidden "botcheck" field in
     each form is the honeypot that filters out bots.
  --------------------------------------------------------------------- */
  const WEB3FORMS_ACCESS_KEY = "01a58f2c-8843-4d90-bf9f-b8457209c37a";
  const FALLBACK = "Please call us at 202-487-9587 or email info@chanceforlifeinc.com and we'll help right away.";

  document.querySelectorAll("form[data-web3form]").forEach((form) => {
    const status = form.querySelector(".form-status");
    const button = form.querySelector('button[type="submit"]');
    const buttonMarkup = button ? button.innerHTML : "";

    const say = (kind, message) => {
      if (!status) return;
      status.className = "form-status " + kind + " show";
      status.textContent = message;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      // Guard: never let a visitor think a message sent when no key is set.
      if (WEB3FORMS_ACCESS_KEY.indexOf("PASTE_") === 0) {
        say("err", "This form isn't connected yet. " + FALLBACK);
        return;
      }

      if (button) { button.disabled = true; button.textContent = "Sending…"; }
      say("ok", "Sending…");

      const data = new FormData(form);
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      const email = form.querySelector('[name="email"]');
      if (email && email.value) data.append("replyto", email.value);

      try {
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.success) throw new Error(out.message || "Submission failed");

        const name = (form.querySelector('[name="name"]') || {}).value || "";
        const first = name.trim().split(" ")[0];
        say("ok", "Thank you" + (first ? ", " + first : "") + " — your message has been sent. Our team will follow up with you personally.");
        form.reset();
      } catch (err) {
        say("err", "Sorry — your message didn't send. " + FALLBACK);
      } finally {
        if (button) { button.disabled = false; button.innerHTML = buttonMarkup; }
        if (status) status.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      }
    });
  });
})();
