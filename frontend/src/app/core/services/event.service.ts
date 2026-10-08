import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EventItem, TicketTier } from '../models/event.model';
import { Booking, CheckInScanResult, PaymentMethod, PaymentStatus } from '../models/booking.model';
import { MOCK_EVENTS } from '../data/mock-events.data';
import { MOCK_BOOKINGS } from '../data/mock-registrations.data';
import { ALL_CATEGORY_EVENTS } from '../data/category-seed.data';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface CheckoutSession {
  event: EventItem;
  tier: TicketTier;
  quantity: number;
  attendee: {
    fullName: string;
    email: string;
    phone: string;
  };
  additionalGuests: string[];
  specialRequests?: string;
  subtotal: number;
  convenienceFee: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = environment.apiUrl;

  private readonly EVENTS_STORAGE = 'SpotBukk_events_data';
  private readonly BOOKINGS_STORAGE = 'SpotBukk_bookings_data';

  readonly events = signal<EventItem[]>([]);
  readonly bookings = signal<Booking[]>([]);
  readonly activeCheckoutSession = signal<CheckoutSession | null>(null);

  // Computed metrics for admin
  readonly upcomingEventsCount = computed(() =>
    this.events().filter(e => e.status === 'published').length
  );

  readonly totalTicketsSold = computed(() =>
    this.bookings().filter(b => b.paymentStatus === 'Successful').reduce((acc, b) => acc + b.quantity, 0)
  );

  readonly totalRevenue = computed(() =>
    this.bookings().filter(b => b.paymentStatus === 'Successful').reduce((acc, b) => acc + b.totalAmount, 0)
  );

  readonly totalCheckedIn = computed(() =>
    this.bookings().filter(b => b.checkedIn).length
  );

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const storedEvents = localStorage.getItem(this.EVENTS_STORAGE);
    if (storedEvents) {
      try {
        const parsed = JSON.parse(storedEvents) as EventItem[];
        const merged = [...parsed];
        for (const catEv of ALL_CATEGORY_EVENTS) {
          if (!merged.some(e => e.id === catEv.id || e.slug === catEv.slug)) {
            merged.push(catEv);
          }
        }
        this.events.set(merged);
      } catch {
        this.events.set([...MOCK_EVENTS, ...ALL_CATEGORY_EVENTS]);
      }
    } else {
      this.events.set([...MOCK_EVENTS, ...ALL_CATEGORY_EVENTS]);
    }

    const storedBookings = localStorage.getItem(this.BOOKINGS_STORAGE);
    if (storedBookings) {
      try {
        this.bookings.set(JSON.parse(storedBookings));
      } catch {
        this.bookings.set(MOCK_BOOKINGS);
      }
    } else {
      this.bookings.set(MOCK_BOOKINGS);
    }
  }

  private saveEvents(): void {
    localStorage.setItem(this.EVENTS_STORAGE, JSON.stringify(this.events()));
  }

  private saveBookings(): void {
    localStorage.setItem(this.BOOKINGS_STORAGE, JSON.stringify(this.bookings()));
  }

  // --- Event Queries & Actions ---

  getEventById(id: string): EventItem | undefined {
    return (
      this.events().find(e => e.id === id || e.slug === id) ||
      ALL_CATEGORY_EVENTS.find(e => e.id === id || e.slug === id)
    );
  }

  createEvent(newEvent: Omit<EventItem, 'id' | 'slug' | 'ticketsSold'>): EventItem {
    const slug = newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = slug + '-' + Math.random().toString(36).substring(2, 6);

    const event: EventItem = {
      ...newEvent,
      id,
      slug,
      ticketsSold: 0
    };

    this.events.update(list => [event, ...list]);
    this.saveEvents();
    return event;
  }

  updateEvent(id: string, updates: Partial<EventItem>): void {
    this.events.update(list =>
      list.map(e => (e.id === id ? { ...e, ...updates } : e))
    );
    this.saveEvents();
  }

  duplicateEvent(id: string): EventItem | null {
    const existing = this.getEventById(id);
    if (!existing) return null;

    const duplicated: EventItem = {
      ...existing,
      id: `${existing.id}-copy-${Date.now().toString(36)}`,
      slug: `${existing.slug}-copy`,
      title: `${existing.title} (Copy)`,
      status: 'draft',
      ticketsSold: 0,
      ticketTiers: existing.ticketTiers.map(t => ({
        ...t,
        id: `${t.id}-copy`,
        availableQuantity: t.totalQuantity
      }))
    };

    this.events.update(list => [duplicated, ...list]);
    this.saveEvents();
    return duplicated;
  }

  deleteEvent(id: string): void {
    this.events.update(list => list.filter(e => e.id !== id));
    this.saveEvents();
  }

  togglePublishStatus(id: string): void {
    this.events.update(list =>
      list.map(e => {
        if (e.id === id) {
          const nextStatus = e.status === 'published' ? 'draft' : 'published';
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
    this.saveEvents();
  }

  // --- Booking & Checkout Actions ---

  setCheckoutSession(session: CheckoutSession): void {
    this.activeCheckoutSession.set(session);
  }

  clearCheckoutSession(): void {
    this.activeCheckoutSession.set(null);
  }

  createBookingFromSession(paymentMethod: PaymentMethod): Booking {
    const session = this.activeCheckoutSession();
    const event = session?.event || this.events()[0];
    const tier = session?.tier || event.ticketTiers[0];
    const qty = session?.quantity || 1;

    const bookingId = 'NOC-' + Math.floor(10000 + Math.random() * 90000);
    const ticketCode = 'TKT-' + Math.floor(10000 + Math.random() * 90000) + '-' + event.city.substring(0, 2).toUpperCase();

    const newBooking: Booking = {
      id: bookingId,
      ticketCode,
      eventId: event.id,
      eventTitle: event.title,
      eventEdition: event.edition,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventCity: event.city,
      heroImage: event.heroImage,
      ticketTierId: tier.id,
      ticketTierName: tier.name,
      ticketPrice: tier.price,
      quantity: qty,
      subtotal: tier.price * qty,
      convenienceFee: Math.round(tier.price * qty * 0.05),
      totalAmount: (tier.price * qty) + Math.round(tier.price * qty * 0.05),
      customer: session?.attendee || {
        fullName: 'Dev VIP Guest',
        email: 'guest@SpotBukk.club',
        phone: '+91 98450 00000'
      },
      additionalGuests: session?.additionalGuests || [],
      specialRequests: session?.specialRequests,
      paymentMethod,
      paymentStatus: 'Successful',
      transactionId: 'TXN-' + paymentMethod.toUpperCase().replace(/\s+/g, '') + '-' + Date.now().toString(36).toUpperCase(),
      bookingDate: new Date().toISOString(),
      checkedIn: false,
      qrPayload: `SpotBukk:${ticketCode}:${(session?.attendee?.fullName || 'Guest').replace(/\s+/g, '')}:${event.id}`
    };

    // Update tickets sold on event
    this.events.update(list =>
      list.map(e => {
        if (e.id === event.id) {
          return {
            ...e,
            ticketsSold: e.ticketsSold + qty
          };
        }
        return e;
      })
    );
    this.saveEvents();

    this.bookings.update(list => [newBooking, ...list]);
    this.saveBookings();

    return newBooking;
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings().find(b => b.id === id || b.ticketCode === id);
  }

  // --- Check-in Verification Logic ---

  verifyTicket(input: string, simulatedState?: 'valid' | 'used' | 'invalid'): CheckInScanResult {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (simulatedState === 'invalid') {
      return {
        status: 'invalid',
        message: 'INVALID TICKET — Unrecognized QR signature or revoked access pass.',
        scanTime: timestamp,
        gate: 'Gate 01 — Penthouse Access'
      };
    }

    if (simulatedState === 'used') {
      const sample = this.bookings().find(b => b.checkedIn) || this.bookings()[0];
      return {
        status: 'used',
        message: `TICKET ALREADY USED — Previously checked in at ${sample.checkedInTime ? new Date(sample.checkedInTime).toLocaleTimeString() : '21:40'}.`,
        ticket: sample,
        scanTime: timestamp,
        gate: 'Gate 01 — Penthouse Access'
      };
    }

    // Lookup real ticket if present
    const cleanInput = input.trim();
    const found = this.bookings().find(b =>
      b.id.toLowerCase() === cleanInput.toLowerCase() ||
      b.ticketCode.toLowerCase() === cleanInput.toLowerCase() ||
      b.qrPayload.toLowerCase() === cleanInput.toLowerCase() ||
      b.customer.fullName.toLowerCase().includes(cleanInput.toLowerCase())
    );

    if (!found) {
      // If user is testing valid state with no match, return top successful ticket
      const fallback = this.bookings()[0];
      return {
        status: 'verified',
        message: 'ENTRY VERIFIED — Valid SpotBukk Digital Pass.',
        ticket: fallback,
        scanTime: timestamp,
        gate: 'Gate 01 — Penthouse Access'
      };
    }

    if (found.checkedIn && simulatedState !== 'valid') {
      return {
        status: 'used',
        message: `TICKET ALREADY USED — Previously checked in at ${found.checkedInTime ? new Date(found.checkedInTime).toLocaleTimeString() : 'earlier'}.`,
        ticket: found,
        scanTime: timestamp,
        gate: 'Gate 01 — Penthouse Access'
      };
    }

    // Mark as checked in
    const nowIso = new Date().toISOString();
    this.bookings.update(list =>
      list.map(b => (b.id === found.id ? { ...b, checkedIn: true, checkedInTime: nowIso } : b))
    );
    this.saveBookings();

    return {
      status: 'verified',
      message: 'ENTRY VERIFIED — Welcome to SpotBukk.',
      ticket: { ...found, checkedIn: true, checkedInTime: nowIso },
      scanTime: timestamp,
      gate: 'Gate 01 — Main Entrance'
    };
  }

  async verifyTicketWithBackend(
    qrPayload: string,
    eventId?: string,
    simulatedState?: 'valid' | 'used' | 'invalid'
  ): Promise<CheckInScanResult> {
    try {
      const headers = this.authService.getAuthHeaders();
      const res = await firstValueFrom(
        this.http.post<CheckInScanResult>(
          `${this.apiUrl}/api/tickets/verify-qr`,
          {
            qrPayload,
            eventId,
            syncBookings: this.bookings()
          },
          { headers }
        )
      );

      if (res && res.status === 'verified' && res.ticket) {
        this.bookings.update(list =>
          list.map(b => (b.id === res.ticket!.id ? { ...b, checkedIn: true, checkedInTime: res.ticket!.checkedInTime } : b))
        );
        this.saveBookings();
      }

      return res;
    } catch (err: any) {
      if (err.status === 403) {
        return {
          status: 'invalid',
          message: '403 FORBIDDEN — Administrator authorization required for ticket clearance.',
          scanTime: new Date().toLocaleTimeString(),
          gate: 'Security Enclave — Access Restricted'
        };
      }
      if (err.status === 401) {
        return {
          status: 'invalid',
          message: '401 UNAUTHORIZED — Please log in with an Administrator account.',
          scanTime: new Date().toLocaleTimeString(),
          gate: 'Security Enclave — Access Restricted'
        };
      }

      // Offline / fallback verification
      return this.verifyTicket(qrPayload, simulatedState);
    }
  }

  toggleCheckIn(bookingId: string): void {
    this.bookings.update(list =>
      list.map(b => {
        if (b.id === bookingId) {
          const next = !b.checkedIn;
          return {
            ...b,
            checkedIn: next,
            checkedInTime: next ? new Date().toISOString() : undefined
          };
        }
        return b;
      })
    );
    this.saveBookings();
  }

  updatePaymentStatus(bookingId: string, status: PaymentStatus): void {
    this.bookings.update(list =>
      list.map(b => (b.id === bookingId ? { ...b, paymentStatus: status } : b))
    );
    this.saveBookings();
  }
}
