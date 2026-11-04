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
  "Cape Greco": {"r": 1, "e": 2, "i": 2, "s": 7, "z": 2500, "q": "What is the natural arch here called?", "a": ["Kamara tou Koraka", "Petra tou Romiou", "Moutti tis Sotiras"]}
};
