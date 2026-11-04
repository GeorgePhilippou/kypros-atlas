/* =========================================================
   KYPROS GAME · friends
   Sign-in, invite links and leaderboards through Supabase.
   Everything here stays off until config.js has a project.
   ========================================================= */
const Friends = (() => {
  const JOIN_KEY = "kypros.join";
  const cfg = window.KYPROS_SUPABASE;
  let client = null, user = null, loading = null;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  // An invite link looks like …/kypros-game/?join=ABCD1234
  function rememberInvite() {
    const code = new URLSearchParams(location.search).get("join");
    if (!code) return;
    store.set(JOIN_KEY, code);
    const clean = new URL(location.href);
    clean.searchParams.delete("join");
    try { history.replaceState(null, "", clean); } catch (e) {}
  }

  function loadLibrary() {
    if (window.supabase) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not reach the leaderboard service"));
      document.head.append(s);
    });
  }

  function init() {
    if (!cfg) return Promise.resolve(null);
    if (!loading) loading = loadLibrary().then(async () => {
      client = window.supabase.createClient(cfg.url, cfg.anonKey);
      const { data } = await client.auth.getSession();
      user = data.session ? data.session.user : null;
      client.auth.onAuthStateChange((_e, session) => { user = session ? session.user : null; });
      return user;
    });
    return loading;
  }

  async function rpc(name, args) {
    const { data, error } = await client.rpc(name, args);
    if (error) throw new Error(error.message);
    return data;
  }

  return {
    rememberInvite,
    init,
    get enabled() { return !!cfg; },
    get user() { return user; },
    get pendingInvite() { return store.get(JOIN_KEY); },
    async signIn(email) {
      const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } });
      if (error) throw new Error(error.message);
    },
    signOut() { return client.auth.signOut(); },
    load: async () => (await rpc("load_player", {}))[0] || null,
    save: (name, points, island, latest, state) => rpc("save_player", { p_name: name, p_points: points, p_island: island, p_latest: latest, p_state: state }),
    groups: () => rpc("my_groups", {}),
    board: group => rpc("group_board", { p_group: group }),
    create: async name => (await rpc("create_group", { p_name: name }))[0],
    async joinPending() {
      const code = store.get(JOIN_KEY);
      if (!code) return null;
      const g = (await rpc("join_group", { p_code: code }))[0];
      store.del(JOIN_KEY);
      return g;
    },
    inviteLink: code => `${location.origin}${location.pathname}?join=${encodeURIComponent(code)}`
  };
})();
