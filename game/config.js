/* =========================================================
   KYPROS GAME · settings
   ---------------------------------------------------------
   To switch on friends leaderboards:
   1. Create a free project at supabase.com
   2. Run supabase.sql in its SQL editor
   3. Paste the project URL and anon public key below
   4. Under Authentication > URL Configuration, add this site's address
   The anon key is safe to publish. Never put a service key here.
   ========================================================= */
window.KYPROS_SUPABASE = null;
// window.KYPROS_SUPABASE = { url: "https://YOUR-PROJECT.supabase.co", anonKey: "YOUR-ANON-KEY" };

/* The handbook's open question: maximum repeat bonuses per place.
   null means no cap. The handbook suggests testing 3. */
window.KYPROS_REPEAT_CAP = null;
