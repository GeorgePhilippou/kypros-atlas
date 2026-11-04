/* =========================================================
   KYPROS · start page slideshow: the list of places
   One entry per slide. The page picks today's slides from this list
   (see home/README.md for the photo spec and how the order is chosen).

   mode    the map it opens: history, wine, nature, villages or table
   place   the exact place name on that map, as in PLACES in index.html
   image   the photo, relative to home/ (own photos go in img/slides/)
   focus   the part of the photo to keep in view when it is cropped, as a
           CSS object-position, for example "50% 40%" (50% 50% is the centre)
   line    one short sentence: why go today
   months  optional, 1 to 12: only show the slide in these months
   ========================================================= */
window.KYPROS_SLIDES = [
  { mode: "history", place: "Tombs of the Kings", image: "img/slides/tombs-of-the-kings.jpg", focus: "50% 45%",
    line: "Walk down into courtyards cut from the rock, ringed with Doric columns." },
  { mode: "history", place: "Nea Paphos", image: "img/slides/paphos-odeon.jpg", focus: "45% 40%",
    line: "Sit in the stone odeon, then see the floor mosaics of the Roman houses." },
  { mode: "nature", place: "Akamas Peninsula", image: "img/slides/akamas-blue-lagoon.jpg", focus: "55% 60%",
    line: "Take a boat from Latchi to the clear water of the Blue Lagoon." },
  { mode: "nature", place: "Kelefos Bridge", image: "img/slides/kelefos-bridge.jpg", focus: "35% 50%", months: [10, 11, 12],
    line: "A Venetian bridge hidden in the forest, under plane trees turning gold." },
  { mode: "history", place: "Choirokoitia", image: "img/choirokoitia.jpg", focus: "50% 55%",
    line: "Step inside the round houses of a farming village from 7000 BC." },
  { mode: "history", place: "Kourion", image: "img/kourion.jpg", focus: "50% 50%",
    line: "A Greco-Roman theatre on a cliff, looking out over the sea." },
  { mode: "wine", place: "Omodos", image: "img/omodos.jpg", focus: "50% 50%",
    line: "Stone lanes, a monastery square and an old wine press in the hills." },
  { mode: "wine", place: "Commandaria villages", image: "img/commandaria-villages.jpg", focus: "50% 50%",
    line: "Taste the sweet wine the Knights made, in the villages that still make it." },
  { mode: "nature", place: "Larnaca Salt Lake", image: "img/larnaca-salt-lake.jpg", focus: "50% 50%", months: [11, 12, 1, 2, 3],
    line: "Greater flamingos are wintering on the lake right now." },
  { mode: "nature", place: "Cedar Valley", image: "img/cedar-valley.jpg", focus: "50% 50%",
    line: "Walk among the island's own cedars and watch for mouflon at dusk." }
];
