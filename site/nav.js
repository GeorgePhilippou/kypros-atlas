/* =========================================================
   KYPROS · the shared top bar
   Every page except the map includes, in this order:
     <link rel="stylesheet" href="../site/nav.css">
     <script src="../home/data.js"></script>      (the five maps, from MODES and FILTERS)
     <header class="k-bar" id="k-bar"></header>
     <script src="../site/nav.js"></script>
   and marks itself with <body data-page="home|passport|friends|about">.
   Links are worked out from where this file lives, so the site also works
   from a sub-folder such as GitHub Pages' /kypros-atlas/.
   ========================================================= */
(() => {
  const bar = document.getElementById("k-bar");
  if (!bar) return;
  const root = new URL("../", document.currentScript.src).href;
  const page = document.body.dataset.page || "";
  const D = window.KYPROS_DATA || { modes: {} };
  // Stay in the game's preview mode from page to page
  const q = new URLSearchParams(location.search).has("preview") ? "?preview" : "";
  // The map's own list and names: history, wine, nature, villages, table
  const maps = Object.entries(D.modes).map(([key, m]) => ({ key, label: m.label, href: `${root}${q}#${key}` }));
  const pages = [
    { key: "passport", label: "Passport", href: `${root}passport/${q}` },
    { key: "friends", label: "Friends", href: `${root}friends/${q}` },
    { key: "about", label: "About", href: `${root}about/${q}` }
  ];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cur = key => key === page ? ' aria-current="page"' : "";
  const mapLink = m => `<li><a href="${m.href}"><span class="k-dot" style="--c:var(--${m.key})" aria-hidden="true"></span>${esc(m.label)}</a></li>`;
  const chevron = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const burger = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

  bar.innerHTML = `<div class="wrap k-bar-in">
      <a class="k-brand" href="${root}home/${q}" aria-label="KypriGo, home"${cur("home")}><b>Kypri<em>Go</em></b><span>Κύπρος · Kıbrıs</span></a>
      <nav class="k-nav" aria-label="Main">
        <ul class="k-links">
          <li class="k-maps"><button type="button" class="k-maps-btn" aria-expanded="false" aria-controls="k-drop">Maps ${chevron}</button>
            <ul class="k-drop" id="k-drop" hidden>${maps.map(mapLink).join("")}</ul></li>
          ${pages.map(p => `<li><a class="k-link" href="${p.href}"${cur(p.key)}>${p.label}</a></li>`).join("")}
        </ul>
      </nav>
      <button type="button" class="k-menu-btn" aria-expanded="false" aria-controls="k-sheet">${burger}<span>Menu</span></button>
    </div>
    <div class="k-sheet" id="k-sheet" hidden>
      <nav aria-label="Main">
        <p class="k-sheet-h" id="k-sheet-maps">Maps</p>
        <ul aria-labelledby="k-sheet-maps">${maps.map(mapLink).join("")}</ul>
        <hr>
        <ul>${pages.map(p => `<li><a href="${p.href}"${cur(p.key)}>${p.label}</a></li>`).join("")}</ul>
      </nav>
    </div>`;

  /* ---------- Maps dropdown ---------- */
  const btn = bar.querySelector(".k-maps-btn"), drop = bar.querySelector(".k-drop");
  const items = () => [...drop.querySelectorAll("a")];
  function setDrop(open, focus) {
    btn.setAttribute("aria-expanded", open);
    drop.hidden = !open;
    if (open && focus) items()[focus === "last" ? items().length - 1 : 0].focus();
  }
  btn.addEventListener("click", () => setDrop(drop.hidden));
  btn.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); setDrop(true, "first"); }
    if (e.key === "ArrowUp") { e.preventDefault(); setDrop(true, "last"); }
  });
  drop.addEventListener("keydown", e => {
    const list = items(), i = list.indexOf(document.activeElement);
    const go = k => { e.preventDefault(); list[(k + list.length) % list.length].focus(); };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
  });
  bar.querySelector(".k-maps").addEventListener("focusout", e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false);
  });

  /* ---------- Phone menu sheet ---------- */
  const menu = bar.querySelector(".k-menu-btn"), sheet = bar.querySelector(".k-sheet");
  function setSheet(open) {
    menu.setAttribute("aria-expanded", open);
    menu.querySelector("span").textContent = open ? "Close" : "Menu";
    sheet.hidden = !open;
    if (open) sheet.querySelector("a").focus();
  }
  menu.addEventListener("click", () => setSheet(sheet.hidden));
  matchMedia("(min-width: 700px)").addEventListener("change", e => { if (e.matches && !sheet.hidden) setSheet(false); });

  /* ---------- Escape and outside taps close both ---------- */
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!drop.hidden) { setDrop(false); btn.focus(); }
    if (!sheet.hidden) { setSheet(false); menu.focus(); }
  });
  document.addEventListener("pointerdown", e => {
    if (!drop.hidden && !bar.querySelector(".k-maps").contains(e.target)) setDrop(false);
    if (!sheet.hidden && !sheet.contains(e.target) && !menu.contains(e.target)) setSheet(false);
  });
})();
