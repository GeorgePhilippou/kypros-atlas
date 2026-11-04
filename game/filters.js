/* =========================================================
   KYPROS GAME · Villages and Table filters
   Loaded before the atlas script, which merges this data in.
   Villages uses the Nature map and Table uses the Wine map, so these
   filters need no new terrain, fonts or road styles.

   Facts come from:
   - Deputy Ministry of Tourism: visitcyprus.com (Foini)
   - Cyprus government "20x21" traditional food booklet, 2025
   - tastecyprus.com.cy certified products list
   - cyprusalive.com and fastforward.com.cy village guides
   Village coordinates come from the atlas's data/base.json.
   ========================================================= */
const FILTERS = {
  modes: {
    villages: {
      label: "Villages", eyebrow: "Chorka · Hill and mountain villages", title: "Stone lanes and old crafts",
      blurb: "Quiet mountain villages of stone houses, wooden balconies, pottery workshops and festivals, far from the resort coast.",
      listTitle: "Villages", unit: "villages", theme: "nature", storyTitle: "Village life",
      trips: "Ready-made days through the villages, or tell us what you love and we'll fit the best stops into your time.",
      key: "village"
    },
    table: {
      label: "Table", eyebrow: "Trapezi · Food at its source", title: "Taste it where it's made",
      blurb: "Rose sweets from Agros, carob pasteli from Anogyra and loukoumi from Geroskipou. Every stop is tied to one village and what it makes.",
      listTitle: "Food villages", unit: "food villages", theme: "wine", storyTitle: "On the table",
      trips: "Ready-made food days, or tell us what you love and we'll fit the best stops into your time.",
      key: "table"
    }
  },
  icons: {
    villages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 20V11l6-4 6 4v9"/><path d="M15 20v-7l3-2 3 2v7M2 20h20M7.5 20v-4h3v4"/></svg>',
    table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="13" r="6.5"/><circle cx="12" cy="13" r="3"/><path d="M4 4v5M2.5 4v3.5a1.5 1.5 0 0 0 3 0V4M20 4v16"/></svg>'
  },
  kinds: {
    stone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10v11h6v-6h6v6h6V10Z"/></svg>',
    craft: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 3h8l-1.5 3c3.5 2 4.5 6 3 10-.7 2-1.8 4-3.5 5H10c-1.700-1-2.800-3-3.500-5-1.500-4-.5-8 3-10Z"/></svg>',
    peak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20 10 7l4 7 2-3 5 9Z"/></svg>'
  },
  keys: {
    village: [["stone", "Stone village"], ["craft", "Craft village"], ["peak", "Mountain village"]],
    table: ["Food village"]
  },
  places: {
    villages: [
      { name: "Fikardou", gr: "Φικάρδου", lat: 34.9596, lon: 33.1712, district: "Nicosia", tag: "Preserved village", kind: "stone", kindLabel: "Stone village", img: ["Fikardou"],
        desc: "A preserved village of stone homes with wooden balconies, with workshops for embroidery and silver-making." },
      { name: "Kalopanagiotis", gr: "Καλοπαναγιώτης", lat: 34.992, lon: 32.8281, district: "Nicosia", tag: "Marathasa Valley", kind: "peak", kindLabel: "Mountain village", img: ["Kalopanagiotis"],
        desc: "A Marathasa Valley village known for its thermal baths, with the Monastery of St Ioannis Lampadistis and a Venetian bridge." },
      { name: "Kakopetria", gr: "Κακοπετριά", lat: 34.9896, lon: 32.9032, district: "Nicosia", tag: "Riverside village", kind: "stone", kindLabel: "Stone village", img: ["Kakopetria"],
        desc: "Old stone-paved lanes and wooden balconies beside a river, with the church of Agios Nikolaos tis Stegis nearby." },
      { name: "Pedoulas", gr: "Πεδουλάς", lat: 34.9674, lon: 32.8288, district: "Nicosia", tag: "Cherry village", kind: "peak", kindLabel: "Mountain village", img: ["Pedoulas"],
        desc: "A mountain village at about 1,100 m, known for its Cherry Festival and the Church of the Archangel Michael." },
      { name: "Foini", gr: "Φοινί", lat: 34.8938, lon: 32.8381, district: "Limassol", tag: "Pottery village", kind: "craft", kindLabel: "Craft village", img: ["Foini"],
        desc: "A Troodos village at 920 m, famous for traditional pottery and local loukoumi, with workshops for both." },
      { name: "Laneia", gr: "Λάνεια", lat: 34.8249, lon: 32.9211, district: "Limassol", tag: "Artists' village", kind: "craft", kindLabel: "Craft village", img: ["Laneia"],
        desc: "A village known for its art scene, with studios, galleries and traditional stone houses around floral courtyards." },
      { name: "Tochni", gr: "Τόχνη", lat: 34.7799, lon: 33.3227, district: "Larnaca", tag: "Quiet stone village", kind: "stone", kindLabel: "Stone village", img: ["Tochni"],
        desc: "A quiet village of stone houses, with small workshops, heritage museums and homemade sweets." },
      { name: "Alona", gr: "Άλωνα", lat: 34.9338, lon: 33.04, district: "Nicosia", tag: "Between two peaks", kind: "peak", kindLabel: "Mountain village", img: ["Alona,_Cyprus"],
        desc: "A green village between the Madari and Papoutsa peaks, with cobbled lanes, restored stone houses and a nature trail." }
    ],
    table: [
      { name: "Geroskipou", gr: "Γεροσκήπου", lat: 34.7612, lon: 32.4527, district: "Paphos", tag: "Loukoumi and koufeta", kindLabel: "Food village", img: ["Geroskipou"],
        desc: "Home of protected Geroskipou loukoumi and sugar-coated koufeta almonds, made here since at least 1895." },
      { name: "Anogyra", gr: "Ανώγυρα", lat: 34.7398, lon: 32.7341, district: "Limassol", tag: "Carob and pasteli", kindLabel: "Food village", img: ["Anogyra"],
        desc: "Carob juice is boiled for hours into carob honey, then kneaded into pasteli. The village holds a Pasteli Festival each September." },
      { name: "Agros", gr: "Άγρος", lat: 34.9176, lon: 33.0184, district: "Limassol", tag: "Rose sweets and rosewater", kindLabel: "Food village", img: ["Agros"],
        desc: "Damask rose petals become a protected spoon sweet and rosewater in this Pitsilia village." },
      { name: "Koilani", gr: "Κοιλάνι", lat: 34.8445, lon: 32.8599, district: "Limassol", tag: "Glydjista", kindLabel: "Food village", img: ["Koilani"],
        desc: "Known for glydjista: dough pressed into shapes, fried, then finished with syrup or sugar, cinnamon and almonds. Also home to arkatena bread." },
      { name: "Arakapas", gr: "Αρακαπάς", lat: 34.8438, lon: 33.1136, district: "Limassol", tag: "Mandarins", kindLabel: "Food village", img: ["Arakapas"],
        desc: "Known for mandarins, harvested from December to March. The first tree is said to have been brought to Cyprus in 1870." },
      { name: "Lysos", gr: "Λύσος", lat: 34.9949, lon: 32.512, district: "Paphos", tag: "Maxilles figs", kindLabel: "Food village", img: ["Lysos"],
        desc: "Home of maxilles: figs ripened on the tree with olive oil, then wilted, halved, dried and dipped in fennel water." },
      { name: "Sotira", gr: "Σωτήρα", lat: 35.0267, lon: 33.9502, district: "Famagusta", tag: "Kolokasi", kindLabel: "Food village", img: ["Sotira,_Famagusta"],
        desc: "Gives its name to kolokasi Sotiras, a protected taro-type vegetable planted from February to April." },
      { name: "Limnatis", gr: "Λιμνάτης", lat: 34.8142, lon: 32.9485, district: "Limassol", tag: "Almond sweet", kindLabel: "Food village", img: ["Limnatis"],
        desc: "In the Kouris-Xylourikos area, where milled almonds become glyko amygdalou. A village fair shows how it's made." }
    ]
  },
  visit: {
    "Fikardou": { v: 1, must: 1, tags: ["stone", "crafts"], story: "Fikardou's stone homes and wooden balconies have kept the character of an old Cypriot village, and embroidery and silver-making workshops carry on its crafts.", see: ["Stone houses with wooden balconies", "Embroidery and silver workshops"] },
    "Kalopanagiotis": { v: 2, must: 1, tags: ["mountain", "faith"], story: "Thermal baths brought people to this Marathasa Valley village. Its Monastery of St Ioannis Lampadistis has frescoes, and a Venetian bridge survives nearby.", see: ["Monastery of St Ioannis Lampadistis", "The Venetian bridge", "Church of Panagia Theoskepasti"] },
    "Kakopetria": { v: 1.5, must: 1, tags: ["stone", "festivals"], story: "An old quarter of stone-paved lanes runs beside the river, and a Sweet Preserves Festival is held each September.", see: ["The old quarter", "Agios Nikolaos tis Stegis", "The riverside trail"] },
    "Pedoulas": { v: 1, tags: ["mountain", "festivals"], story: "At about 1,100 m, Pedoulas is known for its Cherry Festival, along with honey, cheese and homemade liqueurs.", see: ["The Church of the Archangel Michael", "The Church of the Holy Cross"] },
    "Foini": { v: 1.5, must: 1, tags: ["crafts"], story: "Foini is famous for traditional pottery and loukoumi, and visitors can attend workshops for making both. The Pilavakeion Museum is a private museum of folk art.", see: ["Pottery workshops", "Loukoumi workshops", "The Pilavakeion Museum"] },
    "Laneia": { v: 1, tags: ["crafts", "stone"], story: "Artists have made Laneia known for its studios and galleries, set among stone houses and colourful lanes.", see: ["Studios and galleries", "Floral courtyards"] },
    "Tochni": { v: 1, tags: ["stone"], story: "A quiet stop of stone houses, heritage museums and small workshops.", see: ["The heritage museums", "Small workshops"] },
    "Alona": { v: 1.5, tags: ["mountain"], story: "Set between the Madari and Papoutsa peaks, Alona has cobbled lanes and a nature trail that's especially colourful in spring.", see: ["The nature trail in spring", "Restored stone houses"] },
    "Geroskipou": { v: 1, must: 1, tags: ["sweets"], story: "Geroskipou's loukoumi and koufeta almonds both hold protected status. Sofocles Athanasiou began making them in 1895. Small factories here also make Pafos gum.", see: ["Loukoumi", "Koufeta almonds", "Pafos gum"] },
    "Anogyra": { v: 1, must: 1, tags: ["sweets", "harvest"], story: "Carob juice is boiled for hours into carob honey, then stirred and kneaded into pasteli. A Pasteli Festival is held here each September.", see: ["Pasteli", "Carob honey"] },
    "Agros": { v: 1, must: 1, tags: ["sweets", "harvest"], story: "Early-morning rose petals are distilled into rosewater here. Damask petals are also boiled with sugar and lemon juice into a protected spoon sweet.", see: ["Rosewater", "Rose spoon sweet"] },
    "Koilani": { v: 0.75, tags: ["sweets"], story: "Glydjista dough is pressed into shapes, fried, then drizzled with syrup or sprinkled with sugar, cinnamon and almonds. Koilani also shares the tradition of arkatena bread.", see: ["Glydjista", "Arkatena bread"] },
    "Arakapas": { v: 0.75, tags: ["harvest"], story: "Arakapas mandarins are harvested from December to March. Giousouf Efentis is credited with importing the original tree in 1870.", see: ["Mandarin season, December to March"] },
    "Lysos": { v: 0.75, tags: ["harvest"], story: "To make maxilles, figs ripen on the tree with olive oil, then they're wilted, halved, dried and dipped in fennel water.", see: ["Maxilles figs"] },
    "Sotira": { v: 0.75, tags: ["harvest"], story: "Kolokasi Sotiras is planted from February to April and harvested from September to May. Its edible parts are called mappes or poulles.", see: ["Kolokasi"] },
    "Limnatis": { v: 0.75, tags: ["sweets"], story: "Milled almonds are mixed with flavoured syrup and stored in jars to make glyko amygdalou. Limnatis's fair shows the method.", see: ["Glyko amygdalou", "The village fair"] }
  },
  interests: {
    villages: { stone: "Stone villages", crafts: "Living crafts", mountain: "Mountain air", festivals: "Festivals", faith: "Village churches" },
    table: { sweets: "Traditional sweets", harvest: "Harvests and produce" }
  },
  trips: {
    villages: [
      { n: "Marathasa and Solea", base: "troodos", stops: ["Pedoulas", "Kalopanagiotis", "Kakopetria"], d: "Three mountain villages of churches, thermal baths and riverside lanes." },
      { n: "Pottery and studios", base: "limassol", stops: ["Laneia", "Foini"], d: "Art studios in the foothills, then a pottery village high in the Troodos." },
      { n: "Pitsilia stone villages", base: "nicosia", stops: ["Fikardou", "Alona"], d: "A preserved village and a green valley between two peaks." }
    ],
    table: [
      { n: "Sweet Limassol hills", base: "limassol", stops: ["Limnatis", "Koilani", "Agros"], d: "Almond sweet, glydjista and rose sweets on one mountain drive." },
      { n: "Paphos flavours", base: "paphos", stops: ["Geroskipou", "Anogyra"], d: "Loukoumi and koufeta, then carob honey and pasteli." }
    ]
  }
};
