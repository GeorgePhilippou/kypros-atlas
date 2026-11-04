# Kypros start page

The overview page at `/home/`: your progress across the three views, a passport of places, stories that cross views, the friends leaderboard and ready-made days.

| File | What it does |
| --- | --- |
| `index.html` | Page structure |
| `home.css` | Styles: paper, ink and red from the atlas, with each view's card in its own map's style |
| `home.js` | Reads saved progress, draws the island, builds every section |
| `data.js` | **Generated.** Place, trip and view data copied from the atlas |
| `img/` | **Generated.** Place photos copied from the atlas |

## Shared with the rest of the site

- **Progress** comes from the game layer's saved state in the browser (`kypros.game.v1`, or `kypros.game.preview.v1` with `?preview`). The page only reads it; checking in still happens on the map.
- **Points and island %** follow `game/scoring.js`: places with a score that are not in the north.
- **Leaderboards** use `game/friends.js` and `game/config.js` unchanged, so they switch on when the game's Supabase project does.
- **Coastline** comes from `data/base.json`.

## After changing places on the map

`data.js` and `img/` are copies. When places, photos or trips change in `index.html`, regenerate them:

    node tools/build-home-data.js
