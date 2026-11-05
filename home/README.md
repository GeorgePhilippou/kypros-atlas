# Kypros start page

The page at `/home/`: the shared top bar and one full-width slideshow of places worth visiting today. Each slide links to its map with the place already open, for example `/#nature/larnaca-salt-lake`, so the visitor can check in there.

| File | What it does |
| --- | --- |
| `index.html` | Page structure: the top bar and the slideshow |
| `slides.js` | **The list of slides.** Edit this to add, remove or change places |
| `slideshow.js` | Picks today's slides and runs the slideshow |
| `slides.css` | Slideshow styles |
| `data.js` | **Generated.** Place and view data copied from the atlas, used by every page's top bar and by Passport |
| `img/` | **Generated.** Place photos copied from the atlas |
| `img/slides/` | Photos made for the slideshow. Not touched by the generator |

The rest of the old start page moved: the passport and trophy room to `/passport/`, the leaderboard to `/friends/`, and the guide and credits to `/about/`. The top bar is `site/nav.js` and `site/nav.css`.

## Adding a slide

1. Put the photo in `home/img/slides/`, named after the place, for example `kourion-theatre.jpg`.
2. Add a line to `home/slides.js`:

       { mode: "history", place: "Kourion", image: "img/slides/kourion-theatre.jpg", focus: "50% 40%",
         line: "A theatre on a cliff, looking out over the sea." },

   - `mode` is the map: `history`, `wine`, `nature`, `villages` or `table`.
   - `place` must match the place name on that map exactly. A slide with an unknown place is skipped.
   - `focus` is the point of the photo to keep in view when it is cropped (`"50% 50%"` is the centre). Check it on a phone held upright, where most of the sides are cut off.
   - `line` is one short sentence: why go today.
   - `months` (optional) limits a seasonal slide to some months, for example `months: [11, 12, 1, 2, 3]` for the flamingos at Larnaca Salt Lake.
3. Add the photo to `credits.html`.

## Photo spec

- 2400 × 1350 pixels (16:9), JPEG, under 300 KB.
- Keep the subject near the centre: phones held upright show only the middle third of the width. Set `focus` for each photo.
- Leave the bottom left fairly calm, as the place name and button sit there on a dark gradient.
- Photos must be your own or openly licensed, and credited in `credits.html`.

## Which slides show today

1. Slides with `months` are kept only in those months.
2. The list is rotated by the day of the year, so a different place leads each day.
3. At most 8 slides are shown.

The slideshow moves on every 6 seconds, pauses on hover, on keyboard focus and when the tab is hidden, and has a pause button. With reduced motion turned on it does not move on its own and does not zoom. Arrow keys, swipes, the arrows and the dots all change slides.

## After changing places on the map

`data.js` and `img/` are copies. When places, photos or trips change in `index.html` or `game/filters.js`, regenerate them:

    node tools/build-home-data.js
