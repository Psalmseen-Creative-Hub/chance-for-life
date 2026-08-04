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

  /* ---------- Forms (front-end demo handling) ----------
     Wire the action to a form service (Formspree / Web3Forms) at launch.
     Until then we validate and show a friendly confirmation. */
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.className = "form-status ok show";
        const name = (form.querySelector('[name="name"]') || {}).value || "";
        const first = name.trim().split(" ")[0];
        status.textContent = `Thank you${first ? ", " + first : ""} — your message is ready to send. Once the site is connected to email delivery, our team will follow up personally. (Demo mode: no message was actually sent.)`;
      }
      form.reset();
      if (status) status.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
    });
  });
})();
