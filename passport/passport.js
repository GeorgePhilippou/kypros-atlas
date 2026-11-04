/* =========================================================
   KYPROS · Passport and trophy room
   Reads the game's saved progress (kypros.game.v1, or the preview copy
   with ?preview) and the place data copied from the atlas (home/data.js).
   Trophy rules come from game/scoring.js, the same ones the map uses.
   Checking in still happens on the map.
   ========================================================= */
(() => {
  const D = window.KYPROS_DATA, T = window.KyprosTrophies;
  const preview = new URLSearchParams(location.search).has("preview");
  const STORE = preview ? "kypros.game.preview.v1" : "kypros.game.v1";
  const S = (() => {
    const fresh = { name: "", visits: {}, wild: {}, log: [], wish: {}, quiz: {} };
    try { return { ...fresh, ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch (e) { return fresh; }
  })();
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = n => Math.round(n).toLocaleString("en-GB");
  const when = iso => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const MODES = Object.keys(D.modes), LABEL = m => D.modes[m].label;
  const been = n => !!S.visits[n];
  // Links open the map on the place, staying in preview when this page is
  const mapUrl = p => `../${preview ? "?preview" : ""}#${p.mode}/${kyprosSlug(p.name)}`;
  // Hidden places only appear once found
  const PLACES = D.places.filter(p => !p.egg || been(p.name));

  if (preview) $("#preview-note").hidden = false;
  if (S.name) $("#hello").textContent = `${S.name}'s passport`;

  /* ---------- The trophy rules see each place with its stamp label ---------- */
  const stampOf = p => p.mode === "history" ? p.era : (p.mode === "nature" || p.mode === "villages") ? p.kind : p.tag;
  const R = T.room(S, D.places.map(p => ({ name: p.name, mode: p.mode, north: p.north, egg: p.egg, stamp: stampOf(p) })));

  /* ---------- At a glance ---------- */
  $("#stats").innerHTML = [
    ["Island explored", `${R.island}<small>%</small>`],
    ["Places visited", `${R.visited}<small>of ${R.of}</small>`],
    ["Points", num(R.points)],
    ["Laurels", R.laurels.count]
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  /* ---------- Places ---------- */
  let filter = "all", showAll = false;
  $("#filters").innerHTML = [["all", "All"], ...MODES.map(m => [m, LABEL(m)])]
    .map(([k, l]) => `<button type="button" class="chip" data-f="${k}" aria-pressed="${k === "all"}">${esc(l)}</button>`).join("");
  function stamps() {
    const all = PLACES.filter(p => filter === "all" || p.mode === filter)
      .sort((a, b) => (been(b.name) - been(a.name)) || (b.must - a.must) || a.name.localeCompare(b.name));
    const cut = Math.max(15, Math.ceil(all.filter(p => been(p.name)).length / 5) * 5 + 5), list = showAll ? all : all.slice(0, cut);
    $("#stamps").innerHTML = list.map(p => {
      const v = S.visits[p.name], wish = S.wish && S.wish[p.name];
      return `<a class="stamp${v ? " seen" : ""}" href="${mapUrl(p)}">
        <span class="stamp-img">${p.photo ? `<img src="../home/img/${esc(p.photo)}" alt="" loading="lazy">` : `<span class="ph" aria-hidden="true">${esc(p.name[0])}</span>`}
          ${p.must ? `<span class="stamp-must">Must-see</span>` : ""}
          ${v ? `<span class="stamp-mark" style="background:var(--${p.mode})">Visited<br>${new Date(v.first).getFullYear()}</span>` : ""}</span>
        <span class="stamp-name">${esc(p.name)}</span>
        <span class="stamp-meta"><i style="background:var(--${p.mode})"></i>${v ? `${when(v.first)} · ${num(v.points)} pts` : wish ? "On your list" : esc(LABEL(p.mode))}</span>
      </a>`;
    }).join("") + (list.length < all.length ? `<button type="button" class="more-stamps" id="more-stamps">Show all ${all.length} places</button>` : "");
    const more = $("#more-stamps");
    if (more) more.onclick = () => { showAll = true; stamps(); };
  }
  stamps();
  document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b));
    filter = b.dataset.f; stamps();
  });

  $("#recent").innerHTML = S.log.length
    ? S.log.slice(0, 6).map(l => `<li><i style="background:var(--${l.mode}, var(--muted))"></i><span>${esc(l.name)}</span><small>${when(l.t)}${l.points ? ` · +${num(l.points)}` : ""}</small></li>`).join("")
    : `<li class="empty">No check-ins yet. On the map, open a place and check in when you're there to stamp it here.</li>`;
  const next = [];
  for (const m of MODES) { const p = PLACES.find(q => q.mode === m && q.must && !been(q.name)); if (p) next.push(p); }
  for (const p of PLACES) { if (next.length >= 5) break; if (p.must && !been(p.name) && !next.includes(p)) next.push(p); }
  $("#next").innerHTML = next.map(p => `<li><i style="background:var(--${p.mode})"></i><a href="${mapUrl(p)}">${esc(p.name)}</a><small>${esc(LABEL(p.mode))}</small></li>`).join("")
    || `<li class="empty">You've seen every must-see. Try the quieter places next.</li>`;

  /* ---------- Trophy room ---------- */
  const badge = id => `../game/badges/${id}.webp`;
  const tile = (t, done, art, sub) => `<li class="${done ? "" : "locked"}">${art}<b>${esc(t.name)}</b><span>${sub}</span></li>`;
  const done = R.story.filter(x => x.on).length;
  $("#room-count").textContent = `${R.collected} of ${R.possible} collected`;
  $("#room").innerHTML = `
    <div class="room-block">
      <h3>Aphrodite Adventures · ${done} of ${R.story.length}</h3>
      <ol class="story">${R.story.map(x => `<li class="${x.on ? "on" : ""}">${esc(x.name)}${x.on ? `<span class="sr-only"> (visited)</span>` : ""}</li>`).join("")}</ol>
    </div>
    <div class="room-block">
      <h3>Trophies</h3>
      <ul class="shelf">${R.trophies.map(t => tile(t, t.on, `<img src="${badge(t.id)}" alt="" loading="lazy" width="96" height="96">`, t.on ? "Collected" : esc(t.how))).join("")}</ul>
    </div>
    <div class="room-block">
      <h3>Wild Cards</h3>
      <ul class="shelf">${R.wild.map(w => tile(w, w.on, T.hasBadge(w.id) ? `<img src="${badge(w.id)}" alt="" loading="lazy" width="96" height="96">` : `<span class="num">${num(w.points)}</span>`, w.on ? `+${num(w.points)}` : esc(w.how))).join("")}</ul>
    </div>
    <div class="room-block">
      <h3>Laurels · ${R.laurels.count} of ${R.laurels.of}</h3>
      <p class="calm">Get five out of five in a place's quiz on the map to earn its laurel.</p>
      <ul class="shelf">${R.laurels.tiers.map(l => tile(l, l.on, `<span class="num">${l.n}</span>`, l.on ? "Collected" : `Earn ${l.n} laurels`)).join("")}</ul>
    </div>
    <div class="room-block">
      <h3>Stamps</h3>
      ${R.stamps.map(g => `<h4>${esc(g.label)}</h4><p class="stamp-row">${g.items.map(x => `<span class="${x.on ? "on" : ""}">${esc(x.name)}</span>`).join("")}</p>`).join("")}
    </div>
    <p class="room-end"><a href="${preview ? location.pathname : "?preview"}">${preview ? "Leave preview mode" : "Try preview mode"}</a></p>`;
})();
