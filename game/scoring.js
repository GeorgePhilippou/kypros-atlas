/* =========================================================
   KYPROS GAME · scoring
   DRAFT scores and questions, for George and Emilios to approve.
   r, e, i = rarity, effort, importance (1 to 3). s = signature (1 to 99).
   z = check-in radius in metres. The first answer in a is the correct one.
   Any place not listed here earns no points: Lara Bay is left out on purpose.
   ========================================================= */
const SCORING = {
  "Choirokoitia": {"r": 2, "e": 1, "i": 3, "s": 70, "z": 450, "q": "What shape are the reconstructed houses at the entrance?", "a": ["Round", "Square", "Octagonal"]},
  "Sanctuary of Aphrodite": {"r": 2, "e": 1, "i": 3, "s": 41, "z": 500, "q": "How was the goddess shown here, rather than as a statue?", "a": ["As a black conical stone", "As a bronze figure", "As a marble column"]},
  "Amathus": {"r": 2, "e": 1, "i": 2, "s": 11, "z": 600, "q": "Which goddess had a temple on the acropolis?", "a": ["Aphrodite", "Athena", "Artemis"]},
  "Kourion": {"r": 1, "e": 1, "i": 3, "s": 70, "z": 900, "q": "Which ancient building here still hosts summer performances?", "a": ["The theatre", "The stadium", "The library"]},
  "Nea Paphos": {"r": 1, "e": 1, "i": 3, "s": 38, "z": 800, "q": "What are the Houses of Dionysos, Theseus and Aion best known for?", "a": ["Floor mosaics", "Wall frescoes", "Bronze statues"]},
  "Kykkos Monastery": {"r": 2, "e": 2, "i": 3, "s": 11, "z": 500, "q": "Which future president served here as a novice?", "a": ["Archbishop Makarios", "Glafcos Clerides", "Spyros Kyprianou"]},
  "Panagia tou Asinou": {"r": 3, "e": 2, "i": 3, "s": 5, "z": 350, "q": "What protects the paintings from snow and rain?", "a": ["A steep timber roof", "A copper dome", "A stone vault"]},
  "Kolossi Castle": {"r": 1, "e": 1, "i": 2, "s": 14, "z": 350, "q": "Which sweet wine took its name from this commandery?", "a": ["Commandaria", "Malvasia", "Zivania"]},
  "Venetian Walls of Nicosia": {"r": 1, "e": 1, "i": 3, "s": 11, "z": 1300, "q": "How many heart-shaped bastions do the walls have?", "a": ["Eleven", "Seven", "Thirteen"]},
  "Hala Sultan Tekke": {"r": 2, "e": 1, "i": 2, "s": 49, "z": 450, "q": "Which water does the mosque look over?", "a": ["Larnaca Salt Lake", "Akrotiri Salt Lake", "Paralimni Lake"]},
  "Tombs of the Kings": {"r": 1, "e": 1, "i": 3, "s": 17, "z": 700, "q": "Which style of column is carved around the courtyards?", "a": ["Doric", "Ionic", "Corinthian"]},
  "Cyprus Museum": {"r": 1, "e": 1, "i": 3, "s": 82, "z": 250, "q": "Where was the museum's terracotta army found?", "a": ["Agia Irini", "Kourion", "Amathus"]},
  "Church of Agios Lazaros": {"r": 1, "e": 1, "i": 2, "s": 90, "z": 250, "q": "What is the church's famous iconostasis made from?", "a": ["Carved wood", "Marble", "Silver"]},
  "Stavrovouni Monastery": {"r": 2, "e": 2, "i": 2, "s": 90, "z": 600, "q": "What is St Helena said to have left on this peak?", "a": ["A fragment of the True Cross", "An icon of the Virgin", "A golden lamp"]},
  "Kition": {"r": 2, "e": 1, "i": 2, "s": 34, "z": 450, "q": "Which philosopher was born in Kition?", "a": ["Zeno, founder of Stoicism", "Epicurus", "Pythagoras"]},
  "Limassol Castle": {"r": 1, "e": 1, "i": 2, "s": 91, "z": 250, "q": "Which king, by tradition, married at this site in 1191?", "a": ["Richard the Lionheart", "Philip II of France", "Guy de Lusignan"]},
  "Lefkara": {"r": 1, "e": 1, "i": 2, "s": 81, "z": 700, "q": "Which craft is this village famous for?", "a": ["Lace", "Glassblowing", "Basket weaving"]},
  "Ayia Napa Monastery": {"r": 1, "e": 1, "i": 1, "s": 8, "z": 250, "q": "What shape is the fountain in the courtyard?", "a": ["Octagonal", "Round", "Square"]},
  "Tamassos": {"r": 3, "e": 1, "i": 2, "s": 6, "z": 450, "q": "What do the two royal tombs imitate in stone?", "a": ["Wooden houses", "Ships", "Temples"]},
  "Kyperounda Winery": {"r": 2, "e": 2, "i": 2, "s": 11, "z": 450, "q": "Which native grape is Petritis made from?", "a": ["Xynisteri", "Mavro", "Maratheftiko"]},
  "Tsiakkas Winery": {"r": 2, "e": 2, "i": 2, "s": 37, "z": 450, "q": "Which nearly lost native red grows here?", "a": ["Yiannoudi", "Grenache", "Syrah"]},
  "Zambartas Wineries": {"r": 2, "e": 1, "i": 2, "s": 23, "z": 450, "q": "Which native red grape did this winery help revive?", "a": ["Maratheftiko", "Merlot", "Carignan"]},
  "Omodos": {"r": 1, "e": 1, "i": 2, "s": 16, "z": 600, "q": "What is the linos in the village?", "a": ["A wine press", "A wine jar", "A harvest dance"]},
  "Lambouri Winery": {"r": 2, "e": 1, "i": 1, "s": 64, "z": 450, "q": "Which range's southern slopes is this winery on?", "a": ["Troodos", "Kyrenia", "Akamas"]},
  "Commandaria villages": {"r": 2, "e": 1, "i": 3, "s": 14, "z": 9000, "q": "How many villages may produce Commandaria?", "a": ["14", "6", "30"]},
  "Domaine Hadjiantonas": {"r": 2, "e": 1, "i": 1, "s": 42, "z": 450, "q": "Which bay do the estate's hills look over?", "a": ["Limassol bay", "Larnaca bay", "Chrysochou Bay"]},
  "Vasilikon Winery": {"r": 2, "e": 1, "i": 2, "s": 19, "z": 450, "q": "Which plateau is this winery on?", "a": ["Laona", "Mesaoria", "Karpas"]},
  "Vouni Panayia Winery": {"r": 3, "e": 2, "i": 2, "s": 27, "z": 450, "q": "Which rare native grape did this winery bring back?", "a": ["Promara", "Riesling", "Assyrtiko"]},
  "Ezousa Winery": {"r": 3, "e": 2, "i": 1, "s": 38, "z": 450, "q": "Which two native grapes does Ezousa mainly work with?", "a": ["Maratheftiko and Xynisteri", "Merlot and Chardonnay", "Mavro and Shiraz"]},
  "Fikardos Winery": {"r": 2, "e": 1, "i": 1, "s": 55, "z": 450, "q": "Which traditional spirit is this winery known for?", "a": ["Zivania", "Ouzo", "Raki"]},
  "Akamas Peninsula": {"r": 2, "e": 2, "i": 3, "s": 57, "z": 6000, "q": "Where do boats to the Blue Lagoon leave from?", "a": ["Latchi", "Paphos harbour", "Limassol marina"]},
  "Aphrodite & Adonis Trails": {"r": 2, "e": 3, "i": 2, "s": 75, "z": 1500, "q": "Where do the two trails start?", "a": ["The Baths of Aphrodite", "Lara Bay", "Fontana Amorosa"]},
  "Avakas Gorge": {"r": 2, "e": 3, "i": 2, "s": 29, "z": 1300, "q": "Which rock is the gorge cut through?", "a": ["Limestone", "Granite", "Basalt"]},
  "Cedar Valley": {"r": 3, "e": 3, "i": 2, "s": 12, "z": 2000, "q": "Which wild sheep lives in the surrounding forest?", "a": ["Mouflon", "Ibex", "Chamois"]},
  "Artemis Trail": {"r": 2, "e": 2, "i": 3, "s": 52, "z": 1500, "q": "Which summit does the trail loop around?", "a": ["Chionistra", "Stavrovouni", "Tripylos"]},
  "Caledonia Waterfall": {"r": 1, "e": 2, "i": 2, "s": 12, "z": 1400, "q": "What is the river beside this trail called?", "a": ["Kryos Potamos", "Pedieos", "Ezousa"]},
  "Petra tou Romiou": {"r": 1, "e": 1, "i": 2, "s": 63, "z": 700, "q": "Who is said to have risen from the foam here?", "a": ["Aphrodite", "Artemis", "Athena"]},
  "Akrotiri Salt Lake": {"r": 2, "e": 1, "i": 2, "s": 3, "z": 3000, "q": "Which large birds stop here on migration, along with flamingos?", "a": ["Cranes", "Pelicans", "Storks"]},
  "Larnaca Salt Lake": {"r": 1, "e": 1, "i": 2, "s": 11, "z": 2500, "q": "Which pink birds spend the winter here?", "a": ["Greater flamingos", "Roseate spoonbills", "Scarlet ibises"]},
  "Cape Greco": {"r": 1, "e": 2, "i": 2, "s": 7, "z": 2500, "q": "What is the natural arch here called?", "a": ["Kamara tou Koraka", "Petra tou Romiou", "Moutti tis Sotiras"]},
  "Fikardou": {"r": 3, "e": 2, "i": 2, "s": 16, "z": 800, "q": "What are the houses here known for?", "a": ["Stone walls and wooden balconies", "Painted plaster domes", "Thatched roofs"]},
  "Kalopanagiotis": {"r": 2, "e": 2, "i": 2, "s": 70, "z": 1000, "q": "Which monastery stands here?", "a": ["St Ioannis Lampadistis", "Kykkos", "Stavrovouni"]},
  "Kakopetria": {"r": 1, "e": 2, "i": 2, "s": 9, "z": 900, "q": "Which festival is held here each September?", "a": ["The Sweet Preserves Festival", "The Cherry Festival", "The Pasteli Festival"]},
  "Pedoulas": {"r": 2, "e": 2, "i": 2, "s": 11, "z": 800, "q": "Which fruit has a festival named after it here?", "a": ["Cherries", "Mandarins", "Figs"]},
  "Foini": {"r": 2, "e": 2, "i": 2, "s": 92, "z": 800, "q": "Which craft is Foini famous for?", "a": ["Pottery", "Lace", "Glassblowing"]},
  "Laneia": {"r": 2, "e": 1, "i": 1, "s": 26, "z": 700, "q": "What is this village known for today?", "a": ["Its art scene", "Its salt pans", "Its carob mills"]},
  "Tochni": {"r": 2, "e": 1, "i": 1, "s": 33, "z": 700, "q": "What kind of houses line the village?", "a": ["Stone houses", "Mud-brick towers", "Timber chalets"]},
  "Alona": {"r": 3, "e": 2, "i": 1, "s": 44, "z": 800, "q": "Which two peaks is the village between?", "a": ["Madari and Papoutsa", "Chionistra and Tripylos", "Stavrovouni and Kyrenia"]},
  "Geroskipou": {"r": 1, "e": 1, "i": 2, "s": 95, "z": 1200, "q": "Which sweet is protected under the Geroskipou name?", "a": ["Loukoumi", "Pasteli", "Glydjista"]},
  "Anogyra": {"r": 2, "e": 2, "i": 2, "s": 9, "z": 800, "q": "What is pasteli made from?", "a": ["Carob honey", "Grape juice", "Almond milk"]},
  "Agros": {"r": 2, "e": 2, "i": 2, "s": 50, "z": 900, "q": "Which flower is Agros known for?", "a": ["Damask rose", "Orchid", "Cyclamen"]},
  "Koilani": {"r": 2, "e": 2, "i": 1, "s": 20, "z": 800, "q": "Which fried sweet is Koilani known for?", "a": ["Glydjista", "Loukoumades", "Baklava"]},
  "Arakapas": {"r": 3, "e": 1, "i": 1, "s": 70, "z": 1000, "q": "Which fruit is Arakapas known for?", "a": ["Mandarins", "Cherries", "Figs"]},
  "Lysos": {"r": 3, "e": 2, "i": 1, "s": 36, "z": 900, "q": "Which fruit are maxilles made from?", "a": ["Figs", "Apricots", "Plums"]},
  "Sotira": {"r": 2, "e": 1, "i": 1, "s": 16, "z": 1500, "q": "Which protected vegetable is named after Sotira?", "a": ["Kolokasi", "Artichoke", "Okra"]},
  "Limnatis": {"r": 3, "e": 2, "i": 1, "s": 14, "z": 800, "q": "Which nut is used in glyko amygdalou?", "a": ["Almonds", "Hazelnuts", "Walnuts"]}
};

/* =========================================================
   KYPROS GAME · trophies
   The rules behind the Trophy Room, shared by the map (game/game.js)
   and the Passport page (passport/). Nothing here touches the page:
   give it the saved state and a list of places, get back what is earned.
   A place is { name, mode, north, egg, stamp }, where stamp is the label
   it adds to its map's stamp row (a period, wine area, landscape and so on).
   ========================================================= */
window.KyprosTrophies = (() => {
  const STORY = ["Petra tou Romiou", "Sanctuary of Aphrodite", "Amathus", "Kition", "Aphrodite & Adonis Trails"];
  // c.been(name) and c.countMode(mode) are worked out from the saved visits
  const TROPHIES = [
    { id: "aphrodite", name: "Aphrodite Adventures", how: "Finish all five chapters", test: c => STORY.every(c.been) },
    { id: "huts", name: "First Farmers", how: "Visit Choirokoitia", test: c => c.been("Choirokoitia") },
    { id: "ingot", name: "The Copper Island", how: "Visit Kition", test: c => c.been("Kition") },
    { id: "walls", name: "Venetian Nicosia", how: "Visit the Venetian Walls", test: c => c.been("Venetian Walls of Nicosia") },
    { id: "commandaria", name: "Commandaria", how: "Visit the Commandaria villages", test: c => c.been("Commandaria villages") },
    { id: "xynisteri", name: "Native Grape", how: "Visit 3 wine places", test: c => c.countMode("wine") >= 3 },
    { id: "amphora", name: "Five Millennia", how: "Visit 5 wine places", test: c => c.countMode("wine") >= 5 },
    { id: "leafb", name: "Krasochoria", how: "Visit Omodos", test: c => c.been("Omodos") },
    { id: "avakas", name: "Avakas Gorge", how: "Walk Avakas Gorge", test: c => c.been("Avakas Gorge") },
    { id: "cedar", name: "Cedar Valley", how: "Visit Cedar Valley", test: c => c.been("Cedar Valley") }
  ];
  const WILD = [
    { id: "flamingo", name: "Flamingo Season", points: 777, how: "Check in at Larnaca Salt Lake between November and March",
      test: (p, now) => p.name === "Larnaca Salt Lake" && [10, 11, 0, 1, 2].includes(now.getMonth()) },
    { id: "firstlight", name: "First Light", points: 1111, how: "Check in at Petra tou Romiou around sunrise",
      test: (p, now) => p.name === "Petra tou Romiou" && Math.abs(now - sunrise(now, p.lat, p.lon)) <= 45 * 60e3 },
    { id: "triple", name: "Triple Lens", points: 1234, how: "Check in across any three filters in one day",
      test: (p, now, state) => new Set(state.log.filter(l => new Date(l.t).toDateString() === now.toDateString()).map(l => l.mode)).size >= 3 }
  ];
  const LAURELS = [{ n: 5, name: "Scholar" }, { n: 20, name: "Historian of Kypros" }, { n: 56, name: "Keeper of the Island" }];
  const STAMPS = [["history", "Periods"], ["wine", "Wine areas"], ["nature", "Landscapes"], ["villages", "Village life"], ["table", "Local foods"]];
  // Trophies and Wild Cards that have badge art in game/badges/
  const hasBadge = id => TROPHIES.some(t => t.id === id) || id === "flamingo" || id === "firstlight";

  // Sunrise for a date and place, using the standard almanac formula.
  function sunrise(d, lat, lon) {
    const rad = Math.PI / 180, wrap = (v, m) => ((v % m) + m) % m;
    const start = Date.UTC(d.getUTCFullYear(), 0, 0), day = Math.floor((d - start) / 864e5), lh = lon / 15, t = day + (6 - lh) / 24;
    const M = .9856 * t - 3.289, L = wrap(M + 1.916 * Math.sin(M * rad) + .02 * Math.sin(2 * M * rad) + 282.634, 360);
    let RA = wrap(Math.atan(.91764 * Math.tan(L * rad)) / rad, 360);
    RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15;
    const sinD = .39782 * Math.sin(L * rad), cosD = Math.cos(Math.asin(sinD));
    const cosH = (Math.cos(90.833 * rad) - sinD * Math.sin(lat * rad)) / (cosD * Math.cos(lat * rad));
    const H = (360 - Math.acos(cosH) / rad) / 15, UT = wrap(H + RA - .06571 * t - 6.622 - lh, 24);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) + UT * 36e5;
  }

  // Places that count towards the island %: scored, not in the north, and not a hidden easter egg
  const scorable = p => !!SCORING[p.name] && !p.north && !p.egg;
  const check = (state, places) => {
    const been = n => !!state.visits[n];
    return { been, countMode: m => places.filter(p => p.mode === m && been(p.name)).length };
  };
  const earned = (state, places) => { const c = check(state, places); return TROPHIES.filter(t => t.test(c)); };
  const total = state => Object.values(state.visits).reduce((s, v) => s + (v.points || 0), 0) + Object.values(state.wild).reduce((s, w) => s + (w.points || 0), 0);
  const laurels = state => Object.values(state.quiz || {}).filter(q => q && q.laurel).length;

  // Everything the Trophy Room shows
  function room(state, places) {
    const c = check(state, places), scored = places.filter(scorable), visited = scored.filter(p => c.been(p.name)).length;
    const nLaurels = laurels(state);
    const trophies = TROPHIES.map(t => ({ id: t.id, name: t.name, how: t.how, on: t.test(c) }));
    const wild = WILD.map(w => ({ id: w.id, name: w.name, how: w.how, points: w.points, on: !!state.wild[w.id] }));
    return {
      points: total(state), visited, of: scored.length,
      island: scored.length ? Math.round(visited / scored.length * 1000) / 10 : 0,
      collected: trophies.filter(t => t.on).length + Object.keys(state.wild).length, possible: TROPHIES.length + WILD.length,
      story: STORY.map(name => ({ name, on: c.been(name) })),
      trophies, wild,
      laurels: { count: nLaurels, of: scored.length, tiers: LAURELS.map(l => ({ ...l, on: nLaurels >= l.n })) },
      stamps: STAMPS.map(([mode, label]) => {
        const all = [...new Set(places.filter(p => p.mode === mode && scorable(p)).map(p => p.stamp))];
        const got = new Set(places.filter(p => p.mode === mode && c.been(p.name)).map(p => p.stamp));
        return { mode, label, items: all.map(s => ({ name: s, on: got.has(s) })) };
      })
    };
  }
  return { STORY, TROPHIES, WILD, LAURELS, sunrise, scorable, earned, total, laurels, hasBadge, room };
})();
