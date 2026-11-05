# KypriGo game layer

Adds check-ins, points, quizzes, a Trophy Room and friends leaderboards to KypriGo, following the Scoring Mechanics Handbook.

## Install

Add this line before `</head>` in `index.html`:

    <link rel="stylesheet" href="game/game.css">

Add this line before the atlas's main script:

    <script src="game/filters.js"></script>

Add these lines straight after the atlas's closing `</script>`:

    <script src="game/config.js"></script>
    <script src="game/scoring.js"></script>
    <script src="game/quiz.js"></script>
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

## Filters

`filters.js` adds Villages and Table. Each borrows an existing map theme, so a new filter needs no new terrain or fonts.

## Before launch

- Every score and question in `scoring.js` and `quiz.js` is a draft and needs approving.
- Check questions and GPS zones on site.
- Scores are worked out on the player's device, so a determined friend could cheat.
