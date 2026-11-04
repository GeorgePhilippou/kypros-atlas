/* =========================================================
   KYPROS GAME · the game layer
   Loads after the atlas script and uses its PLACES, NORTH, mode,
   select and helpers. The rules follow the Scoring Mechanics Handbook:
   first verified visits score, Wild Cards add surprise scores, and
   stamps, badges and island percentage track progress.
   ========================================================= */
(() => {
  const GPS_SLACK = 100, REPEAT_SHARE = 0.1, REPEAT_CAP = window.KYPROS_REPEAT_CAP ?? null;
  const preview = new URLSearchParams(location.search).has("preview");
  const STORE = preview ? "kypros.game.preview.v1" : "kypros.game.v1";
  const BADGES = "game/badges/";
  const fresh = () => ({ name: "", visits: {}, wild: {}, log: [] });

  /* ---------- Places ---------- */
  const ALL = Object.entries(PLACES).flatMap(([m, list]) => list.map(p => ({ p, m })));
  const find = name => ALL.find(x => x.p.name === name);
  const rules = p => SCORING[p.name];
  const scorable = p => !!rules(p) && !NORTH.has(p.name);
  const SCORABLE = ALL.filter(x => scorable(x.p));
  const value = p => { const r = rules(p); return (r.r + r.e + r.i) * 100 + r.s; };
  const repeatValue = p => Math.ceil(value(p) * REPEAT_SHARE);

  /* ---------- Saved progress ---------- */
  function load() {
    try { return { ...fresh(), ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch (e) { return fresh(); }
  }
  let state = load();
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
    if (!preview && Friends.user) syncUp();
  }
  const total = () => Object.values(state.visits).reduce((s, v) => s + v.points, 0) + Object.values(state.wild).reduce((s, w) => s + w.points, 0);
  const visitedCount = () => SCORABLE.filter(x => state.visits[x.p.name]).length;
  const island = () => Math.round(visitedCount() / SCORABLE.length * 1000) / 10;
  const num = n => n.toLocaleString("en-GB");

  /* ---------- Trophies ---------- */
  const STORY = ["Petra tou Romiou", "Sanctuary of Aphrodite", "Amathus", "Kition", "Aphrodite & Adonis Trails"];
  const been = n => !!state.visits[n];
  const countMode = m => PLACES[m].filter(p => been(p.name)).length;
  const TROPHIES = [
    { id: "aphrodite", name: "Aphrodite Adventures", how: "Finish all five chapters", test: () => STORY.every(been) },
    { id: "huts", name: "First Farmers", how: "Visit Choirokoitia", test: () => been("Choirokoitia") },
    { id: "ingot", name: "The Copper Island", how: "Visit Kition", test: () => been("Kition") },
    { id: "walls", name: "Venetian Nicosia", how: "Visit the Venetian Walls", test: () => been("Venetian Walls of Nicosia") },
    { id: "commandaria", name: "Commandaria", how: "Visit the Commandaria villages", test: () => been("Commandaria villages") },
    { id: "xynisteri", name: "Native Grape", how: "Visit 3 wine places", test: () => countMode("wine") >= 3 },
    { id: "amphora", name: "Five Millennia", how: "Visit 5 wine places", test: () => countMode("wine") >= 5 },
    { id: "leafb", name: "Krasochoria", how: "Visit Omodos", test: () => been("Omodos") },
    { id: "avakas", name: "Avakas Gorge", how: "Walk Avakas Gorge", test: () => been("Avakas Gorge") },
    { id: "cedar", name: "Cedar Valley", how: "Visit Cedar Valley", test: () => been("Cedar Valley") }
  ];
  const WILD = [
    { id: "flamingo", name: "Flamingo Season", points: 777, how: "Check in at Larnaca Salt Lake between November and March",
      test: (p, now) => p.name === "Larnaca Salt Lake" && [10, 11, 0, 1, 2].includes(now.getMonth()) },
    { id: "firstlight", name: "First Light", points: 1111, how: "Check in at Petra tou Romiou around sunrise",
      test: (p, now) => p.name === "Petra tou Romiou" && Math.abs(now - sunrise(now, p.lat, p.lon)) <= 45 * 60e3 },
    { id: "triple", name: "Triple Lens", points: 1234, how: "Check in across History, Wine and Nature in one day",
      test: (p, now) => new Set(state.log.filter(l => new Date(l.t).toDateString() === now.toDateString()).map(l => l.mode)).size === 3 }
  ];
  const earned = () => TROPHIES.filter(t => t.test());

  // Sunrise for a date and place, using the standard almanac formula.
  function sunrise(d, lat, lon) {
    const rad = Math.PI / 180, wrap = (v, m) => ((v % m) + m) % m;
    const start = Date.UTC(d.getUTCFullYear(), 0, 0), day = Math.floor((d - start) / 864e5), lh = lon / 15, t = day + (6 - lh) / 24;
    const M = .9856 * t - 3.289, L = wrap(M + 1.916 * Math.sin(M * rad) + .02 * Math.sin(2 * M * rad) + 282.634, 360);
    let RA = wrap(Math.atan(.91764 * Math.tan(L * rad)) / rad, 360);
    RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15;
    const sinD = .39782 * Math.sin(L * rad), cosD = Math.cos(Math.asin(sinD));
    const cosH = (Math.cos(90.833 * rad) - sinD * Math.sin(lat * rad)) / (cosD * Math.cos(lat * rad));
    const H = (360 - Math.acos(cosH) / rad) / 15, UT = wrap(H + RA - .06571 * t - 6.622 - lh, 24);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) + UT * 36e5;
  }

  /* ---------- Check-ins ---------- */
  function metres(a, b) {
    const R = 6371e3, rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const monthKey = d => `${d.getFullYear()}-${d.getMonth() + 1}`;
  function status(p) {
    if (NORTH.has(p.name)) return "north";
    if (!rules(p)) return "sensitive";
    const v = state.visits[p.name];
    if (!v) return "new";
    if (v.months.includes(monthKey(new Date()))) return "done";
    if (REPEAT_CAP !== null && v.months.length - 1 >= REPEAT_CAP) return "capped";
    return "repeat";
  }
  function locate(p) {
    if (preview) return Promise.resolve();
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("This device can't share its location."));
      navigator.geolocation.getCurrentPosition(pos => {
        const c = pos.coords, away = metres({ lat: c.latitude, lon: c.longitude }, p);
        if (away <= rules(p).z + Math.min(c.accuracy || 0, GPS_SLACK)) resolve();
        else reject(new Error(`You're ${away < 10000 ? (away / 1000).toFixed(1) : Math.round(away / 1000)} km away. Head there to check in.`));
      }, e => reject(new Error(e.code === 1 ? "Allow location access to check in. It's only used at the moment you tap the button." : "Couldn't find your location. Try again outdoors.")),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
    });
  }
  async function checkIn(p, btn, msg) {
    btn.disabled = true; msg.textContent = preview ? "" : "Finding your location…";
    try { await locate(p); msg.textContent = ""; ask(p); }
    catch (e) { msg.textContent = e.message; }
    btn.disabled = false;
  }
  function award(p) {
    const now = new Date(), first = !state.visits[p.name], points = first ? value(p) : repeatValue(p), m = find(p.name).m;
    const before = new Set(earned().map(t => t.id));
    const v = state.visits[p.name] ||= { first: now.toISOString(), points: 0, months: [] };
    v.points += points; v.months.push(monthKey(now));
    state.log.unshift({ t: now.toISOString(), name: p.name, mode: m, points });
    const wild = WILD.filter(w => !state.wild[w.id] && w.test(p, now));
    wild.forEach(w => { state.wild[w.id] = { at: now.toISOString(), points: w.points }; });
    const unlocked = earned().filter(t => !before.has(t.id));
    save(); refresh();
    celebrate(p, points, first, wild, unlocked);
  }

  /* ---------- Dialogs ---------- */
  function dialog(id, html) {
    let d = $(id);
    if (!d) { d = document.createElement("dialog"); d.id = id; d.className = "g-dialog"; document.body.append(d); }
    d.innerHTML = html;
    if (!d.open) d.showModal();
    d.querySelectorAll("[data-close]").forEach(b => b.onclick = () => d.close());
    return d;
  }
  const closeBtn = `<button class="g-x" data-close aria-label="Close">${CLOSE}</button>`;

  function ask(p) {
    const r = rules(p), right = r.a[0], options = [...r.a].sort(() => Math.random() - .5);
    const d = dialog("g-quiz", `${closeBtn}
      <p class="g-eye">On-site question</p>
      <h2>${esc(p.name)}</h2>
      <p class="g-q">${esc(r.q)}</p>
      <div class="g-opts">${options.map(o => `<button>${esc(o)}</button>`).join("")}</div>
      <p class="g-msg" role="status"></p>`);
    d.querySelectorAll(".g-opts button").forEach((b, i) => b.onclick = () => {
      if (options[i] === right) { d.close(); award(p); }
      else { b.disabled = true; d.querySelector(".g-msg").textContent = "Not quite. Have another look around and try again."; }
    });
  }

  function celebrate(p, points, first, wild, unlocked) {
    const r = rules(p), all = points + wild.reduce((s, w) => s + w.points, 0);
    const parts = first ? [["Rarity", r.r * 100], ["Effort", r.e * 100], ["Importance", r.i * 100], ["Signature", r.s]] : [["Repeat visit", points]];
    const hero = unlocked[0] || (wild[0] && { id: wild[0].id }) || null;
    const d = dialog("g-reveal", `
      <p class="g-eye">${first ? "Place discovered" : "Welcome back"}</p>
      ${hero && badgeFile(hero.id) ? `<img class="g-hero" src="${BADGES}${hero.id}.webp" alt="">` : ""}
      <h2>${esc(p.name)}</h2>
      <p class="g-big" id="g-big">+${num(all)}</p>
      <div class="g-parts">${parts.map(([k, v]) => `<div><b>${num(v)}</b><span>${k}</span></div>`).join("")}</div>
      ${wild.map(w => `<p class="g-wild">Wild Card: ${esc(w.name)} +${num(w.points)}</p>`).join("")}
      ${unlocked.map(t => `<p class="g-wild">Trophy unlocked: ${esc(t.name)}</p>`).join("")}
      <p class="g-sum">Total ${num(total())} · Island ${island()}%</p>
      <button class="g-main" data-close>Keep exploring</button>`);
    if (!REDUCED.matches) {
      const el = d.querySelector("#g-big"), start = performance.now();
      const tick = t => { const k = Math.min(1, (t - start) / 700); el.textContent = "+" + num(Math.round(all * (1 - (1 - k) ** 3))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
  }
  const badgeFile = id => TROPHIES.some(t => t.id === id) || id === "flamingo" || id === "firstlight";

  function tile(id, name, how, on, pts) {
    const art = badgeFile(id) ? `<img src="${BADGES}${id}.webp" alt="">` : `<span class="g-num">${num(pts)}</span>`;
    return `<li class="${on ? "" : "locked"}">${art}<b>${esc(name)}</b><span>${on ? (pts ? `+${num(pts)}` : "Collected") : esc(how)}</span></li>`;
  }
  function stamps() {
    const out = [];
    for (const [m, label] of [["history", "Periods"], ["wine", "Wine areas"], ["nature", "Landscapes"]]) {
      const names = m === "history" ? Object.fromEntries(ERA_KEYS.map(k => [k, ERAS[k].n])) : m === "nature" ? KIND_LABEL : null;
      const key = x => m === "history" ? x.era : m === "nature" ? x.kind : x.tag;
      const allKeys = [...new Set(PLACES[m].filter(scorable).map(key))];
      const got = new Set(PLACES[m].filter(x => been(x.name)).map(key));
      out.push(`<h3>${label}</h3><p class="g-stamps">${allKeys.map(k => `<span class="${got.has(k) ? "on" : ""}">${esc(names ? names[k] : k)}</span>`).join("")}</p>`);
    }
    return out.join("");
  }
  function openTrophies() {
    const done = STORY.filter(been).length;
    dialog("g-room", `${closeBtn}
      <p class="g-eye">${earned().length + Object.keys(state.wild).length} of ${TROPHIES.length + WILD.length} collected</p>
      <h2>Trophy Room</h2>
      <p class="g-sum">${num(total())} points · ${island()}% of the island · ${visitedCount()} of ${SCORABLE.length} places</p>
      <h3>Aphrodite Adventures · ${done} of ${STORY.length}</h3>
      <ol class="g-story">${STORY.map(n => `<li class="${been(n) ? "on" : ""}">${esc(n)}</li>`).join("")}</ol>
      <h3>Trophies</h3>
      <ul class="g-shelf">${TROPHIES.map(t => tile(t.id, t.name, t.how, t.test())).join("")}</ul>
      <h3>Wild Cards</h3>
      <ul class="g-shelf">${WILD.map(w => tile(w.id, w.name, w.how, state.wild[w.id], w.points)).join("")}</ul>
      ${stamps()}
      <div class="g-end"><a href="${preview ? location.pathname : "?preview"}">${preview ? "Leave preview mode" : "Try preview mode"}</a></div>`);
  }

  /* ---------- Friends ---------- */
  const latest = () => state.log[0] ? `${state.log[0].name} +${num(state.log[0].points)}` : null;
  const syncUp = () => Friends.save(state.name || "Explorer", total(), island(), latest(), state).catch(() => {});
  function merge(remote) {
    if (!remote || !remote.visits) return;
    for (const [n, v] of Object.entries(remote.visits)) {
      const mine = state.visits[n];
      if (!mine || v.points > mine.points) state.visits[n] = v;
    }
    Object.assign(state.wild, { ...remote.wild, ...state.wild });
    const seen = new Set(); state.log = [...state.log, ...(remote.log || [])].filter(l => !seen.has(l.t + l.name) && seen.add(l.t + l.name)).sort((a, b) => b.t.localeCompare(a.t));
    state.name ||= remote.name || "";
  }
  async function openFriends(note = "") {
    if (preview) return dialog("g-room", `${closeBtn}<p class="g-eye">Preview mode</p><h2>Friends</h2><p>Preview visits never reach the leaderboard.</p>`);
    if (!Friends.enabled) return dialog("g-room", `${closeBtn}<p class="g-eye">Coming soon</p><h2>Friends</h2><p>Friends leaderboards aren't switched on yet. Your points are saved on this device.</p>`);
    const d = dialog("g-room", `${closeBtn}<h2>Friends</h2><p class="g-msg">Loading…</p>`);
    try {
      await Friends.init();
      if (!Friends.user) {
        const invited = Friends.pendingInvite;
        dialog("g-room", `${closeBtn}<p class="g-eye">${invited ? "You've been invited" : "Quick sign-in"}</p><h2>Friends</h2>
          <p>Enter your email and we'll send a sign-in link. Your account keeps your points safe across devices.</p>
          <form class="g-form"><label for="g-email">Email</label><input id="g-email" type="email" required autocomplete="email"><button class="g-main">Send sign-in link</button></form>
          <p class="g-msg" role="status">${esc(note)}</p>`);
        d.querySelector("form").onsubmit = async e => {
          e.preventDefault();
          const m = d.querySelector(".g-msg");
          try { await Friends.signIn(d.querySelector("#g-email").value); m.textContent = "Check your email for the link."; } catch (err) { m.textContent = err.message; }
        };
        return;
      }
      const remote = await Friends.load(); if (remote) { merge({ ...remote.state, name: remote.name }); try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} refresh(); }
      await syncUp();
      await Friends.joinPending();
      const groups = await Friends.groups(), boards = await Promise.all(groups.map(g => Friends.board(g.id).then(rows => ({ g, rows }))));
      const me = Friends.user.id;
      dialog("g-room", `${closeBtn}<h2>Friends</h2>
        <form class="g-form g-name"><label for="g-name">Your name</label><input id="g-name" maxlength="30" value="${esc(state.name)}"><button>Save</button></form>
        ${boards.map(({ g, rows }) => `<h3>${esc(g.name)}</h3>
          <ol class="g-board">${rows.map(r => `<li class="${r.player_id === me ? "me" : ""}"><span>${esc(r.name)}<small>Island ${r.island}%${r.latest ? ` · ${esc(r.latest)}` : ""}</small></span><b>${num(r.points)}</b></li>`).join("")}</ol>
          <button class="g-main" data-copy="${esc(g.code)}">Copy invite link</button>`).join("") || "<p>Create a group, then share its invite link with your friends.</p>"}
        <form class="g-form g-new"><label for="g-group">New group</label><input id="g-group" maxlength="40" required placeholder="Group name"><button>Create</button></form>
        <p class="g-msg" role="status">${esc(note)}</p>`);
      d.querySelector(".g-name").onsubmit = async e => { e.preventDefault(); state.name = d.querySelector("#g-name").value.trim(); save(); await syncUp(); openFriends("Name saved."); };
      d.querySelector(".g-new").onsubmit = async e => { e.preventDefault(); await Friends.create(d.querySelector("#g-group").value); openFriends("Group created."); };
      d.querySelectorAll("[data-copy]").forEach(b => b.onclick = async () => {
        const link = Friends.inviteLink(b.dataset.copy);
        try { await navigator.clipboard.writeText(link); d.querySelector(".g-msg").textContent = "Invite link copied."; }
        catch (e) { d.querySelector(".g-msg").textContent = link; }
      });
    } catch (e) {
      dialog("g-room", `${closeBtn}<h2>Friends</h2><p class="g-msg">${esc(e.message)}</p>`);
    }
  }

  /* ---------- Atlas hooks ---------- */
  function gameCard(p) {
    const s = status(p), scored = !!rules(p), value_ = scored ? value(p) : 0, repeat_ = scored ? repeatValue(p) : 0;
    const head = {
      north: ["Not in this version", "Places in the north earn no points for now."],
      sensitive: ["No points here", "This place is fragile, so we don't reward visits. Enjoy its story and follow the local rules."],
      new: [`${num(value_)} points`, "First visit. Check in on site and answer one question."],
      repeat: [`+${num(repeat_)} points`, "Repeat visit bonus, once a month."],
      done: ["Visited", "You've already scored here this month."],
      capped: ["Visited", "You've collected every repeat bonus here."]
    }[s];
    const can = s === "new" || s === "repeat";
    const el = document.createElement("section");
    el.className = "g-card"; el.setAttribute("aria-label", "Game");
    el.innerHTML = `<div><b>${head[0]}</b><p>${head[1]}</p></div>
      ${can ? `<button class="g-main">Check in</button><p class="g-msg" role="status"></p>` : ""}`;
    if (can) el.querySelector("button").onclick = e => checkIn(p, e.currentTarget, el.querySelector(".g-msg"));
    return el;
  }
  const _select = select;
  select = function (i, fromTrip) {
    _select(i, fromTrip);
    const body = $("card").querySelector(".body"), at = body.querySelector("p");
    if (at) at.before(gameCard(PLACES[mode][i]));
  };

  function mark() {
    const list = PLACES[mode] || [];
    document.querySelectorAll("#pins .pin, #places button[data-i]").forEach(b => {
      const p = list[+b.dataset.i]; if (p) b.classList.toggle("g-done", been(p.name));
    });
  }
  function refresh() {
    $("g-pts").textContent = num(total());
    $("g-pct").textContent = island() + "%";
    mark();
    if (current !== null) {
      const old = $("card").querySelector(".g-card"), p = PLACES[mode][current];
      if (old && p) old.replaceWith(gameCard(p));
    }
  }

  /* ---------- Start ---------- */
  const bar = document.createElement("div");
  bar.className = "g-bar";
  bar.innerHTML = `<p><b id="g-pts">0</b> pts</p><p><b id="g-pct">0%</b> island</p><button id="g-trophies">Trophies</button><button id="g-friends">Friends</button>`;
  document.querySelector(".views").before(bar);
  $("g-trophies").onclick = openTrophies;
  $("g-friends").onclick = () => openFriends();
  if (preview) { const b = document.createElement("p"); b.className = "g-banner"; b.textContent = "Preview mode: visits are simulated and never reach the leaderboard."; document.body.append(b); }
  Friends.rememberInvite();
  const watch = new MutationObserver(mark);
  watch.observe($("pins"), { childList: true }); watch.observe($("places"), { childList: true });
  refresh();
  if (Friends.enabled && !preview) {
    Friends.init().then(() => { if (Friends.user || Friends.pendingInvite) openFriends(); }).catch(() => {});
  }
})();
