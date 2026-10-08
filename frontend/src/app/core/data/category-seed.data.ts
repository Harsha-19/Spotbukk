import { EventCategory } from '../models/category.model';
import { EventItem } from '../models/event.model';

export const CATEGORIES_SEED_DATA: EventCategory[] = [
  {
    "id": "pool-party",
    "slug": "pool-party",
    "name": "Pool Party",
    "tagline": "Splash in. Stay for the vibes.",
    "description": "The sun is out, the playlist is loud and the water is calling. Our Pool Parties bring together great music, refreshing drinks, tasty snacks and a crowd that is ready to let loose. Whether you are a confident swimmer, a poolside lounger or someone who came mainly for the snacks and the photos, there is a spot for you. Think floating, splashing, dancing, party games and plenty of laughter. Our hosts keep things warm and inclusive, so no one is left standing awkwardly at the edge. Bring your best swimwear, a towel and your good mood, and leave with new friends and a camera roll full of summer.",
    "bannerImage": "/banners/pool-party.png",
    "featured": true,
    "order": 1
  },
  {
    "id": "trips",
    "slug": "trips",
    "name": "Trips",
    "tagline": "Pack light. Come back with a crew.",
    "description": "Some friendships need a little open road. SPOTBUKK Trips are curated getaways for people who would rather make memories than scroll through other people's. Pick a destination, grab your seat and travel with a group of like-minded strangers who stay strangers only until the first chai stop. Expect scenic drives, sunrise views, campfire chats and spontaneous detours that nobody planned but everybody remembers. We handle the planning, so all you need to bring is a charged phone, a comfy bag and an open heart. By the time the journey ends, the group chat will already be buzzing with inside jokes, and your gallery will prove that the best part of any trip is who you shared it with.",
    "bannerImage": "/banners/trips.png",
    "featured": true,
    "order": 2
  },
  {
    "id": "house-party",
    "slug": "house-party",
    "name": "House Party",
    "tagline": "Strangers at the door, family by midnight.",
    "description": "This is where the SPOTBUKK magic began. Our House Parties are cosy, vibe-packed gatherings in welcoming homes, with great music, good food, fun games and a guest list full of people who came to meet people. No velvet ropes, no awkward corners, just warm hosts and a room that feels like yours the moment you walk in. Come alone or bring a friend. Either way, you will be part of the conversation within minutes, and by the end of the night you will be exchanging numbers and planning the next one. Walk in a stranger and leave as family.",
    "bannerImage": "/banners/house-party.png",
    "featured": true,
    "order": 3
  },
  {
    "id": "college-fest",
    "slug": "college-fest",
    "name": "College Fest / Party",
    "tagline": "Campus energy, turned all the way up.",
    "description": "Remember how loud and alive campus life feels? Our College Fests and Parties bring that energy to one big celebration, with students from different colleges meeting, mixing and making memories. Expect live music, DJ sets, dance-offs, games, fun competitions and open-mic moments that give every talent a stage. It is a chance to step outside your own campus bubble, meet people from other colleges and collect friendships that last far beyond the semester. Bring your college ID, your squad and your loudest cheer, and get ready for a day or night that will be the first story you tell when someone asks about your college days.",
    "bannerImage": "/banners/college-fest.png",
    "featured": true,
    "order": 4
  },
  {
    "id": "farm-house-party",
    "slug": "farm-house-party",
    "name": "Farm House Party",
    "tagline": "Fresh air, loud laughter, zero city noise.",
    "description": "Trade traffic and tall buildings for open skies and green fields. Our Farm House Parties take the celebration out of the city and into a countryside setting where the music can play a little louder and the evening can stretch a little longer. Think bonfire circles, barbecue smoke, lawn games, dance floors under fairy lights and conversations that wander as freely as the breeze. It is the perfect reset for anyone who needs a break from screens and schedules. Come with friends or come alone, and by the time the stars are out you will be swapping stories like you have known everyone for years.",
    "bannerImage": "/banners/farm-house-party.png",
    "featured": true,
    "order": 5
  },
  {
    "id": "riders-collab-party",
    "slug": "riders-collab-party",
    "name": "Riders' Collab Party",
    "tagline": "For everyone who lives for the ride.",
    "description": "Calling all bikers, scooter gangs, cyclists and road warriors. The Riders' Collab Party brings different riding groups and clubs together under one roof for a night of stories, music and serious bonding. Swap route tips, show off your machines, talk gear and meet fellow riders who understand the pull of the open road. Expect good food, great tunes, friendly games and the kind of camaraderie that only happens when people who love the same thing finally meet. Ride safe, helmets on during the ride and no riding after drinking, then park up and enjoy the party. Who knows, your next riding crew might be waiting inside.",
    "bannerImage": "/banners/riders-collab-party.png",
    "featured": false,
    "order": 6
  },
  {
    "id": "supper-club",
    "slug": "supper-club",
    "name": "Supper Club",
    "tagline": "One table. Many stories.",
    "description": "Dinner tastes better when it comes with good company. At a SPOTBUKK Supper Club, strangers gather around one long table for a thoughtfully cooked, shared meal, hosted in cosy homes and special spaces. Between courses, light conversation starters and warm hosts help everyone open up, so you will never run out of things to talk about. Come hungry and curious. You will leave full of great food and with new friends who now know exactly which dish you went back for seconds on.",
    "bannerImage": "/banners/supper-club.png",
    "featured": false,
    "order": 7
  },
  {
    "id": "workshops",
    "slug": "workshops",
    "name": "Workshops",
    "tagline": "Learn something. Meet someone.",
    "description": "Our Workshops are hands-on sessions where you create, learn and laugh together. Led by friendly experts and passionate hosts, each session turns a new skill into a social experience, from creative crafts and art to cooking, music and more, depending on the weekend. No experience is needed, only curiosity. Working side by side on something you are making together is the fastest way to turn strangers into friends. You will walk away with a new skill, something you made with your own hands and a few new faces to share it with.",
    "bannerImage": "/banners/workshops.png",
    "featured": false,
    "order": 8
  },
  {
    "id": "pub-crawling",
    "slug": "pub-crawling",
    "name": "Pub Crawling",
    "tagline": "Many stops. One crew.",
    "description": "Why settle for one spot when you can enjoy several? Our guided Pub Crawls take you through a hand-picked line-up of the best pubs and bars, with a friendly group and a host leading the way. Each stop brings a new vibe, new music, fresh conversations and a few friendly challenges to keep the energy high. It is the easiest way to meet new people while discovering the city's nightlife. For guests of legal drinking age only. Please drink responsibly and plan a safe ride home, because the best nights end with everyone getting back safely.",
    "bannerImage": "/banners/pub-crawling.png",
    "featured": false,
    "order": 9
  },
  {
    "id": "jamming-karaoke",
    "slug": "jamming-karaoke",
    "name": "Jamming & Karaoke Night",
    "tagline": "Bring your voice. Or just your applause.",
    "description": "Whether you sing like a star or only in the shower, this night is for you. Our Jamming & Karaoke Night mixes live jam sessions with open karaoke, so musicians, singers and enthusiastic cheerleaders can all share the same stage. Grab a mic, pick your favourite song or join in on a jam, and let the crowd carry you. Nobody is judged here, and the louder you cheer for others, the louder they will cheer for you. Expect duets with strangers, surprise talent and sing-alongs that make you forget you ever felt shy.",
    "bannerImage": "/banners/jamming-karaoke.png",
    "featured": false,
    "order": 10
  },
  {
    "id": "street-food",
    "slug": "street-food",
    "name": "Street Food Hopping",
    "tagline": "Eat your way through the city.",
    "description": "Great food is often found on the street corner, not in a fancy restaurant. Join our Street Food Hopping walks as we explore the best local stalls, legendary snack spots and hidden gems that locals swear by. From steaming chai and crispy chaat to dosas, momos and sweet endings, every stop is a new flavour and a new story. Our hosts guide the route, share the history behind each bite and make sure everyone gets to taste the highlights. Wear comfy shoes, bring a big appetite and be ready to bond over the question of which stop was the best.",
    "bannerImage": "/banners/street-food.png",
    "featured": false,
    "order": 11
  },
  {
    "id": "indoor-games",
    "slug": "indoor-games",
    "name": "Indoor Games",
    "tagline": "Game on. No screens required.",
    "description": "Put the phones down and bring out the fun. Our Indoor Games sessions are packed with board games, card games, quizzes, charades and playful challenges that get everyone laughing and competing in the friendliest way. Join a team, pick a game and discover who is the sneakiest bluffer in the room. Games are a brilliant icebreaker, and you will find that rivalries turn into friendships quickly. Come ready to win, lose and laugh, with snacks and good company on the side.",
    "bannerImage": "/banners/indoor-games.png",
    "featured": false,
    "order": 12
  }
];

export const ALL_CATEGORY_EVENTS: EventItem[] = [
  {
    "id": "sunset-splash-pool-party",
    "slug": "sunset-splash-pool-party",
    "title": "Sunset Splash Pool Party",
    "edition": "CABANA EDITION",
    "subtitle": "Golden hour swim, tropical house grooves, and poolside cocktails.",
    "category": "Pool Party",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "3:00 PM \u2013 9:00 PM",
    "doorsOpen": "2:30 PM",
    "city": "Bengaluru",
    "venue": "Palm Cove Villa Pool",
    "address": "Palm Cove, Outer Ring Road, Whitefield, Bengaluru, KA 560066",
    "startingPrice": 799,
    "featured": true,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Resort Chic / Swimwear",
    "capacity": 120,
    "ticketsSold": 94,
    "heroImage": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "The sun is dipping, the bass is rolling, and the pool is sparkling. Sunset Splash brings together refreshing cocktails, poolside floaties, chilled beats, and warm company at an exclusive private pool in Whitefield. Dive in, grab a welcome drink, and celebrate summer vibes all evening long.",
    "highlights": [
      "Heated infinity pool access",
      "Tropical cocktail bar & fresh mocktails",
      "Sunset DJ set with live sax vibes",
      "Floating lounge pads & locker amenities"
    ],
    "lineup": [
      {
        "name": "DJ Anya Sol",
        "role": "Tropical Deep House",
        "time": "3:30 PM \u2013 6:30 PM"
      },
      {
        "name": "Zane & Percussion",
        "role": "Live Sunset Jam",
        "time": "6:30 PM \u2013 9:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ss-early",
        "name": "Early Splash Pass",
        "price": 799,
        "description": "Entry + 1 welcome cocktail + towel locker.",
        "perks": [
          "Guaranteed pool entry",
          "1 Signature pool cocktail",
          "Towel and change room access"
        ],
        "totalQuantity": 40,
        "availableQuantity": 6,
        "badge": "Almost Full"
      },
      {
        "id": "ss-regular",
        "name": "Regular Cabana Pass",
        "price": 999,
        "description": "Poolside access + 2 drink coupons + snack box.",
        "perks": [
          "Poolside access",
          "2 Craft beverage tokens",
          "Gourmet finger food tray"
        ],
        "totalQuantity": 80,
        "availableQuantity": 20,
        "badge": "Popular"
      }
    ],
    "rules": [
      "Government photo ID required (21+).",
      "Appropriate swimwear mandatory in the pool.",
      "No glassware allowed on the pool deck.",
      "Lockers provided; SpotBukk is not liable for lost belongings."
    ]
  },
  {
    "id": "neon-pool-nights",
    "slug": "neon-pool-nights",
    "title": "Neon Pool Nights",
    "edition": "AFTERGLOW SPECIAL",
    "subtitle": "UV lights, glowing floats, and electronic rhythm under the stars.",
    "category": "Pool Party",
    "date": "Sunday, 26 October 2026",
    "isoDate": "2026-10-26",
    "time": "6:00 PM \u2013 11:30 PM",
    "doorsOpen": "5:30 PM",
    "city": "Bengaluru",
    "venue": "The Oasis Clifftop Pool",
    "address": "80ft Road, 4th Block, Koramangala, Bengaluru, KA 560034",
    "startingPrice": 899,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Neon / Glowing Accents",
    "capacity": 100,
    "ticketsSold": 82,
    "heroImage": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "When darkness falls, the pool glows. Neon Pool Nights transforms an open-air Koramangala poolside into an electric playground featuring underwater illumination, neon face art, craft brew stations, and energizing electronic rhythms.",
    "highlights": [
      "Underwater LED illumination",
      "Free UV glow face & body paint",
      "Craft beer & seltzers on tap",
      "Night swim under ambient star ceiling"
    ],
    "lineup": [
      {
        "name": "EchoPulse",
        "role": "Melodic Techno & Nu-Disco",
        "time": "6:00 PM \u2013 9:00 PM"
      },
      {
        "name": "Kyra Vance",
        "role": "Peak Time Grooves",
        "time": "9:00 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "neon-single",
        "name": "Neon Entry Pass",
        "price": 899,
        "description": "Entry + neon accessories + 1 craft pour.",
        "perks": [
          "Night pool entry",
          "Free glow wristbands & accessories",
          "1 Welcome drink token"
        ],
        "totalQuantity": 60,
        "availableQuantity": 8,
        "badge": "Limited"
      },
      {
        "id": "neon-vip",
        "name": "VIP Poolside Deck",
        "price": 1299,
        "description": "Reserved poolside lounger + unlimited barbecue starters.",
        "perks": [
          "Reserved lounger",
          "Live barbecue station access",
          "2 Premium house beverages"
        ],
        "totalQuantity": 40,
        "availableQuantity": 10,
        "badge": "VIP"
      }
    ],
    "rules": [
      "21+ ID check at entry.",
      "Dry clothing required in indoor lounge areas.",
      "Life guard on duty; obey pool safety guidelines."
    ]
  },
  {
    "id": "sunday-pool-social",
    "slug": "sunday-pool-social",
    "title": "Sunday Pool Social",
    "edition": "BRUNCH & SWIM",
    "subtitle": "Laid-back acoustic morning sets, sangria pitches, and cool water.",
    "category": "Pool Party",
    "date": "Sunday, 2 November 2026",
    "isoDate": "2026-11-02",
    "time": "12:00 PM \u2013 5:30 PM",
    "doorsOpen": "11:30 AM",
    "city": "Bengaluru",
    "venue": "EcoLuxe Courtyard Pool",
    "address": "Phase 1, Electronic City, Bengaluru, KA 560100",
    "startingPrice": 699,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Casual Summer Wear",
    "capacity": 110,
    "ticketsSold": 58,
    "heroImage": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "The quintessential Sunday wind-down. Step away from city stress into clear turquoise waters with chilled pitchers of citrus sangria, fresh wood-fired flatbreads, and casual lawn games right by the pool edge.",
    "highlights": [
      "Sun loungers and shaded pergola cabanas",
      "Fresh sangria & artisanal juices",
      "Pool volleyball & giant Jenga",
      "Acoustic indie live set"
    ],
    "lineup": [
      {
        "name": "Varun & Meera Duo",
        "role": "Acoustic Pop & Soul",
        "time": "1:00 PM \u2013 3:30 PM"
      },
      {
        "name": "DJ Sunset Collective",
        "role": "Chilled Balearic Beats",
        "time": "3:30 PM \u2013 5:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "sps-entry",
        "name": "Social Splash Pass",
        "price": 699,
        "description": "Pool entry + welcome mimosa or craft brew.",
        "perks": [
          "Full pool and lawn access",
          "1 Welcome beverage",
          "Party games access"
        ],
        "totalQuantity": 70,
        "availableQuantity": 32,
        "badge": "Available"
      },
      {
        "id": "sps-brunch",
        "name": "Swim + Brunch Bundle",
        "price": 1099,
        "description": "Pool pass + all-you-can-eat woodfired brunch appetizers.",
        "perks": [
          "Priority daybed seating",
          "Woodfired flatbread & skewers buffet",
          "2 beverage tokens"
        ],
        "totalQuantity": 40,
        "availableQuantity": 20,
        "badge": "Best Value"
      }
    ],
    "rules": [
      "21+ age limit.",
      "Please bring personal towels or rent on site.",
      "Respect fellow guests in shared water zones."
    ]
  },
  {
    "id": "tropical-splash-session",
    "slug": "tropical-splash-session",
    "title": "Tropical Splash Session",
    "edition": "HORIZON VOL. 02",
    "subtitle": "Afro-house rhythms, poolside barbecues, and refreshing dip.",
    "category": "Pool Party",
    "date": "Saturday, 8 November 2026",
    "isoDate": "2026-11-08",
    "time": "2:00 PM \u2013 8:00 PM",
    "doorsOpen": "1:30 PM",
    "city": "Bengaluru",
    "venue": "North Haven Country Estate",
    "address": "Bellary Road, Near Yelahanka, North Bengaluru, KA 560064",
    "startingPrice": 849,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Tropical Brights / Linen",
    "capacity": 130,
    "ticketsSold": 102,
    "heroImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Escape to North Bengaluru's secluded palms for an afternoon steeped in Afro-house basslines, live barbecue grills, ice-cold cocktails, and vibrant poolside energy. Meet fellow music lovers in a breezy resort sanctuary.",
    "highlights": [
      "Private estate pool surrounded by palm groves",
      "Live smoky charcoal barbecue pit",
      "Afro-house DJ selector",
      "Cocktail bucket specials"
    ],
    "lineup": [
      {
        "name": "DJ Moheez",
        "role": "Afro House & Amapiano",
        "time": "2:30 PM \u2013 5:30 PM"
      },
      {
        "name": "Luna Rosa",
        "role": "Deep Melodic Rhythms",
        "time": "5:30 PM \u2013 8:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "tss-pass",
        "name": "General Admission",
        "price": 849,
        "description": "Full access to pool, barbecue area, and DJ floor.",
        "perks": [
          "Entry pass",
          "1 Welcome tropical cocktail",
          "Locker storage"
        ],
        "totalQuantity": 80,
        "availableQuantity": 16,
        "badge": "Selling Fast"
      },
      {
        "id": "tss-bbq",
        "name": "Barbecue & Splash Duo",
        "price": 1199,
        "description": "Pool pass + unlimited skewers plate + 2 drinks.",
        "perks": [
          "Barbecue platter included",
          "2 Drink tokens",
          "Pool towel provided"
        ],
        "totalQuantity": 50,
        "availableQuantity": 12,
        "badge": "Popular"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "No outside beverages allowed.",
      "Swim at your own risk; certified lifeguard present."
    ]
  },
  {
    "id": "coorg-weekend-escape",
    "slug": "coorg-weekend-escape",
    "title": "Coorg Weekend Escape",
    "edition": "MISTY HIGHLANDS",
    "subtitle": "Coffee plantations, waterfall hikes, bonfire jams, and new travel buddies.",
    "category": "Trips",
    "date": "Friday, 31 October \u2013 Sunday, 2 November 2026",
    "isoDate": "2026-10-31",
    "time": "Departure: Friday 10:00 PM (Return: Sunday 9:00 PM)",
    "doorsOpen": "Departure 9:30 PM",
    "city": "Bengaluru",
    "venue": "Madikeri Valley Plantation Stay",
    "address": "Pickup: Indiranagar Metro & Silk Board, Bengaluru to Madikeri, Coorg",
    "startingPrice": 3499,
    "featured": true,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "20+",
    "dressCode": "Comfortable Trekking & Warm Layers",
    "capacity": 30,
    "ticketsSold": 24,
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Pack light and hit the road to the Scotland of India. SPOTBUKK Trips brings together 30 travel-loving strangers on an AC coach to the misty hills of Coorg. Expect scenic sunrise viewpoint treks, fragrant coffee plantation walks, authentic Kodava meals, and late-night campfire music sessions where stories flow freely.",
    "highlights": [
      "Round-trip AC push-back bus travel from Bengaluru",
      "2 Nights shared estate cottage accommodation",
      "All meals included (Kodava traditional & veg options)",
      "Abbey Falls & Mandalpatti 4x4 Jeep trail",
      "Campfire & acoustic jam night"
    ],
    "lineup": [
      {
        "name": "Rohan & SPOTBUKK Crew",
        "role": "Trip Leads & Community Curators",
        "time": "Full Weekend"
      }
    ],
    "ticketTiers": [
      {
        "id": "coorg-shared",
        "name": "Shared Cottage Pass",
        "price": 3499,
        "description": "Travel + shared 3-person cottage stay + all meals + jeep safari.",
        "perks": [
          "Roundtrip AC coach",
          "Plantation estate stay",
          "All meals & snacks",
          "Jeep safari tickets"
        ],
        "totalQuantity": 20,
        "availableQuantity": 4,
        "badge": "Only 4 Spots"
      },
      {
        "id": "coorg-twin",
        "name": "Twin Sharing Room",
        "price": 4299,
        "description": "Twin sharing premium valley room + all inclusions.",
        "perks": [
          "Twin bed private room",
          "All meals & activities",
          "SpotBukk travel kit"
        ],
        "totalQuantity": 10,
        "availableQuantity": 2,
        "badge": "Last 2"
      }
    ],
    "rules": [
      "Valid government photo ID required at bus boarding.",
      "Punctuality required at pickup checkpoints.",
      "Inclusive & respectful community ethos.",
      "Cancellation permitted up to 72 hours before departure."
    ]
  },
  {
    "id": "chikmagalur-road-trip",
    "slug": "chikmagalur-road-trip",
    "title": "Chikmagalur Road Trip",
    "edition": "PEAK & PINES",
    "subtitle": "Mullayanagiri peak trek, estate stays, stargazing, and fresh mountain brew.",
    "category": "Trips",
    "date": "Friday, 7 November \u2013 Sunday, 9 November 2026",
    "isoDate": "2026-11-07",
    "time": "Departure: Friday 11:00 PM (Return: Sunday 8:00 PM)",
    "doorsOpen": "Departure 10:30 PM",
    "city": "Bengaluru",
    "venue": "Baba Budangiri Foothills Resort",
    "address": "Pickup: Koramangala Sony Signal & Yeshwanthpur Metro, Bengaluru",
    "startingPrice": 3299,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "20+",
    "dressCode": "Outdoor Gear & Windcheaters",
    "capacity": 28,
    "ticketsSold": 22,
    "heroImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Feel the elevation change as we cruise up Western Ghat serpentine roads. From standing above clouds at Mullayanagiri to cozying up around an evening fire with roasted marshmallows and acoustic tunes, this road trip is all about easy laughs and unforgettable vistas.",
    "highlights": [
      "Roundtrip luxury traveler bus from Bengaluru",
      "Private hill retreat stay with mountain valley balcony",
      "Guided Mullayanagiri morning hike",
      "Fresh estate coffee tasting and bean roasting session",
      "Barbecue dinner under starlight"
    ],
    "lineup": [
      {
        "name": "Akash 'Wanderer'",
        "role": "Trek Leader & Storyteller",
        "time": "Full Trip"
      }
    ],
    "ticketTiers": [
      {
        "id": "chik-pass",
        "name": "Explorer Pass",
        "price": 3299,
        "description": "AC bus + estate accommodation + meals + hike.",
        "perks": [
          "All travel & accommodation",
          "Breakfast, lunch, BBQ dinner",
          "Guided peak trek"
        ],
        "totalQuantity": 28,
        "availableQuantity": 6,
        "badge": "Limited"
      }
    ],
    "rules": [
      "Follow trek guide safety guidelines at all times.",
      "Leave No Trace policy: zero littering.",
      "Strictly 20+ age group."
    ]
  },
  {
    "id": "wayanad-explorer-trip",
    "slug": "wayanad-explorer-trip",
    "title": "Wayanad Explorer Trip",
    "edition": "BAMBOO CANOPY",
    "subtitle": "Dense rainforest trails, Chembra heart lake trek, and treehouse nights.",
    "category": "Trips",
    "date": "Friday, 14 November \u2013 Sunday, 16 November 2026",
    "isoDate": "2026-11-14",
    "time": "Departure: Friday 10:30 PM (Return: Sunday 9:30 PM)",
    "doorsOpen": "Departure 10:00 PM",
    "city": "Bengaluru",
    "venue": "Wayanad Eco Wilderness Retreat",
    "address": "Pickup: Silk Board Junction & Electronic City Toll Gate, Bengaluru",
    "startingPrice": 3699,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "20+",
    "dressCode": "Trail shoes & Rain Jacket",
    "capacity": 32,
    "ticketsSold": 18,
    "heroImage": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Cross the border into Kerala's lush Wayanad district. Breathe in mountain mist, trek up to the heart-shaped lake on Chembra Peak, explore ancient Edakkal caves, and bond with an energetic group of explorers around fragrant spice-garden tables.",
    "highlights": [
      "Comfortable AC coach journey through Bandipur forest corridor",
      "Eco-resort stay nestled between tea gardens",
      "Heart Lake Chembra guided trek",
      "Traditional Kerala Sadhya feast served on banana leaf",
      "Night bonfire with music games"
    ],
    "lineup": [
      {
        "name": "SPOTBUKK Expeditions",
        "role": "Certified Guides & Host",
        "time": "48 Hours"
      }
    ],
    "ticketTiers": [
      {
        "id": "way-reg",
        "name": "Standard Traveler Pass",
        "price": 3699,
        "description": "Travel, stay, forest permits, and full meals.",
        "perks": [
          "All-inclusive transport & stay",
          "Forest department permit fees",
          "Authentic Kerala meals"
        ],
        "totalQuantity": 32,
        "availableQuantity": 14,
        "badge": "Available"
      }
    ],
    "rules": [
      "Bandipur night traffic regulations apply (no loud music during forest stretch).",
      "ID proof needed for forest checkpoint.",
      "Bring warm jacket for night."
    ]
  },
  {
    "id": "gokarna-beach-escape",
    "slug": "gokarna-beach-escape",
    "title": "Gokarna Beach Escape",
    "edition": "COASTAL CAMPING",
    "subtitle": "Beach trekking, cliff sunset drum circles, and cafe hopping.",
    "category": "Trips",
    "date": "Thursday, 20 November \u2013 Sunday, 23 November 2026",
    "isoDate": "2026-11-20",
    "time": "Departure: Thursday 8:00 PM (Return: Sunday 7:00 AM)",
    "doorsOpen": "Departure 7:30 PM",
    "city": "Bengaluru",
    "venue": "Kudle Beach Campsite & Cottages",
    "address": "Pickup: Majestic Metro & Goraguntepalya, Bengaluru to Kudle Beach, Gokarna",
    "startingPrice": 4199,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Beachwear & Chill Fits",
    "capacity": 35,
    "ticketsSold": 30,
    "heroImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Trading traffic lights for crashing Arabian Sea waves. Hike across Om Beach, Half Moon Beach, and Paradise Beach, watch bioluminescent plankton sparkles in night tides, and share fresh seafood and chilled beers under coastal palm shacks.",
    "highlights": [
      "3-Beach trail hike (Om to Paradise Beach)",
      "Beachfront tent / cottage accommodation",
      "Sunset cliff drum circle & flow arts",
      "Seafood barbecue and bonfire night"
    ],
    "lineup": [
      {
        "name": "Suraj 'Wave'",
        "role": "Beach Host & Surfer",
        "time": "Long Weekend"
      }
    ],
    "ticketTiers": [
      {
        "id": "gok-beach",
        "name": "Beach Camp Pass",
        "price": 4199,
        "description": "Sleeper bus travel + beachside camping stay + breakfasts.",
        "perks": [
          "AC sleeper bus transit",
          "Beachfront tent stay",
          "Beach trek guide"
        ],
        "totalQuantity": 35,
        "availableQuantity": 5,
        "badge": "Last 5"
      }
    ],
    "rules": [
      "Swim only in designated lifeguard zones.",
      "Respect local temple town customs in Gokarna main street.",
      "21+ age limit."
    ]
  },
  {
    "id": "saturday-house-party",
    "slug": "saturday-house-party",
    "title": "Saturday House Party",
    "edition": "LIVING ROOM SESSIONS",
    "subtitle": "Craft cocktails, red cups, vinyl warmups, and lively conversation.",
    "category": "House Party",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "8:30 PM \u2013 2:30 AM",
    "doorsOpen": "8:00 PM",
    "city": "Bengaluru",
    "venue": "The Penthouse Loft",
    "address": "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 699,
    "featured": true,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Casual Chic",
    "capacity": 70,
    "ticketsSold": 58,
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Where the SPOTBUKK magic was born. An authentic Indiranagar penthouse house party without snooty bouncers or overpriced tables. Great speakers, warm lighting, homemade finger bites, beer pong in the balcony, and an open crowd ready to mingle.",
    "highlights": [
      "Curated guestlist capped strictly at 70 guests",
      "Craft cocktail punchbowl & mixers provided",
      "Balcony beer pong & board games lounge",
      "Vinyl warmup transitioning to late house beats"
    ],
    "lineup": [
      {
        "name": "DJ Rishi T",
        "role": "Indie Dance & Nu-Disco",
        "time": "9:30 PM \u2013 1:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "shp-single",
        "name": "Standard Entry",
        "price": 699,
        "description": "Entry + 2 drink coupons + unlimited party snacks.",
        "perks": [
          "Loft entry pass",
          "2 House pour tokens",
          "Party snacks buffet"
        ],
        "totalQuantity": 50,
        "availableQuantity": 8,
        "badge": "Few Left"
      },
      {
        "id": "shp-duo",
        "name": "Duo Pass (Pair)",
        "price": 1249,
        "description": "Entry for two guests + 4 drink tokens.",
        "perks": [
          "Entry for 2",
          "4 Drink tokens",
          "Priority check-in"
        ],
        "totalQuantity": 20,
        "availableQuantity": 4,
        "badge": "Popular"
      }
    ],
    "rules": [
      "21+ government photo ID required at the door.",
      "Address disclosed 6 hours prior to ticket holders.",
      "Respect host residence and property."
    ]
  },
  {
    "id": "rooftop-house-sessions",
    "slug": "rooftop-house-sessions",
    "title": "Rooftop House Sessions",
    "edition": "TERRACE & TONICS",
    "subtitle": "Open breeze terrace, deep melodic selections, and fairy-lit lounges.",
    "category": "House Party",
    "date": "Friday, 31 October 2026",
    "isoDate": "2026-10-31",
    "time": "8:00 PM \u2013 2:00 AM",
    "doorsOpen": "7:30 PM",
    "city": "Bengaluru",
    "venue": "Koramangala Terrace Villa",
    "address": "5th Block, Koramangala, Bengaluru, KA 560095",
    "startingPrice": 749,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Dark Florals / Smart Casual",
    "capacity": 65,
    "ticketsSold": 54,
    "heroImage": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "High above Koramangala's buzz, a private terrace transformed with warm festoon lights, low floor cushions, gin & tonic bar, and smooth deep melodic house grooves. Perfect for both deep chats and midnight dancing.",
    "highlights": [
      "Rooftop terrace overlooking canopy of trees",
      "Bespoke botanic gin & tonic bar",
      "Low seating conversation nooks",
      "Warm analog acoustic sound setup"
    ],
    "lineup": [
      {
        "name": "Ananya Roy",
        "role": "Deep Organic House",
        "time": "8:30 PM \u2013 11:30 PM"
      },
      {
        "name": "DJ Kael",
        "role": "Melodic Techno",
        "time": "11:30 PM \u2013 2:00 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "rhs-pass",
        "name": "Terrace Access Pass",
        "price": 749,
        "description": "Full terrace access + 2 craft cocktails.",
        "perks": [
          "Entry pass",
          "2 Crafted botanical cocktails",
          "Appetizer grazing table"
        ],
        "totalQuantity": 65,
        "availableQuantity": 11,
        "badge": "Limited"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "No smoking in interior bedrooms; terrace designated zone only.",
      "Keep corridor volume respectful when arriving."
    ]
  },
  {
    "id": "backyard-social-night",
    "slug": "backyard-social-night",
    "title": "Backyard Social Night",
    "edition": "GARDEN & GRILL",
    "subtitle": "Private garden lawn, craft brews, acoustic jams, and barbecue.",
    "category": "House Party",
    "date": "Saturday, 1 November 2026",
    "isoDate": "2026-11-01",
    "time": "7:00 PM \u2013 1:00 AM",
    "doorsOpen": "6:30 PM",
    "city": "Bengaluru",
    "venue": "The Garden Bungalow",
    "address": "Sector 4, HSR Layout, Bengaluru, KA 560102",
    "startingPrice": 649,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Cozy Autumn Casual",
    "capacity": 80,
    "ticketsSold": 48,
    "heroImage": "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Step into a lush private bungalow garden in HSR Layout. Savor fresh charcoal grilled skewers, clink beer bottles with newfound friends, and listen to acoustic covers under illuminated tree branches.",
    "highlights": [
      "Lawn garden setting with hammock and picnic tables",
      "Smoked charcoal grill on site",
      "Ice chests with chilled craft beers",
      "Acoustic open-jam session"
    ],
    "lineup": [
      {
        "name": "Neil & The Strings",
        "role": "Acoustic Pop & Rock",
        "time": "7:30 PM \u2013 10:00 PM"
      },
      {
        "name": "Groove Collective",
        "role": "Funk & Soul Selections",
        "time": "10:00 PM \u2013 1:00 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "bsn-entry",
        "name": "Garden Pass",
        "price": 649,
        "description": "Lawn access + 1 craft brew + BBQ starter.",
        "perks": [
          "Lawn entry",
          "1 Beverage coupon",
          "Barbecue skewer plate"
        ],
        "totalQuantity": 80,
        "availableQuantity": 32,
        "badge": "Available"
      }
    ],
    "rules": [
      "Strictly 21+.",
      "Zero tolerance for harassment.",
      "Lawn shoes recommended."
    ]
  },
  {
    "id": "weekend-house-vibes",
    "slug": "weekend-house-vibes",
    "title": "Weekend House Vibes",
    "edition": "HERITAGE MANOR",
    "subtitle": "Classic colonial villa setting, curated vinyl records, and signature cocktails.",
    "category": "House Party",
    "date": "Saturday, 8 November 2026",
    "isoDate": "2026-11-08",
    "time": "8:30 PM \u2013 3:00 AM",
    "doorsOpen": "8:00 PM",
    "city": "Bengaluru",
    "venue": "Lavelle Manor",
    "address": "Lavelle Road, Shanthala Nagar, Bengaluru, KA 560001",
    "startingPrice": 799,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Smart Monochrome",
    "capacity": 75,
    "ticketsSold": 62,
    "heroImage": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "A historic heritage villa in central Bengaluru opens its heavy wooden doors for an intimate house gathering. Soaring ceilings, vintage floor tiles, crafted house cocktails, and a musical journey spanning funk, disco, and deep grooves.",
    "highlights": [
      "Exclusive access to historic heritage residence",
      "Bar crafted by guest mixologists",
      "High fidelity sound system in drawing room",
      "Quiet veranda garden for late night conversations"
    ],
    "lineup": [
      {
        "name": "DJ Taran",
        "role": "Classic House & Rare Grooves",
        "time": "9:00 PM \u2013 2:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "whv-regular",
        "name": "Manor Guest Pass",
        "price": 799,
        "description": "Entry + 2 bespoke cocktail tokens.",
        "perks": [
          "Manor entry",
          "2 Mixologist cocktails",
          "Artisanal hors d'oeuvres"
        ],
        "totalQuantity": 75,
        "availableQuantity": 13,
        "badge": "Selling Fast"
      }
    ],
    "rules": [
      "21+ government photo ID mandatory.",
      "Strict RSVP only; no door walk-ins."
    ]
  },
  {
    "id": "campus-beats-night",
    "slug": "campus-beats-night",
    "title": "Campus Beats Night",
    "edition": "INTER-COLLEGE SPECIAL",
    "subtitle": "DJ battles, student bands, high-voltage dance-offs, and vibrant campus vibes.",
    "category": "College Fest / Party",
    "date": "Friday, 24 October 2026",
    "isoDate": "2026-10-24",
    "time": "5:30 PM \u2013 10:30 PM",
    "doorsOpen": "5:00 PM",
    "city": "Bengaluru",
    "venue": "The Arena Atrium",
    "address": "Residency Road, Near St. Joseph's, Central Bengaluru, KA 560025",
    "startingPrice": 399,
    "featured": true,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "18+",
    "dressCode": "Campus Casual / Sneakers",
    "capacity": 300,
    "ticketsSold": 245,
    "heroImage": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Calling students from Christ, St. Joseph's, Mount Carmel, PES, BMS, and across the city! Campus Beats Night unites college crews under massive sound rigs for an unforgettable night of live battle of the bands, student DJ sets, neon wristbands, and electrifying dance circles.",
    "highlights": [
      "3 Student DJ finalists face-off",
      "Live Battle of the Bands performance",
      "Neon wristbands & student crew photo booth",
      "Mocktail & street snack trucks on courtyard"
    ],
    "lineup": [
      {
        "name": "The Dorm Band",
        "role": "Indie Pop Rock",
        "time": "6:00 PM \u2013 7:30 PM"
      },
      {
        "name": "DJ Kabir (Christ Univ)",
        "role": "Commercial EDM & Bollywood",
        "time": "7:30 PM \u2013 9:00 PM"
      },
      {
        "name": "DJ Rhea",
        "role": "Bass & Hip-hop Hits",
        "time": "9:00 PM \u2013 10:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "cbn-student",
        "name": "Student Early Bird",
        "price": 399,
        "description": "Entry pass with valid college ID + free energy drink.",
        "perks": [
          "Entry pass",
          "1 Energy drink / Mocktail token",
          "Access to all stage zones"
        ],
        "totalQuantity": 200,
        "availableQuantity": 25,
        "badge": "Selling Fast"
      },
      {
        "id": "cbn-squad",
        "name": "Squad Pass (Group of 4)",
        "price": 1399,
        "description": "Entry for 4 friends + free fries platter.",
        "perks": [
          "Entry for 4 students",
          "Loaded fries platter voucher",
          "Skip the general entry queue"
        ],
        "totalQuantity": 25,
        "availableQuantity": 5,
        "badge": "Squad Saver"
      }
    ],
    "rules": [
      "Valid College Student ID + Government ID (18+) required at entry.",
      "Zero alcohol tolerance inside venue premises.",
      "Bags subject to security check."
    ]
  },
  {
    "id": "college-fest-after-dark",
    "slug": "college-fest-after-dark",
    "title": "College Fest After Dark",
    "edition": "AFTER DARK ANTHEMS",
    "subtitle": "The ultimate post-fest afterparty with top student DJs and club anthems.",
    "category": "College Fest / Party",
    "date": "Saturday, 1 November 2026",
    "isoDate": "2026-11-01",
    "time": "7:00 PM \u2013 12:00 AM",
    "doorsOpen": "6:30 PM",
    "city": "Bengaluru",
    "venue": "Koramangala Social Enclave",
    "address": "Koramangala Industrial Layout, 5th Block, Bengaluru, KA 560095",
    "startingPrice": 499,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "18+",
    "dressCode": "Streetwear / Bold Colors",
    "capacity": 250,
    "ticketsSold": 210,
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "When the college fest gates close, the real party begins! College Fest After Dark brings together students from every corner of town to dance without curfew stress. High energy, viral playlist bangers, laser lighting, and electric crowd vibes.",
    "highlights": [
      "Laser show and CO2 cannon drops",
      "Non-stop dance floor spanning hip-hop, EDM, and viral hits",
      "Photo booth with instant Polaroid prints",
      "Student discount food & beverage counters"
    ],
    "lineup": [
      {
        "name": "DJ Tejas",
        "role": "Club Hits & Remixes",
        "time": "7:30 PM \u2013 9:30 PM"
      },
      {
        "name": "DJ Shan",
        "role": "Trap, Dubstep & Bollywood",
        "time": "9:30 PM \u2013 12:00 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "cfad-pass",
        "name": "General Admission",
        "price": 499,
        "description": "Full access to the afterparty + 1 beverage coupon.",
        "perks": [
          "Entry pass",
          "1 Drink coupon",
          "Access to photo booth"
        ],
        "totalQuantity": 200,
        "availableQuantity": 30,
        "badge": "Limited"
      }
    ],
    "rules": [
      "College ID + Government ID (18+) required.",
      "Security frisking at entrance mandatory.",
      "No smoking inside main auditorium."
    ]
  },
  {
    "id": "inter-college-music-night",
    "slug": "inter-college-music-night",
    "title": "Inter-College Music Night",
    "edition": "ACOUSTIC & BARS",
    "subtitle": "Rap cyphers, open-mic poetry, acoustic duos, and budding indie singers.",
    "category": "College Fest / Party",
    "date": "Thursday, 6 November 2026",
    "isoDate": "2026-11-06",
    "time": "6:00 PM \u2013 10:30 PM",
    "doorsOpen": "5:30 PM",
    "city": "Bengaluru",
    "venue": "Church Street Loft Studio",
    "address": "Church Street, Off Brigade Road, Bengaluru, KA 560001",
    "startingPrice": 349,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "18+",
    "dressCode": "Comfortable Indie Casual",
    "capacity": 150,
    "ticketsSold": 88,
    "heroImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "A cozy, supportive space where student talent shines. Whether it's college rappers dropping bilingual verses, indie acoustic duos harmonizing, or spoken-word artists, this night is built around cheering loud and discovering campus prodigies.",
    "highlights": [
      "15 Pre-registered student artists performing",
      "Open-mic cypher circle during intermission",
      "Cozy floor seating with fairy lights",
      "Hot chai and baked cookies corner"
    ],
    "lineup": [
      {
        "name": "Campus Indie Collective",
        "role": "Acoustic Showcase",
        "time": "6:30 PM \u2013 8:30 PM"
      },
      {
        "name": "Bangalore Cypher Crew",
        "role": "Underground Hip-hop Showcase",
        "time": "8:30 PM \u2013 10:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "icmn-pass",
        "name": "Spectator Pass",
        "price": 349,
        "description": "Entry + hot beverage + voting token for audience choice award.",
        "perks": [
          "Entry pass",
          "Artisanal chai / coffee token",
          "Audience voting coin"
        ],
        "totalQuantity": 150,
        "availableQuantity": 62,
        "badge": "Available"
      }
    ],
    "rules": [
      "College student ID mandatory.",
      "Maintain quiet during acoustic vocal sets.",
      "Support every performer with kindness."
    ]
  },
  {
    "id": "campus-carnival",
    "slug": "campus-carnival",
    "title": "Campus Carnival",
    "edition": "FALL FIESTA",
    "subtitle": "Carnival games, thrifting stalls, food trucks, and sunset DJ groove.",
    "category": "College Fest / Party",
    "date": "Saturday, 15 November 2026",
    "isoDate": "2026-11-15",
    "time": "2:00 PM \u2013 9:00 PM",
    "doorsOpen": "1:30 PM",
    "city": "Bengaluru",
    "venue": "North Campus Grounds",
    "address": "Ring Road, Near Hebbal Lake, North Bengaluru, KA 560024",
    "startingPrice": 449,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "18+",
    "dressCode": "Carnival Colors / Y2K",
    "capacity": 350,
    "ticketsSold": 195,
    "heroImage": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "A full day outdoor festival designed by and for university students. Over 20 student-run thrift and art booths, ring toss and giant darts, momo and burger trucks, followed by an open-sky sunset DJ party as evening cools down.",
    "highlights": [
      "Student flea market with vintage clothes & art",
      "Interactive carnival game booths with prizes",
      "6 Food and dessert truck pop-ups",
      "Sunset electronic music stage"
    ],
    "lineup": [
      {
        "name": "DJ Tanvi",
        "role": "Pop & UK Garage",
        "time": "4:00 PM \u2013 6:30 PM"
      },
      {
        "name": "Neon Bass Crew",
        "role": "Festival EDM",
        "time": "6:30 PM \u2013 9:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "cc-pass",
        "name": "Carnival Entry Pass",
        "price": 449,
        "description": "Entry + 3 carnival game tokens + food coupon.",
        "perks": [
          "All-day grounds access",
          "3 Free game coupons",
          "Rs 100 food truck voucher"
        ],
        "totalQuantity": 350,
        "availableQuantity": 155,
        "badge": "Available"
      }
    ],
    "rules": [
      "College student ID required.",
      "External food and beverages not permitted.",
      "Recycle plastic at green bins."
    ]
  },
  {
    "id": "sunset-farm-house-party",
    "slug": "sunset-farm-house-party",
    "title": "Sunset Farm House Party",
    "edition": "COUNTRYSIDE SUNSET",
    "subtitle": "Open skies, lush orchard lawns, woodsmoke BBQ, and dancing under fairy lights.",
    "category": "Farm House Party",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "4:00 PM \u2013 11:30 PM",
    "doorsOpen": "3:30 PM",
    "city": "Bengaluru",
    "venue": "Green Pastures Farm Estate",
    "address": "Kanakapura Road, 25km from Metro, Bengaluru South, KA 560062",
    "startingPrice": 899,
    "featured": true,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Boho / Country Chic",
    "capacity": 140,
    "ticketsSold": 118,
    "heroImage": "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Trade city noise for green horizons. A 5-acre rustic farm estate off Kanakapura Road opens up for an open-air sunset gathering. Sip craft beer under mango groves, compete in lawn bocce ball, and gather around the roaring bonfire as DJ basslines blend with cool night breezes.",
    "highlights": [
      "5-Acre private mango orchard estate",
      "Rustic charcoal barbecue & clay oven pizzas",
      "Roaring bonfire circle with acoustic jam",
      "Open lawn dance floor under warm festoon canopy"
    ],
    "lineup": [
      {
        "name": "DJ Samar",
        "role": "Deep Organic & Afro House",
        "time": "5:00 PM \u2013 8:30 PM"
      },
      {
        "name": "The Firewood Jam",
        "role": "Live Percussion & Guitar",
        "time": "8:30 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "sfhp-entry",
        "name": "Farmstead Pass",
        "price": 899,
        "description": "Estate entry + 1 craft brew + BBQ tasting plate.",
        "perks": [
          "Estate entry",
          "1 Beverage token",
          "Live BBQ skewer tasting",
          "Bonfire access"
        ],
        "totalQuantity": 90,
        "availableQuantity": 12,
        "badge": "Selling Fast"
      },
      {
        "id": "sfhp-bbq",
        "name": "Bonfire & Feast Pass",
        "price": 1299,
        "description": "Full access + unlimited barbecue skewers & 2 drinks.",
        "perks": [
          "All-you-can-eat barbecue platter",
          "2 Drink coupons",
          "Reserved gazebo seating"
        ],
        "totalQuantity": 50,
        "availableQuantity": 10,
        "badge": "Popular"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Ample secure parking available on premises.",
      "Respect nature and farm animals; designated bonfire zones only."
    ]
  },
  {
    "id": "weekend-countryside-bash",
    "slug": "weekend-countryside-bash",
    "title": "Weekend Countryside Bash",
    "edition": "RUSTIC ESCAPE",
    "subtitle": "Tractor rides, swimming pool dip, country games, and sunset cocktails.",
    "category": "Farm House Party",
    "date": "Sunday, 2 November 2026",
    "isoDate": "2026-11-02",
    "time": "1:00 PM \u2013 9:00 PM",
    "doorsOpen": "12:30 PM",
    "city": "Bengaluru",
    "venue": "Nelamangala Heritage Farm",
    "address": "NH 48, Nelamangala Outskirts, Bengaluru Rural, KA 562123",
    "startingPrice": 799,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Casual Outdoor / Denims",
    "capacity": 150,
    "ticketsSold": 96,
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Escape to Nelamangala's scenic countryside for a breezy Sunday bash. Splash in the stone-paved plunge pool, play frisbee on boundless grass fields, sip chilled cider, and dance as the sun sets over distant rocky hills.",
    "highlights": [
      "Stone-paved farm plunge pool",
      "Frisbee, cricket, and tug-of-war lawn games",
      "Fresh farm-to-table lunch & evening snacks",
      "Sunset acoustic sets and chilled electronic beats"
    ],
    "lineup": [
      {
        "name": "The Country Sound Project",
        "role": "Folk Rock & Acoustic",
        "time": "2:30 PM \u2013 5:30 PM"
      },
      {
        "name": "DJ Vikram",
        "role": "Nu-Disco & House",
        "time": "5:30 PM \u2013 9:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "wcb-pass",
        "name": "Country Day Pass",
        "price": 799,
        "description": "Full day farm access + welcome cider + buffet lunch.",
        "perks": [
          "Farm & pool access",
          "Country buffet lunch",
          "1 Welcome cider / beer"
        ],
        "totalQuantity": 150,
        "availableQuantity": 54,
        "badge": "Available"
      }
    ],
    "rules": [
      "21+ entry.",
      "Bring change of clothes for plunge pool.",
      "Designated driver recommended or carpool."
    ]
  },
  {
    "id": "bonfire-bbq-night",
    "slug": "bonfire-bbq-night",
    "title": "Bonfire & BBQ Night",
    "edition": "STARLIT WOODS",
    "subtitle": "Roaring fire pit, live grills, acoustic circle, and stargazing.",
    "category": "Farm House Party",
    "date": "Saturday, 8 November 2026",
    "isoDate": "2026-11-08",
    "time": "6:00 PM \u2013 12:30 AM",
    "doorsOpen": "5:30 PM",
    "city": "Bengaluru",
    "venue": "Sarjapur Woods Farm Villa",
    "address": "Sarjapur-Attibele Road, Bengaluru Outskirts, KA 562125",
    "startingPrice": 949,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Warm Layers & Boots",
    "capacity": 110,
    "ticketsSold": 92,
    "heroImage": "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Under a clear canopy of winter stars, gather around a 10-foot stone fire pit in the wooded quiet of Sarjapur. Smoky barbecue meats and charred paneer, spiced mulled wine, acoustic guitar sing-alongs, and late-night stargazing.",
    "highlights": [
      "Giant central stone fire pit with firewood logs",
      "Live smokey barbecue grills with chef specials",
      "Hot spiced mulled wine & bourbon cocktails",
      "Telescope setup for moon and planet viewing"
    ],
    "lineup": [
      {
        "name": "Arjun & The Campers",
        "role": "Folk & Classic Sing-Alongs",
        "time": "7:00 PM \u2013 10:00 PM"
      },
      {
        "name": "DJ Zubin",
        "role": "Ambient & Organic Downtempo",
        "time": "10:00 PM \u2013 12:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "bbq-fire",
        "name": "Fire & Feast Pass",
        "price": 949,
        "description": "Entry + barbecue dinner plate + 1 mulled wine / cocktail.",
        "perks": [
          "Entry & bonfire seat",
          "Gourmet BBQ plate",
          "1 Spiced cocktail / beer"
        ],
        "totalQuantity": 110,
        "availableQuantity": 18,
        "badge": "Limited"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Keep safe distance from active fire pits.",
      "Outdoor warm clothing advised."
    ]
  },
  {
    "id": "farm-vibes-social",
    "slug": "farm-vibes-social",
    "title": "Farm Vibes Social",
    "edition": "ORCHARD GROOVE",
    "subtitle": "Relaxed daybed loungers, artisanal beers, and sunset lawn party.",
    "category": "Farm House Party",
    "date": "Sunday, 16 November 2026",
    "isoDate": "2026-11-16",
    "time": "3:00 PM \u2013 10:00 PM",
    "doorsOpen": "2:30 PM",
    "city": "Bengaluru",
    "venue": "Devanahalli Rustic Estate",
    "address": "Devanahalli-Doddaballapur Highway, Bengaluru North, KA 562110",
    "startingPrice": 849,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Linen & Earth Tones",
    "capacity": 130,
    "ticketsSold": 74,
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Escape northern city limits into a sprawling estate dotted with guava and eucalyptus trees. Daybed loungers, artisanal beer kegs, lawn games, and warm sunset grooves as the weekend winds down gracefully.",
    "highlights": [
      "Shaded orchard lawns with daybeds and hammocks",
      "Local microbrewery tap takeover",
      "Artisanal cheese & charcuterie board pop-up",
      "Sunset chillout DJ set"
    ],
    "lineup": [
      {
        "name": "DJ Pranav",
        "role": "Sunset Chill & Melodic",
        "time": "4:00 PM \u2013 7:30 PM"
      },
      {
        "name": "Sound of Dusk",
        "role": "Deep House Rhythms",
        "time": "7:30 PM \u2013 10:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "fvs-pass",
        "name": "Social Day Pass",
        "price": 849,
        "description": "Estate entry + 2 craft pours + grazing snacks.",
        "perks": [
          "Orchard lawn access",
          "2 Craft beverage tokens",
          "Artisanal snack platter"
        ],
        "totalQuantity": 130,
        "availableQuantity": 56,
        "badge": "Available"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Respect estate flora and grounds."
    ]
  },
  {
    "id": "highways-headlights-social",
    "slug": "highways-headlights-social",
    "title": "Highways & Headlights Social",
    "edition": "THROTTLE NIGHT",
    "subtitle": "Bikers, cruisers, gear talk, smoky barbecue, and live rock anthems.",
    "category": "Riders' Collab Party",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "6:00 PM \u2013 11:30 PM",
    "doorsOpen": "5:30 PM",
    "city": "Bengaluru",
    "venue": "Highway Pitstop Yard",
    "address": "Airport Road, Near Devanahalli Toll, Bengaluru, KA 562110",
    "startingPrice": 599,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Leather, Denim & Riding Gear",
    "capacity": 180,
    "ticketsSold": 150,
    "heroImage": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Calling all Enfield thumps, KTM purrs, Triumph twins, and superbike roars. Highways & Headlights brings multiple riding clubs together for an electric evening of route sharing, custom motorcycle displays, juicy pitstop burgers, and high-energy classic rock.",
    "highlights": [
      "Dedicated VIP motorcycle parking and showcase pad",
      "Custom bike showcase & best exhaust contest",
      "Smoky burger and rib station",
      "Classic rock and heavy blues live band"
    ],
    "lineup": [
      {
        "name": "The Pistons",
        "role": "Classic & Southern Rock",
        "time": "7:00 PM \u2013 9:30 PM"
      },
      {
        "name": "DJ Revv",
        "role": "Heavy Grooves & Rock Remixes",
        "time": "9:30 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "hhs-rider",
        "name": "Rider Pass",
        "price": 599,
        "description": "Bike entry + dedicated bay + burger combo + 1 beverage.",
        "perks": [
          "Secure bike bay",
          "Pitstop burger & fries",
          "1 Drink token",
          "Rider sticker pack"
        ],
        "totalQuantity": 150,
        "availableQuantity": 20,
        "badge": "Selling Fast"
      },
      {
        "id": "hhs-pillion",
        "name": "Rider + Pillion Pass",
        "price": 999,
        "description": "Pass for 2 riders/pillions + 2 food combos + drinks.",
        "perks": [
          "Entry for 2",
          "2 Meal combos",
          "2 Drink coupons"
        ],
        "totalQuantity": 30,
        "availableQuantity": 10,
        "badge": "Duo"
      }
    ],
    "rules": [
      "Helmets strictly mandatory during the ride to venue.",
      "No drinking and riding; zero tolerance.",
      "Designate a safe ride home if consuming alcohol."
    ]
  },
  {
    "id": "twisted-throttle-bikers-night",
    "slug": "twisted-throttle-bikers-night",
    "title": "Twisted Throttle Bikers Night",
    "edition": "NANDI FOOTHILLS",
    "subtitle": "Scenic sunset ride culmination, bonfire tales, and garage rock.",
    "category": "Riders' Collab Party",
    "date": "Saturday, 8 November 2026",
    "isoDate": "2026-11-08",
    "time": "5:30 PM \u2013 11:00 PM",
    "doorsOpen": "5:00 PM",
    "city": "Bengaluru",
    "venue": "Nandi Valley Outpost",
    "address": "Nandi Foothills Road, Devanahalli, Bengaluru Rural, KA 562103",
    "startingPrice": 649,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Riding Jackets & Boots",
    "capacity": 140,
    "ticketsSold": 112,
    "heroImage": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Ride out towards Nandi Hills in late afternoon and roll into the Outpost as dusk falls over the mountain. Gather around open fires, talk cross-country routes to Ladakh and Spiti, and enjoy hot kebabs and cold beer.",
    "highlights": [
      "Nandi foothill mountain backdrop",
      "Route map exchange corner for touring riders",
      "Live outdoor kebab grill",
      "Acoustic rock jam around motorcycle lineup"
    ],
    "lineup": [
      {
        "name": "Highway 44 Band",
        "role": "Blues & Roadhouse Rock",
        "time": "6:30 PM \u2013 9:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ttb-entry",
        "name": "Biker Gathering Pass",
        "price": 649,
        "description": "Entry + kebab platter + 1 craft pour.",
        "perks": [
          "Entry pass",
          "Kebab platter",
          "1 Beverage coupon"
        ],
        "totalQuantity": 140,
        "availableQuantity": 28,
        "badge": "Limited"
      }
    ],
    "rules": [
      "Valid motorcycle license and insurance required.",
      "Ride responsibly; helmets mandatory.",
      "21+ age limit for drinks."
    ]
  },
  {
    "id": "midnight-cruise-hangout",
    "slug": "midnight-cruise-hangout",
    "title": "Midnight Cruise & Hangout",
    "edition": "CITY NIGHTS",
    "subtitle": "Empty city bypass cruising, coffee stops, and garage rooftop gathering.",
    "category": "Riders' Collab Party",
    "date": "Friday, 14 November 2026",
    "isoDate": "2026-11-14",
    "time": "10:00 PM \u2013 2:30 AM",
    "doorsOpen": "9:30 PM",
    "city": "Bengaluru",
    "venue": "MotoVault Garage Rooftop",
    "address": "Outer Ring Road, Marathahalli, Bengaluru, KA 560037",
    "startingPrice": 499,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Night Riding Jackets",
    "capacity": 100,
    "ticketsSold": 60,
    "heroImage": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Experience Bengaluru when the traffic vanishes. A coordinated night cruise along the ring road converging at a custom motorcycle builder's garage rooftop for specialty coffee, burgers, and motorcycle cinema on the projector wall.",
    "highlights": [
      "Group night cruise route provided on GPS",
      "Vintage and custom cafe racer gallery",
      "Fresh espresso bar and midnight sliders",
      "Motorcycle documentary on rooftop projector"
    ],
    "lineup": [
      {
        "name": "MotoVault Curators",
        "role": "Ride Leads & Mechanics",
        "time": "10:00 PM \u2013 2:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "mch-pass",
        "name": "Night Cruise Pass",
        "price": 499,
        "description": "Rooftop garage access + espresso + midnight slider.",
        "perks": [
          "Garage roof entry",
          "Espresso beverage",
          "Slider & wedges combo"
        ],
        "totalQuantity": 100,
        "availableQuantity": 40,
        "badge": "Available"
      }
    ],
    "rules": [
      "All street safety gear required.",
      "No stunting on public roads.",
      "Respect fellow road users."
    ]
  },
  {
    "id": "the-indiranagar-secret-table",
    "slug": "the-indiranagar-secret-table",
    "title": "The Indiranagar Secret Table",
    "edition": "MEDITERRANEAN HARVEST",
    "subtitle": "A single long communal table, 6 curated courses, and wine pairings.",
    "category": "Supper Club",
    "date": "Friday, 24 October 2026",
    "isoDate": "2026-10-24",
    "time": "7:30 PM \u2013 11:30 PM",
    "doorsOpen": "7:00 PM",
    "city": "Bengaluru",
    "venue": "The Glasshouse Conservatory",
    "address": "12th Main Road, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 1499,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Smart Elegant",
    "capacity": 24,
    "ticketsSold": 20,
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Dinner tastes infinitely better in extraordinary company. 24 guests gather around one long candle-lit mahogany table in a private botanical conservatory. Chef Tara serves a six-course seasonal Mediterranean feast paired with low-intervention natural wines and conversation prompts that bring people together effortlessly.",
    "highlights": [
      "6-Course plated seasonal Mediterranean dinner",
      "Wine pairings accompanying each course",
      "Private greenhouse setting with live jazz soundtrack",
      "Curated guestlist of creative individuals"
    ],
    "lineup": [
      {
        "name": "Chef Tara Joseph",
        "role": "Culinary Director & Host",
        "time": "7:30 PM \u2013 10:30 PM"
      },
      {
        "name": "Duo Accord",
        "role": "Live Jazz Guitar & Double Bass",
        "time": "8:00 PM \u2013 11:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "st-dinner",
        "name": "Communal Dining Pass",
        "price": 1499,
        "description": "Full 6-course dinner + wine pairings + digestif.",
        "perks": [
          "6 Courses plated feast",
          "3 Wine pairings included",
          "Botanical conservatory seating"
        ],
        "totalQuantity": 24,
        "availableQuantity": 4,
        "badge": "Last 4 Seats"
      }
    ],
    "rules": [
      "Strictly 21+.",
      "Please specify vegetarian or dietary requirements upon registration.",
      "Exact address sent 8 hours prior."
    ]
  },
  {
    "id": "candlelight-heritage-supper",
    "slug": "candlelight-heritage-supper",
    "title": "Candlelight Heritage Supper",
    "edition": "OLD BANGALORE FLAVOURS",
    "subtitle": "Forgotten regional heirloom recipes served in a 1920s heritage villa.",
    "category": "Supper Club",
    "date": "Saturday, 1 November 2026",
    "isoDate": "2026-11-01",
    "time": "7:30 PM \u2013 11:00 PM",
    "doorsOpen": "7:00 PM",
    "city": "Bengaluru",
    "venue": "Richmond Heritage Villa",
    "address": "Richmond Town, Central Bengaluru, KA 560025",
    "startingPrice": 1399,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Vintage / Smart Ethnic",
    "capacity": 20,
    "ticketsSold": 17,
    "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Step into a century-old Anglo-Indian colonial mansion for an evening celebrating the culinary heritage of Bengaluru. From delicate mulligatawny soup and slow-braised country curries to cardamom rose pudding, each course uncovers a historical chapter of the garden city.",
    "highlights": [
      "Historic 1920s veranda and high-ceiling dining hall",
      "5-Course heirloom family recipes",
      "Host storytelling on the origins of each dish",
      "Handcrafted floral cocktails"
    ],
    "lineup": [
      {
        "name": "Chef David Fernandez",
        "role": "Heritage Chef & Storyteller",
        "time": "7:30 PM \u2013 11:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "chs-pass",
        "name": "Heritage Seat",
        "price": 1399,
        "description": "5-Course heirloom dinner + paired heritage drinks.",
        "perks": [
          "5-Course heirloom tasting menu",
          "2 Floral house cocktails",
          "Historical menu booklet"
        ],
        "totalQuantity": 20,
        "availableQuantity": 3,
        "badge": "Last 3"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Advance booking mandatory; strictly no walk-ins."
    ]
  },
  {
    "id": "midnight-mezze-conversation",
    "slug": "midnight-mezze-conversation",
    "title": "Midnight Mezze & Conversation",
    "edition": "LEVANTINE NIGHTS",
    "subtitle": "Warm pita from wood ovens, smoky dips, communal platters, and stories.",
    "category": "Supper Club",
    "date": "Friday, 7 November 2026",
    "isoDate": "2026-11-07",
    "time": "8:30 PM \u2013 12:30 AM",
    "doorsOpen": "8:00 PM",
    "city": "Bengaluru",
    "venue": "Koramangala Glasshouse",
    "address": "4th Block, Koramangala, Bengaluru, KA 560034",
    "startingPrice": 1299,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Atmospheric Dark Palette",
    "capacity": 22,
    "ticketsSold": 14,
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Fresh steaming pita inflated directly from the wood oven, bowls of silk-smooth labneh with za'atar, charred eggplant muhammara, lamb koftas, and pomegranate salads shared family-style across the table until midnight.",
    "highlights": [
      "Family-style communal Levantine feast",
      "Live woodfired pita bread station",
      "Arak cocktails and mint tea service",
      "Warm conversational hosts"
    ],
    "lineup": [
      {
        "name": "Chef Noor & Layla",
        "role": "Levantine Hosts",
        "time": "8:30 PM \u2013 12:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "mmc-pass",
        "name": "Mezze Table Seat",
        "price": 1299,
        "description": "Unlimited communal mezze + entrees + dessert + 2 drinks.",
        "perks": [
          "Full communal spread",
          "2 Signature Levantine drinks",
          "Turkish coffee & mint tea"
        ],
        "totalQuantity": 22,
        "availableQuantity": 8,
        "badge": "Available"
      }
    ],
    "rules": [
      "21+ ID required.",
      "Vegetarian options plentiful and served alongside."
    ]
  },
  {
    "id": "clay-cocktails-pottery-lab",
    "slug": "clay-cocktails-pottery-lab",
    "title": "Clay & Cocktails Pottery Lab",
    "edition": "CREATIVE WHEEL",
    "subtitle": "Wheel throwing, hand sculpting, sip signature cocktails, and meet creators.",
    "category": "Workshops",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "4:00 PM \u2013 7:30 PM",
    "doorsOpen": "3:30 PM",
    "city": "Bengaluru",
    "venue": "The Clay Collective Studio",
    "address": "6th Block, Koramangala, Bengaluru, KA 560095",
    "startingPrice": 1199,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Casual Studio Clothes",
    "capacity": 25,
    "ticketsSold": 21,
    "heroImage": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Get your hands dirty while sipping something refreshing! Learn the meditative art of pottery wheel throwing and pinch potting under gentle master ceramist guidance. Chat with your table neighbors, craft your own coffee mug or ceramic bowl, and take your fired piece home.",
    "highlights": [
      "Hands-on pottery wheel throwing instruction",
      "All clay, sculpting tools, and glazes included",
      "Kiln firing of 2 created pieces for takeaway",
      "2 Handcrafted studio cocktails & cheese platter"
    ],
    "lineup": [
      {
        "name": "Ananya Sharma",
        "role": "Master Ceramist & Potter",
        "time": "4:00 PM \u2013 7:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "cc-lab",
        "name": "Potter Workshop Seat",
        "price": 1199,
        "description": "Full workshop + materials + 2 fired items + 2 cocktails.",
        "perks": [
          "All clay & wheel access",
          "Kiln firing of 2 pieces",
          "2 Craft cocktails & snacks"
        ],
        "totalQuantity": 25,
        "availableQuantity": 4,
        "badge": "Last 4"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Aprons provided; wear clothes you don't mind getting clay on.",
      "Fired pieces ready for pickup in 10 days."
    ]
  },
  {
    "id": "analog-vinyl-sound-craft",
    "slug": "analog-vinyl-sound-craft",
    "title": "Analog Vinyl & Sound Craft",
    "edition": "AUDIO LAB",
    "subtitle": "Turntable mechanics, needle types, vinyl mixing, and hi-fi listening.",
    "category": "Workshops",
    "date": "Sunday, 2 November 2026",
    "isoDate": "2026-11-02",
    "time": "4:30 PM \u2013 8:00 PM",
    "doorsOpen": "4:00 PM",
    "city": "Bengaluru",
    "venue": "The Listening Room Indiranagar",
    "address": "100ft Road, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 999,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "20+",
    "dressCode": "Smart Casual",
    "capacity": 30,
    "ticketsSold": 18,
    "heroImage": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "For audiophiles and curious listeners. Learn how vinyl records work, how to handle turntables, calibrate cartridges, and mix two analog records without sync buttons. Enjoy listening to legendary pressings on high-end tube amplifiers.",
    "highlights": [
      "Hands-on turntable cueing & pitch matching",
      "Tube amplifier listening comparisons",
      "Browse through 500+ curated vinyl crate collection",
      "Craft coffee & craft beer bar on site"
    ],
    "lineup": [
      {
        "name": "Vinay 'Needle' Kumar",
        "role": "Vinyl Collector & Sound Engineer",
        "time": "4:30 PM \u2013 8:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "avsc-pass",
        "name": "Audio Lab Seat",
        "price": 999,
        "description": "Workshop + turntable time + 1 vinyl record gift + drink.",
        "perks": [
          "Turntable practice station",
          "1 Vintage vinyl record takeaway",
          "1 Beverage coupon"
        ],
        "totalQuantity": 30,
        "availableQuantity": 12,
        "badge": "Available"
      }
    ],
    "rules": [
      "20+ age group.",
      "Careful handling of antique records required."
    ]
  },
  {
    "id": "coffee-tasting-barista-social",
    "slug": "coffee-tasting-barista-social",
    "title": "Coffee Tasting & Barista Social",
    "edition": "ROAST & CUPPING",
    "subtitle": "Specialty coffee cupping, pour-over techniques, and latte art face-off.",
    "category": "Workshops",
    "date": "Saturday, 8 November 2026",
    "isoDate": "2026-11-08",
    "time": "10:30 AM \u2013 2:00 PM",
    "doorsOpen": "10:00 AM",
    "city": "Bengaluru",
    "venue": "Central Bengaluru Roastery",
    "address": "Lavelle Road, Shanthala Nagar, Bengaluru, KA 560001",
    "startingPrice": 849,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "18+",
    "dressCode": "Casual Weekend Morning",
    "capacity": 20,
    "ticketsSold": 16,
    "heroImage": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Awaken your senses at Bengaluru's premier micro-roastery. Learn the professional art of coffee cupping (evaluating floral, fruity, and chocolate notes), master V60 and AeroPress brewing ratios, and pour your own latte art.",
    "highlights": [
      "Professional coffee cupping of 6 Indian single-estate beans",
      "Hands-on AeroPress and V60 brewing coaching",
      "Latte art milk steaming competition",
      "Freshly baked sourdough croissants and pastries"
    ],
    "lineup": [
      {
        "name": "Priya Nair",
        "role": "Q-Grader Certified Barista",
        "time": "10:30 AM \u2013 2:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ct-pass",
        "name": "Barista Cupping Seat",
        "price": 849,
        "description": "Workshop + pastry brunch + 250g coffee beans pack.",
        "perks": [
          "Cupping session",
          "250g Single estate beans pack",
          "Croissant & brunch plate"
        ],
        "totalQuantity": 20,
        "availableQuantity": 4,
        "badge": "Few Left"
      }
    ],
    "rules": [
      "Please avoid wearing strong perfume/cologne to allow olfactory appreciation."
    ]
  },
  {
    "id": "indiranagar-100ft-pub-odyssey",
    "slug": "indiranagar-100ft-pub-odyssey",
    "title": "Indiranagar 100ft Pub Odyssey",
    "edition": "NIGHTLIFE TRAIL",
    "subtitle": "4 iconic watering holes, VIP skip-the-line entries, and icebreaker games.",
    "category": "Pub Crawling",
    "date": "Friday, 24 October 2026",
    "isoDate": "2026-10-24",
    "time": "7:30 PM \u2013 12:30 AM",
    "doorsOpen": "7:00 PM",
    "city": "Bengaluru",
    "venue": "Starting at 100ft Road",
    "address": "Meeting point: Toit Corner, 100ft Road, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 999,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "21+",
    "dressCode": "Smart Nightlife Chic",
    "capacity": 40,
    "ticketsSold": 34,
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Why stick to one venue when you can conquer four of Indiranagar's hottest spots in one epic night? Led by energetic SpotBukk crawl captains, skip door lines, enjoy free welcome shots at each venue, and make memories with a lively crew.",
    "highlights": [
      "4 Hand-picked premium pubs and cocktail lounges",
      "Free welcome shot/beer at every stop",
      "VIP express entry (no queues at doors)",
      "Fun drinking challenges and icebreaker dares"
    ],
    "lineup": [
      {
        "name": "Arjun & Sneha",
        "role": "SpotBukk Crawl Captains",
        "time": "7:30 PM \u2013 12:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ipo-crawler",
        "name": "Pub Crawl Ticket",
        "price": 999,
        "description": "4 venues entry + 4 free drinks + crawl badge.",
        "perks": [
          "Express entry to all 4 pubs",
          "4 Welcome shots / beers",
          "Appetizer snack at stop 2"
        ],
        "totalQuantity": 40,
        "availableQuantity": 6,
        "badge": "Selling Fast"
      }
    ],
    "rules": [
      "21+ strictly with government photo ID proof.",
      "Drink responsibly; crawl captains prioritize your safety.",
      "Plan a cab ride home."
    ]
  },
  {
    "id": "koramangala-craft-brew-hop",
    "slug": "koramangala-craft-brew-hop",
    "title": "Koramangala Craft Brew Hop",
    "edition": "ALE & LAGER TOUR",
    "subtitle": "Tour 3 legendary microbreweries, taste fresh taps, and compare notes.",
    "category": "Pub Crawling",
    "date": "Saturday, 1 November 2026",
    "isoDate": "2026-11-01",
    "time": "6:30 PM \u2013 11:30 PM",
    "doorsOpen": "6:00 PM",
    "city": "Bengaluru",
    "venue": "Koramangala 5th Block",
    "address": "Meeting point: 5th Block Central Circle, Koramangala, Bengaluru, KA 560095",
    "startingPrice": 899,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Casual Night Out",
    "capacity": 35,
    "ticketsSold": 28,
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Bengaluru is the pub capital of India, and Koramangala is its engine! Walk with us across three premier craft microbreweries, sampling Hefeweizens, IPAs, chocolate stouts, and Belgian wits with beer trivia games.",
    "highlights": [
      "3 Acclaimed craft breweries in walking distance",
      "Beer flight samplers at each destination",
      "Behind-the-scenes brew vat tour",
      "Crispy bar appetizers at each pub"
    ],
    "lineup": [
      {
        "name": "Karan 'Brewmaster'",
        "role": "Beer Sommelier Host",
        "time": "6:30 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "kcbh-pass",
        "name": "Brew Hop Pass",
        "price": 899,
        "description": "3 breweries + 3 craft beer samplers + pub snacks.",
        "perks": [
          "3 Microbrewery access",
          "3 Craft beer samplers (300ml each)",
          "Platter of bar bites"
        ],
        "totalQuantity": 35,
        "availableQuantity": 7,
        "badge": "Limited"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Drink water between stops; hydration packs provided."
    ]
  },
  {
    "id": "church-street-speakeasy-crawl",
    "slug": "church-street-speakeasy-crawl",
    "title": "Church Street Speakeasy Crawl",
    "edition": "HIDDEN DOORS",
    "subtitle": "Secret entrances, prohibition-era cocktails, and retro vinyl joints.",
    "category": "Pub Crawling",
    "date": "Friday, 7 November 2026",
    "isoDate": "2026-11-07",
    "time": "8:00 PM \u2013 1:00 AM",
    "doorsOpen": "7:30 PM",
    "city": "Bengaluru",
    "venue": "Church Street & MG Road",
    "address": "Meeting point: Metro Gate 2, Church Street, Bengaluru, KA 560001",
    "startingPrice": 1099,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "Atmospheric Dark / Smart",
    "capacity": 30,
    "ticketsSold": 19,
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Behind bookshelves, phone booths, and unmarked doors lie Bengaluru's secret speakeasies. Discover three subterranean cocktail salons, taste handcrafted smoked old fashioneds and botanical concoctions with a chic nightlife crew.",
    "highlights": [
      "3 Secret speakeasies around Church Street and Lavelle Road",
      "Craft cocktail demonstration by head mixologist",
      "Reserved booth seating at all venues",
      "Atmospheric night walk through colonial downtown"
    ],
    "lineup": [
      {
        "name": "SpotBukk Noir Team",
        "role": "Speakeasy Guides",
        "time": "8:00 PM \u2013 1:00 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "cssc-pass",
        "name": "Speakeasy Pass",
        "price": 1099,
        "description": "3 Secret venues + 3 craft cocktails + gourmet appetizers.",
        "perks": [
          "Secret entry access",
          "3 Craft signature cocktails",
          "Artisanal tapas board"
        ],
        "totalQuantity": 30,
        "availableQuantity": 11,
        "badge": "Available"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Smart dress code enforced at speakeasy venues."
    ]
  },
  {
    "id": "unplugged-living-room-jam",
    "slug": "unplugged-living-room-jam",
    "title": "Unplugged Living Room Jam",
    "edition": "ACOUSTIC CIRCLE",
    "subtitle": "Bring your guitar, cajon, or just your singing voice in an intimate loft.",
    "category": "Jamming & Karaoke Night",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "7:00 PM \u2013 11:30 PM",
    "doorsOpen": "6:30 PM",
    "city": "Bengaluru",
    "venue": "The Loft Acoustic Salon",
    "address": "4th Block, Koramangala, Bengaluru, KA 560034",
    "startingPrice": 499,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "18+",
    "dressCode": "Casual & Comfortable",
    "capacity": 55,
    "ticketsSold": 46,
    "heroImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Zero ego, pure musical passion. Sit in a cozy circle surrounded by rugs, floor cushions, guitars, keyboards, and percussion. Whether you sing Bollywood classics, Ed Sheeran, indie pop, or blues, everyone joins in the chorus.",
    "highlights": [
      "Instruments available for anyone to pick up and play",
      "No stage fright: everyone jams together in a circle",
      "Free flow hot tea, filter coffee, and baked cookies",
      "Comfortable floor cushion and beanbag seating"
    ],
    "lineup": [
      {
        "name": "Manoj & The Circle",
        "role": "Jam Facilitators",
        "time": "7:00 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ulrj-musician",
        "name": "Musician / Singer Pass",
        "price": 499,
        "description": "Full jam participation + drinks + snacks.",
        "perks": [
          "Circle seat",
          "Instrument plug-in access",
          "Snack & beverage token"
        ],
        "totalQuantity": 35,
        "availableQuantity": 4,
        "badge": "Few Left"
      },
      {
        "id": "ulrj-listener",
        "name": "Enthusiastic Listener Pass",
        "price": 549,
        "description": "Come relax, sing along from the couch, and enjoy the vibe.",
        "perks": [
          "Lounge seating",
          "Hot tea & cookie platter",
          "Song request card"
        ],
        "totalQuantity": 20,
        "availableQuantity": 5,
        "badge": "Popular"
      }
    ],
    "rules": [
      "Respect every performer of all skill levels.",
      "Supportive and applause-first environment."
    ]
  },
  {
    "id": "neon-mic-karaoke-carnival",
    "slug": "neon-mic-karaoke-carnival",
    "title": "Neon Mic Karaoke Carnival",
    "edition": "POP & ROCK HITS",
    "subtitle": "Grab the wireless mic, neon lights, duet with strangers, and sing proud.",
    "category": "Jamming & Karaoke Night",
    "date": "Friday, 31 October 2026",
    "isoDate": "2026-10-31",
    "time": "8:00 PM \u2013 1:00 AM",
    "doorsOpen": "7:30 PM",
    "city": "Bengaluru",
    "venue": "The Neon Stage Lounge",
    "address": "100ft Road, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 599,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Neon & Bright Accents",
    "capacity": 70,
    "ticketsSold": 58,
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Who cares about hitting every note when the whole room is singing along at the top of their lungs? With thousands of songs from 90s rock and Bollywood blockbusters to Taylor Swift and Queen, grab a drink and own the stage.",
    "highlights": [
      "3 Wireless studio microphones and lyrics monitor",
      "Curated catalog of 20,000+ tracks",
      "Themed duet challenges with surprise gifts",
      "Craft cocktails and loaded nacho platters"
    ],
    "lineup": [
      {
        "name": "MC Rohan 'High Pitch'",
        "role": "Karaoke Host & Hype Master",
        "time": "8:00 PM \u2013 1:00 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "nmkc-pass",
        "name": "Karaoke Star Pass",
        "price": 599,
        "description": "Entry + 2 drink tokens + unlimited song queue submissions.",
        "perks": [
          "Entry pass",
          "2 House cocktails / beers",
          "Unlimited song slots"
        ],
        "totalQuantity": 70,
        "availableQuantity": 12,
        "badge": "Limited"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Be kind to bad singers; cheering is mandatory!"
    ]
  },
  {
    "id": "indie-acoustic-circle",
    "slug": "indie-acoustic-circle",
    "title": "Indie Acoustic Circle",
    "edition": "CANDLELIT VOICES",
    "subtitle": "Original songs, indie Hindi & English poetry, and warm melodies.",
    "category": "Jamming & Karaoke Night",
    "date": "Sunday, 9 November 2026",
    "isoDate": "2026-11-09",
    "time": "6:30 PM \u2013 10:30 PM",
    "doorsOpen": "6:00 PM",
    "city": "Bengaluru",
    "venue": "HSR Open Studio",
    "address": "27th Main, Sector 1, HSR Layout, Bengaluru, KA 560102",
    "startingPrice": 449,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "18+",
    "dressCode": "Boho Casual",
    "capacity": 50,
    "ticketsSold": 28,
    "heroImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "A tranquil Sunday musical gathering for independent singer-songwriters and music enthusiasts. Soft candlelight, gentle ukulele and acoustic guitar chords, storytelling behind song lyrics, and peaceful vibes.",
    "highlights": [
      "Intimate candlelit open-floor setting",
      "Showcase your original tracks or favorite covers",
      "High-quality acoustic microphones",
      "Herbal infusions and artisanal snacks"
    ],
    "lineup": [
      {
        "name": "SpotBukk Acoustic Guild",
        "role": "Hosts & Musicians",
        "time": "6:30 PM \u2013 10:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "iac-pass",
        "name": "Circle Pass",
        "price": 449,
        "description": "Entry + herbal tea + homemade bakery treats.",
        "perks": [
          "Entry pass",
          "Herbal tea / coffee",
          "Artisanal brownie / treat"
        ],
        "totalQuantity": 50,
        "availableQuantity": 22,
        "badge": "Available"
      }
    ],
    "rules": [
      "18+ age group.",
      "Quiet attention during performances."
    ]
  },
  {
    "id": "vv-puram-midnight-food-trail",
    "slug": "vv-puram-midnight-food-trail",
    "title": "VV Puram Midnight Food Trail",
    "edition": "THINDI BEEDI SPECIAL",
    "subtitle": "Buttery paddus, hot congress bun butter jam, floating jalebis, and gulkand.",
    "category": "Street Food Hopping",
    "date": "Friday, 24 October 2026",
    "isoDate": "2026-10-24",
    "time": "8:30 PM \u2013 11:30 PM",
    "doorsOpen": "8:00 PM",
    "city": "Bengaluru",
    "venue": "Thindi Beedi, VV Puram",
    "address": "Old Hospital Road, VV Puram, Basavanagudi, Bengaluru, KA 560004",
    "startingPrice": 599,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "All Ages / 18+",
    "dressCode": "Comfy Walking Shoes & Stretchy Pants",
    "capacity": 30,
    "ticketsSold": 26,
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "The ultimate sensory adventure down Bengaluru's most legendary food street! Guided by local culinary insiders, taste piping hot crispy paddus dipped in coconut chutney, melted butter buns, sizzling dosas, twisting rabri jalebis, and authentic royal gulkand with ice cream.",
    "highlights": [
      "Tasting stops at 7 legendary stalls curated over decades",
      "All food tastings included in one seamless ticket",
      "Insider stories of the families behind each iconic cart",
      "Comfortable walking pace with lively foodie banter"
    ],
    "lineup": [
      {
        "name": "Girish Rao",
        "role": "Bengaluru Heritage Food Curator",
        "time": "8:30 PM \u2013 11:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "vvp-foodie",
        "name": "All-Inclusive Foodie Pass",
        "price": 599,
        "description": "Guided walk + 7 food tastings + bottled water.",
        "perks": [
          "All 7 signature food dishes included",
          "Heritage food walking guide",
          "Bottled mineral water"
        ],
        "totalQuantity": 30,
        "availableQuantity": 4,
        "badge": "Last 4"
      }
    ],
    "rules": [
      "Wear comfortable sneakers/footwear for walking.",
      "Come on an empty stomach!"
    ]
  },
  {
    "id": "mosque-road-kebab-feast",
    "slug": "mosque-road-kebab-feast",
    "title": "Mosque Road Kebab Feast",
    "edition": "FRAZER TOWN GRILLS",
    "subtitle": "Charcoal grilled seekhs, veal rolls, haleem, and flaky parathas.",
    "category": "Street Food Hopping",
    "date": "Saturday, 1 November 2026",
    "isoDate": "2026-11-01",
    "time": "7:30 PM \u2013 10:30 PM",
    "doorsOpen": "7:00 PM",
    "city": "Bengaluru",
    "venue": "Mosque Road, Frazer Town",
    "address": "Mosque Road & MM Road Junction, Frazer Town, Bengaluru, KA 560005",
    "startingPrice": 699,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "All Ages / 18+",
    "dressCode": "Casual Street Walking",
    "capacity": 25,
    "ticketsSold": 20,
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Follow the fragrant plumes of charcoal smoke down Frazer Town's bustling culinary stretch. Savor melt-in-mouth mutton seekh kebabs, crispy brain cutlets, rich slow-cooked haleem, and authentic Sulaimani chai with friendly fellow meat enthusiasts.",
    "highlights": [
      "6 Curated kebab and Mughlai stops",
      "All grill tastings included",
      "Tasting of seasonal haleem and layered parathas",
      "Ending with hot Sulaimani chai and sweet firni"
    ],
    "lineup": [
      {
        "name": "Zubair Ahmed",
        "role": "Frazer Town Culinary Guide",
        "time": "7:30 PM \u2013 10:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "mrk-pass",
        "name": "Kebab Trail Pass",
        "price": 699,
        "description": "Guided tasting of 6 iconic non-veg delicacies + desserts.",
        "perks": [
          "6 Food tastings",
          "Culinary tour guide",
          "Dessert & chai included"
        ],
        "totalQuantity": 25,
        "availableQuantity": 5,
        "badge": "Limited"
      }
    ],
    "rules": [
      "Non-vegetarian focus; limited vegetarian options.",
      "Comfortable walking shoes recommended."
    ]
  },
  {
    "id": "malleshwaram-heritage-tiffin-walk",
    "slug": "malleshwaram-heritage-tiffin-walk",
    "title": "Malleshwaram Heritage Tiffin Walk",
    "edition": "BENNE DOSA SPECIAL",
    "subtitle": "Golden benne dosas, filter coffee, bajji stalls, and tree-lined heritage lanes.",
    "category": "Street Food Hopping",
    "date": "Sunday, 9 November 2026",
    "isoDate": "2026-11-09",
    "time": "7:30 AM \u2013 10:30 AM",
    "doorsOpen": "7:00 AM",
    "city": "Bengaluru",
    "venue": "8th Cross Malleshwaram",
    "address": "Sampige Road & 8th Cross, Malleshwaram, Bengaluru, KA 560003",
    "startingPrice": 499,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "All Ages",
    "dressCode": "Morning Walking Clothes",
    "capacity": 30,
    "ticketsSold": 18,
    "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Start your Sunday morning with the golden crunch of butter dosas in one of Bengaluru's oldest conservancies. Stroll past flower markets and old stone temples, sipping degree filter coffee from stainless steel davarahs with a cheerful group.",
    "highlights": [
      "Tasting stops at legendary heritage tiffin houses",
      "Crispy benne dosa, idli-vada, and khara bath",
      "Fresh steaming degree filter coffee",
      "Walk through historic Malleshwaram flower market"
    ],
    "lineup": [
      {
        "name": "Ananya K",
        "role": "Malleshwaram Native & Historian",
        "time": "7:30 AM \u2013 10:30 AM"
      }
    ],
    "ticketTiers": [
      {
        "id": "mht-pass",
        "name": "Morning Tiffin Pass",
        "price": 499,
        "description": "Guided walking tour + 5 heritage breakfast tastings + coffee.",
        "perks": [
          "5 Heritage tiffin tastings",
          "Degree filter coffee",
          "Flower market walkthrough"
        ],
        "totalQuantity": 30,
        "availableQuantity": 12,
        "badge": "Available"
      }
    ],
    "rules": [
      "Early start at 7:30 AM sharp; meet at 8th Cross circle."
    ]
  },
  {
    "id": "board-game-arena-social",
    "slug": "board-game-arena-social",
    "title": "Board Game Arena & Social",
    "edition": "STRATEGY & SOCIAL",
    "subtitle": "Over 100 modern board games, friendly game masters, and ice cold brew.",
    "category": "Indoor Games",
    "date": "Saturday, 25 October 2026",
    "isoDate": "2026-10-25",
    "time": "4:00 PM \u2013 9:00 PM",
    "doorsOpen": "3:30 PM",
    "city": "Bengaluru",
    "venue": "The Meeple Lounge Indiranagar",
    "address": "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038",
    "startingPrice": 499,
    "featured": false,
    "status": "published",
    "availability": "Selling Fast",
    "ageLimit": "18+",
    "dressCode": "Casual Comfortable",
    "capacity": 60,
    "ticketsSold": 50,
    "heroImage": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Put away the phone and rediscover the sheer joy of tabletop gaming! From fast-paced social deduction games like Secret Hitler and Codenames to strategy masterworks like Wingspan and Ticket to Ride. Our patient game masters teach rules in 3 minutes flat.",
    "highlights": [
      "Library of 100+ board games curated for all skill tiers",
      "Dedicated game master at each table to explain rules",
      "Craft beer & gourmet pizza delivery directly to tables",
      "Table rotation every 60 minutes to meet new opponents"
    ],
    "lineup": [
      {
        "name": "Siddharth & The Game Gurus",
        "role": "Chief Tabletop Facilitators",
        "time": "4:00 PM \u2013 9:00 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "bga-pass",
        "name": "Gamer Pass",
        "price": 499,
        "description": "Full access to all games + game masters + 1 drink + snacks.",
        "perks": [
          "All-access table pass",
          "1 Beverage coupon",
          "Popcorn & nachos bowl"
        ],
        "totalQuantity": 60,
        "availableQuantity": 10,
        "badge": "Few Left"
      }
    ],
    "rules": [
      "18+ age group.",
      "Treat cards and miniatures with care.",
      "Fair play and friendly competitive spirit."
    ]
  },
  {
    "id": "catan-cocktails-championship",
    "slug": "catan-cocktails-championship",
    "title": "Catan & Cocktails Championship",
    "edition": "SETTLERS TOURNAMENT",
    "subtitle": "Trade sheep for wood, negotiate alliances, sip cocktails, and win the trophy.",
    "category": "Indoor Games",
    "date": "Sunday, 2 November 2026",
    "isoDate": "2026-11-02",
    "time": "3:00 PM \u2013 8:30 PM",
    "doorsOpen": "2:30 PM",
    "city": "Bengaluru",
    "venue": "Koramangala Games Vault",
    "address": "5th Block, Koramangala, Bengaluru, KA 560095",
    "startingPrice": 599,
    "featured": false,
    "status": "published",
    "availability": "Limited Spots",
    "ageLimit": "21+",
    "dressCode": "Casual",
    "capacity": 40,
    "ticketsSold": 34,
    "heroImage": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Do you have the longest road or the largest army? Join a fun, casual Catan tournament with delicious craft cocktails to ease diplomatic trade tensions. Beginners and seasoned settlers both welcome!",
    "highlights": [
      "3 Guaranteed rounds of Catan with balanced matchmaking",
      "Custom 3D printed Catan winner trophy & board game vouchers",
      "2 Craft cocktails included with entry",
      "Finger food platters delivered to game tables"
    ],
    "lineup": [
      {
        "name": "Master Settler Team",
        "role": "Tournament Arbitrators",
        "time": "3:00 PM \u2013 8:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ccc-pass",
        "name": "Settler Entry",
        "price": 599,
        "description": "Tournament entry + 2 craft cocktails + snack platter.",
        "perks": [
          "3 Tournament rounds",
          "2 Craft cocktails",
          "Snack platter & trophy eligibility"
        ],
        "totalQuantity": 40,
        "availableQuantity": 6,
        "badge": "Limited"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Tournament rules briefed at 3:15 PM sharp."
    ]
  },
  {
    "id": "retro-arcade-trivia-night",
    "slug": "retro-arcade-trivia-night",
    "title": "Retro Arcade & Trivia Night",
    "edition": "PIXELS & POP CULTURE",
    "subtitle": "Pac-Man, Street Fighter 2 battles, pub quiz trivia, and cold beers.",
    "category": "Indoor Games",
    "date": "Friday, 14 November 2026",
    "isoDate": "2026-11-14",
    "time": "7:00 PM \u2013 11:30 PM",
    "doorsOpen": "6:30 PM",
    "city": "Bengaluru",
    "venue": "Church Street Pixel Bar",
    "address": "Church Street, Off MG Road, Bengaluru, KA 560001",
    "startingPrice": 549,
    "featured": false,
    "status": "published",
    "availability": "Available",
    "ageLimit": "21+",
    "dressCode": "80s/90s Retro Vibe",
    "capacity": 80,
    "ticketsSold": 52,
    "heroImage": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    "galleryImages": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Flash back to the golden era of arcade joysticks and CRT glow! Challenge opponents on original arcade cabinets, team up for a hilarious pop-culture pub trivia quiz, and win vintage gaming memorabilia.",
    "highlights": [
      "Unlimited free plays on 12 vintage arcade cabinets",
      "5-Round team pop-culture, movies & gaming trivia",
      "Craft beer pitchers and cheesy pizza slices",
      "Prizes for best retro outfits and high scores"
    ],
    "lineup": [
      {
        "name": "Quizmaster Aditya",
        "role": "Trivia Host & Gamer",
        "time": "7:30 PM \u2013 10:30 PM"
      }
    ],
    "ticketTiers": [
      {
        "id": "ratn-pass",
        "name": "Arcade & Trivia Pass",
        "price": 549,
        "description": "Unlimited arcade play + trivia team entry + 1 craft beer.",
        "perks": [
          "Unlimited arcade plays",
          "Trivia entry",
          "1 Craft beer / beverage coupon"
        ],
        "totalQuantity": 80,
        "availableQuantity": 28,
        "badge": "Available"
      }
    ],
    "rules": [
      "21+ government photo ID required.",
      "Teams of 2 to 5 formed on site if arriving solo."
    ]
  }
];
