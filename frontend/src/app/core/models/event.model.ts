export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  totalQuantity: number;
  availableQuantity: number;
  badge?: string;
  soldOut?: boolean;
}

export interface LineupArtist {
  name: string;
  role: string;
  time: string;
  set?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  edition: string;
  subtitle: string;
  category: 'House Party' | 'Rooftop Sessions' | 'Intimate DJ' | 'Private Gathering' | 'Social Gathering' | 'Pop-up Experience';
  date: string;
  isoDate: string;
  time: string;
  doorsOpen: string;
  city: 'Bengaluru' | 'Mumbai' | 'Goa' | 'Delhi';
  venue: string;
  address: string;
  startingPrice: number;
  featured: boolean;
  status: 'published' | 'draft' | 'sold-out';
  availability: 'Available' | 'Selling Fast' | 'Limited Spots' | 'Sold Out';
  ageLimit: string;
  dressCode: string;
  capacity: number;
  ticketsSold: number;
  heroImage: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  lineup: LineupArtist[];
  ticketTiers: TicketTier[];
  rules: string[];
}
