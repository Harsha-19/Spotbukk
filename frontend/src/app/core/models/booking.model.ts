export type PaymentMethod = 'UPI' | 'Card' | 'Net Banking';
export type PaymentStatus = 'Successful' | 'Pending' | 'Failed' | 'Refunded';

export interface BookingAttendee {
  fullName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string; // e.g. NOC-89241
  ticketCode: string; // e.g. TKT-9823-X
  eventId: string;
  eventTitle: string;
  eventEdition: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  heroImage: string;
  
  ticketTierId: string;
  ticketTierName: string;
  ticketPrice: number;
  quantity: number;
  subtotal: number;
  convenienceFee: number;
  totalAmount: number;

  customer: BookingAttendee;
  additionalGuests: string[];
  specialRequests?: string;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  bookingDate: string;

  checkedIn: boolean;
  checkedInTime?: string;
  qrPayload: string;
}

export interface CheckInScanResult {
  status: 'verified' | 'used' | 'invalid';
  message: string;
  ticket?: Booking;
  scanTime: string;
  gate: string;
}
