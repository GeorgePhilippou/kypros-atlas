/* =========================================================
   KYPROS GAME · quiz questions
   DRAFT questions drawn from the atlas's own text, for George and
   Emilios to approve. Each entry is [question, right answer, wrong, wrong].
   A five-question quiz adds each place's on-site question and a
   district question, both built automatically in game.js.
   ========================================================= */
const QUIZ = {
  "Choirokoitia": [
    ["When did the first villagers build here?", "Around 7000 BC", "Around 3000 BC", "Around 700 BC"],
    ["Where did the villagers bury their dead?", "Beneath the floors of their houses", "In tombs by the sea", "On the hilltop"],
    ["Which valley can you see from the site?", "The Maroni valley", "The Ezousa valley", "Cedar Valley"]],
  "Sanctuary of Aphrodite": [
    ["Which modern village stands at Palaepaphos?", "Kouklia", "Omodos", "Kathikas"],
    ["Which mosaic is a highlight here?", "Leda and the Swan", "The Triumph of Dionysos", "Orpheus and the Beasts"],
    ["Who also served as high priests here?", "The kings of Paphos", "The kings of Salamis", "The Roman governors"]],
  "Amathus": [
    ["Which side did Amathus take in the revolt of 499 BC?", "Persia", "The Greek cities", "It stayed neutral"],
    ["Where is the huge stone jar from its acropolis now?", "The Louvre", "The British Museum", "The Cyprus Museum"],
    ["What part of the city now lies underwater?", "Part of the harbour", "The acropolis", "The theatre"]],
  "Kourion": [
    ["Which bay does Kourion stand above?", "Episkopi Bay", "Chrysochou Bay", "Larnaca Bay"],
    ["What destroyed the city in the 4th century?", "Earthquakes", "A great fire", "An Arab raid"],
    ["Which house keeps 5th-century floor mosaics?", "House of Eustolios", "House of Dionysos", "House of Aion"]],
  "Nea Paphos": [
    ["Who ruled the island from here?", "The Ptolemies and Romans", "The Lusignans", "The Venetians"],
    ["Which saint is said to have been flogged nearby?", "St Paul", "St Barnabas", "St Lazarus"],
    ["Which castle is listed among its sights?", "Saranda Kolones", "Kolossi", "Kantara"]],
  "Kykkos Monastery": [
    ["Which emperor is linked to its founding?", "Alexios I Komnenos", "Justinian", "Leo VI"],
    ["Which icon does the monastery keep?", "An icon of the Virgin attributed to Saint Luke", "An icon of St Lazarus", "An icon of St Helena"],
    ["Where is the tomb of Makarios?", "At Throni", "In the monastery church", "In Nicosia"]],
  "Panagia tou Asinou": [
    ["When were the frescoes first painted?", "1105", "1332", "1571"],
    ["Whose donor portrait is in the church?", "Nikephoros", "Alexios", "Berengaria"],
    ["Which scene is a highlight fresco?", "The Dormition of the Virgin", "The Last Judgement of Kourion", "The Birth of Aphrodite"]],
  "Kolossi Castle": [
    ["Which knights ran estates from this keep?", "The Knights Hospitaller", "The Knights Templar", "The Teutonic Knights"],
    ["Which crop besides wine was made here?", "Sugar", "Cotton", "Silk"],
    ["What can you find above the door?", "A coat of arms", "A sundial", "A carved lion"]],
  "Venetian Walls of Nicosia": [
    ["When were the walls built?", "1567", "1191", "1878"],
    ["When did the city fall despite them?", "1570", "1489", "1660"],
    ["Which gate is a highlight of the walls?", "Famagusta Gate", "Paphos Gate of Limassol", "Lion Gate"]],
  "Hala Sultan Tekke": [
    ["Whose grave is at the heart of the shrine?", "Umm Haram", "Saint Lazarus", "Queen Berengaria"],
    ["In which year is she said to have died here?", "649", "1191", "1571"],
    ["Which birds feed on the lake in winter?", "Flamingos", "Pelicans", "Swans"]],
  "Tombs of the Kings": [
    ["Were kings actually buried here?", "No, the name comes from their grandeur", "Yes, the kings of Paphos", "Yes, the Ptolemies"],
    ["What are the finest tombs designed to copy?", "Houses", "Temples", "Ships"],
    ["For how long were families buried here?", "Six centuries", "Sixty years", "Two millennia"]],
  "Cyprus Museum": [
    ["In which year was the museum founded?", "1882", "1960", "1571"],
    ["Whose bronze statue is a highlight?", "Septimius Severus", "Augustus", "Alexander the Great"],
    ["What shape are its Chalcolithic figurines?", "Cross-shaped", "Star-shaped", "Ring-shaped"]],
  "Church of Agios Lazaros": [
    ["In which town does the church stand?", "Larnaca", "Limassol", "Paphos"],
    ["When was the tomb found?", "890", "1105", "1570"],
    ["Which emperor built the church?", "Leo VI", "Constantine", "Alexios I Komnenos"]],
  "Stavrovouni Monastery": [
    ["How high is the peak?", "690 m", "1,952 m", "140 m"],
    ["In which year is St Helena said to have come here?", "327", "890", "1100"],
    ["Who may enter the monastery?", "Only men", "Only women", "Only monks"]],
  "Kition": [
    ["Which people later ruled Kition?", "Phoenician kings", "Lusignan kings", "Ottoman governors"],
    ["Which goddess had a sanctuary here?", "Astarte", "Artemis", "Athena"],
    ["What happened to its old harbour?", "It silted up and lies inland", "It sank in an earthquake", "It became the marina"]],
  "Limassol Castle": [
    ["Who did Richard the Lionheart marry, by tradition?", "Berengaria of Navarre", "Eleanor of Aquitaine", "Isabella of Jerusalem"],
    ["Which museum is inside?", "The Cyprus Medieval Museum", "The Cyprus Museum", "The Wine Museum"],
    ["Who rebuilt most of the present castle?", "The Ottomans", "The British", "The Byzantines"]],
  "Lefkara": [
    ["What did the village's men traditionally work?", "Silver", "Copper", "Glass"],
    ["Who is said to have bought lace here in 1481?", "Leonardo da Vinci", "Marco Polo", "Richard the Lionheart"],
    ["Which list includes its lace craft?", "UNESCO's intangible heritage", "The Natura 2000 network", "The Ramsar list"]],
  "Ayia Napa Monastery": [
    ["What was found here before the monastery grew?", "A cave with an icon of the Virgin", "A Roman villa", "A hidden spring"],
    ["Which tree stands by the gate?", "An ancient sycamore", "An ancient olive", "A giant cedar"],
    ["What took its name from the monastery?", "The town", "The bay", "The island's wine"]],
  "Tamassos": [
    ["Which metal made this city rich?", "Copper", "Silver", "Tin"],
    ["Which ancient poet mentioned it?", "Homer", "Virgil", "Ovid"],
    ["When were the two royal tombs built?", "The 6th century BC", "The 2nd century AD", "The 12th century"]],
  "Kyperounda Winery": [
    ["At about what height are its vineyards?", "1,100 m", "300 m", "1,950 m"],
    ["Which wine area is it in?", "Pitsilia", "Laona", "Krasochoria"],
    ["What helps keep acidity in the grapes?", "Cool nights", "Sea breezes", "Early harvests"]],
  "Tsiakkas Winery": [
    ["Which village is this winery at?", "Pelendri", "Omodos", "Kathikas"],
    ["What kind of vineyards does it have?", "Steep terraces", "Coastal plains", "Riverside meadows"],
    ["Which church is nearby?", "The painted church of the Holy Cross", "Agios Lazaros", "Panagia tou Asinou"]],
  "Zambartas Wineries": [
    ["Who runs this winery?", "A father and son", "Two sisters", "A monastery"],
    ["Besides Maratheftiko, which native grape did it help revive?", "Lefkada", "Promara", "Yiannoudi"],
    ["Where did the son train?", "Australia", "France", "Greece"]],
  "Omodos": [
    ["Which monastery is the village built around?", "Timios Stavros", "Kykkos", "Stavrovouni"],
    ["Which wine area is Omodos in?", "Krasochoria", "Pitsilia", "Laona"],
    ["What was once true of every family here?", "Each made its own wine", "Each kept bees", "Each worked silver"]],
  "Lambouri Winery": [
    ["In which village is this winery?", "Kato Platres", "Pelendri", "Panayia"],
    ["Which wine area is it in?", "Krasochoria", "Pitsilia", "Ezousa valley"],
    ["What surrounds its tasting room?", "Pines and vines", "Lemon groves", "Sand dunes"]],
  "Commandaria villages": [
    ["Which two grapes make Commandaria?", "Xynisteri and Mavro", "Maratheftiko and Promara", "Yiannoudi and Lefkada"],
    ["How are the grapes prepared?", "Dried in the sun", "Frozen on the vine", "Smoked over oak"],
    ["In which month do grapes dry on roofs?", "September", "January", "April"]],
  "Domaine Hadjiantonas": [
    ["Where is this estate?", "In the hills above Limassol", "On the Laona plateau", "High in Pitsilia"],
    ["What kind of cellar does it have?", "A modern cellar", "A medieval cave", "A monastery crypt"],
    ["Which grape varieties does it make?", "Native and international", "Native only", "International only"]],
  "Vasilikon Winery": [
    ["Which white grape is it best known for?", "Xynisteri", "Promara", "Spourtiko"],
    ["Which red is listed among its highlights?", "Ayios Onoufrios", "Petritis", "Alina"],
    ["Which peninsula is it close to?", "Akamas", "Karpas", "Akrotiri"]],
  "Vouni Panayia Winery": [
    ["Which village is this winery in?", "Panayia", "Omodos", "Lefkara"],
    ["Who was born in this village?", "Archbishop Makarios", "Zeno of Kition", "St Barnabas"],
    ["Besides Promara, which rare grape did it revive?", "Spourtiko", "Yiannoudi", "Lefkada"]],
  "Ezousa Winery": [
    ["Which river valley is it in?", "Ezousa", "Kryos Potamos", "Maroni"],
    ["What kind of winery is it?", "A small family winery", "A large state cooperative", "A monastery cellar"],
    ["What are some of its Maratheftiko grapes from?", "Very old vines", "Coastal vines", "Imported vines"]],
  "Fikardos Winery": [
    ["Which town is it on the edge of?", "Paphos", "Limassol", "Larnaca"],
    ["What was notable about this winery's start?", "It was one of the first independent wineries", "It was founded by monks", "It was founded by the Lusignans"],
    ["Which white grape is it known for?", "Xynisteri", "Lefkada", "Yiannoudi"]],
  "Akamas Peninsula": [
    ["Which network protects this area?", "Natura 2000", "UNESCO World Heritage", "The Ramsar list"],
    ["Which clear-water spot do boats visit?", "The Blue Lagoon", "Konnos Bay", "Lady's Mile"],
    ["Which flowers grow here in spring?", "Rare orchids", "Wild tulips only", "Edelweiss"]],
  "Aphrodite & Adonis Trails": [
    ["About how long are the trails?", "7.5 km", "2 km", "25 km"],
    ["Which bay can you see from the ridge?", "Chrysochou Bay", "Larnaca Bay", "Episkopi Bay"],
    ["Which ruin does the Aphrodite trail pass?", "Pyrgos tis Rigainas", "Kolossi Castle", "Saranda Kolones"]],
  "Avakas Gorge": [
    ["What cut this gorge?", "A stream", "A glacier", "An earthquake"],
    ["Which endemic plant grows on the walls?", "Centaurea akamantis", "Cyprus cedar", "Troodos juniper"],
    ["What should you wear in spring?", "Shoes that can get wet", "Climbing harnesses", "Snow boots"]],
  "Cedar Valley": [
    ["Which forest is Cedar Valley in?", "Paphos Forest", "Troodos Forest", "Akamas Forest"],
    ["Which mountain does the path climb to?", "Mount Tripylos", "Chionistra", "Stavrovouni"],
    ["Where else do Cyprus cedars grow?", "Nowhere else", "Throughout Lebanon", "Across Crete"]],
  "Artemis Trail": [
    ["How long is the loop?", "7 km", "2 km", "20 km"],
    ["How high is the peak it circles?", "1,952 m", "690 m", "1,020 m"],
    ["Which ancient tree grows along it?", "Troodos juniper", "Cyprus cedar", "Oriental plane"]],
  "Caledonia Waterfall": [
    ["How tall is the waterfall?", "12 m", "3 m", "70 m"],
    ["What does Kryos Potamos mean?", "Cold river", "Long river", "Sacred river"],
    ["Which village is at the end of the trail?", "Platres", "Omodos", "Pelendri"]],
  "Petra tou Romiou": [
    ["Which road does this beach sit on?", "The coast road between Paphos and Limassol", "The road to Kykkos", "The Akamas track"],
    ["What is said to come from swimming around the rock?", "Eternal youth", "True love", "Good harvests"],
    ["What kind of beach is it?", "Pebble", "White sand", "Black sand"]],
  "Akrotiri Salt Lake": [
    ["What makes this lake stand out on the island?", "It's the largest inland water body", "It's the deepest", "It's the only freshwater lake"],
    ["When is the best time to visit?", "November to March", "June to August", "September only"],
    ["Which beach is listed beside it?", "Lady's Mile", "Konnos Bay", "Lara"]],
  "Larnaca Salt Lake": [
    ["What does it turn into in summer?", "White salt", "A green marsh", "A freshwater lake"],
    ["Which status does the wetland have?", "Ramsar site", "UNESCO World Heritage", "National monument"],
    ["What stands on its far shore?", "Hala Sultan Tekke", "Agios Lazaros", "Stavrovouni"]],
  "Cape Greco": [
    ["Where on the island is it?", "The south-eastern tip", "The north-western tip", "The Troodos summit"],
    ["What kind of park is it in?", "A national forest park", "A marine zoo", "A vineyard estate"],
    ["Which bay is listed among its sights?", "Konnos Bay", "Morphou Bay", "Episkopi Bay"]],
  "Fikardou": [["Which two crafts have workshops here?", "Embroidery and silver-making", "Pottery and glass", "Basketry and lace"], ["In which district is it?", "Nicosia", "Paphos", "Larnaca"], ["What can you see on its old houses?", "Wooden balconies", "Blue domes", "Tiled minarets"]],
  "Kalopanagiotis": [["Which valley is it in?", "Marathasa", "Ezousa", "Solea Plain of Larnaca"], ["What are its baths known for?", "Thermal water", "Sea water", "Salt mud"], ["Which old structure survives nearby?", "A Venetian bridge", "A Roman aqueduct", "An Ottoman fort"]],
  "Kakopetria": [["Which church is near the village?", "Agios Nikolaos tis Stegis", "Panagia tou Asinou", "Agios Lazaros"], ["What runs beside the old quarter?", "A river", "A canal", "A railway"], ["What are the old lanes paved with?", "Stone", "Brick", "Wood"]],
  "Pedoulas": [["At about what height is the village?", "1,100 m", "300 m", "1,952 m"], ["Which church is listed here?", "Archangel Michael", "Agios Lazaros", "Kykkos"], ["Which produce is it also known for?", "Honey and cheese", "Rice and salt", "Bananas and dates"]],
  "Foini": [["At what altitude is it?", "920 m", "120 m", "1,700 m"], ["Which sweet is it also known for?", "Loukoumi", "Pasteli", "Baklava"], ["What is the Pilavakeion Museum?", "A private museum of folk art", "A national war museum", "A wine museum"]],
  "Laneia": [["What can you visit around the lanes?", "Studios and galleries", "Salt pans", "Fish farms"], ["What surrounds its stone houses?", "Floral courtyards", "Moats", "Rice fields"], ["In which district is it?", "Limassol", "Famagusta", "Nicosia"]],
  "Tochni": [["What does the village have besides homes?", "Heritage museums and small workshops", "A marina and casino", "A ski lift"], ["What is it known as?", "A quiet village", "A surf resort", "A port city"], ["In which district is it?", "Larnaca", "Paphos", "Nicosia"]],
  "Alona": [["What runs through the area?", "A nature trail", "A motorway", "A railway"], ["When is the trail especially colourful?", "Spring", "Midwinter", "High summer"], ["What are its lanes paved with?", "Cobblestones", "Marble", "Red brick"]],
  "Geroskipou": [["What are koufeta?", "Sugar-coated almonds", "Fried doughnuts", "Dried figs"], ["When did Sofocles Athanasiou start production?", "1895", "1960", "1571"], ["Which gum is made in small factories here?", "Pafos gum", "Spruce gum", "Olive gum"]],
  "Anogyra": [["Which festival is held here?", "The Pasteli Festival", "The Cherry Festival", "The Sweet Preserves Festival"], ["When is the festival?", "September", "January", "April"], ["How long is carob juice boiled?", "For hours", "For seconds", "For several weeks"]],
  "Agros": [["Which area is Agros in?", "Pitsilia", "Laona", "Mesaoria"], ["When are petals collected for rosewater?", "Early morning", "Midnight", "Late afternoon"], ["What else is made from the petals?", "A spoon sweet", "A hard cheese", "A cured sausage"]],
  "Koilani": [["What can finish glydjista?", "Syrup or sugar, cinnamon and almonds", "Salt and rosemary", "Olive oil and thyme"], ["Which bread does it share with Omodos?", "Arkatena", "Pita", "Ciabatta"], ["How is glydjista dough cooked?", "Fried", "Boiled", "Sun-dried"]],
  "Arakapas": [["When are the mandarins harvested?", "December to March", "June to August", "Only in May"], ["When was the first tree brought to Cyprus?", "1870", "1571", "1960"], ["Who is credited with importing it?", "Giousouf Efentis", "Richard the Lionheart", "Zeno"]],
  "Lysos": [["What are the figs treated with on the tree?", "Olive oil", "Honey", "Vinegar"], ["What are maxilles dipped in?", "Fennel water", "Rosewater", "Red wine"], ["In which district is Lysos?", "Paphos", "Larnaca", "Famagusta"]],
  "Sotira": [["When is kolokasi planted?", "February to April", "August to October", "Only in June"], ["What are its edible parts called?", "Mappes or poulles", "Koufeta", "Maxilles"], ["What status does the name hold?", "Protected Designation of Origin", "UNESCO World Heritage", "Ramsar site"]],
  "Limnatis": [["What are the almonds mixed with?", "Flavoured syrup", "Sea salt", "Red wine"], ["How is the sweet stored?", "In jars", "In barrels", "In clay ovens"], ["Which area is it linked to?", "Kouris-Xylourikos", "Karpas", "Akamas"]]
};
