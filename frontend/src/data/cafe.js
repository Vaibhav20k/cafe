export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const IMAGES = {
  hero: "https://images.pexels.com/photos/16706997/pexels-photo-16706997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  storyBrass:
    "https://images.unsplash.com/photo-1758387941825-a6ecaec9c14d?auto=format&fit=crop&w=900&q=80",
  beans:
    "https://images.unsplash.com/photo-1606486544554-164d98da4889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxyb2FzdGVkJTIwY29mZmVlJTIwYmVhbnMlMjBkYXJrJTIwdGV4dHVyZXxlbnwwfHx8fDE3OTUzNTE1NTZ8MA&ixlib=rb-4.1.0&q=85",
  storyCraft:
    "https://images.unsplash.com/photo-1534234757579-8ad69d218ad4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxlc3ByZXNzbyUyMHBvdXIlMjBkYXJrJTIwY2FmZSUyMGxhdHRlJTIwYXJ0JTIwbW9vZHl8ZW58MHx8fHwxNzk1MzUxNTEwfDA&ixlib=rb-4.1.0&q=85",
  ritualSyphon:
    "https://images.pexels.com/photos/2159095/pexels-photo-2159095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ritualPour:
    "https://images.pexels.com/photos/19723762/pexels-photo-19723762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  steamPour:
    "https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  brassCups:
    "https://images.pexels.com/photos/16128085/pexels-photo-16128085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  interiorSunlit:
    "https://images.pexels.com/photos/39002703/pexels-photo-39002703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const CATEGORIES = [
  { id: "signature", label: "Signature Brews" },
  { id: "filter", label: "Estate Filters" },
  { id: "espresso", label: "Espresso Atelier" },
  { id: "cold", label: "Cold Extractions" },
  { id: "bakes", label: "Bakes & Plates" },
];

export const MENU_FALLBACK = [
  { id: "royal-kaapi-meter", name: "The Royal Kaapi Meter", dev: "शाही कापी", category: "signature", estate: "Chikmagalur Estate #44", price: 320, roast: "Medium-Dark", notes: "Wild Fig • Cacao Husk • Cardamom Blossom", tags: ["Signature", "Single-Origin"], desc: "Pulled through a brass davarah-tumbler from two feet up for micro-velvet froth." },
  { id: "kyoto-jaggery", name: "Smoked Jaggery Kyoto Drip", category: "signature", estate: "Monsooned Malabar Base", price: 380, roast: "Light", notes: "Palmyra Jaggery • Smoke • Dark Cherry", tags: ["Signature"], desc: "Twelve hours down the cold drip tower, sweetened with wild palmyra nectar." },
  { id: "malabar-aeropress", name: "Monsooned Malabar Aeropress", category: "signature", estate: "Malabar Coast Curing House", price: 340, roast: "Medium", notes: "Hazelnut • Cigar Leaf • Cocoa", tags: ["Signature", "Single-Origin"], desc: "Beans swollen by coastal monsoon winds, pressed slow and deliberate." },
  { id: "saffron-tonic", name: "Saffron & Pistachio Espresso Tonic", category: "signature", estate: "Baba Budangiri Washed", price: 420, roast: "Light-Medium", notes: "Saffron • Orange Oil • Pistachio", tags: ["Signature"], desc: "A double shot of washed espresso layered over house saffron tonic." },
  { id: "chikmagalur-795", name: "Chikmagalur Washed 795", category: "filter", estate: "Chikmagalur Estate #44", price: 280, roast: "Medium", notes: "Toffee • Tamarind • Star Anise", tags: ["Single-Origin", "V"], desc: "Our house filter expression. S95 selection, brewed on the brass syphon." },
  { id: "araku-honey", name: "Araku Valley Honey Sun-Dried", category: "filter", estate: "Araku Smallholder Collective", price: 300, roast: "Light", notes: "Apricot • Honeycomb • Jasmine", tags: ["Single-Origin", "V"], desc: "Honey-processed in the Eastern Ghats, dried on raised bamboo beds." },
  { id: "coorg-robusta", name: "Coorg Old-Parcel Robusta", category: "filter", estate: "Coorg Family Estate", price: 260, roast: "Dark", notes: "Bitter Cocoa • Spice Wood • Molasses", tags: ["V"], desc: "A Robusta we refuse to apologise for. Deep, unapologetic, very Indian." },
  { id: "espresso", name: "Espresso", category: "espresso", estate: "House Blend 01", price: 240, roast: "Medium-Dark", notes: "Bittersweet Cocoa • Caramel", tags: ["V"], desc: "The benchmark shot. 18g in, 36g out, 27 seconds of patience." },
  { id: "cardamom-cortado", name: "Cardamom Cortado", category: "espresso", estate: "House Blend 01", price: 300, roast: "Medium", notes: "Green Cardamom • Silk Milk", tags: ["V"], desc: "Equal parts espresso and steamed milk, perfumed with green cardamom." },
  { id: "baba-ristretto", name: "Baba Budangiri Ristretto", category: "espresso", estate: "Baba Budangiri Washed", price: 280, roast: "Medium", notes: "Dried Fig • Black Pepper", tags: ["Single-Origin", "V"], desc: "Short, intense, unhurried. From the hills where Indian coffee began." },
  { id: "cold-drip-drum", name: "18-Hour Cold Drip Drum", category: "cold", estate: "Chikmagalur Estate #44", price: 340, roast: "Light-Medium", notes: "Stone Fruit • Sugarcane • Chill Spice", tags: ["Single-Origin", "V"], desc: "One drop per second for eighteen hours. Nothing rushed survives here." },
  { id: "cardamom-cold-brew", name: "Cardamom Husk Cold Brew", category: "cold", estate: "Coorg Family Estate", price: 320, roast: "Medium", notes: "Cardamom Husk • Cola Nut", tags: ["V"], desc: "Steeped with spent cardamom husk from the spice market next door." },
  { id: "nitro-kaapi", name: "Nitro Kaapi", category: "cold", estate: "House Blend 01", price: 360, roast: "Medium-Dark", notes: "Velvet • Cocoa Nib • Cream", tags: ["V"], desc: "Filter kaapi charged with nitrogen. No milk, all velvet." },
  { id: "bun-maska", name: "Bun Maska, Elevated", category: "bakes", estate: "From the Irani tradition", price: 180, roast: null, notes: "House Pav • Cold-Churned Maska • Jaggery Dust", tags: ["V"], desc: "Soft bun, salted cold butter, a snowfall of jaggery." },
  { id: "jaggery-banana-cake", name: "Jaggery Banana Cake", category: "bakes", estate: "Baked each dawn", price: 240, roast: null, notes: "Ghee Crumb • Jaggery Glaze • Banana", tags: ["V"], desc: "Warm crumb and a dark jaggery glaze, sliced thick." },
  { id: "filter-affogato", name: "Filter Coffee Affogato", category: "bakes", estate: "House Blend 01", price: 300, roast: null, notes: "Vanilla Kulfi • Double Shot", tags: ["V"], desc: "Vanilla-bean kulfi drowned in a double espresso. Dessert as theatre." },
  { id: "mysore-toast", name: "Mysore Masala Toast", category: "bakes", estate: "From the Mysore bakery carts", price: 260, roast: null, notes: "Chilli • Cheese • Curry Leaf Butter", tags: ["V"], desc: "Chilli-cheese toast with curry-leaf butter. The 4pm legend." },
];

export const CATEGORY_IMAGES = {
  signature: IMAGES.steamPour,
  filter: IMAGES.storyBrass,
  espresso: IMAGES.storyCraft,
  cold: IMAGES.ritualPour,
  bakes: IMAGES.brassCups,
};

export const HOURS = [
  { day: "Monday", time: "07:30 — 23:00" },
  { day: "Tuesday", time: "07:30 — 23:00" },
  { day: "Wednesday", time: "07:30 — 23:00" },
  { day: "Thursday", time: "07:30 — 23:00" },
  { day: "Friday", time: "07:30 — 23:00" },
  { day: "Saturday", time: "08:00 — 23:30" },
  { day: "Sunday", time: "08:00 — 23:30" },
];

export const AMENITIES = [
  "Complimentary Fiber Wi-Fi",
  "Vinyl Listening Corner",
  "Pet-Friendly Courtyard",
  "Cupping Table Bookings",
  "Valet Available",
];

export const QUICK_PROMPTS = [
  "I want something sweet without refined sugar",
  "What is your highest caffeine brew?",
  "Best pairing for the monsoon season",
  "Explain Kaapi vs Flat White",
];

export const MENU_DISCLAIMER =
  "Demo menu — every item, price and origin is simulated for demonstration.";

export const CAFE = {
  name: "SARAI",
  address: "404 Fictional Spice Lane, Suite #00, Caravan Quarter, Demo City 560000",
  coords: "00.0000° N, 00.0000° E — ELEV 000M [DEMO COORDS]",
  phone: "+91 00000 00000 (Demo only)",
  mapsUrl: "https://maps.google.com/?q=fictional+demo+cafe",
};
