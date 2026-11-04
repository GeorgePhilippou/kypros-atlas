# Kypros game layer

Adds check-ins, points, a Trophy Room and friends leaderboards to the Kypros Atlas, following the Scoring Mechanics Handbook.

## Install

Add this line before `</head>` in `index.html`:

    <link rel="stylesheet" href="game/game.css">

Add these lines straight after the atlas's closing `</script>`:

    <script src="game/config.js"></script>
    <script src="game/scoring.js"></script>
    <script src="game/friends.js"></script>
    <script src="game/game.js"></script>

## Try it from anywhere

Add `?preview` to the address. GPS is skipped and visits are kept apart from real progress and the leaderboard.

## Friends leaderboards

They stay off until `config.js` has a Supabase project:

1. Create a free project at supabase.com.
2. Run `supabase.sql` in its SQL editor.
3. Paste the project URL and anon key into `config.js`.
4. Add the site's address under Authentication, then URL Configuration.

## Before launch

- Every score and question in `scoring.js` is a draft and needs approving.
- Check questions and GPS zones on site.
- Scores are worked out on the player's device, so a determined friend could cheat.
