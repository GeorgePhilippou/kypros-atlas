/* =========================================================
   KYPROS · start page slideshow
   Picks today's places from home/slides.js and shows them full width.
   Each slide links to its map with the place selected: ../#<mode>/<slug>.
   ========================================================= */
(() => {
  const D = window.KYPROS_DATA, ALL = window.KYPROS_SLIDES || [], slug = window.kyprosSlug;
  const MAX = 8, EVERY = 6000;
  const preview = new URLSearchParams(location.search).has("preview") ? "?preview" : "";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Today's slides ---------- */
  // In season this month, then rotated by the day of the year so the first slide changes daily.
  const now = new Date(), month = now.getMonth() + 1;
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
  const known = s => D.places.some(p => p.mode === s.mode && p.name === s.place);
  const inSeason = ALL.filter(s => known(s) && (!s.months || !s.months.length || s.months.includes(month)));
  const k = inSeason.length ? day % inSeason.length : 0;
  const today = [...inSeason.slice(k), ...inSeason.slice(0, k)].slice(0, MAX);
  if (!today.length) return;

  const track = $("#show-track"), dots = $("#show-dots"), show = $("#show");
  const district = s => (D.places.find(p => p.mode === s.mode && p.name === s.place) || {}).district;
  track.innerHTML = today.map((s, i) => {
    const label = D.modes[s.mode].label, where = district(s);
    return `<a class="slide${i ? "" : " on"}" href="../${preview}#${s.mode}/${slug(s.place)}" role="group" aria-roledescription="slide"
        aria-label="${i + 1} of ${today.length}: ${esc(s.place)}"${i ? " inert" : ""}>
      <img ${i ? `data-src="${esc(s.image)}" loading="lazy"` : `src="${esc(s.image)}" fetchpriority="high"`} decoding="async"
        alt="${esc(s.place)}${where ? `, ${esc(where)}` : ""}" style="object-position:${esc(s.focus || "50% 50%")}">
      <span class="slide-text">
        <span class="slide-mode"><span class="k-dot" style="--c:var(--${s.mode})" aria-hidden="true"></span>${esc(label)} map</span>
        <span class="slide-name">${esc(s.place)}</span>
        <span class="slide-line">${esc(s.line)}</span>
        <span class="slide-go">Visit today <span aria-hidden="true">→</span></span>
      </span>
    </a>`;
  }).join("");
  dots.innerHTML = today.map((s, i) => `<button type="button" class="dot" aria-label="Show ${esc(s.place)}" aria-current="${!i}"></button>`).join("");
  const slides = [...track.children], dotBtns = [...dots.children];

  /* ---------- Moving between slides ---------- */
  let cur = 0, timer = null, paused = false, held = new Set();
  const load = i => { const img = slides[i].querySelector("img"); if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; } };
  function go(i, by) {
    i = (i + slides.length) % slides.length;
    if (i === cur) return;
    load(i);
    slides[cur].classList.remove("on"); slides[cur].inert = true;
    slides[i].classList.add("on"); slides[i].inert = false;
    dotBtns.forEach((d, j) => d.setAttribute("aria-current", j === i));
    cur = i;
    load((i + 1) % slides.length);   // have the next photo ready
    // Announce changes the visitor asked for, not the ones autoplay makes
    track.setAttribute("aria-live", by === "user" ? "polite" : "off");
    schedule();
  }
  const step = d => go(cur + d, "user");

  /* ---------- Autoplay: off under reduced motion, held while hovered, focused or hidden ---------- */
  const canPlay = () => !reduced.matches && slides.length > 1 && !paused && !held.size;
  function schedule() {
    clearTimeout(timer);
    if (canPlay()) timer = setTimeout(() => go(cur + 1, "auto"), EVERY);
  }
  const hold = (why, on) => { on ? held.add(why) : held.delete(why); schedule(); };
  show.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hold("hover", true); });
  show.addEventListener("pointerleave", () => hold("hover", false));
  show.addEventListener("focusin", () => hold("focus", true));
  show.addEventListener("focusout", e => { if (!show.contains(e.relatedTarget)) hold("focus", false); });
  document.addEventListener("visibilitychange", () => hold("hidden", document.hidden));
  reduced.addEventListener("change", () => { playBtn.hidden = reduced.matches || slides.length < 2; schedule(); });

  // A pause button, so autoplay can be stopped for good (not shown when nothing moves)
  const playBtn = $(".show-play");
  playBtn.hidden = reduced.matches || slides.length < 2;
  playBtn.addEventListener("click", () => {
    paused = !paused;
    playBtn.classList.toggle("paused", paused);
    playBtn.setAttribute("aria-label", paused ? "Play the slideshow" : "Pause the slideshow");
    schedule();
  });

  /* ---------- Arrows, dots, keys and swipes ---------- */
  $(".show-prev").addEventListener("click", () => step(-1));
  $(".show-next").addEventListener("click", () => step(1));
  dotBtns.forEach((d, i) => d.addEventListener("click", () => go(i, "user")));
  show.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else return;
    // Keep focus on the slide in view when moving from a slide link
    if (document.activeElement && document.activeElement.classList.contains("slide")) slides[cur].focus();
  });
  let x0 = null, y0 = null, swiped = false;
  track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") { x0 = e.clientX; y0 = e.clientY; swiped = false; } });
  track.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { swiped = true; step(dx < 0 ? 1 : -1); }
    x0 = null;
  });
  track.addEventListener("pointercancel", () => { x0 = null; });
  // A swipe should not also follow the link it started on
  track.addEventListener("click", e => { if (swiped) { e.preventDefault(); swiped = false; } }, true);

  if (slides.length < 2) document.querySelector(".show-ui").hidden = true;
  load(1 % slides.length);
  schedule();
})();
