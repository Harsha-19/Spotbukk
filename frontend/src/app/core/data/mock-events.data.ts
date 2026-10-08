import { EventItem } from '../models/event.model';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'after-dark-04',
    slug: 'after-dark-vol-04',
    title: 'AFTER DARK',
    edition: 'VOL. 04',
    subtitle: 'An intimate late-night gathering built around deep house, warm lighting and good company.',
    category: 'House Party',
    date: 'Friday, 24 October 2026',
    isoDate: '2026-10-24',
    time: '9:30 PM – 3:30 AM',
    doorsOpen: '9:00 PM',
    city: 'Bengaluru',
    venue: 'The Glass House Penthouse',
    address: '100ft Road, 4th Block, Indiranagar, Bengaluru, KA 560038',
    startingPrice: 699,
    featured: true,
    status: 'published',
    availability: 'Selling Fast',
    ageLimit: '21+',
    dressCode: 'Atmospheric / Smart Monochrome',
    capacity: 180,
    ticketsSold: 148,
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An intimate late-night gathering built around deep house, warm lighting and good company. After Dark returns for its fourth edition in a private Indiranagar penthouse overlooking the city canopy. Expect custom warm-analog acoustic tuning, artisanal low-intervention pours, and a curated crowd strictly limited to capacity.',
    highlights: [
      'Analog Void Acoustic Sound Tuning',
      'Curated Natural Wine & Mezcal Bar',
      'Strict 180-guest curated cap',
      'Private rooftop glass conservatory',
      'Digital priority entry via SpotBukk pass'
    ],
    lineup: [
      { name: 'Kavya & The Echo', role: 'Live Hybrid Set', time: '10:00 PM – 11:45 PM' },
      { name: 'Malik Soren', role: 'Deep House / Minimal', time: '11:45 PM – 01:45 AM' },
      { name: 'Vedaant B2B Rux', role: 'Late Night Groove', time: '01:45 AM – Close' }
    ],
    ticketTiers: [
      {
        id: 'ad04-early',
        name: 'Early Bird',
        price: 499,
        description: 'Entry before 10:30 PM. Includes 1 bespoke house pour.',
        perks: ['Guaranteed entry before 10:30 PM', '1 house signature beverage', 'Access to main loft & listening room'],
        totalQuantity: 50,
        availableQuantity: 4,
        badge: 'Only 4 left'
      },
      {
        id: 'ad04-regular',
        name: 'Regular Admission',
        price: 699,
        description: 'Standard all-night access with complimentary welcome spritz.',
        perks: ['Anytime entry through the night', 'Welcome spritz on arrival', 'Access to penthouse balcony'],
        totalQuantity: 100,
        availableQuantity: 28,
        badge: 'Most Popular'
      },
      {
        id: 'ad04-vip',
        name: 'VIP Backstage & Loft',
        price: 999,
        description: 'Priority check-in, mezzanine access, and 2 premium cocktail tokens.',
        perks: ['Skip-the-line express QR check-in', 'Access to mezzanine artist lounge', '2 craft cocktail tokens', 'Dedicated bar steward'],
        totalQuantity: 30,
        availableQuantity: 12,
        badge: 'Exclusive'
      }
    ],
    rules: [
      'Entry strictly 21+ with government photo ID proof.',
      'No photography permitted in the primary listening lounge.',
      'Zero tolerance for non-consensual behavior or harassment.',
      'Doors close for entry at 01:00 AM.'
    ]
  },
  {
    id: 'house-of-sundown',
    slug: 'house-of-sundown',
    title: 'HOUSE OF SUNDOWN',
    edition: 'GOLDEN HOUR SPECIAL',
    subtitle: 'Warm coastal breezes, melodic rhythms, and open-air sunset immersion.',
    category: 'Rooftop Sessions',
    date: 'Sunday, 26 October 2026',
    isoDate: '2026-10-26',
    time: '4:30 PM – 11:30 PM',
    doorsOpen: '4:00 PM',
    city: 'Goa',
    venue: 'Villa Solarium Clifftop',
    address: 'Vagator Cliff Edge, North Goa, GA 403509',
    startingPrice: 899,
    featured: true,
    status: 'published',
    availability: 'Available',
    ageLimit: '21+',
    dressCode: 'Resort Chic / Warm Earth Tones',
    capacity: 220,
    ticketsSold: 135,
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transition from golden afternoon glow into deep rhythmic night. Perched atop the dramatic limestone cliffs of Vagator, House of Sundown pairs panoramic ocean horizons with hypnotic afro-melodic selections and seasonal botanical cocktails.',
    highlights: [
      'Panoramic oceanfront cliff terrace',
      'Sunset ceremony at 6:15 PM',
      'Botanical infusion cocktail menu',
      'Live percussion alongside DJ sets'
    ],
    lineup: [
      { name: 'Aarav Sol', role: 'Organic Downtempo', time: '04:30 PM – 06:15 PM' },
      { name: 'Siren & The Drums', role: 'Afro-Melodic House', time: '06:15 PM – 08:45 PM' },
      { name: 'Kenza Duo', role: 'Deep Sunset Grooves', time: '08:45 PM – 11:30 PM' }
    ],
    ticketTiers: [
      {
        id: 'sundown-early',
        name: 'Sunset Early Arrival',
        price: 899,
        description: 'Entry before 5:30 PM with golden hour tapas pairing.',
        perks: ['Entry before 5:30 PM', 'Sunset tapas tasting board', '1 signature spritz'],
        totalQuantity: 60,
        availableQuantity: 18
      },
      {
        id: 'sundown-regular',
        name: 'Full Gathering Pass',
        price: 1199,
        description: 'All-evening access plus 2 complimentary drink tokens.',
        perks: ['Anytime entry', '2 beverage tokens', 'Full venue and sunset deck access'],
        totalQuantity: 120,
        availableQuantity: 52
      },
      {
        id: 'sundown-cabana',
        name: 'Cliffside Cabana Pass (Pair)',
        price: 2499,
        description: 'Entry for 2 guests with reserved cliffside lounge table.',
        perks: ['Entry for 2 persons', 'Reserved ocean-view daybed', 'Bottle of sparkling wine', 'Dedicated table host'],
        totalQuantity: 20,
        availableQuantity: 6,
        badge: 'Rare'
      }
    ],
    rules: [
      '21+ government photo ID required.',
      'Appropriate smart resort attire; no swimwear.',
      'Entry subject to venue capacity protocol.'
    ]
  },
  {
    id: 'midnight-social',
    slug: 'midnight-social',
    title: 'MIDNIGHT SOCIAL',
    edition: 'SECRET LOFT II',
    subtitle: 'Underground micro-party tucked within an industrial heritage loft.',
    category: 'Private Gathering',
    date: 'Saturday, 1 November 2026',
    isoDate: '2026-11-01',
    time: '10:00 PM – 4:00 AM',
    doorsOpen: '9:45 PM',
    city: 'Mumbai',
    venue: 'The Mill Vaults Loft',
    address: 'Lower Parel Compound, Mumbai, MH 400013',
    startingPrice: 799,
    featured: true,
    status: 'published',
    availability: 'Limited Spots',
    ageLimit: '21+',
    dressCode: 'Minimalist Black & Charcoal',
    capacity: 140,
    ticketsSold: 128,
    heroImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An intentionally low-profile social gathering hosted in a restored textile mill vault. Raw exposed brick, warm filament lighting, zero VIP barriers, and an authentic dance community focused on pristine sound and unpretentious interaction.',
    highlights: [
      'Secret Lower Parel address disclosed 6 hours prior',
      'No VIP tiers — singular egalitarian room',
      'Custom acoustic damping and analog mixer',
      'Speakeasy cocktail outpost by Bar Botanica'
    ],
    lineup: [
      { name: 'Nikhil R', role: 'Vinyl Only Warmup', time: '10:00 PM – 11:30 PM' },
      { name: 'Ananya S', role: 'Detroit Electro & Techno', time: '11:30 PM – 01:45 AM' },
      { name: 'Zoya Khan', role: 'Intimate Acid House', time: '01:45 AM – Close' }
    ],
    ticketTiers: [
      {
        id: 'ms-regular',
        name: 'Community Pass',
        price: 799,
        description: 'Single tier access for all attendees. Equal footing.',
        perks: ['Full night admission', '1 complimentary craft beer or kombucha', 'Wardrobe coat-check included'],
        totalQuantity: 140,
        availableQuantity: 12,
        badge: 'Almost Gone'
      }
    ],
    rules: [
      'Exact loft coordinates sent to registered WhatsApp/email at 4 PM.',
      'Strict no-flash photography policy.',
      'Respect the space and community atmosphere.'
    ]
  },
  {
    id: 'slow-burn',
    slug: 'slow-burn',
    title: 'SLOW BURN',
    edition: 'MEZCAL & VINYL',
    subtitle: 'A sensory evening of rare vinyl selections and smoky spirits.',
    category: 'Intimate DJ',
    date: 'Thursday, 5 November 2026',
    isoDate: '2026-11-05',
    time: '8:00 PM – 1:30 AM',
    doorsOpen: '7:30 PM',
    city: 'Bengaluru',
    venue: 'Atelier Saloon & Terrace',
    address: 'Lavelle Road, Shanthala Nagar, Bengaluru, KA 560001',
    startingPrice: 649,
    featured: false,
    status: 'published',
    availability: 'Available',
    ageLimit: '21+',
    dressCode: 'Tailored Casual / Warm Neutrals',
    capacity: 110,
    ticketsSold: 74,
    heroImage: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Slow Burn is designed for the discerning listener who appreciates deliberate tempos, vintage audio fidelity, and artisanal agave spirits. An unhurried evening inside an architectural atelier with leafy open courtyard.',
    highlights: [
      'Curated rare vinyl jazz, funk & deep balearic',
      'Artisanal Mezcal tasting flight stations',
      'Handcrafted charcuterie & warm flatbreads',
      'Seated listening lounge corners'
    ],
    lineup: [
      { name: 'Dev & The Crate', role: 'Rare 70s Japanese Jazz & Soul', time: '08:00 PM – 10:30 PM' },
      { name: 'DJ Mira', role: 'Downtempo Groove & Dub', time: '10:30 PM – 01:30 AM' }
    ],
    ticketTiers: [
      {
        id: 'sb-tasting',
        name: 'Tasting & Entry Pass',
        price: 649,
        description: 'Includes entry and a flight of 2 guided mezcal tastings.',
        perks: ['Full event access', 'Guided tasting flight', 'Appetizer pairing'],
        totalQuantity: 70,
        availableQuantity: 24
      },
      {
        id: 'sb-collector',
        name: 'Collector Reserve Pass',
        price: 949,
        description: 'Reserved fireside seating plus pairing menu.',
        perks: ['Priority lounge seating', '3 artisanal tastings', 'Small plate food board'],
        totalQuantity: 40,
        availableQuantity: 12
      }
    ],
    rules: [
      '21+ with verified identification.',
      'Conversational volume respected in the inner listening studio.'
    ]
  },
  {
    id: 'saturday-unfiltered',
    slug: 'saturday-unfiltered',
    title: 'SATURDAY UNFILTERED',
    edition: 'PRIVATE VILLA SHOWCASE',
    subtitle: 'Estate garden party with open-format selectors and natural wine.',
    category: 'Pop-up Experience',
    date: 'Saturday, 7 November 2026',
    isoDate: '2026-11-07',
    time: '6:00 PM – 2:00 AM',
    doorsOpen: '5:30 PM',
    city: 'Delhi',
    venue: 'The Orchard Courtyard Farmhouse',
    address: 'Sultanpur Estate Road, Mehrauli, New Delhi, DL 110030',
    startingPrice: 999,
    featured: false,
    status: 'published',
    availability: 'Selling Fast',
    ageLimit: '21+',
    dressCode: 'Modern Bohemian / Earth & Sand',
    capacity: 250,
    ticketsSold: 215,
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An open-air estate celebration hidden amidst the lush canopy of South Delhi farmlands. Featuring acoustic string lighting, woodfired pizzas on demand, and an eclectic rotation of selectors spinning soulful disco, French touch, and warm indie dance.',
    highlights: [
      'Acres of manicured lawns and lighted canopy',
      'Artisanal woodfired pizza oven on site',
      'Craft beer tap takeovers from microbreweries',
      'Shuttle service from nearby metro depot'
    ],
    lineup: [
      { name: 'Kabeer Sen', role: 'Nu-Disco & Funk', time: '06:30 PM – 09:00 PM' },
      { name: 'Tara & Jesse', role: 'French Touch & Indie Dance', time: '09:00 PM – 11:30 PM' },
      { name: 'Subliminal Trio', role: 'Late Night House', time: '11:30 PM – Close' }
    ],
    ticketTiers: [
      {
        id: 'su-early',
        name: 'Garden Access',
        price: 999,
        description: 'Entry + 1 craft pint and personal pizza slice voucher.',
        perks: ['Garden and villa access', '1 drink token', '1 woodfired pizza voucher'],
        totalQuantity: 150,
        availableQuantity: 20
      },
      {
        id: 'su-group',
        name: 'Gathering Quad (Pass for 4)',
        price: 3499,
        description: 'Group pass for 4 guests with shared wine carafe.',
        perks: ['Fast-track admission for 4 guests', 'Carafe of estate sangria or natural wine', 'Lawn blanket seating package'],
        totalQuantity: 25,
        availableQuantity: 5,
        badge: 'Best Value'
      }
    ],
    rules: [
      'Valet parking available at estate entrance.',
      'Outside food and beverages are not permitted.',
      'Smoking strictly restricted to designated garden alcoves.'
    ]
  },
  {
    id: 'rooftop-sessions',
    slug: 'rooftop-sessions',
    title: 'ROOFTOP SESSIONS',
    edition: 'SKYLINE ECHOES',
    subtitle: 'High-altitude panoramic dance with international guest selectors.',
    category: 'Social Gathering',
    date: 'Friday, 13 November 2026',
    isoDate: '2026-11-13',
    time: '9:00 PM – 3:00 AM',
    doorsOpen: '8:30 PM',
    city: 'Mumbai',
    venue: 'Highline Observatory 38',
    address: 'Worli Seaface Tower, Worli, Mumbai, MH 400018',
    startingPrice: 849,
    featured: false,
    status: 'published',
    availability: 'Available',
    ageLimit: '21+',
    dressCode: 'Sleek Chic / Dark Palette',
    capacity: 200,
    ticketsSold: 110,
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Thirty-eight floors above the Arabian Sea. Cool sea air, unobstructed panoramic lights of the Bandra-Worli Sea Link, and crisp progressive melodic house delivered through a precision d&b audiotechnik array.',
    highlights: [
      '38th floor open-air observation deck',
      'Direct unobstructed sea link views',
      'Curated gin & tonic lab bar',
      'Late-night artisan sliders'
    ],
    lineup: [
      { name: 'Arjun Vagale (Special Deep Set)', role: 'Headliner', time: '11:30 PM – 02:00 AM' },
      { name: 'Priya Sen', role: 'Support / Warmup', time: '09:00 PM – 11:30 PM' },
      { name: 'Cosmic Soul', role: 'Closing Groove', time: '02:00 AM – Close' }
    ],
    ticketTiers: [
      {
        id: 'rs-regular',
        name: 'Skyline Tier',
        price: 849,
        description: 'General rooftop admission with welcome cocktail.',
        perks: ['Rooftop observation access', '1 house beverage token', 'Express elevator access'],
        totalQuantity: 150,
        availableQuantity: 65
      },
      {
        id: 'rs-vip',
        name: 'Sea Link Lounge VIP',
        price: 1399,
        description: 'Elevated VIP deck access with premium table service.',
        perks: ['Reserved lounge deck', '2 premium drinks', 'Dedicated mixologist service', 'No wait elevator priority'],
        totalQuantity: 50,
        availableQuantity: 25,
        badge: 'Premium View'
      }
    ],
    rules: [
      'Smart casual / nightwear dress code enforced at door.',
      'Weather-protected covered terrace available in case of mist.',
      'Strictly 21+ with government photo identification.'
    ]
  }
];
