import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { EventsComponent } from './public/events/events.component';
import { EventDetailComponent } from './public/event-detail/event-detail.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { CheckoutComponent } from './public/checkout/checkout.component';
import { PaymentSuccessComponent } from './public/payment-success/payment-success.component';
import { TicketComponent } from './public/ticket/ticket.component';
import { LoginComponent } from './public/login/login.component';
import { UnauthorizedComponent } from './public/unauthorized/unauthorized.component';

import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './admin/events/admin-events.component';
import { AdminCreateEventComponent } from './admin/create-event/admin-create-event.component';
import { AdminRegistrationsComponent } from './admin/registrations/admin-registrations.component';
import { AdminPaymentsComponent } from './admin/payments/admin-payments.component';
import { AdminCheckinsComponent } from './admin/checkins/admin-checkins.component';
import { AdminAnalyticsComponent } from './admin/analytics/admin-analytics.component';
import { AdminQrScannerComponent } from './admin/qr-scanner/admin-qr-scanner.component';
import { DevLogsComponent } from './dev/logs/dev-logs.component';
import { adminAuthGuard } from './core/guards/admin-auth.guard';

export const routes: Routes = [
  // Public Routes (Accessible to everyone)
  { path: '', component: HomeComponent, title: 'SpotBukk — Nights Worth Remembering' },
  { path: 'events', component: EventsComponent, title: 'Discover Gatherings — SpotBukk' },
  { path: 'events/:id', component: EventDetailComponent, title: 'Gathering Experience — SpotBukk' },
  { path: 'events/:id/register', component: RegistrationComponent, title: 'Reserve Passes — SpotBukk' },
  { path: 'checkout', component: CheckoutComponent, title: 'Secure Checkout — SpotBukk' },
  { path: 'payment-success', component: PaymentSuccessComponent, title: "You're In — SpotBukk" },
  { path: 'ticket/:id', component: TicketComponent, title: 'Digital Pass — SpotBukk' },
  { path: 'login', component: LoginComponent, title: 'Sign In — SpotBukk' },
  { path: 'unauthorized', component: UnauthorizedComponent, title: '403 Forbidden — SpotBukk' },

  // Door Scanner Route (Protected: ADMIN ONLY)
  {
    path: 'check-in',
    component: AdminQrScannerComponent,
    canActivate: [adminAuthGuard],
    title: 'Door Verification Scanner — SpotBukk Admin'
  },

  // Admin Routes (Protected: STRICTLY ADMIN ONLY at parent and child level)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    canActivateChild: [adminAuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent, title: 'Organizer Dashboard — SpotBukk' },
      { path: 'scanner', component: AdminQrScannerComponent, canActivate: [adminAuthGuard], title: 'Live Camera QR Scanner — SpotBukk Admin' },
      { path: 'events', component: AdminEventsComponent, title: 'Events Calendar — SpotBukk Admin' },
      { path: 'events/create', component: AdminCreateEventComponent, title: 'Create Gathering — SpotBukk Admin' },
      { path: 'registrations', component: AdminRegistrationsComponent, title: 'Registrations Ledger — SpotBukk Admin' },
      { path: 'payments', component: AdminPaymentsComponent, title: 'Financial Audit — SpotBukk Admin' },
      { path: 'checkins', component: AdminCheckinsComponent, title: 'Door Clearance — SpotBukk Admin' },
      { path: 'analytics', component: AdminAnalyticsComponent, title: 'Intelligence & Analytics — SpotBukk Admin' }
    ]
  },

  // Developer Route
  { path: 'dev/logs', component: DevLogsComponent, title: 'Navigation Logs — SpotBukk Dev' },

  // Fallback
  { path: '**', redirectTo: '' }
];
