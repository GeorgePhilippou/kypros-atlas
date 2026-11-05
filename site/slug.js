/* =========================================================
   KYPROS · place slugs
   One rule for turning a place name into the last part of a map link,
   used by the map (index.html) and the start page slideshow.
   "Aphrodite & Adonis Trails" becomes "aphrodite-adonis-trails",
   so /#nature/aphrodite-adonis-trails opens that place.
   ========================================================= */
window.kyprosSlug = name => String(name || "")
  .toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
