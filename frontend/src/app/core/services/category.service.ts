import { Injectable, signal, computed, inject } from '@angular/core';
import { EventCategory } from '../models/category.model';
import { EventItem } from '../models/event.model';
import { CATEGORIES_SEED_DATA, ALL_CATEGORY_EVENTS } from '../data/category-seed.data';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly eventService = inject(EventService);

  readonly categories = signal<EventCategory[]>(CATEGORIES_SEED_DATA);

  // Top 5 featured categories in exact order
  readonly featuredCategories = computed(() =>
    this.categories()
      .filter(c => c.featured)
      .sort((a, b) => a.order - b.order)
  );

  // All 12 categories in order
  readonly allCategories = computed(() =>
    [...this.categories()].sort((a, b) => a.order - b.order)
  );

  getCategoryBySlug(slug: string): EventCategory | undefined {
    const s = slug.toLowerCase().trim();
    return this.categories().find(c => c.slug.toLowerCase() === s || c.id.toLowerCase() === s);
  }

  getEventsByCategory(categorySlug: string): EventItem[] {
    const cat = this.getCategoryBySlug(categorySlug);
    const catName = cat ? cat.name.toLowerCase() : categorySlug.toLowerCase().replace(/-/g, ' ');

    // Collect all events from both EventService (live/stored) and seed events
    const allKnownEvents = [...this.eventService.events(), ...ALL_CATEGORY_EVENTS];
    
    // Deduplicate by id
    const uniqueEventsMap = new Map<string, EventItem>();
    for (const ev of allKnownEvents) {
      if (!uniqueEventsMap.has(ev.id)) {
        uniqueEventsMap.set(ev.id, ev);
      }
    }

    const uniqueEvents = Array.from(uniqueEventsMap.values());

    return uniqueEvents.filter(ev => {
      const evCat = ev.category.toLowerCase().trim();
      if (cat && evCat === cat.name.toLowerCase().trim()) return true;
      if (cat && evCat === cat.id.toLowerCase().trim()) return true;
      if (cat && evCat === cat.slug.toLowerCase().trim()) return true;
      // Partial matching for edge cases like 'College Fest / Party' vs 'College Fest'
      if (cat && (evCat.includes(cat.slug) || cat.name.toLowerCase().includes(evCat))) return true;
      return evCat === catName;
    });
  }
}
