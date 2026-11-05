/* =========================================================
   KYPRIGO · the 8-bit switch
   A visual theme only, like dark mode. It sets data-pixel="on" on <html>,
   which site/pixel.css reads to restyle the same pages: pixel type, stepped
   borders, sprite pins and icons, and a chunky pixelated map. The colours
   are the site's own tokens, so nothing about the palette changes.
   Load it in <head> (before the page paints) on every page, after pixel.css:
     <link rel="stylesheet" href="../site/pixel.css">
     <script src="../site/pixel.js"></script>
   The choice is remembered in localStorage ("kyprigo-pixel"). ?pixel and
   ?pixel=off set it from a link.
   ========================================================= */
(() => {
  const KEY = "kyprigo-pixel";
  const root = new URL("../", document.currentScript.src).href;
  const sprites = root + "site/pixel/";
  const html = document.documentElement;
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  const param = new URLSearchParams(location.search).get("pixel");
  if (param !== null) store.set(param === "off" ? "off" : "on");
  let on = store.get() === "on";

  /* ---------- Fonts, loaded only when the theme is switched on ---------- */
  let fontsAdded = false;
  function addFonts() {
    if (fontsAdded) return;
    fontsAdded = true;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap";
    document.head.appendChild(l);
  }

  /* ---------- Badges: swap the painted badge art for pixel medals ---------- */
  const MEDAL = {
    aphrodite: "med_history", huts: "med_history", ingot: "med_history", walls: "med_history",
    commandaria: "med_wine", xynisteri: "med_wine", amphora: "med_wine", leafb: "med_wine",
    avakas: "med_nature", cedar: "med_nature", flamingo: "med_nature", firstlight: "med_nature"
  };
  const BADGE = /badges\/([a-z0-9_-]+)\.webp/i;
  function swapOne(img) {
    if (on) {
      const src = img.getAttribute("src") || "";
      const m = BADGE.exec(src);
      if (!m || img.dataset.pxOrig) return;
      img.dataset.pxOrig = src;
      // Not collected yet: the lock medal, not a faded copy of the prize
      img.src = sprites + (img.closest(".locked") ? "med_lock" : MEDAL[m[1]] || "trophy") + ".png";
    } else if (img.dataset.pxOrig) {
      img.src = img.dataset.pxOrig;
      delete img.dataset.pxOrig;
    }
  }
  function swapBadges(scope) {
    const imgs = scope.matches?.("img") ? [scope] : [...(scope.querySelectorAll?.("img") || [])];
    imgs.forEach(swapOne);
  }
  /* ---------- Avatars: one of four, from the player's name, so a friend always gets the same one ---------- */
  const avatarOf = name => { let h = 5381; for (const c of String(name).trim().toLowerCase()) h = (h * 33 + c.codePointAt(0)) >>> 0; return h % 4 + 1; };
  function avatars(scope) {
    // The map's Friends dialog (.g-board) and the Friends page (.rows)
    (scope.querySelectorAll?.(".g-board li, .rows li") || []).forEach(li => {
      const who = li.querySelector(".who b") || li.querySelector(":scope > span");
      const name = who && (who.firstChild?.nodeValue || who.textContent);
      if (name) li.dataset.av = avatarOf(name);
    });
  }
  new MutationObserver(list => {
    list.forEach(r => r.addedNodes.forEach(n => { if (n.nodeType !== 1) return; avatars(n.parentElement || n); if (on) swapBadges(n); }));
  }).observe(html, { childList: true, subtree: true });

  /* ---------- The map: fewer, bigger pixels ---------- */
  // 0.5 draws each map pixel as exactly 2x2 CSS pixels (a whole number), and keeps the map's own labels readable
  const RATIO = 0.5;
  let watching = false;
  function mapPixels() {
    try {
      // `map` is the atlas's own variable; it only exists on the map page, once the map has been created
      if (typeof map === "undefined" || !map || !map.setPixelRatio) return;
      const want = on ? RATIO : (window.devicePixelRatio || 1);
      if (map.getPixelRatio() !== want) map.setPixelRatio(want);
      // Keep it after resizing, turning a phone, moving to another screen and switching 3D terrain
      if (!watching) { watching = true; map.on("resize", mapPixels); map.on("terrain", mapPixels); }
    } catch (e) {}
  }

  /* ---------- The switch ---------- */
  const buttons = [];
  function paint() {
    if (on) { html.setAttribute("data-pixel", "on"); addFonts(); } else html.removeAttribute("data-pixel");
    buttons.forEach(b => b.setAttribute("aria-pressed", String(on)));
    swapBadges(document.documentElement);
    mapPixels();
  }
  function make() {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "px-toggle";
    b.setAttribute("aria-pressed", String(on));
    b.title = "Switch between the classic look and 8-bit";
    b.innerHTML = '<span class="px-chip" aria-hidden="true"></span><span class="px-text">8-bit</span>';
    b.addEventListener("click", () => { on = !on; store.set(on ? "on" : "off"); paint(); });
    buttons.push(b);
    return b;
  }
  function mount() {
    // Top bar on the start page, Passport, Friends and About
    const barIn = document.querySelector("#k-bar .k-bar-in");
    if (barIn) barIn.insertBefore(make(), barIn.querySelector(".k-menu-btn"));
    // The map has no top bar: the switch sits in the panel header
    const brand = document.querySelector(".panel .brand");
    if (brand) brand.appendChild(make());
    // Pages without either, such as credits.html, mark a spot with data-px-slot
    document.querySelectorAll("[data-px-slot]").forEach(s => s.appendChild(make()));
    avatars(document);
    paint();
    // The map is created after the page loads, so apply the pixel ratio again once it is ready
    try { if (typeof MAP_READY !== "undefined" && MAP_READY) MAP_READY.then(mapPixels); } catch (e) {}
  }

  paint();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
