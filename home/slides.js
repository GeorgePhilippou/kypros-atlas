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
  { mode: "history", place: "Tombs of the Kings", image: "img/slides/tombs-of-the-kings.jpg", focus: "50% 50%",
    line: "Walk down into courtyards cut from the rock, ringed with Doric columns." },
  { mode: "history", place: "Nea Paphos", image: "img/slides/paphos-odeon.jpg", focus: "40% 45%",
    line: "Sit in the stone odeon, then see the floor mosaics of the Roman houses." },
  { mode: "nature", place: "Akamas Peninsula", image: "img/slides/akamas-blue-lagoon.jpg", focus: "55% 65%",
    line: "Take a boat from Latchi to the clear water of the Blue Lagoon." }
];
