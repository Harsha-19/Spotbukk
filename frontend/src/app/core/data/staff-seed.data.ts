export interface StaffEvent {
  id: string;
  title: string;
  edition?: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  expectedGuests: number;
  checkedIn: number;
  bannerImage?: string;
}

export type StaffTicketStatus = 'ISSUED' | 'USED' | 'CANCELLED' | 'EXPIRED';

export interface StaffTicket {
  ticketCode: string;
  qrPayload?: string;
  eventId: string;
  eventTitle: string;
  guestName: string;
  passType: string;
  status: StaffTicketStatus;
  checkedInTime?: string;
  gate?: string;
}

export type ValidationOutcome =
  | 'VALID'
  | 'ALREADY_USED'
  | 'INVALID'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'WRONG_EVENT';

export interface ValidationResult {
  outcome: ValidationOutcome;
  ticket?: StaffTicket;
  checkedInTime?: string;
  gate?: string;
  message?: string;
  targetEventTitle?: string;
}

export interface CheckInActivityItem {
  id: string;
  time: string;
  guestName: string;
  passType: string;
  eventTitle: string;
  status: 'SUCCESS' | 'ALREADY USED' | 'CANCELLED' | 'INVALID' | 'WRONG EVENT';
  gate: string;
  ticketCode?: string;
}

export const STAFF_SEED_EVENTS: StaffEvent[] = [
  {
    id: 'staff-event-001',
    title: 'HOUSE OF SUNDOWN',
    edition: 'Vol. IV',
    date: 'Sunday, 26 October 2026',
    time: '4:30 PM – 11:30 PM',
    venue: 'Villa Solarium Clifftop',
    city: 'Goa',
    expectedGuests: 120,
    checkedIn: 78
  },
  {
    id: 'staff-event-002',
    title: 'ROOFTOP SESSIONS',
    edition: 'Autumn Gathering',
    date: 'Saturday, 24 October 2026',
    time: '7:00 PM – 12:00 AM',
    venue: 'Skyline House',
    city: 'Bengaluru',
    expectedGuests: 96,
    checkedIn: 61
  }
];

export const STAFF_SEED_TICKETS: StaffTicket[] = [
  {
    ticketCode: 'TKT-66381-SD',
    qrPayload: 'SB-PASS:TKT-66381-SD',
    eventId: 'staff-event-001',
    eventTitle: 'HOUSE OF SUNDOWN',
    guestName: 'Pranav Joshi',
    passType: 'Full Gathering Pass',
    status: 'ISSUED'
  },
  {
    ticketCode: 'TKT-77519-RS',
    qrPayload: 'SB-PASS:TKT-77519-RS',
    eventId: 'staff-event-002',
    eventTitle: 'ROOFTOP SESSIONS',
    guestName: 'Meera Nambiar',
    passType: 'Premium Access',
    status: 'ISSUED'
  },
  {
    ticketCode: 'TKT-44021-USED',
    qrPayload: 'SB-PASS:TKT-44021-USED',
    eventId: 'staff-event-001',
    eventTitle: 'HOUSE OF SUNDOWN',
    guestName: 'Rohit Nair',
    passType: 'Full Gathering Pass',
    status: 'USED',
    checkedInTime: '5:42 PM',
    gate: 'Main Entrance'
  },
  {
    ticketCode: 'TKT-99102-CANCEL',
    qrPayload: 'SB-PASS:TKT-99102-CANCEL',
    eventId: 'staff-event-001',
    eventTitle: 'HOUSE OF SUNDOWN',
    guestName: 'Ananya Rao',
    passType: 'VIP Pass',
    status: 'CANCELLED'
  },
  {
    ticketCode: 'TKT-33108-EXP',
    qrPayload: 'SB-PASS:TKT-33108-EXP',
    eventId: 'staff-event-001',
    eventTitle: 'HOUSE OF SUNDOWN',
    guestName: 'Vikram Malhotra',
    passType: 'Early Access Pass',
    status: 'EXPIRED'
  },
  {
    ticketCode: 'TKT-88412-DIFF',
    qrPayload: 'SB-PASS:TKT-88412-DIFF',
    eventId: 'staff-event-002',
    eventTitle: 'ROOFTOP SESSIONS',
    guestName: 'Kavya Pillai',
    passType: 'VIP Pass',
    status: 'ISSUED'
  }
];

export const STAFF_SEED_ACTIVITIES: CheckInActivityItem[] = [
  {
    id: 'act-1',
    time: '5:42 PM',
    guestName: 'Meera Nambiar',
    passType: 'Full Gathering Pass',
    eventTitle: 'HOUSE OF SUNDOWN',
    status: 'SUCCESS',
    gate: 'Main Entrance',
    ticketCode: 'TKT-55102-MN'
  },
  {
    id: 'act-2',
    time: '5:38 PM',
    guestName: 'Pranav Joshi',
    passType: 'Full Gathering Pass',
    eventTitle: 'HOUSE OF SUNDOWN',
    status: 'SUCCESS',
    gate: 'Main Entrance',
    ticketCode: 'TKT-66381-SD'
  },
  {
    id: 'act-3',
    time: '5:31 PM',
    guestName: 'Rohit Nair',
    passType: 'Early Access Pass',
    eventTitle: 'HOUSE OF SUNDOWN',
    status: 'ALREADY USED',
    gate: 'Main Entrance',
    ticketCode: 'TKT-44021-USED'
  },
  {
    id: 'act-4',
    time: '5:24 PM',
    guestName: 'Ananya Rao',
    passType: 'VIP Pass',
    eventTitle: 'HOUSE OF SUNDOWN',
    status: 'SUCCESS',
    gate: 'Gate 02',
    ticketCode: 'TKT-22910-AR'
  }
];
