/* =========================================================
   KYPROS · start page background photos
   Cross-fades through home/hero/slides.js, built by tools/build-hero.py.
   Each photo drifts slowly while it is showing. The slideshow pauses
   when the tab is hidden or the hero is scrolled out of view, and
   stays on the first photo for people who prefer reduced motion.
   ========================================================= */
(() => {
  const slides = window.KYPROS_SLIDES || [];
  const bg = document.getElementById("hero-bg"), dots = document.getElementById("slide-dots"), cap = document.getElementById("slide-cap");
  if (!bg || !slides.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SHOW = 7000;                       // time on each photo, ms
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  document.body.classList.add("has-hero");

  // Only the first photo loads straight away; each next one loads while the current one shows.
  bg.innerHTML = slides.map((s, i) => `<img class="slide" alt="" sizes="100vw" decoding="async" style="object-position:${esc(s.focus)};--kx:${i % 2 ? -1 : 1}" ${i === 0 ? `src="${esc(s.src)}" srcset="${esc(s.srcset)}" fetchpriority="high"` : ""}>`).join("");
  const imgs = [...bg.children];
  const load = i => { const im = imgs[i], s = slides[i]; if (im && !im.src) { im.srcset = s.srcset; im.src = s.src; } };
  dots.innerHTML = slides.length > 1 ? slides.map((s, i) => `<button type="button" aria-label="Show ${esc(s.place)}"><i></i></button>`).join("") : "";
  const buttons = [...dots.children];

  let cur = -1, timer = 0, playing = !reduce && slides.length > 1, visible = true;
  function show(i) {
    i = (i + slides.length) % slides.length;
    load(i);
    const im = imgs[i], go = () => {
      imgs.forEach((x, k) => x.classList.toggle("on", k === i));
      im.classList.remove("drift"); void im.offsetWidth; if (!reduce) im.classList.add("drift");
      buttons.forEach((b, k) => { b.setAttribute("aria-current", k === i); b.classList.toggle("run", k === i && playing); });
      const s = slides[i];
      cap.hidden = false;
      cap.href = `../#${s.map}`;
      cap.querySelector(".slide-place").innerHTML = `${esc(s.place)}${s.where ? `<small>${esc(s.where)}</small>` : ""}`;
      cap.title = s.credit ? `Photo: ${s.credit}` : "";
      cur = i;
      load(i + 1);
      schedule();
    };
    im.complete && im.naturalWidth ? go() : (im.onload = go, im.onerror = go);
  }
  function schedule() {
    clearTimeout(timer);
    if (playing && visible && !document.hidden) timer = setTimeout(() => show(cur + 1), SHOW);
  }
  buttons.forEach((b, k) => b.onclick = () => { show(k); });
  document.addEventListener("visibilitychange", schedule);
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }).observe(bg);
  show(0);

  // The top bar sits on the photo until the hero scrolls away.
  const bar = document.querySelector(".bar"), hero = bg.closest(".hero");
  const onScroll = () => bar && bar.classList.toggle("over", scrollY < hero.offsetHeight - 80);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
