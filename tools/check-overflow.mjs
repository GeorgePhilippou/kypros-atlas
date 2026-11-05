// Checks every page for horizontal overflow at 320, 390, 768 and 1440 px, in the classic and 8-bit looks.
//
//   python3 -m http.server 8000            (from the repository root, in another terminal)
//   npm install --no-save puppeteer-core   (once)
//   node tools/check-overflow.mjs [http://localhost:8000]
//
// It drives an installed Firefox or Chrome. Set BROWSER to its path if it is not in the usual place on a Mac.
// Exit code 0 means no page is wider than the window; 1 lists each page that is, with the widest elements.
import puppeteer from "puppeteer-core";
import fs from "fs";

const BASE = (process.argv[2] || "http://localhost:8000").replace(/\/$/, "");
const WIDTHS = [320, 390, 768, 1440];
const PAGES = ["/home/", "/passport/", "/passport/?preview", "/friends/", "/about/", "/credits.html",
  "/#history", "/#wine", "/#nature", "/#villages", "/#table", "/?preview#history"];
const LOOKS = ["off", "on"];   // kyprigo-pixel: classic, 8-bit

const candidates = [process.env.BROWSER,
  "/Applications/Firefox.app/Contents/MacOS/firefox",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean);
const executablePath = candidates.find(p => fs.existsSync(p));
if (!executablePath) { console.error("No browser found. Set BROWSER to the path of Firefox or Chrome."); process.exit(2); }
const browser = await puppeteer.launch({ browser: /firefox/i.test(executablePath) ? "firefox" : "chrome", executablePath, headless: true });

const wait = ms => new Promise(r => setTimeout(r, ms));
const problems = [];
for (const look of LOOKS) for (const w of WIDTHS) for (const path of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: w < 500 ? 844 : 900, isMobile: w < 700, hasTouch: w < 700 });
  await page.goto(BASE + "/credits.html", { waitUntil: "domcontentloaded" });
  await page.evaluate(v => localStorage.setItem("kyprigo-pixel", v), look);
  await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await wait(path.includes("#") ? 3500 : 1200);   // the map lays out its panel after it loads
  const r = await page.evaluate(() => {
    const iw = document.documentElement.clientWidth, sw = document.documentElement.scrollWidth;
    const wide = [];
    for (const el of document.querySelectorAll("body *")) {
      const b = el.getBoundingClientRect();
      if (!b.width || b.right <= iw + 1) continue;
      let a = el, clipped = false;   // skip anything inside a box that clips or scrolls sideways
      while ((a = a.parentElement) && a !== document.body) if (getComputedStyle(a).overflowX !== "visible") { clipped = true; break; }
      if (!clipped) wide.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).join(".") : ""} (right edge ${Math.round(b.right)}px)`);
    }
    return { iw, sw, wide: wide.slice(0, 5) };
  });
  if (r.sw > r.iw + 1) problems.push(`${look === "on" ? "8-bit" : "classic"} ${w}px ${path}: page is ${r.sw}px wide in a ${r.iw}px window\n    ${r.wide.join("\n    ")}`);
  await page.close();
}
await browser.close();
const runs = LOOKS.length * WIDTHS.length * PAGES.length;
if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} of ${runs} checks overflow.`); process.exit(1); }
console.log(`No horizontal overflow in ${runs} checks (${PAGES.length} pages, ${WIDTHS.join("/")} px, classic and 8-bit).`);
