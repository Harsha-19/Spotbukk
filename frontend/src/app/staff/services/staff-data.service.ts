import { Injectable, signal, computed } from '@angular/core';
import {
  StaffEvent,
  StaffTicket,
  CheckInActivityItem,
  ValidationResult,
  ValidationOutcome,
  STAFF_SEED_EVENTS,
  STAFF_SEED_TICKETS,
  STAFF_SEED_ACTIVITIES
} from '../../core/data/staff-seed.data';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {
  private readonly STORAGE_EVENTS_KEY = 'spotbukk_staff_events';
  private readonly STORAGE_TICKETS_KEY = 'spotbukk_staff_tickets';
  private readonly STORAGE_ACTIVITIES_KEY = 'spotbukk_staff_activities';

  readonly events = signal<StaffEvent[]>(this.loadInitialEvents());
  readonly tickets = signal<StaffTicket[]>(this.loadInitialTickets());
  readonly activities = signal<CheckInActivityItem[]>(this.loadInitialActivities());

  // Dynamic Dashboard Stats
  readonly totalEvents = computed(() => this.events().length);
  readonly expectedGuests = computed(() =>
    this.events().reduce((sum, e) => sum + e.expectedGuests, 0)
  );
  readonly checkedInGuests = computed(() =>
    this.events().reduce((sum, e) => sum + e.checkedIn, 0)
  );
  readonly remainingGuests = computed(() =>
    Math.max(0, this.expectedGuests() - this.checkedInGuests())
  );

  private loadInitialEvents(): StaffEvent[] {
    const stored = localStorage.getItem(this.STORAGE_EVENTS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return JSON.parse(JSON.stringify(STAFF_SEED_EVENTS));
  }

  private loadInitialTickets(): StaffTicket[] {
    const stored = localStorage.getItem(this.STORAGE_TICKETS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return JSON.parse(JSON.stringify(STAFF_SEED_TICKETS));
  }

  private loadInitialActivities(): CheckInActivityItem[] {
    const stored = localStorage.getItem(this.STORAGE_ACTIVITIES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return JSON.parse(JSON.stringify(STAFF_SEED_ACTIVITIES));
  }

  private saveEvents(evs: StaffEvent[]): void {
    this.events.set(evs);
    localStorage.setItem(this.STORAGE_EVENTS_KEY, JSON.stringify(evs));
  }

  private saveTickets(tkts: StaffTicket[]): void {
    this.tickets.set(tkts);
    localStorage.setItem(this.STORAGE_TICKETS_KEY, JSON.stringify(tkts));
  }

  private saveActivities(acts: CheckInActivityItem[]): void {
    this.activities.set(acts);
    localStorage.setItem(this.STORAGE_ACTIVITIES_KEY, JSON.stringify(acts));
  }

  getAssignedEvents(): StaffEvent[] {
    return this.events();
  }

  getEventById(id: string): StaffEvent | undefined {
    return this.events().find(e => e.id === id);
  }

  /**
   * Validates a ticket code or QR payload
   * @param rawInput ticket code or QR payload string
   * @param targetEventId optional ID of the active check-in event
   */
  validateTicket(rawInput: string, targetEventId?: string): ValidationResult {
    if (!rawInput || !rawInput.trim()) {
      return {
        outcome: 'INVALID',
        message: 'This ticket could not be validated.'
      };
    }

    const cleanInput = rawInput.trim();
    // Normalize if contains prefix e.g. "SB-PASS:TKT-1234" or JSON payload
    let lookupCode = cleanInput.toUpperCase();
    if (lookupCode.includes(':')) {
      const parts = lookupCode.split(':');
      lookupCode = parts[parts.length - 1].trim();
    }

    const ticket = this.tickets().find(
      t =>
        t.ticketCode.toUpperCase() === lookupCode ||
        (t.qrPayload && t.qrPayload.toUpperCase() === cleanInput.toUpperCase()) ||
        t.ticketCode.toUpperCase() === cleanInput.toUpperCase()
    );

    // 1. Unknown / Unregistered ticket
    if (!ticket) {
      return {
        outcome: 'INVALID',
        message: 'This ticket could not be validated.'
      };
    }

    // 2. Event Mismatch Check
    if (targetEventId && ticket.eventId !== targetEventId) {
      const targetEvent = this.getEventById(targetEventId);
      return {
        outcome: 'WRONG_EVENT',
        ticket,
        message: 'This ticket belongs to another event.',
        targetEventTitle: targetEvent?.title
      };
    }

    // 3. Status checks
    if (ticket.status === 'USED') {
      return {
        outcome: 'ALREADY_USED',
        ticket,
        checkedInTime: ticket.checkedInTime || '5:42 PM',
        gate: ticket.gate || 'Main Entrance',
        message: 'This ticket has already been checked in.'
      };
    }

    if (ticket.status === 'CANCELLED') {
      return {
        outcome: 'CANCELLED',
        ticket,
        message: 'This booking has been cancelled.'
      };
    }

    if (ticket.status === 'EXPIRED') {
      return {
        outcome: 'EXPIRED',
        ticket,
        message: 'This ticket is no longer valid.'
      };
    }

    // 4. Valid Pass ready for check-in
    return {
      outcome: 'VALID',
      ticket,
      message: 'READY FOR ENTRY'
    };
  }

  /**
   * Confirms check-in for a valid ticket
   */
  confirmCheckIn(ticket: StaffTicket, gate = 'Main Entrance'): { success: boolean; checkedInTime: string; gate: string } {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // 1. Mark ticket as USED
    const updatedTickets = this.tickets().map(t => {
      if (t.ticketCode === ticket.ticketCode) {
        return {
          ...t,
          status: 'USED' as const,
          checkedInTime: timeStr,
          gate
        };
      }
      return t;
    });
    this.saveTickets(updatedTickets);

    // 2. Increment checked-in count for the event
    const updatedEvents = this.events().map(e => {
      if (e.id === ticket.eventId) {
        return {
          ...e,
          checkedIn: e.checkedIn + 1
        };
      }
      return e;
    });
    this.saveEvents(updatedEvents);

    // 3. Prepend to activity log
    const newActivity: CheckInActivityItem = {
      id: 'act-' + Date.now(),
      time: timeStr,
      guestName: ticket.guestName,
      passType: ticket.passType,
      eventTitle: ticket.eventTitle,
      status: 'SUCCESS',
      gate,
      ticketCode: ticket.ticketCode
    };
    this.saveActivities([newActivity, ...this.activities()]);

    return {
      success: true,
      checkedInTime: timeStr,
      gate
    };
  }

  /**
   * Records a non-admitted scan attempt in the activity stream
   */
  recordFailedAttempt(
    guestName: string,
    passType: string,
    eventTitle: string,
    status: 'ALREADY USED' | 'CANCELLED' | 'INVALID' | 'WRONG EVENT',
    gate = 'Main Entrance',
    ticketCode?: string
  ): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const newActivity: CheckInActivityItem = {
      id: 'act-' + Date.now(),
      time: timeStr,
      guestName,
      passType,
      eventTitle,
      status,
      gate,
      ticketCode
    };
    this.saveActivities([newActivity, ...this.activities()]);
  }

  /**
   * Resets local seed data to pristine state (useful for test restarts)
   */
  resetToDefaultSeed(): void {
    localStorage.removeItem(this.STORAGE_EVENTS_KEY);
    localStorage.removeItem(this.STORAGE_TICKETS_KEY);
    localStorage.removeItem(this.STORAGE_ACTIVITIES_KEY);
    this.events.set(JSON.parse(JSON.stringify(STAFF_SEED_EVENTS)));
    this.tickets.set(JSON.parse(JSON.stringify(STAFF_SEED_TICKETS)));
    this.activities.set(JSON.parse(JSON.stringify(STAFF_SEED_ACTIVITIES)));
  }
}
