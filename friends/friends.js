/* =========================================================
   KYPROS · Friends and leaderboard
   Uses game/friends.js and game/config.js unchanged: sign in by email,
   create or join a group, see the group board and share invite links.
   Invite links from this page look like …/friends/?join=CODE.
   Points are sent to the board by the map when you check in.
   ========================================================= */
(() => {
  const preview = new URLSearchParams(location.search).has("preview");
  const STORE = preview ? "kypros.game.preview.v1" : "kypros.game.v1";
  const S = (() => {
    const fresh = { name: "", visits: {}, wild: {}, log: [], wish: {}, quiz: {} };
    try { return { ...fresh, ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch (e) { return fresh; }
  })();
  const D = window.KYPROS_DATA, T = window.KyprosTrophies;
  const board = document.getElementById("board");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = n => Math.round(n).toLocaleString("en-GB");
  const R = T.room(S, D.places.map(p => ({ name: p.name, mode: p.mode, north: p.north, egg: p.egg })));
  const meRow = (rank = "·") => `<li class="me"><span class="rank">${rank}</span><span class="who"><b>${esc(S.name || "You")}</b><span class="barr"><i style="width:${R.island}%"></i></span><small>${R.island}% of the island</small></span><span class="pts">${num(R.points)}<small>points</small></span></li>`;
  const calm = text => { board.innerHTML = `<p class="calm">${text}</p>`; };

  if (window.Friends) Friends.rememberInvite();

  async function render(note = "") {
    if (preview) return calm("Preview mode: these visits are kept apart and never reach the leaderboard.");
    if (!window.Friends || !Friends.enabled) return calm("Friends is not switched on yet.");
    calm("Loading your groups…");
    try {
      await Friends.init();
      if (!Friends.user) {
        board.innerHTML = `<ol class="rows">${meRow()}</ol>
          <form class="form" id="f-signin">
            <label for="f-email">${Friends.pendingInvite ? "You've been invited. Sign in to join the group." : "Sign in to make a group or join your friends."}</label>
            <div class="form-row"><input id="f-email" type="email" required autocomplete="email" placeholder="you@example.com"><button class="btn btn-ink">Send sign-in link</button></div>
          </form>
          <p class="calm" role="status">${esc(note) || "We'll email you a link. No password needed."}</p>`;
        board.querySelector("form").onsubmit = async e => {
          e.preventDefault();
          try { await Friends.signIn(board.querySelector("#f-email").value); render("Check your email for the sign-in link."); } catch (err) { render(err.message); }
        };
        return;
      }
      await Friends.joinPending().catch(() => null);
      const groups = await Friends.groups();
      const newGroup = `<form class="form" id="f-new">
          <label for="f-group">${groups.length ? "Start another group" : "Name your group, then share the invite link."}</label>
          <div class="form-row"><input id="f-group" required maxlength="40" placeholder="Summer in Cyprus"><button class="btn btn-ink">Create group</button></div>
        </form>`;
      const bindNew = () => board.querySelector("#f-new").onsubmit = async e => {
        e.preventDefault();
        try { await Friends.create(board.querySelector("#f-group").value); render("Group created."); } catch (err) { render(err.message); }
      };
      const signOut = `<p class="out"><button type="button" class="link" id="f-out">Sign out</button></p>`;
      const bindOut = () => board.querySelector("#f-out").onclick = async () => { await Friends.signOut(); location.reload(); };
      if (!groups.length) {
        board.innerHTML = `<ol class="rows">${meRow()}</ol>${newGroup}<p class="calm" role="status">${esc(note)}</p>${signOut}`;
        bindNew(); bindOut();
        return;
      }
      let cur = groups[0];
      const show = async () => {
        const rows = await Friends.board(cur.id), top = Math.max(1, ...rows.map(r => r.points));
        board.innerHTML = `${groups.length > 1 ? `<div class="groups" role="group" aria-label="Your groups">${groups.map(g => `<button type="button" class="chip" data-g="${esc(g.id)}" aria-pressed="${g.id === cur.id}">${esc(g.name)}</button>`).join("")}</div>` : `<h2 class="group-name">${esc(cur.name)}</h2>`}
          <ol class="rows">${rows.map((r, i) => `<li class="${r.player_id === Friends.user.id ? "me" : ""}"><span class="rank">${i + 1}</span><span class="who"><b>${esc(r.name)}</b><span class="barr"><i style="width:${Math.round(r.points / top * 100)}%"></i></span><small>${Number(r.island)}% of the island${r.latest ? ` · last at ${esc(r.latest)}` : ""}</small></span><span class="pts">${num(r.points)}<small>points</small></span></li>`).join("")}</ol>
          <div class="invite"><span>Invite link</span><code>${esc(Friends.inviteLink(cur.code))}</code><button type="button" class="btn btn-line" id="f-copy">Copy</button></div>
          ${newGroup}<p class="calm" role="status">${esc(note)}</p>${signOut}`;
        board.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { cur = groups.find(g => String(g.id) === b.dataset.g); show(); });
        const copy = board.querySelector("#f-copy");
        copy.onclick = () => navigator.clipboard.writeText(Friends.inviteLink(cur.code)).then(() => { copy.textContent = "Copied"; }, () => { getSelection().selectAllChildren(board.querySelector(".invite code")); copy.textContent = "Selected"; });
        bindNew(); bindOut();
      };
      await show();
    } catch (err) {
      board.innerHTML = `<ol class="rows">${meRow()}</ol><p class="calm">The leaderboard couldn't load: ${esc(err.message)}. Your points are safe on this device.</p>`;
    }
  }
  render();
})();
