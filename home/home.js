/* =========================================================
   KYPROS · start page
   Reads the same saved progress as the game layer (game/game.js)
   and the place data copied from the atlas (home/data.js).
   Leaderboards use game/friends.js, so they switch on with it.
   ========================================================= */
(() => {
  const D = window.KYPROS_DATA;
  const preview = new URLSearchParams(location.search).has("preview");
  const STORE = preview ? "kypros.game.preview.v1" : "kypros.game.v1";
  const S = (() => {
    const fresh = { name: "", visits: {}, wild: {}, log: [], wish: {}, quiz: {} };
    try { return { ...fresh, ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch (e) { return fresh; }
  })();
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = n => Math.round(n).toLocaleString("en-GB");
  const MODES = ["history", "wine", "nature"];
  const COLOR = { history: "#a3281b", wine: "#7a1c3a", nature: "#e2592b" };
  const LABEL = { history: "Historical", wine: "Wine", nature: "Nature" };
  const mapUrl = m => `../#${m}`;
  const byName = Object.fromEntries(D.places.map(p => [p.name, p]));
  const been = n => !!S.visits[n];

  /* ---------- Progress, worked out the same way as the game ---------- */
  // scoring.js declares SCORING with const, so it is a global binding but not a window property
  const RULES = typeof SCORING !== "undefined" ? SCORING : {};
  const SCORABLE = D.places.filter(p => RULES[p.name] && !p.north);
  const points = Object.values(S.visits).reduce((a, v) => a + (v.points || 0), 0) + Object.values(S.wild).reduce((a, w) => a + (w.points || 0), 0);
  const visited = SCORABLE.filter(p => been(p.name)).length;
  const island = SCORABLE.length ? Math.round(visited / SCORABLE.length * 1000) / 10 : 0;
  const laurels = Object.values(S.quiz).filter(q => q && q.laurel).length;
  const name = S.name || "";
  const fresh = !visited && !points;

  /* ---------- Hero ---------- */
  if (!fresh) {
    $("#hero-eye").textContent = name ? `Welcome back, ${name}` : "Welcome back";
    $("#hero-h").textContent = island >= 50 ? "You know this island well" : "Your island is filling in";
    $("#hero-lead").textContent = `You've checked in at ${visited} of ${SCORABLE.length} places. Pick up where you left off, or try a view you haven't explored yet.`;
    $("#begin-l").textContent = "Pick up a view";
  }
  const statEl = k => document.querySelector(`[data-stat="${k}"]`);
  statEl("of").textContent = `of ${SCORABLE.length}`;
  const countUp = (el, to, dec = 0) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !to) { el.textContent = dec ? to.toFixed(dec) : num(to); return; }
    const t0 = performance.now(), T = 1100;
    const step = now => { const t = Math.min(1, (now - t0) / T), v = to * (1 - Math.pow(1 - t, 3)); el.textContent = dec ? v.toFixed(dec) : num(v); if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  countUp(statEl("island"), island, island % 1 ? 1 : 0); countUp(statEl("visited"), visited); countUp(statEl("points"), points); countUp(statEl("laurels"), laurels);

  /* ---------- The island, drawn from the atlas's own coastline ---------- */
  const KX = Math.cos(35.1 * Math.PI / 180), BOX = { w: 32.24, e: 34.62, n: 35.72, s: 34.54 };
  function projector(W, H, m) {
    const sx = (W - 2 * m) / ((BOX.e - BOX.w) * KX), sy = (H - 2 * m) / (BOX.n - BOX.s), s = Math.min(sx, sy);
    const ox = (W - (BOX.e - BOX.w) * KX * s) / 2, oy = (H - (BOX.n - BOX.s) * s) / 2;
    return (lon, lat) => [ox + (lon - BOX.w) * KX * s, oy + (BOX.n - lat) * s];
  }
  function landPath(land, P) {
    return land.features[0].geometry.coordinates.map(poly => poly.map(ring => "M" + ring.filter((_, i) => i % 2 === 0 || i === ring.length - 1).map(([x, y]) => P(x, y).map(v => v.toFixed(1)).join(",")).join("L") + "Z").join("")).join("");
  }
  const STYLE = {
    hero: { land: "#e3ded5", stroke: "#4a453e" },
    history: { land: "#e3ded5", stroke: "#4a453e", pin: p => `<circle cx="${p.x}" cy="${p.y}" r="${p.must ? 5.5 : 4}" fill="#a3281b" stroke="#faf8f4" stroke-width="1.5"/>` },
    wine: { land: "#c9cf8e", stroke: "#f8f1d8", pin: p => `<circle cx="${p.x}" cy="${p.y}" r="${p.must ? 6 : 5}" fill="#7a1c3a" stroke="#f0d592" stroke-width="2"/>` },
    nature: { land: "#c3c79a", stroke: "#3d6876", pin: p => `<circle cx="${p.x}" cy="${p.y}" r="${p.must ? 6 : 5}" fill="#e2592b" stroke="#fff" stroke-width="2"/>` }
  };
  function drawIsland(svg, land, opts) {
    const [, , W, H] = svg.getAttribute("viewBox").split(" ").map(Number), P = projector(W, H, opts.margin ?? 12), st = STYLE[opts.style];
    const list = D.places.filter(p => !opts.mode || p.mode === opts.mode).map(p => { const [x, y] = P(p.lon, p.lat); return { ...p, x: x.toFixed(1), y: y.toFixed(1) }; });
    let pins;
    if (opts.style === "hero") {
      const recent = new Set(S.log.slice(0, 3).map(l => l.name));
      const order = [...list].sort((a, b) => a.x - b.x);
      pins = order.map((p, i) => {
        const on = been(p.name);
        return `<circle class="isl-pin${on ? "" : " off"}${on && recent.has(p.name) ? " seen" : ""}" cx="${p.x}" cy="${p.y}" r="${p.must ? 6 : 4.5}" fill="${on ? COLOR[p.mode] : ""}" style="animation-delay:${i * 40}ms"><title>${esc(p.name)} · ${LABEL[p.mode]}${on ? " · visited" : ""}</title></circle>`;
      }).join("");
    } else pins = list.map(st.pin).join("");
    svg.innerHTML = `<path d="${landPath(land, P)}" fill="${st.land}" stroke="${st.stroke}" stroke-width="${opts.style === "hero" ? 1.1 : 1}" fill-rule="evenodd" stroke-linejoin="round" class="${opts.style === "hero" ? "isl-land" : ""}"/>${pins}`;
    if (opts.style === "hero" && !matchMedia("(prefers-reduced-motion: reduce)").matches && svg.animate) {
      svg.querySelectorAll(".isl-pin").forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: 200 + i * 22, fill: "backwards", easing: "cubic-bezier(.22,.8,.24,1)" }));
    }
  }

  /* ---------- View cards ---------- */
  const COPY = {
    history: { eye: "Plate I · Antiquity to 1878", lead: "City-kingdoms, painted churches and crusader castles, read period by period from 7000 BC." },
    wine: { eye: "Wine country", lead: "The hill villages of the vine, along six wine routes where native Xynisteri and Maratheftiko grow." },
    nature: { eye: "Trails & reserves", lead: "Gorges, cedar forests, turtle beaches and flamingo wetlands on a topographic map." }
  };
  $("#view-cards").innerHTML = MODES.map(m => {
    const all = D.places.filter(p => p.mode === m), seen = all.filter(p => been(p.name)).length, pct = all.length ? Math.round(seen / all.length * 100) : 0;
    const must = all.filter(p => p.must).length, trips = (D.trips[m] || []).length;
    const title = { history: "Historical", wine: "Wine", nature: "Nature" }[m];
    return `<a class="view v-${m} rise" href="${mapUrl(m)}">
      <div class="view-map"><svg viewBox="0 0 400 225" aria-hidden="true" data-mini="${m}"></svg></div>
      <div class="view-body">
        <p class="eyebrow">${COPY[m].eye}</p>
        <h3>${title}</h3>
        <p>${COPY[m].lead}</p>
        <div class="view-facts"><span>${all.length} places</span><span>${must} must-sees</span><span>${trips} day trips</span></div>
        <div class="view-prog"><span>${seen ? `${seen} of ${all.length} visited` : "Nothing visited yet"}</span><span class="barr"><i data-w="${pct}"></i></span></div>
        <span class="view-go">Open the ${title.toLowerCase()} map <span aria-hidden="true">→</span></span>
      </div></a>`;
  }).join("");

  /* ---------- Threads that cross views ---------- */
  const THREADS = [
    { n: "Aphrodite's coast", d: "Where the goddess rose from the foam, where she was worshipped for a thousand years, and the grotto where she is said to have bathed.", stops: ["Petra tou Romiou", "Sanctuary of Aphrodite", "Aphrodite & Adonis Trails"] },
    { n: "The Knights' wine", d: "The Knights Hospitaller made sweet wine on the estates around their keep. It took the commandery's name, and the hill villages still make it.", stops: ["Kolossi Castle", "Commandaria villages", "Omodos"] },
    { n: "Flamingos and saints", d: "In winter, flamingos feed in front of the shrine of Umm Haram. In town, Lazarus is said to lie beneath his church.", stops: ["Larnaca Salt Lake", "Hala Sultan Tekke", "Church of Agios Lazaros"] },
    { n: "High Troodos", d: "The monastery where Makarios was a novice, the valley of the Cyprus cedar, and his birthplace, now making wine from revived native grapes.", stops: ["Kykkos Monastery", "Cedar Valley", "Vouni Panayia Winery"] },
    { n: "The wild west", d: "Whites from the Laona plateau, then a limestone gorge and the last wild coast on the island.", stops: ["Vasilikon Winery", "Avakas Gorge", "Akamas Peninsula"] },
    { n: "From Kition to the cape", d: "The Bronze Age city under Larnaca, the monastery a resort grew around, and the sea caves of Cape Greco.", stops: ["Kition", "Ayia Napa Monastery", "Cape Greco"] }
  ].filter(t => t.stops.every(n => byName[n]));
  $("#threads").innerHTML = THREADS.map((t, k) => {
    const views = [...new Set(t.stops.map(n => byName[n].mode))].map(m => LABEL[m]).join(" + ");
    return `<article class="thread rise" style="--d:${k * 60}ms">
      <p class="thread-n">Thread ${k + 1} · ${views}</p>
      <h3>${esc(t.n)}</h3>
      <p>${esc(t.d)}</p>
      <ol class="chain">${t.stops.map(n => { const p = byName[n]; return `<li><span class="dot" style="background:${COLOR[p.mode]}"></span><span>${esc(n)}</span>${been(n) ? `<span class="done">Visited</span>` : `<span class="tag" style="color:${COLOR[p.mode]}">${LABEL[p.mode]}</span>`}</li>`; }).join("")}</ol>
      <a class="btn btn-line" href="${mapUrl(byName[t.stops[0]].mode)}">Start on the ${LABEL[byName[t.stops[0]].mode].toLowerCase()} map <span aria-hidden="true">→</span></a>
    </article>`;
  }).join("");

  /* ---------- Passport ---------- */
  const when = iso => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  let showAll = false;
  function stamps(filter) {
    const all = D.places.filter(p => filter === "all" || p.mode === filter)
      .sort((a, b) => (been(b.name) - been(a.name)) || (b.must - a.must) || a.name.localeCompare(b.name));
    const cut = Math.max(15, Math.ceil(all.filter(p => been(p.name)).length / 5) * 5 + 5), list = showAll ? all : all.slice(0, cut);
    $("#stamps").innerHTML = list.map(p => {
      const v = S.visits[p.name], wish = S.wish && S.wish[p.name];
      return `<a class="stamp${v ? " seen" : ""}" href="${mapUrl(p.mode)}" title="${esc(p.blurb)}">
        <span class="stamp-img">${p.photo ? `<img src="img/${p.photo}" alt="" loading="lazy">` : `<span class="ph">${esc(p.name[0])}</span>`}
          ${p.must ? `<span class="stamp-must">Must-see</span>` : ""}
          ${v ? `<span class="stamp-mark" style="color:#fff;background:${COLOR[p.mode]}cc">Visited<br>${new Date(v.first).getFullYear()}</span>` : ""}</span>
        <span class="stamp-name">${esc(p.name)}</span>
        <span class="stamp-meta"><i style="background:${COLOR[p.mode]}"></i>${v ? `${when(v.first)} · ${num(v.points)} pts` : wish ? "On your list" : esc(p.kind)}</span>
      </a>`;
    }).join("") + (list.length < all.length ? `<button class="more-stamps" id="more-stamps">Show all ${all.length} places</button>` : "");
    const more = $("#more-stamps"); if (more) more.onclick = () => { showAll = true; stamps(filter); };
  }
  stamps("all");
  document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b));
    stamps(b.dataset.f);
  });
  $("#recent").innerHTML = S.log.length
    ? S.log.slice(0, 6).map(l => `<li><i style="background:${COLOR[l.mode] || "#999"}"></i><span>${esc(l.name)}</span><small>${when(l.t)}${l.points ? ` · +${num(l.points)}` : ""}</small></li>`).join("")
    : `<li class="empty" style="display:block">No check-ins yet. On the map, open a place and check in when you're there to stamp it here.</li>`;
  const next = [];
  for (const m of MODES) { const p = D.places.find(q => q.mode === m && q.must && !been(q.name)); if (p) next.push(p); }
  for (const p of D.places) { if (next.length >= 5) break; if (p.must && !been(p.name) && !next.includes(p)) next.push(p); }
  $("#next").innerHTML = next.map(p => `<li><i style="background:${COLOR[p.mode]}"></i><a href="${mapUrl(p.mode)}">${esc(p.name)}</a><small>${LABEL[p.mode]}</small></li>`).join("") || `<li class="empty" style="display:block">You've seen every must-see. Try the quieter places next.</li>`;

  /* ---------- Day trips ---------- */
  $("#trips").innerHTML = MODES.map(m => (D.trips[m] || [])[0] && { m, t: D.trips[m][0] }).filter(Boolean).map(({ m, t }, k) => {
    const first = t.stops.map(n => byName[n]).find(p => p && p.photo);
    return `<a class="trip rise" style="--d:${k * 60}ms" href="${mapUrl(m)}">
      <span class="trip-img">${first && first.photo ? `<img src="img/${first.photo}" alt="" loading="lazy">` : ""}</span>
      <span class="trip-body"><span class="eyebrow" style="color:${COLOR[m]}">${LABEL[m]} · from ${esc(t.base.replace(" (Troodos)", ""))}</span><h3>${esc(t.name)}</h3><p>${esc(t.blurb)}</p>
      <span class="trip-stops">${t.stops.map((n, j) => `<span><i>${j + 1}</i>${esc(n)}</span>`).join("")}</span></span></a>`;
  }).join("");

  /* ---------- Friends leaderboard ---------- */
  const board = $("#board");
  const meRow = (rank = "·") => `<li class="me"><span class="rank">${rank}</span><span class="who"><b>${esc(name || "You")}</b><span class="barr"><i style="width:${island}%"></i></span><small>${island}% of the island</small></span><span class="pts">${num(points)}<small>points</small></span></li>`;
  async function renderBoard(note = "") {
    if (preview) { board.innerHTML = `<ol class="rows">${meRow()}</ol><p class="note">Preview mode: these visits are kept apart and never reach the leaderboard.</p>`; return; }
    if (!window.Friends || !Friends.enabled) {
      board.innerHTML = `<ol class="rows">${meRow()}</ol><p class="note">Friends leaderboards aren't switched on yet. Your points are saved on this device, and once groups are live, the friends you invite will appear here.</p>`;
      return;
    }
    board.innerHTML = `<p class="note">Loading your groups…</p>`;
    try {
      await Friends.init();
      if (!Friends.user) {
        board.innerHTML = `<ol class="rows">${meRow()}</ol>
          <form class="signin"><label for="h-email">${Friends.pendingInvite ? "You've been invited. Sign in to join the group." : "Sign in to make a group or join your friends."}</label>
          <input id="h-email" type="email" required autocomplete="email" placeholder="you@example.com"><button class="btn">Send sign-in link</button></form>
          <p class="note" role="status">${esc(note) || "We'll email you a link. No password needed."}</p>`;
        board.querySelector("form").onsubmit = async e => {
          e.preventDefault();
          try { await Friends.signIn(board.querySelector("#h-email").value); renderBoard("Check your email for the sign-in link."); } catch (err) { renderBoard(err.message); }
        };
        return;
      }
      await Friends.joinPending().catch(() => null);
      const groups = await Friends.groups();
      if (!groups.length) {
        board.innerHTML = `<ol class="rows">${meRow()}</ol>
          <form class="signin"><label for="h-group">Name your group, then share the invite link.</label><input id="h-group" required maxlength="40" placeholder="Summer in Cyprus"><button class="btn">Create group</button></form>`;
        board.querySelector("form").onsubmit = async e => { e.preventDefault(); await Friends.create(board.querySelector("#h-group").value); renderBoard(); };
        return;
      }
      let cur = groups[0];
      const show = async () => {
        const rows = await Friends.board(cur.id), top = Math.max(1, ...rows.map(r => r.points));
        board.innerHTML = `${groups.length > 1 ? `<div class="groups">${groups.map(g => `<button class="chip" data-g="${g.id}" aria-pressed="${g.id === cur.id}">${esc(g.name)}</button>`).join("")}</div>` : `<p class="eyebrow" style="color:#e0a593">${esc(cur.name)}</p>`}
          <ol class="rows">${rows.map((r, i) => `<li class="${r.player_id === Friends.user.id ? "me" : ""}"><span class="rank">${i + 1}</span><span class="who"><b>${esc(r.name)}</b><span class="barr"><i style="width:${Math.round(r.points / top * 100)}%"></i></span><small>${Number(r.island)}% of the island${r.latest ? ` · last at ${esc(r.latest)}` : ""}</small></span><span class="pts">${num(r.points)}<small>points</small></span></li>`).join("")}</ol>
          <div class="invite"><span>Invite link</span><code>${esc(Friends.inviteLink(cur.code))}</code><button class="btn" id="h-copy">Copy</button></div>`;
        board.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { cur = groups.find(g => g.id === b.dataset.g); show(); });
        const copy = board.querySelector("#h-copy");
        copy.onclick = () => navigator.clipboard.writeText(Friends.inviteLink(cur.code)).then(() => { copy.textContent = "Copied"; }, () => { getSelection().selectAllChildren(board.querySelector(".invite code")); copy.textContent = "Selected"; });
      };
      await show();
    } catch (err) {
      board.innerHTML = `<ol class="rows">${meRow()}</ol><p class="note">The leaderboard couldn't load: ${esc(err.message)}. Your points are safe on this device.</p>`;
    }
  }
  if (window.Friends) Friends.rememberInvite();
  renderBoard();

  /* ---------- Maps and entrances ---------- */
  fetch("../data/base.json").then(r => r.json()).then(B => {
    drawIsland($("#island"), B.land, { style: "hero", margin: 16 });
    document.querySelectorAll("[data-mini]").forEach(svg => drawIsland(svg, B.land, { style: svg.dataset.mini, mode: svg.dataset.mini, margin: 10 }));
  }).catch(() => { $("#island").closest("figure").hidden = true; });
  const reveal = el => { el.classList.add("in"); el.querySelectorAll("[data-w]").forEach(i => { i.style.width = i.dataset.w + "%"; }); };
  const items = document.querySelectorAll(".rise");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
    setTimeout(() => items.forEach(reveal), 4000);   // never leave anything hidden
  } else items.forEach(reveal);
})();
