# Working on Kypros Atlas together

Two people (and their Claude sessions) work on this repository at the same time. These rules keep us out of each other's way.

## Every change goes through a branch and a pull request

1. Start from the latest `main`: `git checkout main && git pull`.
2. Make a branch named for the work: `git checkout -b home-page`, `kypros-quiz`, …
3. Commit small, focused changes. Push the branch and open a pull request.
4. The other person glances at it before it is merged. Merge, then delete the branch.
5. Before starting the next piece of work, pull `main` again.

Never push straight to `main`. GitHub Pages publishes `main`, so whatever lands there is live.

## Who works where

Conflicts only happen when two branches change the same lines of the same file. Keep to your area, and say in the chat before you step outside it.

| Area | Files | Owner |
| --- | --- | --- |
| The map (atlas) | `index.html`, `data/`, `dem/`, `glyphs/` | Ask first |
| The game | `game/` | Emilios |
| The start page | `home/`, `tools/build-home-data.js` | George |
| Credits | `credits.html` | Whoever adds images |

## index.html needs extra care

It holds the whole map: code, styles, place data and every photo, in one large file. Two branches editing it at once will almost always conflict.

- Only one open branch should change `index.html` at a time. Say so before you start.
- Keep changes to it small, and merge them quickly.
- If it has to change for your feature, do that part first in its own small pull request.
- Splitting it into separate files (styles, map code, place data, photos) would remove most of these conflicts. Do that only when no other branch touches it.

## If a conflict happens anyway

Pull `main` into your branch (`git pull origin main`), fix the marked sections, test the page, then commit. For a conflict in `index.html`, take the other person's version of their section and re-apply your own change on top, rather than hand-merging large blocks.

## Testing before a pull request

- Serve the folder with any web server, for example `python3 -m http.server`, and open it in a browser. Opening `index.html` directly from disk will not load the map data.
- Check the map at `/`, the start page at `/home/`, and a phone-sized window.
- Use `?preview` to try the game without touching real progress.

## Working with Claude

Tell your Claude session at the start: *"Work on a new branch from the latest main, only change files in my area, and open a pull request when done."* Ask it to pull `main` again before it pushes.
