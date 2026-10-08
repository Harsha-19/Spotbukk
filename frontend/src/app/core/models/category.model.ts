import { EventItem } from './event.model';

export interface EventCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  featured: boolean;
  order: number;
  events?: EventItem[];
}
