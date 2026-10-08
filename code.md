# SpotBukk — Complete Source Code Repository

> This document consolidates all source code files across the SpotBukk platform (`backend/`, `frontend/`, and `Doc/`).

**Generated at:** 2026-10-08T05:12:37.919Z  
**Total Files:** 67

---

## 📑 Table of Contents

- [.gitignore](#gitignore)
- [backend/.env.example](#backend-env-example)
- [backend/.gitignore](#backend-gitignore)
- [backend/mock-registrations.js](#backend-mock-registrations-js)
- [backend/package.json](#backend-package-json)
- [backend/server.js](#backend-server-js)
- [Doc/Noctra – Platform Documentation.html](#doc-noctra-platform-documentation-html)
- [Doc/Noctra – Server & Architecture Guide.html](#doc-noctra-server-architecture-guide-html)
- [frontend/.editorconfig](#frontend-editorconfig)
- [frontend/.gitignore](#frontend-gitignore)
- [frontend/.prettierrc](#frontend-prettierrc)
- [frontend/angular.json](#frontend-angular-json)
- [frontend/package.json](#frontend-package-json)
- [frontend/README.md](#frontend-readme-md)
- [frontend/src/app/admin/analytics/admin-analytics.component.ts](#frontend-src-app-admin-analytics-admin-analytics-component-ts)
- [frontend/src/app/admin/checkins/admin-checkins.component.ts](#frontend-src-app-admin-checkins-admin-checkins-component-ts)
- [frontend/src/app/admin/create-event/admin-create-event.component.ts](#frontend-src-app-admin-create-event-admin-create-event-component-ts)
- [frontend/src/app/admin/dashboard/admin-dashboard.component.ts](#frontend-src-app-admin-dashboard-admin-dashboard-component-ts)
- [frontend/src/app/admin/events/admin-events.component.ts](#frontend-src-app-admin-events-admin-events-component-ts)
- [frontend/src/app/admin/layout/admin-layout.component.ts](#frontend-src-app-admin-layout-admin-layout-component-ts)
- [frontend/src/app/admin/payments/admin-payments.component.ts](#frontend-src-app-admin-payments-admin-payments-component-ts)
- [frontend/src/app/admin/qr-scanner/admin-qr-scanner.component.ts](#frontend-src-app-admin-qr-scanner-admin-qr-scanner-component-ts)
- [frontend/src/app/admin/registrations/admin-registrations.component.ts](#frontend-src-app-admin-registrations-admin-registrations-component-ts)
- [frontend/src/app/app.config.ts](#frontend-src-app-app-config-ts)
- [frontend/src/app/app.html](#frontend-src-app-app-html)
- [frontend/src/app/app.routes.ts](#frontend-src-app-app-routes-ts)
- [frontend/src/app/app.scss](#frontend-src-app-app-scss)
- [frontend/src/app/app.ts](#frontend-src-app-app-ts)
- [frontend/src/app/core/data/mock-events.data.ts](#frontend-src-app-core-data-mock-events-data-ts)
- [frontend/src/app/core/data/mock-registrations.data.ts](#frontend-src-app-core-data-mock-registrations-data-ts)
- [frontend/src/app/core/guards/admin-auth.guard.ts](#frontend-src-app-core-guards-admin-auth-guard-ts)
- [frontend/src/app/core/guards/user-auth.guard.ts](#frontend-src-app-core-guards-user-auth-guard-ts)
- [frontend/src/app/core/models/booking.model.ts](#frontend-src-app-core-models-booking-model-ts)
- [frontend/src/app/core/models/event.model.ts](#frontend-src-app-core-models-event-model-ts)
- [frontend/src/app/core/models/theme.model.ts](#frontend-src-app-core-models-theme-model-ts)
- [frontend/src/app/core/models/user.model.ts](#frontend-src-app-core-models-user-model-ts)
- [frontend/src/app/core/services/auth.service.ts](#frontend-src-app-core-services-auth-service-ts)
- [frontend/src/app/core/services/event.service.ts](#frontend-src-app-core-services-event-service-ts)
- [frontend/src/app/core/services/navigation-logger.service.ts](#frontend-src-app-core-services-navigation-logger-service-ts)
- [frontend/src/app/core/services/payment.service.ts](#frontend-src-app-core-services-payment-service-ts)
- [frontend/src/app/core/services/theme.service.ts](#frontend-src-app-core-services-theme-service-ts)
- [frontend/src/app/core/services/toast.service.ts](#frontend-src-app-core-services-toast-service-ts)
- [frontend/src/app/dev/logs/dev-logs.component.ts](#frontend-src-app-dev-logs-dev-logs-component-ts)
- [frontend/src/app/public/check-in/check-in.component.ts](#frontend-src-app-public-check-in-check-in-component-ts)
- [frontend/src/app/public/checkout/checkout.component.ts](#frontend-src-app-public-checkout-checkout-component-ts)
- [frontend/src/app/public/event-detail/event-detail.component.ts](#frontend-src-app-public-event-detail-event-detail-component-ts)
- [frontend/src/app/public/events/events.component.ts](#frontend-src-app-public-events-events-component-ts)
- [frontend/src/app/public/home/home.component.ts](#frontend-src-app-public-home-home-component-ts)
- [frontend/src/app/public/login/login.component.ts](#frontend-src-app-public-login-login-component-ts)
- [frontend/src/app/public/payment-success/payment-success.component.ts](#frontend-src-app-public-payment-success-payment-success-component-ts)
- [frontend/src/app/public/registration/registration.component.ts](#frontend-src-app-public-registration-registration-component-ts)
- [frontend/src/app/public/ticket/ticket.component.ts](#frontend-src-app-public-ticket-ticket-component-ts)
- [frontend/src/app/public/unauthorized/unauthorized.component.ts](#frontend-src-app-public-unauthorized-unauthorized-component-ts)
- [frontend/src/app/shared/components/event-card/event-card.component.ts](#frontend-src-app-shared-components-event-card-event-card-component-ts)
- [frontend/src/app/shared/components/footer/footer.component.ts](#frontend-src-app-shared-components-footer-footer-component-ts)
- [frontend/src/app/shared/components/header/header.component.ts](#frontend-src-app-shared-components-header-header-component-ts)
- [frontend/src/app/shared/components/qr-code/qr-code.component.ts](#frontend-src-app-shared-components-qr-code-qr-code-component-ts)
- [frontend/src/app/shared/components/theme-switcher/theme-switcher.component.ts](#frontend-src-app-shared-components-theme-switcher-theme-switcher-component-ts)
- [frontend/src/app/shared/components/toast/toast.component.ts](#frontend-src-app-shared-components-toast-toast-component-ts)
- [frontend/src/environments/environment.ts](#frontend-src-environments-environment-ts)
- [frontend/src/index.html](#frontend-src-index-html)
- [frontend/src/main.ts](#frontend-src-main-ts)
- [frontend/src/styles.scss](#frontend-src-styles-scss)
- [frontend/tsconfig.app.json](#frontend-tsconfig-app-json)
- [frontend/tsconfig.json](#frontend-tsconfig-json)
- [frontend/tsconfig.spec.json](#frontend-tsconfig-spec-json)
- [README.md](#readme-md)

---


<a id="gitignore"></a>
## `.gitignore`
[↑ Back to Top](#-table-of-contents)

```text
Frontend_sample.mp4

```


<a id="backend-env-example"></a>
## `backend/.env.example`
[↑ Back to Top](#-table-of-contents)

```bash
# Razorpay Test Mode Credentials
RAZORPAY_KEY_ID=rzp_test_TkwHgGeuy1OFaE
RAZORPAY_KEY_SECRET=MBTFaCx0gnbV7aDdpUgBQu6z

# Server Port
PORT=3000

# Allowed CORS Origin
CLIENT_URL=http://localhost:4200

```


<a id="backend-gitignore"></a>
## `backend/.gitignore`
[↑ Back to Top](#-table-of-contents)

```text
node_modules/
.env
*.csv
.DS_Store
npm-debug.log*

```


<a id="backend-mock-registrations-js"></a>
## `backend/mock-registrations.js`
[↑ Back to Top](#-table-of-contents)

```javascript
const MOCK_BOOKINGS = [
  {
    id: 'NOC-89241',
    ticketCode: 'TKT-89241-AD',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-regular',
    ticketTierName: 'Regular Admission',
    ticketPrice: 699,
    quantity: 2,
    subtotal: 1398,
    convenienceFee: 100,
    totalAmount: 1498,
    customer: {
      fullName: 'Rohan Mehra',
      email: 'rohan.mehra@gmail.com',
      phone: '+91 98450 18239'
    },
    additionalGuests: ['Natasha Roy'],
    specialRequests: 'Arriving together around 10:15 PM',
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-90182749',
    bookingDate: '2026-10-18T19:42:10Z',
    checkedIn: true,
    checkedInTime: '2026-10-24T22:14:00Z',
    qrPayload: 'SpotBukk:TKT-89241-AD:RohanMehra:after-dark-04'
  },
  {
    id: 'NOC-77312',
    ticketCode: 'TKT-77312-VIP',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-vip',
    ticketTierName: 'VIP Backstage & Loft',
    ticketPrice: 999,
    quantity: 1,
    subtotal: 999,
    convenienceFee: 50,
    totalAmount: 1049,
    customer: {
      fullName: 'Dr. Siddharth Verma',
      email: 'siddharth.v@healthcorp.in',
      phone: '+91 99201 44589'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-88129031',
    bookingDate: '2026-10-19T14:10:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-77312-VIP:DrSiddharthVerma:after-dark-04'
  },
  {
    id: 'NOC-64509',
    ticketCode: 'TKT-64509-SD',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-cabana',
    ticketTierName: 'Cliffside Cabana Pass (Pair)',
    ticketPrice: 2499,
    quantity: 1,
    subtotal: 2499,
    convenienceFee: 150,
    totalAmount: 2649,
    customer: {
      fullName: 'Aanya Sen & Kabir',
      email: 'aanya.sen@designcollective.io',
      phone: '+91 97114 38290'
    },
    additionalGuests: ['Kabir Malhotra'],
    specialRequests: 'Celebrating wedding anniversary. Request sea-facing cabana #4.',
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-77401924',
    bookingDate: '2026-10-20T11:25:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-26T16:45:00Z',
    qrPayload: 'SpotBukk:TKT-64509-SD:AanyaSen:house-of-sundown'
  },
  {
    id: 'NOC-53901',
    ticketCode: 'TKT-53901-MS',
    eventId: 'midnight-social',
    eventTitle: 'MIDNIGHT SOCIAL',
    eventEdition: 'SECRET LOFT II',
    eventDate: 'Saturday, 1 November 2026',
    eventTime: '10:00 PM – 4:00 AM',
    eventVenue: 'The Mill Vaults Loft',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ms-regular',
    ticketTierName: 'Community Pass',
    ticketPrice: 799,
    quantity: 2,
    subtotal: 1598,
    convenienceFee: 100,
    totalAmount: 1698,
    customer: {
      fullName: 'Devansh Kothari',
      email: 'devansh.kothari@finly.com',
      phone: '+91 98205 91823'
    },
    additionalGuests: ['Reva Kapoor'],
    paymentMethod: 'Net Banking',
    paymentStatus: 'Successful',
    transactionId: 'TXN-NB-66120943',
    bookingDate: '2026-10-20T21:15:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-53901-MS:DevanshKothari:midnight-social'
  },
  {
    id: 'NOC-41829',
    ticketCode: 'TKT-41829-SB',
    eventId: 'slow-burn',
    eventTitle: 'SLOW BURN',
    eventEdition: 'MEZCAL & VINYL',
    eventDate: 'Thursday, 5 November 2026',
    eventTime: '8:00 PM – 1:30 AM',
    eventVenue: 'Atelier Saloon & Terrace',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sb-collector',
    ticketTierName: 'Collector Reserve Pass',
    ticketPrice: 949,
    quantity: 2,
    subtotal: 1898,
    convenienceFee: 120,
    totalAmount: 2018,
    customer: {
      fullName: 'Zainab Merchant',
      email: 'zainab.merchant@architecture.in',
      phone: '+91 98190 77123'
    },
    additionalGuests: ['Farhan Merchant'],
    specialRequests: 'Allergies to tree nuts for food tasting.',
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-55198270',
    bookingDate: '2026-10-21T09:30:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-41829-SB:ZainabMerchant:slow-burn'
  },
  {
    id: 'NOC-32718',
    ticketCode: 'TKT-32718-SU',
    eventId: 'saturday-unfiltered',
    eventTitle: 'SATURDAY UNFILTERED',
    eventEdition: 'PRIVATE VILLA SHOWCASE',
    eventDate: 'Saturday, 7 November 2026',
    eventTime: '6:00 PM – 2:00 AM',
    eventVenue: 'The Orchard Courtyard Farmhouse',
    eventCity: 'Delhi',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'su-group',
    ticketTierName: 'Gathering Quad (Pass for 4)',
    ticketPrice: 3499,
    quantity: 1,
    subtotal: 3499,
    convenienceFee: 200,
    totalAmount: 3699,
    customer: {
      fullName: 'Vikramaditya Rao',
      email: 'vikram.rao@venturecraft.co',
      phone: '+91 99800 23114'
    },
    additionalGuests: ['Kiran Paul', 'Aditi Rao', 'Sameer Bhatia'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-44910283',
    bookingDate: '2026-10-21T18:04:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-32718-SU:VikramadityaRao:saturday-unfiltered'
  },
  {
    id: 'NOC-29014',
    ticketCode: 'TKT-29014-RS',
    eventId: 'rooftop-sessions',
    eventTitle: 'ROOFTOP SESSIONS',
    eventEdition: 'SKYLINE ECHOES',
    eventDate: 'Friday, 13 November 2026',
    eventTime: '9:00 PM – 3:00 AM',
    eventVenue: 'Highline Observatory 38',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'rs-vip',
    ticketTierName: 'Sea Link Lounge VIP',
    ticketPrice: 1399,
    quantity: 2,
    subtotal: 2798,
    convenienceFee: 150,
    totalAmount: 2948,
    customer: {
      fullName: 'Pooja Bhattacharya',
      email: 'pooja.b@luminagency.com',
      phone: '+91 97690 41258'
    },
    additionalGuests: ['Tara Deshmukh'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-33829104',
    bookingDate: '2026-10-22T13:40:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-29014-RS:PoojaBhattacharya:rooftop-sessions'
  },
  {
    id: 'NOC-18492',
    ticketCode: 'TKT-18492-AD',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-early',
    ticketTierName: 'Early Bird',
    ticketPrice: 499,
    quantity: 1,
    subtotal: 499,
    convenienceFee: 50,
    totalAmount: 549,
    customer: {
      fullName: 'Tara Sharma',
      email: 'tara.sharma94@outlook.com',
      phone: '+91 96191 00293'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-22019485',
    bookingDate: '2026-10-22T16:12:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-24T21:40:00Z',
    qrPayload: 'SpotBukk:TKT-18492-AD:TaraSharma:after-dark-04'
  },
  {
    id: 'NOC-99201',
    ticketCode: 'TKT-99201-PEN',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-regular',
    ticketTierName: 'Full Gathering Pass',
    ticketPrice: 1199,
    quantity: 1,
    subtotal: 1199,
    convenienceFee: 80,
    totalAmount: 1279,
    customer: {
      fullName: 'Kunal Singhal',
      email: 'kunal.singhal@rediffmail.com',
      phone: '+91 94110 59283'
    },
    additionalGuests: [],
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    transactionId: 'TXN-UPI-11928471',
    bookingDate: '2026-10-23T08:15:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-99201-PEN:KunalSinghal:house-of-sundown'
  },
  {
    id: 'NOC-88402',
    ticketCode: 'TKT-88402-REF',
    eventId: 'slow-burn',
    eventTitle: 'SLOW BURN',
    eventEdition: 'MEZCAL & VINYL',
    eventDate: 'Thursday, 5 November 2026',
    eventTime: '8:00 PM – 1:30 AM',
    eventVenue: 'Atelier Saloon & Terrace',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sb-tasting',
    ticketTierName: 'Tasting & Entry Pass',
    ticketPrice: 649,
    quantity: 1,
    subtotal: 649,
    convenienceFee: 50,
    totalAmount: 699,
    customer: {
      fullName: 'Arya Sen',
      email: 'arya.sen@creativestudios.co',
      phone: '+91 98300 48291'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Refunded',
    transactionId: 'TXN-CARD-00291845',
    bookingDate: '2026-10-17T11:00:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-88402-REF:AryaSen:slow-burn'
  },
  {
    id: 'NOC-77519',
    ticketCode: 'TKT-77519-FAIL',
    eventId: 'rooftop-sessions',
    eventTitle: 'ROOFTOP SESSIONS',
    eventEdition: 'SKYLINE ECHOES',
    eventDate: 'Friday, 13 November 2026',
    eventTime: '9:00 PM – 3:00 AM',
    eventVenue: 'Highline Observatory 38',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'rs-regular',
    ticketTierName: 'Skyline Tier',
    ticketPrice: 849,
    quantity: 2,
    subtotal: 1698,
    convenienceFee: 100,
    totalAmount: 1798,
    customer: {
      fullName: 'Meera Nambiar',
      email: 'meera.nambiar@techfin.in',
      phone: '+91 99401 23094'
    },
    additionalGuests: ['Rohit Nair'],
    paymentMethod: 'Net Banking',
    paymentStatus: 'Failed',
    transactionId: 'TXN-NB-99018471',
    bookingDate: '2026-10-23T10:45:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-77519-FAIL:MeeraNambiar:rooftop-sessions'
  },
  {
    id: 'NOC-66381',
    ticketCode: 'TKT-66381-SD',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-regular',
    ticketTierName: 'Full Gathering Pass',
    ticketPrice: 1199,
    quantity: 2,
    subtotal: 2398,
    convenienceFee: 150,
    totalAmount: 2548,
    customer: {
      fullName: 'Pranav Joshi',
      email: 'pranav.joshi@wanderlust.io',
      phone: '+91 98860 11928'
    },
    additionalGuests: ['Sameera Khan'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-88491029',
    bookingDate: '2026-10-23T12:00:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-26T17:10:00Z',
    qrPayload: 'SpotBukk:TKT-66381-SD:PranavJoshi:house-of-sundown'
  }
];

module.exports = { MOCK_BOOKINGS };

```


<a id="backend-package-json"></a>
## `backend/package.json`
[↑ Back to Top](#-table-of-contents)

```json
{
  "name": "SpotBukk-backend",
  "version": "1.0.0",
  "description": "Backend API for Razorpay test payment integration",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "private": true,
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.3",
    "razorpay": "^2.9.5"
  }
}

```


<a id="backend-server-js"></a>
## `backend/server.js`
[↑ Back to Top](#-table-of-contents)

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { MOCK_BOOKINGS } = require('./mock-registrations');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'spotbukk_secure_jwt_secret_key_2026';

// In-memory registration registry initialized with mock bookings
let activeBookings = JSON.parse(JSON.stringify(MOCK_BOOKINGS));

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:4300',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json());

// Helper to get active credentials from environment
function getCredentials() {
  dotenv.config();
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
  }

  return { key_id, key_secret };
}

// ===================================================================
// IN-MEMORY USER REGISTRY & OTP STORE (SERVER TRUTH)
// ===================================================================

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SpotBukkAdmin2026!';

// Trusted Admin accounts defined on the server
const TRUSTED_ADMINS = [
  {
    id: 'usr_admin_01',
    email: 'admin@spotbukk.com',
    name: 'Noctra Curator',
    fullName: 'Noctra Curator (Admin)',
    role: 'ADMIN',
    authenticationProvider: 'ADMIN'
  },
  {
    id: 'usr_admin_02',
    email: 'curator@spotbukk.com',
    name: 'Lead Curator',
    fullName: 'Lead Curator (Admin)',
    role: 'ADMIN',
    authenticationProvider: 'ADMIN'
  }
];

// In-memory registered end users
const registeredUsers = new Map();

// OTP Store: Key -> { code, expiresAt, attempts, lastSentAt }
const otpStore = new Map();

// Helper to normalize phone
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

// Helper to normalize email
function normalizeEmail(email) {
  if (!email) return '';
  return email.trim().toLowerCase();
}

// ===================================================================
// AUTHENTICATION & AUTHORIZATION MIDDLEWARE
// ===================================================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired session token'
      });
    }
    req.user = decoded;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Administrator privileges required.',
      role: req.user ? req.user.role : null
    });
  }
  next();
}

// ===================================================================
// AUTHENTICATION ENDPOINTS
// ===================================================================

// 1. Google OAuth / One-Tap Authentication (END_USER ONLY)
app.post('/api/auth/google', (req, res) => {
  try {
    const { email, name, picture, credential } = req.body;
    let userEmail = email;
    let userName = name;

    // Decode JWT credential payload if provided
    if (credential && typeof credential === 'string') {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          if (payload.email) userEmail = payload.email;
          if (payload.name) userName = payload.name;
        }
      } catch (e) {
        // Fallback to body fields
      }
    }

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        error: 'Valid Google account email is required'
      });
    }

    const cleanEmail = normalizeEmail(userEmail);
    let user = registeredUsers.get(cleanEmail);

    if (!user) {
      user = {
        id: `usr_g_${crypto.randomBytes(4).toString('hex')}`,
        email: cleanEmail,
        name: userName || cleanEmail.split('@')[0],
        fullName: userName || cleanEmail.split('@')[0],
        avatarUrl: picture || '',
        authenticationProvider: 'GOOGLE',
        role: 'END_USER', // Strictly enforced server-side
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanEmail, user);
    }

    // Always enforce END_USER role for Google social logins
    user.role = 'END_USER';
    user.authenticationProvider = 'GOOGLE';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'GOOGLE'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(500).json({
      success: false,
      error: 'Google authentication service encountered an error'
    });
  }
});

// 2. Phone OTP: Send Code
app.post('/api/auth/phone/send-otp', (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid phone number (minimum 10 digits)'
      });
    }

    const existing = otpStore.get(`phone:${cleanPhone}`);
    const now = Date.now();

    // 30 seconds rate-limit cooldown
    if (existing && existing.lastSentAt && now - existing.lastSentAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSeconds} seconds before requesting a new code.`
      });
    }

    // Generate 6-digit cryptographic random OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes

    otpStore.set(`phone:${cleanPhone}`, {
      code,
      expiresAt,
      attempts: 0,
      lastSentAt: now
    });

    // Securely log OTP on server console for testing/development (NEVER expose to client)
    console.log(`\x1b[36m[AUTH SMS SERVICE]\x1b[0m Verification code for ${cleanPhone}: \x1b[33m${code}\x1b[0m (valid for 5 mins)`);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent via SMS.',
      cooldownSeconds: 30,
      expiresInSeconds: 300
    });
  } catch (error) {
    console.error('Phone send-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch phone verification code'
    });
  }
});

// 2. Phone OTP: Verify Code
app.post('/api/auth/phone/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and verification code are required'
      });
    }

    const record = otpStore.get(`phone:${cleanPhone}`);
    const now = Date.now();

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No active verification code found for this phone number. Please request a new code.'
      });
    }

    if (now > record.expiresAt) {
      otpStore.delete(`phone:${cleanPhone}`);
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a new code.'
      });
    }

    record.attempts += 1;
    if (record.attempts > 5) {
      otpStore.delete(`phone:${cleanPhone}`);
      return res.status(429).json({
        success: false,
        error: 'Too many incorrect attempts. Code revoked. Please request a new code.'
      });
    }

    if (record.code !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code. Please check and try again.'
      });
    }

    // OTP Verified — Invalidate OTP
    otpStore.delete(`phone:${cleanPhone}`);

    // Find or create end user
    let user = registeredUsers.get(cleanPhone);
    if (!user) {
      user = {
        id: `usr_p_${crypto.randomBytes(4).toString('hex')}`,
        phone: cleanPhone,
        name: `Guest (${cleanPhone.slice(-4)})`,
        fullName: `Guest Attendee (${cleanPhone.slice(-4)})`,
        role: 'END_USER', // Strictly enforced
        authenticationProvider: 'PHONE',
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanPhone, user);
    }

    user.role = 'END_USER';
    user.authenticationProvider = 'PHONE';

    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'PHONE'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Phone verify-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify phone OTP'
    });
  }
});

// 3. Email OTP: Send Code
app.post('/api/auth/email/send-otp', (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = normalizeEmail(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    const existing = otpStore.get(`email:${cleanEmail}`);
    const now = Date.now();

    // 30 seconds rate-limit cooldown
    if (existing && existing.lastSentAt && now - existing.lastSentAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSeconds} seconds before requesting a new code.`
      });
    }

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes

    otpStore.set(`email:${cleanEmail}`, {
      code,
      expiresAt,
      attempts: 0,
      lastSentAt: now
    });

    // Securely log OTP on server console for testing/development (NEVER expose to client)
    console.log(`\x1b[36m[AUTH EMAIL SERVICE]\x1b[0m Verification code for ${cleanEmail}: \x1b[33m${code}\x1b[0m (valid for 10 mins)`);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email address.',
      cooldownSeconds: 30,
      expiresInSeconds: 600
    });
  } catch (error) {
    console.error('Email send-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch email verification code'
    });
  }
});

// 3. Email OTP: Verify Code
app.post('/api/auth/email/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email address and verification code are required'
      });
    }

    const record = otpStore.get(`email:${cleanEmail}`);
    const now = Date.now();

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No active verification code found for this email. Please request a new code.'
      });
    }

    if (now > record.expiresAt) {
      otpStore.delete(`email:${cleanEmail}`);
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a new code.'
      });
    }

    record.attempts += 1;
    if (record.attempts > 5) {
      otpStore.delete(`email:${cleanEmail}`);
      return res.status(429).json({
        success: false,
        error: 'Too many incorrect attempts. Code revoked. Please request a new code.'
      });
    }

    if (record.code !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code. Please check and try again.'
      });
    }

    // OTP Verified — Invalidate OTP
    otpStore.delete(`email:${cleanEmail}`);

    // Find or create end user
    let user = registeredUsers.get(cleanEmail);
    if (!user) {
      const displayName = cleanEmail.split('@')[0];
      user = {
        id: `usr_e_${crypto.randomBytes(4).toString('hex')}`,
        email: cleanEmail,
        name: displayName,
        fullName: displayName,
        role: 'END_USER', // Strictly enforced
        authenticationProvider: 'EMAIL',
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanEmail, user);
    }

    user.role = 'END_USER';
    user.authenticationProvider = 'EMAIL';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'EMAIL'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Email verify-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify email OTP'
    });
  }
});

// 4. Secure Admin Authentication (ADMIN ROLE ASSIGNED ONLY BY SERVER)
app.post('/api/auth/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        error: 'Administrator email and security password are required'
      });
    }

    // Verify against trusted server-side admin registry
    const adminRecord = TRUSTED_ADMINS.find(a => normalizeEmail(a.email) === cleanEmail);

    // Check credentials (allows configured ADMIN_PASSWORD or fallback 'admin123')
    const isValidPassword = password === ADMIN_PASSWORD || password === 'admin123' || password === 'SpotBukkAdmin2026!';

    if (!adminRecord || !isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid administrator credentials. Access strictly denied.'
      });
    }

    // Issue trusted Admin token
    const adminUser = {
      id: adminRecord.id,
      email: adminRecord.email,
      name: adminRecord.name,
      fullName: adminRecord.fullName,
      role: 'ADMIN', // Trusted server-side source
      authenticationProvider: 'ADMIN'
    };

    const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '12h' });

    console.log(`\x1b[32m[AUTH ADMIN LOGIN]\x1b[0m Admin authenticated: ${adminRecord.email}`);

    return res.status(200).json({
      success: true,
      token,
      user: adminUser
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Administrator authentication failure'
    });
  }
});

// 5. General / Legacy Auth Login Endpoint (Strict RBAC: Never allows client to force ADMIN)
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const cleanEmail = normalizeEmail(email);

  // If client requests ADMIN, password verification is strictly mandatory!
  if (role === 'ADMIN' || (cleanEmail && cleanEmail.includes('admin'))) {
    const adminRecord = TRUSTED_ADMINS.find(a => normalizeEmail(a.email) === cleanEmail);
    const isValidPassword = password === ADMIN_PASSWORD || password === 'admin123' || password === 'SpotBukkAdmin2026!';

    if (adminRecord && isValidPassword) {
      const user = {
        id: adminRecord.id,
        email: adminRecord.email,
        name: adminRecord.name,
        fullName: adminRecord.fullName,
        role: 'ADMIN',
        authenticationProvider: 'ADMIN'
      };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '12h' });
      return res.status(200).json({ success: true, token, user });
    }

    // Deny unauthorized attempts to claim ADMIN
    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Cannot assign ADMIN role.'
    });
  }

  // End user login (Strictly END_USER role)
  const user = {
    id: `usr_${crypto.randomBytes(4).toString('hex')}`,
    email: cleanEmail || 'attendee@spotbukk.com',
    name: (cleanEmail && cleanEmail.split('@')[0]) || 'Guest Attendee',
    fullName: (cleanEmail && cleanEmail.split('@')[0]) || 'Guest Attendee',
    role: 'END_USER',
    authenticationProvider: 'EMAIL'
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
  return res.status(200).json({ success: true, token, user });
});

// 6. Get Current Authenticated User (Session Verification)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// 7. Session Logout
app.post('/api/auth/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Session closed successfully'
  });
});

// 8. Admin-Only API Endpoint (Protected: strictly requires ADMIN role)
app.get('/api/admin/overview', authenticateToken, requireAdmin, (req, res) => {
  const totalBookings = activeBookings.length;
  const verifiedCheckIns = activeBookings.filter(b => b.checkedIn).length;
  const totalRevenue = activeBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return res.status(200).json({
    success: true,
    summary: {
      totalBookings,
      verifiedCheckIns,
      totalRevenue,
      adminUser: req.user.email
    }
  });
});

// ===================================================================
// QR CODE CHECK-IN & TICKET VERIFICATION ENDPOINTS (ADMIN ONLY)
// ===================================================================

function handleVerifyQr(req, res) {
  const { qrPayload, eventId, syncBookings } = req.body;

  if (!qrPayload || typeof qrPayload !== 'string' || !qrPayload.trim()) {
    return res.status(400).json({
      success: false,
      status: 'invalid',
      message: 'INVALID REQUEST — QR payload is required.'
    });
  }

  const cleanInput = qrPayload.trim();
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  // Sync client bookings if passed
  if (Array.isArray(syncBookings) && syncBookings.length > 0) {
    syncBookings.forEach(sb => {
      const idx = activeBookings.findIndex(b => b.id === sb.id);
      if (idx >= 0) {
        activeBookings[idx] = { ...activeBookings[idx], ...sb };
      } else {
        activeBookings.push(sb);
      }
    });
  }

  // Find ticket by QR payload, ticket code, or booking ID
  const found = activeBookings.find(b =>
    b.qrPayload.toLowerCase() === cleanInput.toLowerCase() ||
    b.ticketCode.toLowerCase() === cleanInput.toLowerCase() ||
    b.id.toLowerCase() === cleanInput.toLowerCase() ||
    (cleanInput.includes(':') && b.ticketCode.toLowerCase() === cleanInput.split(':')[1]?.toLowerCase())
  );

  // 1. Unrecognized / Invalid QR
  if (!found) {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: 'INVALID TICKET — Unrecognized QR signature or revoked access pass.',
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 2. Event Mismatch (if eventId is specified)
  if (eventId && found.eventId.toLowerCase() !== eventId.toLowerCase()) {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: `INVALID EVENT — Ticket belongs to "${found.eventTitle}", not this gathering.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 3. Payment Status Check
  if (found.paymentStatus !== 'Successful') {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: `ADMISSION DENIED — Booking status is "${found.paymentStatus}". Only Successful tickets can be admitted.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 4. Duplicate / Already Checked-In Check
  if (found.checkedIn) {
    const prevTime = found.checkedInTime
      ? new Date(found.checkedInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : 'earlier';
    return res.status(200).json({
      success: false,
      status: 'used',
      message: `TICKET ALREADY USED — Previously checked in at ${prevTime}. Duplicate entry blocked.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 5. Valid Ticket: Admit & Mark Checked In
  const nowIso = new Date().toISOString();
  found.checkedIn = true;
  found.checkedInTime = nowIso;

  return res.status(200).json({
    success: true,
    status: 'verified',
    message: 'ENTRY VERIFIED — Valid SpotBukk Digital Pass.',
    ticket: found,
    scanTime: timestamp,
    gate: 'Gate 01 — Main Entrance'
  });
}

// Protected QR verification routes (requires authenticated user with ADMIN role)
app.post('/api/tickets/verify-qr', authenticateToken, requireAdmin, handleVerifyQr);
app.post('/api/check-in/verify', authenticateToken, requireAdmin, handleVerifyQr);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'SpotBukk Platform API (Payments & Admin QR Verification)',
    testMode: true
  });
});

// ===================================================================
// RAZORPAY ORDER CREATION & PAYMENT VERIFICATION
// ===================================================================

async function handleCreateOrder(req, res) {
  try {
    let { amount, currency = 'INR', receipt } = req.body;
    const amountInPaise = Math.round(Number(amount));

    if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
      return res.status(400).json({
        error: 'Invalid amount. Minimum amount is 100 paise (₹1).'
      });
    }

    const { key_id, key_secret } = getCredentials();
    const razorpay = new Razorpay({ key_id, key_secret });

    const options = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
      order
    });
  } catch (error) {
    console.error('Error in create-order:', error);
    if (error?.statusCode === 401 || (error?.error?.code === 'BAD_REQUEST_ERROR' && error?.message?.includes('auth'))) {
      return res.status(401).json({
        error: 'Razorpay authentication failed. Please verify API keys in .env.'
      });
    }
    return res.status(500).json({
      error: error?.error?.description || error.message || 'Failed to create Razorpay order'
    });
  }
}

app.post('/api/create-order', handleCreateOrder);
app.post('/create-order', handleCreateOrder);

function handleVerifyPayment(req, res) {
  try {
    const order_id = req.body.razorpay_order_id || req.body.order_id;
    const payment_id = req.body.razorpay_payment_id || req.body.payment_id;
    const signature = req.body.razorpay_signature || req.body.signature;

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({
        success: false,
        ok: false,
        error: 'Missing required fields: order_id, payment_id, and signature are required.'
      });
    }

    const { key_secret } = getCredentials();
    const payload = `${order_id}|${payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(payload)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.warn(`Signature mismatch: expected ${expectedSignature}, received ${signature}`);
      return res.status(400).json({
        success: false,
        ok: false,
        error: 'Signature verification failed. Payment authenticity could not be verified.'
      });
    }

    return res.status(200).json({
      success: true,
      ok: true,
      message: 'Payment signature verified successfully.'
    });
  } catch (error) {
    console.error('Error in verify-payment:', error);
    return res.status(500).json({
      success: false,
      ok: false,
      error: error.message || 'Internal server error during signature verification'
    });
  }
}

app.post('/api/verify-payment', handleVerifyPayment);
app.post('/verify', handleVerifyPayment);

app.listen(PORT, () => {
  console.log(`SpotBukk backend listening on port ${PORT}`);
  console.log(`Endpoints active:`);
  console.log(` - POST /api/auth/login`);
  console.log(` - GET  /api/auth/me`);
  console.log(` - POST /api/tickets/verify-qr (ADMIN ONLY)`);
  console.log(` - POST /api/create-order`);
  console.log(` - POST /api/verify-payment`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});

```


<a id="doc-noctra-platform-documentation-html"></a>
## `Doc/Noctra – Platform Documentation.html`
[↑ Back to Top](#-table-of-contents)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>SpotBukk – Platform Documentation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <style>
    :root {
      box-sizing: border-box;
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      --bg: #fff;
      --fg: #1a1a2e;
      --mut: #5b5b73;
      --card: #f4f4fa;
      --line: #dcdcea;
      --ac: #5b3fd4
    }

    @media (prefers-color-scheme:dark) {
      :root:not([data-theme="light"]) {
        --bg: #0f0f1a;
        --fg: #ececf6;
        --mut: #a0a0b8;
        --card: #1a1a2b;
        --line: #2e2e45;
        --ac: #a58bff
      }
    }

    :root[data-theme="dark"] {
      --bg: #0f0f1a;
      --fg: #ececf6;
      --mut: #a0a0b8;
      --card: #1a1a2b;
      --line: #2e2e45;
      --ac: #a58bff
    }

    html {
      scroll-padding-top: env(safe-area-inset-top, 0px)
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--fg);
      font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif
    }

    main {
      max-width: 920px;
      margin: 0 auto;
      padding: 24px 18px 64px
    }

    h1 {
      font-size: 2rem;
      margin: .2em 0
    }

    h2 {
      margin-top: 2.4em;
      padding-bottom: .3em;
      border-bottom: 2px solid var(--line)
    }

    h3 {
      margin-top: 1.6em
    }

    .sub {
      color: var(--mut)
    }

    .box {
      overflow-x: auto;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 14px;
      margin: 14px 0
    }

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: .92rem
    }

    th,
    td {
      border: 1px solid var(--line);
      padding: 7px 10px;
      text-align: left;
      vertical-align: top
    }

    th {
      background: var(--card)
    }

    code {
      background: var(--card);
      padding: 1px 6px;
      border-radius: 5px;
      font-size: .9em
    }

    .note {
      border-left: 4px solid var(--ac);
      background: var(--card);
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin: 14px 0
    }

    .y {
      color: #1a9d55;
      font-weight: 700
    }

    .n {
      color: #d33;
      font-weight: 700
    }
  </style>
</head>

<body>
  <main>
    <h1>SpotBukk – Platform Documentation</h1>
    <p class="sub">Event registration, payment, digital ticketing and QR check-in. Roles: Customer · Staff · Admin.</p>

    <h2>1. System overview</h2>
    <p>SpotBukk has a public/customer side and a protected operations side. Both meet at the QR ticket: customers
      receive it, staff scan it, the backend is the single authority that validates it.</p>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  W[SpotBukk Website]
  W --> P[Public / Customers]
  W --> S[Staff / Admin]
  P --> P1[Browse events]
  P --> P2[Register]
  P2 --> P3[Payment]
  P3 --> P4[Digital ticket + QR]
  S --> S1[Staff login]
  S --> S2[Admin login]
  S1 --> SC[Staff scanner]
  S2 --> AD[Admin dashboard: events, users, payments, reports]
  S2 --> SC
  P4 -. QR shown at venue .-> SC
  SC --> V{Backend validates QR}
  V -- Valid --> C[Check-in saved, ticket = USED]
  V -- Invalid --> R[Rejected with reason]
  C --> DB[(Database)]
</pre>
    </div>

    <h2>2. Roles and access</h2>
    <h3>2.1 Customer can</h3>
    <p>Sign up / log in · browse events · view event details · register · add attendees/guests · pay · receive a digital
      ticket · view ticket and QR · see registration and payment status · receive notifications · view booking history.
    </p>
    <h3>2.2 Customer must never see or reach</h3>
    <p>QR scanner · staff check-in interface · staff tools · admin dashboard · event management · payment management ·
      analytics · other users' registrations.</p>
    <h3>2.3 Staff can</h3>
    <p>Scan ticket QR · enter ticket/booking code manually · see the attendee details needed for entry (name, pass type)
      · validate and check in · see "already used" · see invalid / expired / cancelled · view today's check-in activity.
    </p>
    <h3>2.4 Permission matrix (enforced by the backend)</h3>
    <div class="box">
      <table>
        <tr>
          <th>Capability</th>
          <th>Customer</th>
          <th>Staff</th>
          <th>Admin</th>
        </tr>
        <tr>
          <td>Browse, register, pay, view own tickets</td>
          <td class="y">✔</td>
          <td class="y">✔ (as a user)</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td><code>/staff/*</code> pages</td>
          <td class="n">✘</td>
          <td class="y">✔</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td>Scan / validate API</td>
          <td class="n">✘</td>
          <td class="y">✔</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td>Check-in API</td>
          <td class="n">✘</td>
          <td class="y">✔</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td>Staff management</td>
          <td class="n">✘</td>
          <td class="n">✘</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td>Events, payments, analytics, reports</td>
          <td class="n">✘</td>
          <td class="n">✘</td>
          <td class="y">✔</td>
        </tr>
        <tr>
          <td>Other users' registrations</td>
          <td class="n">✘</td>
          <td>Only attendee data needed at the door</td>
          <td class="y">✔</td>
        </tr>
      </table>
    </div>
    <div class="note"><b>Key rule:</b> hiding UI is not security. Even if someone types
      <code>https://SpotBukk.com/staff/check-in</code> or calls the API directly, the server checks the authenticated
      account's role on every request and returns <code>401</code> (not logged in) or <code>403</code> (wrong role).
    </div>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  A[Request to /staff/* or scan/check-in API] --> B{Authenticated?}
  B -- No --> X1[401 / redirect to /staff/login]
  B -- Yes --> C{Role = STAFF or ADMIN?}
  C -- No, CUSTOMER --> X2[403 Forbidden]
  C -- Yes --> D{Assigned to this event?}
  D -- No --> X3[403 Forbidden]
  D -- Yes --> E[Handle request + write audit log]
</pre>
    </div>

    <h2>3. Customer journey</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  A[Event] --> B[Select pass]
  B --> C[Registration + attendees]
  C --> D[Create payment]
  D --> E{Payment result}
  E -- Failed / abandoned --> F[Registration stays PENDING, can retry or expires]
  E -- Success, confirmed by gateway webhook --> G[Registration CONFIRMED]
  G --> H[Generate ticket per attendee]
  H --> I[Generate secure QR token]
  I --> J[Send email]
  J --> K[Customer sees digital ticket in account]
</pre>
    </div>

    <h2>4. Venue check-in flow</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  A[Staff login] --> B[Staff check-in screen]
  B --> C[Scan QR or type booking code]
  C --> D[Backend validates token]
  D --> E{Signature valid?}
  E -- No --> R1[INVALID]
  E -- Yes --> F{Ticket exists and ISSUED?}
  F -- Cancelled --> R2[CANCELLED]
  F -- Expired --> R3[EXPIRED]
  F -- Already USED --> R4[ALREADY USED: show time and gate]
  F -- Issued --> G{Event matches this check-in?}
  G -- No --> R5[WRONG EVENT]
  G -- Yes --> H[Atomically mark USED + save check-in record]
  H --> OK[CHECK-IN SUCCESS]
</pre>
    </div>

    <h2>5. Sequence: payment to ticket</h2>
    <div class="box">
      <pre class="mermaid">
sequenceDiagram
  actor U as Customer
  participant FE as Web app
  participant API as Backend
  participant PG as Payment gateway
  participant M as Email service
  U->>FE: Select pass, enter attendees
  FE->>API: POST /registrations
  API-->>FE: registration (PENDING)
  FE->>API: POST /payments
  API->>PG: Create order
  PG-->>FE: Checkout
  U->>PG: Pays
  PG->>API: Webhook payment.success (signed)
  API->>API: Registration CONFIRMED, create tickets + QR tokens
  API->>M: Send ticket email
  FE->>API: GET /me/tickets
  API-->>U: Digital ticket + QR
</pre>
    </div>

    <h2>6. Redefined / added items</h2>
    <p>These fill gaps in the original notes:</p>
    <table>
      <tr>
        <th>Area</th>
        <th>Decision</th>
      </tr>
      <tr>
        <td>Roles</td>
        <td>A single <code>role</code> on the account: <code>CUSTOMER</code>, <code>STAFF</code>, <code>ADMIN</code>.
          Staff accounts are created by admins only; no public staff signup.</td>
      </tr>
      <tr>
        <td>Separate logins</td>
        <td><code>/staff/login</code> and an admin login are distinct from the customer login, with stricter rate
          limits, shorter sessions and optional 2FA for admin.</td>
      </tr>
      <tr>
        <td>Payment truth</td>
        <td>Confirm payment only from the gateway's signed webhook, never from the browser redirect. Use idempotency
          keys so retries cannot create duplicate tickets.</td>
      </tr>
      <tr>
        <td>QR token</td>
        <td>Opaque, signed (HMAC/JWT) or random high-entropy token. Contains no personal data. Backend looks it up and
          verifies it; the QR alone never grants entry.</td>
      </tr>
      <tr>
        <td>Double scan</td>
        <td>Check-in is one atomic update (<code>UPDATE ... WHERE status='ISSUED'</code>) in a transaction, so two staff
          scanning at once cannot both succeed.</td>
      </tr>
      <tr>
        <td>Two-step scan</td>
        <td><code>validate</code> previews the result (read-only); <code>check-in</code> commits. Manual code entry uses
          the same path.</td>
      </tr>
      <tr>
        <td>Staff scope</td>
        <td>Staff are assigned to specific events; they see only the data needed for entry.</td>
      </tr>
      <tr>
        <td>Audit</td>
        <td>Every scan attempt (success or fail), staff ID, time, gate/device is logged.</td>
      </tr>
      <tr>
        <td>Refunds / transfers</td>
        <td>Refund or cancellation sets the ticket to <code>CANCELLED</code> and invalidates its QR. Re-issue creates a
          new token and revokes the old one.</td>
      </tr>
      <tr>
        <td>Offline venues</td>
        <td>Optional: pre-download signed ticket list for the event so the scanner survives poor connectivity, syncing
          check-ins afterward.</td>
      </tr>
    </table>

    <h2>7. Statuses</h2>
    <div class="box">
      <pre class="mermaid">
stateDiagram-v2
  [*] --> ISSUED: payment confirmed
  ISSUED --> USED: staff check-in
  ISSUED --> CANCELLED: refund / admin cancel
  ISSUED --> EXPIRED: event ended
  USED --> [*]
  CANCELLED --> [*]
  EXPIRED --> [*]
</pre>
    </div>
    <table>
      <tr>
        <th>Object</th>
        <th>Statuses</th>
      </tr>
      <tr>
        <td>Registration</td>
        <td>PENDING · CONFIRMED · CANCELLED · EXPIRED</td>
      </tr>
      <tr>
        <td>Payment</td>
        <td>CREATED · PENDING · SUCCESS · FAILED · REFUNDED</td>
      </tr>
      <tr>
        <td>Ticket</td>
        <td>ISSUED · USED · CANCELLED · EXPIRED</td>
      </tr>
    </table>

    <h2>8. Data model</h2>
    <div class="box">
      <pre class="mermaid">
erDiagram
  USER ||--o{ REGISTRATION : makes
  EVENT ||--o{ PASS : offers
  EVENT ||--o{ REGISTRATION : receives
  PASS ||--o{ REGISTRATION : selected_in
  REGISTRATION ||--o{ ATTENDEE : includes
  REGISTRATION ||--o{ PAYMENT : paid_by
  ATTENDEE ||--|| TICKET : gets
  TICKET ||--o{ CHECK_IN : scanned_as
  USER ||--o{ CHECK_IN : performed_by_staff
  USER ||--o{ NOTIFICATION : receives
  USER { uuid id string email string role }
  TICKET { uuid id string qr_token_hash string status }
  CHECK_IN { uuid id datetime scanned_at string result string gate }
  PAYMENT { uuid id string gateway_ref string status }
</pre>
    </div>

    <h2>9. API sketch</h2>
    <table>
      <tr>
        <th>Endpoint</th>
        <th>Role</th>
      </tr>
      <tr>
        <td><code>POST /api/auth/register, /login</code></td>
        <td>Public</td>
      </tr>
      <tr>
        <td><code>GET /api/events, /events/:id</code></td>
        <td>Public</td>
      </tr>
      <tr>
        <td><code>POST /api/registrations</code> · <code>POST /api/payments</code></td>
        <td>Customer</td>
      </tr>
      <tr>
        <td><code>GET /api/me/tickets, /me/bookings, /me/notifications</code></td>
        <td>Customer (own data only)</td>
      </tr>
      <tr>
        <td><code>POST /api/payments/webhook</code></td>
        <td>Gateway signature</td>
      </tr>
      <tr>
        <td><code>POST /api/staff/login</code></td>
        <td>Staff / Admin</td>
      </tr>
      <tr>
        <td><code>POST /api/staff/scan/validate</code> · <code>POST /api/staff/check-ins</code> ·
          <code>GET /api/staff/check-ins?date=today</code></td>
        <td>Staff / Admin</td>
      </tr>
      <tr>
        <td><code>/api/admin/*</code> (events, staff, payments, reports)</td>
        <td>Admin</td>
      </tr>
    </table>

    <h2>10. Security checklist</h2>
    <ul>
      <li>Role check middleware on every <code>/staff/*</code> and <code>/api/staff/*</code> route; default deny.</li>
      <li>Ownership check on every customer resource (users only read their own tickets).</li>
      <li>Hash QR tokens at rest; rate limit scan and login endpoints.</li>
      <li>HTTPS only, secure httpOnly cookies, CSRF protection.</li>
      <li>Webhook signature verification and idempotency.</li>
      <li>Audit logs for all staff and admin actions.</li>
    </ul>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>

  <!--claude-mermaid-runtime-begin:3477-->
  <style>
    .mermaid-diagram {
      margin-block: 4px
    }

    .mermaid-diagram svg {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: auto
    }
  </style>
  <script src="/_runtime/mermaid-11.16.1.min.js"></script>
  <script>(function () {
      var CFG = { "palettes": { "light": { "surface": "#f4efe4", "text": "#42392e", "line": "#8a7f6d", "border": "#7a6c52", "bg": "#fffdf8" }, "dark": { "surface": "#262b34", "text": "#f2f3f5", "line": "#a8adb8", "border": "#9aa4b8", "bg": "#1f232b" } } };
      if (typeof mermaid === 'undefined') return;
      var pres = Array.prototype.slice.call(document.querySelectorAll('pre.mermaid')).filter(function (p) { if (p.hasAttribute('data-claude-mermaid-claimed')) return false; p.setAttribute('data-claude-mermaid-claimed', '1'); return true; });
      if (!pres.length) return;
      var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
      var root = document.documentElement;
      var items = pres.map(function (pre) {
        var mount = document.createElement('div'); mount.className = 'mermaid-diagram';
        return { pre: pre, mount: mount, src: pre.textContent || '' };
      });
      var seq = 0;
      var renderGen = 0;
      var lastKey = '';
      function pageBg(fallback) {
        var els = [document.body, document.documentElement];
        for (var i = 0; i < els.length; i++) {
          var c = els[i] && getComputedStyle(els[i]).backgroundColor;
          if (c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)') return c;
        }
        return fallback;
      }
      function render() {
        var theme = root.getAttribute('data-theme');
        var dark = theme === 'dark' || (!!(mq && mq.matches) && theme !== 'light');
        var pal = dark ? CFG.palettes.dark : CFG.palettes.light;
        var bg = pageBg(pal.bg);
        var key = (dark ? 'd' : 'l') + '|' + bg;
        if (key === lastKey) return;
        lastKey = key;
        var gen = ++renderGen;
        var font = getComputedStyle(document.body).fontFamily || 'sans-serif';
        var nat = { useMaxWidth: false };
        mermaid.initialize({
          startOnLoad: false, securityLevel: 'strict', theme: 'base',
          flowchart: nat, sequence: nat, er: nat, state: nat, class: nat, pie: nat,
          gantt: nat, journey: nat, timeline: nat, gitGraph: nat, mindmap: nat, xyChart: nat,
          quadrantChart: nat, sankey: nat, c4: nat, requirement: nat, block: nat,
          packet: nat, kanban: nat, architecture: nat, radar: nat,
          themeVariables: {
            background: bg, mainBkg: pal.surface, primaryColor: pal.surface,
            primaryTextColor: pal.text, lineColor: pal.line, primaryBorderColor: pal.border,
            nodeBorder: pal.border, clusterBorder: pal.border, edgeLabelBackground: bg,
            clusterBkg: 'rgba(127,127,127,0.07)', titleColor: pal.text,
            darkMode: dark, rowOdd: bg, rowEven: 'rgba(127,127,127,0.07)',
            attributeBackgroundColorOdd: bg, attributeBackgroundColorEven: 'rgba(127,127,127,0.07)',
            fontSize: '16px', fontFamily: font
          },
          themeCSS: '.node rect, .node circle, .node polygon, .node path, .cluster rect { stroke-width: 2px; }'
        });
        items.forEach(function (it) {
          var id = 'claude-mermaid-' + seq++;
          mermaid.render(id, it.src).then(function (r) {
            if (gen !== renderGen) return;
            var prev = it.pre.previousElementSibling;
            if (prev && prev.className === 'mermaid-diagram' && prev !== it.mount) return;
            it.mount.innerHTML = r.svg;
            if (!it.mount.parentNode) it.pre.parentNode.insertBefore(it.mount, it.pre);
            it.pre.style.display = 'none';
          }, function () {
            var scratch = document.getElementById(id);
            if (scratch) scratch.parentNode.removeChild(scratch);
            scratch = document.getElementById('d' + id);
            if (scratch) scratch.parentNode.removeChild(scratch);
            if (gen !== renderGen) return;
            if (it.mount.parentNode) it.mount.parentNode.removeChild(it.mount);
            it.pre.style.display = '';
          });
        });
      }
      render();
      if (mq && mq.addEventListener) mq.addEventListener('change', render);
      if (typeof MutationObserver !== 'undefined') new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    })();</script>
  <!--claude-mermaid-runtime-end-->
</body>

</html>


```


<a id="doc-noctra-server-architecture-guide-html"></a>
## `Doc/Noctra – Server & Architecture Guide.html`
[↑ Back to Top](#-table-of-contents)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>SpotBukk – Server & Architecture Guide (Beginner Friendly)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <style>
    :root {
      box-sizing: border-box;
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      --bg: #fff;
      --fg: #1a1a2e;
      --mut: #5b5b73;
      --card: #f4f4fa;
      --line: #dcdcea;
      --ac: #5b3fd4
    }

    @media (prefers-color-scheme:dark) {
      :root:not([data-theme="light"]) {
        --bg: #0f0f1a;
        --fg: #ececf6;
        --mut: #a0a0b8;
        --card: #1a1a2b;
        --line: #2e2e45;
        --ac: #a58bff
      }
    }

    :root[data-theme="dark"] {
      --bg: #0f0f1a;
      --fg: #ececf6;
      --mut: #a0a0b8;
      --card: #1a1a2b;
      --line: #2e2e45;
      --ac: #a58bff
    }

    html {
      scroll-padding-top: env(safe-area-inset-top, 0px)
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--fg);
      font: 16px/1.65 system-ui, -apple-system, "Segoe UI", sans-serif
    }

    main {
      max-width: 920px;
      margin: 0 auto;
      padding: 24px 18px 64px
    }

    h1 {
      font-size: 2rem;
      margin: .2em 0
    }

    h2 {
      margin-top: 2.4em;
      padding-bottom: .3em;
      border-bottom: 2px solid var(--line)
    }

    .sub {
      color: var(--mut)
    }

    .box {
      overflow-x: auto;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 14px;
      margin: 14px 0
    }

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: .93rem
    }

    th,
    td {
      border: 1px solid var(--line);
      padding: 7px 10px;
      text-align: left;
      vertical-align: top
    }

    th {
      background: var(--card)
    }

    code {
      background: var(--card);
      padding: 1px 6px;
      border-radius: 5px;
      font-size: .9em
    }

    .tip {
      border-left: 4px solid var(--ac);
      background: var(--card);
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin: 14px 0
    }
  </style>
</head>

<body>
  <main>
    <h1>SpotBukk – Server & Architecture Guide</h1>
    <p class="sub">A beginner-friendly explanation of what the server does, how domain, hosting and server differ, and
      how SpotBukk should be set up for the website now and a mobile app later.</p>

    <h2>1. What does a server actually do?</h2>
    <p>Think of the server as the <b>engine room</b> of the product. The customer's phone or browser is only the screen.
      The important data and rules live on the server.</p>
    <div class="tip"><b>Simple way to remember:</b> the Angular website is the <b>face</b>, the backend is the
      <b>brain</b>, the database is the <b>memory</b>.</div>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  W[Website - Angular] --> I((Internet))
  A[Mobile app - Android / iOS] --> I
  I --> S[SERVER]
  S --> API[API: business logic]
  S --> DB[(Database: users, events, tickets, payments)]
  S --> SV[Services: payment, email, QR, notifications]
</pre>
    </div>
    <p>The server handles: user accounts and login, events, registrations, ticket generation, payments, QR validation,
      staff check-ins, admin work, emails and notifications, analytics, database access, security and business rules.
    </p>

    <h2>2. Does the server host the website too?</h2>
    <p>Yes, but that is only one of its jobs. A server runs several pieces side by side.</p>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  D[Domain: SpotBukk.in] --> N[DNS]
  N --> S[Server]
  S --> W[Website]
  S --> A[Backend API]
  S --> DB[(Database)]
  S --> F[File / image storage]
  S --> B[Background services]
</pre>
    </div>
    <p><code>SpotBukk.in</code> can show the website and <code>api.SpotBukk.in</code> can be the backend API. The
      Angular site then talks to <code>https://api.SpotBukk.in</code>.</p>

    <h2>3. One backend for the website and the future app</h2>
    <p>Do <b>not</b> build one backend for the website and another for the app. Build one API and let every front end
      use it.</p>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  W[Website - Angular] --> API[SpotBukk API]
  M[Mobile app - Android / iOS] --> API
  API --> DB[(Database)]
</pre>
    </div>
    <p>Both share the same users, events, registrations, payments, tickets, QR codes, staff, admin, notifications and
      database. When the app arrives later, authentication, tickets, payments, QR and admin do not need to be rebuilt.
      The app simply uses the existing API. This is why the backend should never be designed around Angular.</p>

    <h2>4. Domain vs hosting vs server</h2>
    <p>These three get mixed up a lot.</p>
    <table>
      <tr>
        <th>Term</th>
        <th>Meaning</th>
        <th>Example</th>
      </tr>
      <tr>
        <td><b>Domain</b></td>
        <td>The address people type into the browser</td>
        <td><code>SpotBukk.in</code></td>
      </tr>
      <tr>
        <td><b>Hosting provider</b></td>
        <td>The company that gives you the server and infrastructure</td>
        <td>A cloud company that rents you a VPS</td>
      </tr>
      <tr>
        <td><b>Server</b></td>
        <td>The computer that runs your software</td>
        <td>Ubuntu Linux VPS, 4 CPU, 8 GB RAM, 160 GB SSD</td>
      </tr>
    </table>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  A[Domain: SpotBukk.in] --> B[Hosting provider]
  B --> C[Server / VPS]
  C --> D[SpotBukk: website, API, database, services]
</pre>
    </div>

    <h2>5. What server should SpotBukk start with?</h2>
    <p>Keep it simple at first. You do not need a huge server on day one; the final size depends on expected traffic,
      database size, image storage and payment volume. Leave room to scale.</p>
    <table>
      <tr>
        <th>Item</th>
        <th>Initial recommendation</th>
      </tr>
      <tr>
        <td>OS</td>
        <td>Ubuntu LTS</td>
      </tr>
      <tr>
        <td>CPU / RAM</td>
        <td>4 vCPU / 8 GB</td>
      </tr>
      <tr>
        <td>Storage</td>
        <td>160+ GB SSD or NVMe</td>
      </tr>
      <tr>
        <td>Network</td>
        <td>Public IPv4 (IPv6 optional)</td>
      </tr>
      <tr>
        <td>Docker</td>
        <td>Latest stable version</td>
      </tr>
      <tr>
        <td>Database</td>
        <td>PostgreSQL</td>
      </tr>
      <tr>
        <td>Reverse proxy</td>
        <td>Nginx or equivalent</td>
      </tr>
      <tr>
        <td>Deployment</td>
        <td>Docker Compose to start</td>
      </tr>
      <tr>
        <td>Must have</td>
        <td>HTTPS, firewall, backups, monitoring</td>
      </tr>
    </table>

    <h2>6. What software runs on the server?</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  U[Ubuntu Linux] --> D[Docker]
  D --> RP[Reverse proxy - Nginx]
  D --> FE[Angular frontend]
  D --> BE[Backend API]
  D --> PG[(PostgreSQL)]
  D --> RD[(Redis - optional)]
  D --> WK[Background workers]
</pre>
    </div>
    <p><b>Why Docker?</b> Each part runs in its own isolated container, so the frontend, API and database stay separate
      and are easier to update. Docker Compose can start the whole set with one command on a single server.</p>

    <h2>7. What is a reverse proxy?</h2>
    <p>It is the front door. Nginx sits first and decides where each request goes.</p>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  I((Internet)) --> N[Nginx / reverse proxy]
  N -- SpotBukk.in --> FE[Angular app]
  N -- api.SpotBukk.in --> API[Backend API]
  API --> DB[(PostgreSQL)]
</pre>
    </div>
    <p>It handles incoming requests, HTTPS/TLS, routing, forwarding API calls, serving the Angular files, security
      headers and connections. Only the proxy is exposed to the internet, never the database.</p>

    <h2>8. Where does the database live?</h2>
    <p>At first, on the same server. The backend talks to it over a private network, and the database is <b>never</b>
      opened to the internet.</p>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  subgraph Public
    N[Nginx]
  end
  subgraph Private network
    BE[Backend] --> PG[(PostgreSQL)]
  end
  N --> BE
</pre>
    </div>
    <p>If SpotBukk grows, the database can move to a dedicated managed database server.</p>

    <h2>9. What about images and uploads?</h2>
    <p>SpotBukk will have event posters, venue photos, artist images, profile pictures and ticket assets. Decide early
      not to keep all of them on the application server forever. Use separate object/file storage, which can later be
      served through a CDN.</p>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  subgraph Server
    A[Application]
    D[(Database)]
  end
  subgraph Object storage
    E[Event images]
    V[Venue images]
    O[Other uploads]
  end
  A --> E
  A --> V
  A --> O
</pre>
    </div>

    <h2>10. Which ports should be public?</h2>
    <p>This is very important. Only web traffic should reach the server from outside.</p>
    <div class="box">
      <pre class="mermaid">
flowchart LR
  I((Internet)) -- 80 HTTP --> N[Nginx]
  I -- 443 HTTPS --> N
  N --> FE[Frontend]
  N --> BE[Backend]
  I -. blocked .-> X1[PostgreSQL 5432]
  I -. blocked .-> X2[Redis 6379]
  I -. blocked .-> X3[Backend 3000]
  I -. blocked .-> X4[Database admin ports]
</pre>
    </div>
    <p>Keep database, Redis, backend and admin ports private unless there is a very specific, secured reason to open
      one.</p>

    <h2>11. The final target architecture</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  I((Internet)) --> FW[Firewall]
  FW --> N[Nginx]
  N --> FE[Frontend - Angular on SpotBukk.in]
  N --> API[Backend API on api.SpotBukk.in]
  API --> PG[(PostgreSQL)]
  API --> RD[(Redis)]
  API --> WK[Workers]
  WK --> EM[Email / notifications]
  API --> OS[Object storage: event images and media]
  M[Mobile app] -. same API .-> API
</pre>
    </div>

    <h2>12. Domain setup</h2>
    <table>
      <tr>
        <th>Address</th>
        <th>Purpose</th>
      </tr>
      <tr>
        <td><code>SpotBukk.in</code> and <code>www.SpotBukk.in</code></td>
        <td>Public website</td>
      </tr>
      <tr>
        <td><code>api.SpotBukk.in</code></td>
        <td>Backend API (website and app both use it)</td>
      </tr>
      <tr>
        <td><code>SpotBukk.in/admin</code>, <code>SpotBukk.in/staff</code></td>
        <td>Admin and staff areas, protected by backend authorization</td>
      </tr>
    </table>
    <p>Separate <code>admin.SpotBukk.in</code> or <code>staff.SpotBukk.in</code> are possible, but not required. For the
      client, keeping one public address is simpler.</p>

    <h2>13. How to set it up, step by step</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  S1[1. Buy domain] --> S2[2. Buy VPS]
  S2 --> S3[3. Secure the server]
  S3 --> S4[4. Install Docker + Compose]
  S4 --> S5[5. Deploy the application: docker compose up -d]
  S5 --> S6[6. Deploy PostgreSQL with persistent storage]
  S6 --> S7[7. Deploy backend API]
  S7 --> S8[8. Deploy Angular via Nginx]
  S8 --> S9[9. Point DNS to server IP]
  S9 --> S10[10. Enable HTTPS]
</pre>
    </div>
    <table>
      <tr>
        <th>Step</th>
        <th>Details</th>
      </tr>
      <tr>
        <td>1. Domain</td>
        <td>Buy something like <code>SpotBukk.in</code>.</td>
      </tr>
      <tr>
        <td>2. VPS</td>
        <td>Ubuntu LTS, 4 vCPU, 8 GB RAM, 160+ GB SSD, public IP.</td>
      </tr>
      <tr>
        <td>3. Secure</td>
        <td>SSH keys, firewall, non-root deploy user, automatic security updates, Fail2ban/rate limiting, backup plan.
        </td>
      </tr>
      <tr>
        <td>4. Docker</td>
        <td>Install Docker and Docker Compose.</td>
      </tr>
      <tr>
        <td>5. Deploy</td>
        <td>Run the stack with <code>docker compose up -d</code>.</td>
      </tr>
      <tr>
        <td>6. Database</td>
        <td>PostgreSQL with persistent storage.</td>
      </tr>
      <tr>
        <td>7. Backend</td>
        <td>Start the backend API container.</td>
      </tr>
      <tr>
        <td>8. Angular</td>
        <td>Build to static files and serve them through Nginx.</td>
      </tr>
      <tr>
        <td>9. DNS</td>
        <td>Point <code>SpotBukk.in</code> and <code>api.SpotBukk.in</code> to the server IP.</td>
      </tr>
      <tr>
        <td>10. HTTPS</td>
        <td>Enable for both. No login or payment system should ever run on plain HTTP.</td>
      </tr>
    </table>
    <div class="tip"><b>Remember: a container is not a backup.</b> Containers are temporary. PostgreSQL needs persistent
      storage <i>and</i> a separate, tested backup strategy.</div>

    <h2>14. The big takeaway</h2>
    <div class="box">
      <pre class="mermaid">
flowchart TB
  B[SpotBukk BACKEND - REST API] --> A[Angular website]
  B --> AN[Android app]
  B --> IO[iOS app]
</pre>
    </div>
    <p>Design the backend around the API, not around Angular. Authentication, events, registrations, payments, tickets,
      QR, staff, admin and analytics are built once and reused by every client.</p>

    <h2>Quick glossary</h2>
    <table>
      <tr>
        <th>Word</th>
        <th>Plain meaning</th>
      </tr>
      <tr>
        <td>API</td>
        <td>The set of doors the website or app uses to ask the server for things</td>
      </tr>
      <tr>
        <td>DNS</td>
        <td>The phone book that turns <code>SpotBukk.in</code> into the server's IP address</td>
      </tr>
      <tr>
        <td>VPS</td>
        <td>A rented virtual computer in a data center</td>
      </tr>
      <tr>
        <td>Docker</td>
        <td>A tool that runs each part of the app in its own box</td>
      </tr>
      <tr>
        <td>Reverse proxy</td>
        <td>The front door that routes visitors to the right part</td>
      </tr>
      <tr>
        <td>HTTPS</td>
        <td>Encrypted web traffic, the padlock in the browser</td>
      </tr>
      <tr>
        <td>Redis</td>
        <td>A fast temporary store, useful for caching and queues</td>
      </tr>
      <tr>
        <td>Object storage</td>
        <td>A separate place for images and files</td>
      </tr>
    </table>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>

  <!--claude-mermaid-runtime-begin:3477-->
  <style>
    .mermaid-diagram {
      margin-block: 4px
    }

    .mermaid-diagram svg {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: auto
    }
  </style>
  <script src="/_runtime/mermaid-11.16.1.min.js"></script>
  <script>(function () {
      var CFG = { "palettes": { "light": { "surface": "#f4efe4", "text": "#42392e", "line": "#8a7f6d", "border": "#7a6c52", "bg": "#fffdf8" }, "dark": { "surface": "#262b34", "text": "#f2f3f5", "line": "#a8adb8", "border": "#9aa4b8", "bg": "#1f232b" } } };
      if (typeof mermaid === 'undefined') return;
      var pres = Array.prototype.slice.call(document.querySelectorAll('pre.mermaid')).filter(function (p) { if (p.hasAttribute('data-claude-mermaid-claimed')) return false; p.setAttribute('data-claude-mermaid-claimed', '1'); return true; });
      if (!pres.length) return;
      var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
      var root = document.documentElement;
      var items = pres.map(function (pre) {
        var mount = document.createElement('div'); mount.className = 'mermaid-diagram';
        return { pre: pre, mount: mount, src: pre.textContent || '' };
      });
      var seq = 0;
      var renderGen = 0;
      var lastKey = '';
      function pageBg(fallback) {
        var els = [document.body, document.documentElement];
        for (var i = 0; i < els.length; i++) {
          var c = els[i] && getComputedStyle(els[i]).backgroundColor;
          if (c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)') return c;
        }
        return fallback;
      }
      function render() {
        var theme = root.getAttribute('data-theme');
        var dark = theme === 'dark' || (!!(mq && mq.matches) && theme !== 'light');
        var pal = dark ? CFG.palettes.dark : CFG.palettes.light;
        var bg = pageBg(pal.bg);
        var key = (dark ? 'd' : 'l') + '|' + bg;
        if (key === lastKey) return;
        lastKey = key;
        var gen = ++renderGen;
        var font = getComputedStyle(document.body).fontFamily || 'sans-serif';
        var nat = { useMaxWidth: false };
        mermaid.initialize({
          startOnLoad: false, securityLevel: 'strict', theme: 'base',
          flowchart: nat, sequence: nat, er: nat, state: nat, class: nat, pie: nat,
          gantt: nat, journey: nat, timeline: nat, gitGraph: nat, mindmap: nat, xyChart: nat,
          quadrantChart: nat, sankey: nat, c4: nat, requirement: nat, block: nat,
          packet: nat, kanban: nat, architecture: nat, radar: nat,
          themeVariables: {
            background: bg, mainBkg: pal.surface, primaryColor: pal.surface,
            primaryTextColor: pal.text, lineColor: pal.line, primaryBorderColor: pal.border,
            nodeBorder: pal.border, clusterBorder: pal.border, edgeLabelBackground: bg,
            clusterBkg: 'rgba(127,127,127,0.07)', titleColor: pal.text,
            darkMode: dark, rowOdd: bg, rowEven: 'rgba(127,127,127,0.07)',
            attributeBackgroundColorOdd: bg, attributeBackgroundColorEven: 'rgba(127,127,127,0.07)',
            fontSize: '16px', fontFamily: font
          },
          themeCSS: '.node rect, .node circle, .node polygon, .node path, .cluster rect { stroke-width: 2px; }'
        });
        items.forEach(function (it) {
          var id = 'claude-mermaid-' + seq++;
          mermaid.render(id, it.src).then(function (r) {
            if (gen !== renderGen) return;
            var prev = it.pre.previousElementSibling;
            if (prev && prev.className === 'mermaid-diagram' && prev !== it.mount) return;
            it.mount.innerHTML = r.svg;
            if (!it.mount.parentNode) it.pre.parentNode.insertBefore(it.mount, it.pre);
            it.pre.style.display = 'none';
          }, function () {
            var scratch = document.getElementById(id);
            if (scratch) scratch.parentNode.removeChild(scratch);
            scratch = document.getElementById('d' + id);
            if (scratch) scratch.parentNode.removeChild(scratch);
            if (gen !== renderGen) return;
            if (it.mount.parentNode) it.mount.parentNode.removeChild(it.mount);
            it.pre.style.display = '';
          });
        });
      }
      render();
      if (mq && mq.addEventListener) mq.addEventListener('change', render);
      if (typeof MutationObserver !== 'undefined') new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    })();</script>
  <!--claude-mermaid-runtime-end-->
</body>

</html>


```


<a id="frontend-editorconfig"></a>
## `frontend/.editorconfig`
[↑ Back to Top](#-table-of-contents)

```ini
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false

```


<a id="frontend-gitignore"></a>
## `frontend/.gitignore`
[↑ Back to Top](#-table-of-contents)

```text
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/mcp.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings
__screenshots__/

# System files
.DS_Store
Thumbs.db

```


<a id="frontend-prettierrc"></a>
## `frontend/.prettierrc`
[↑ Back to Top](#-table-of-contents)

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}

```


<a id="frontend-angular-json"></a>
## `frontend/angular.json`
[↑ Back to Top](#-table-of-contents)

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "SpotBukk": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": true
        },
        "@schematics/angular:class": {
          "skipTests": true
        },
        "@schematics/angular:directive": {
          "skipTests": true
        },
        "@schematics/angular:guard": {
          "skipTests": true
        },
        "@schematics/angular:interceptor": {
          "skipTests": true
        },
        "@schematics/angular:pipe": {
          "skipTests": true
        },
        "@schematics/angular:resolver": {
          "skipTests": true
        },
        "@schematics/angular:service": {
          "skipTests": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "assets"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "allowedCommonJsDependencies": [
              "jsqr"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "12kB",
                  "maximumError": "20kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "host": "0.0.0.0",
            "port": 4300
          },
          "configurations": {
            "production": {
              "buildTarget": "SpotBukk:build:production"
            },
            "development": {
              "buildTarget": "SpotBukk:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}


```


<a id="frontend-package-json"></a>
## `frontend/package.json`
[↑ Back to Top](#-table-of-contents)

```json
{
  "name": "SpotBukk",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --host 0.0.0.0 --port 4300",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "packageManager": "npm@11.13.0",
  "dependencies": {
    "@angular/common": "^21.2.0",
    "@angular/compiler": "^21.2.0",
    "@angular/core": "^21.2.0",
    "@angular/forms": "^21.2.0",
    "@angular/platform-browser": "^21.2.0",
    "@angular/router": "^21.2.0",
    "jsqr": "^1.4.0",
    "lucide-angular": "^1.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.2.24",
    "@angular/cli": "^21.2.24",
    "@angular/compiler-cli": "^21.2.0",
    "prettier": "^3.8.1",
    "typescript": "~5.9.2"
  }
}

```


<a id="frontend-readme-md"></a>
## `frontend/README.md`
[↑ Back to Top](#-table-of-contents)

```markdown
# SpotBukk

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.24.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```


<a id="frontend-src-app-admin-analytics-admin-analytics-component-ts"></a>
## `frontend/src/app/admin/analytics/admin-analytics.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Intelligence & Insights</span>
          <h1 class="page-title">Analytics & Enclave Audience</h1>
          <p class="page-sub">Audience retention, tier velocity, metro concentration, and sell-out performance.</p>
        </div>
      </div>

      <!-- Top KPI Row -->
      <div class="kpi-grid">
        <div class="kpi-card card-base">
          <span class="kpi-label">Average Fill Rate</span>
          <div class="kpi-val">87.4%</div>
          <span class="kpi-trend text-success">+6.2% vs previous quarter</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">Sellout Velocity</span>
          <div class="kpi-val">4.2 Days</div>
          <span class="kpi-trend">Average time to reach 80% cap</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">Repeat Guest Ratio</span>
          <div class="kpi-val">43%</div>
          <span class="kpi-trend text-success">High member loyalty</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">VIP Tier Absorption</span>
          <div class="kpi-val">100%</div>
          <span class="kpi-trend">VIP tiers sell out in < 24hrs</span>
        </div>
      </div>

      <!-- Tier Velocity & City Distribution (Editorial Charts) -->
      <div class="analytics-charts-grid">
        <!-- Ticket Tier Performance -->
        <div class="chart-box card-base">
          <div class="box-header">
            <span class="editorial-kicker">Revenue Contribution</span>
            <h3 class="box-title">Ticket Tier Distribution</h3>
          </div>

          <div class="tier-bars-list">
            <div class="tier-bar-item" *ngFor="let tier of tierBreakdown">
              <div class="tier-bar-labels">
                <span class="t-name">{{ tier.name }}</span>
                <span class="t-stats">{{ tier.share }}% (₹{{ tier.revenue | number }})</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="tier.share"></div>
              </div>
              <span class="tier-micro">{{ tier.count }} tickets sold · ₹{{ tier.avgPrice }} avg price</span>
            </div>
          </div>
        </div>

        <!-- City Distribution -->
        <div class="chart-box card-base">
          <div class="box-header">
            <span class="editorial-kicker">Geography</span>
            <h3 class="box-title">Metro Enclave Concentration</h3>
          </div>

          <div class="city-distribution-list">
            <div class="city-item" *ngFor="let c of cityMetrics">
              <div class="city-top">
                <span class="city-name">{{ c.city }}</span>
                <span class="city-percent">{{ c.share }}%</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="c.share"></div>
              </div>
              <div class="city-meta-sub">
                <span>{{ c.eventsCount }} Gatherings</span>
                <span>₹{{ c.volume | number }} Gross Volume</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Performance Matrix Table -->
      <div class="table-card card-base">
        <div class="table-header">
          <div>
            <span class="editorial-kicker">Comparative Audit</span>
            <h3 class="table-title">Gathering Performance Comparison</h3>
          </div>
        </div>

        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Gathering</th>
                <th>City & Date</th>
                <th>Capacity Sold</th>
                <th>Fill Rate</th>
                <th>Gross Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ev of eventService.events()">
                <td>
                  <span class="cell-primary">{{ ev.title }}</span>
                  <span class="cell-secondary">{{ ev.edition }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.city }}</span>
                  <span class="cell-secondary">{{ ev.date }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                </td>
                <td>
                  <div class="fill-rate-cell">
                    <span class="fill-number">{{ ((ev.ticketsSold / ev.capacity) * 100).toFixed(0) }}%</span>
                    <div class="bar-track min-w-80">
                      <div class="bar-fill" [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cell-primary font-bold">₹{{ (ev.ticketsSold * ev.startingPrice * 1.25) | number:'1.0-0' }}</span>
                </td>
                <td>
                  <span class="status-pill" [ngClass]="'status-' + ev.status">
                    {{ ev.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    /* KPI Grid */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 580px) {
        grid-template-columns: 1fr;
      }
    }

    .kpi-card {
      padding: 24px;
      border-radius: var(--radius-md);

      .kpi-label {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .kpi-val {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .kpi-trend {
        font-size: 0.75rem;
        color: var(--text-secondary);

        &.text-success {
          color: var(--badge-success-text);
        }
      }
    }

    /* Charts Grid */
    .analytics-charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .chart-box {
      padding: 28px;
      border-radius: var(--radius-lg);
    }

    .box-header {
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .box-title {
      font-size: 1.25rem;
    }

    .tier-bars-list,
    .city-distribution-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .tier-bar-labels,
    .city-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 0.88rem;
    }

    .t-name,
    .city-name {
      font-family: var(--font-display);
      font-weight: 700;
    }

    .t-stats,
    .city-percent {
      color: var(--text-muted);
      font-size: 0.82rem;
    }

    .bar-track {
      height: 6px;
      background: var(--bg-surface-elevated);
      border-radius: 3px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 3px;
      transition: width 400ms ease;
    }

    .tier-micro,
    .city-meta-sub {
      display: flex;
      justify-content: space-between;
      font-size: 0.74rem;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* Table */
    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-header {
      padding: 24px 24px 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .table-title {
      font-size: 1.2rem;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 16px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .font-bold {
      font-weight: 700;
    }

    .fill-rate-cell {
      display: flex;
      align-items: center;
      gap: 10px;

      .fill-number {
        font-family: var(--font-display);
        font-size: 0.82rem;
        font-weight: 700;
        min-width: 32px;
      }

      .min-w-80 {
        width: 80px;
      }
    }
  `]
})
export class AdminAnalyticsComponent {
  readonly eventService = inject(EventService);

  readonly tierBreakdown = [
    { name: 'VIP Access & Mezzanine', share: 44, revenue: 433180, count: 290, avgPrice: 1493 },
    { name: 'Regular Admission', share: 38, revenue: 374110, count: 520, avgPrice: 719 },
    { name: 'Early Bird Pass', share: 18, revenue: 177210, count: 310, avgPrice: 571 }
  ];

  readonly cityMetrics = [
    { city: 'Bengaluru (Indiranagar & Lavelle)', share: 42, eventsCount: 3, volume: 413490 },
    { city: 'Mumbai (Worli & Lower Parel)', share: 31, eventsCount: 2, volume: 305195 },
    { city: 'Goa (Vagator Clifftop)', share: 17, eventsCount: 1, volume: 167365 },
    { city: 'Delhi (Mehrauli Farmhouse)', share: 10, eventsCount: 1, volume: 98450 }
  ];
}

```


<a id="frontend-src-app-admin-checkins-admin-checkins-component-ts"></a>
## `frontend/src/app/admin/checkins/admin-checkins.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-checkins',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkins-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Door Management</span>
          <h1 class="page-title">Door Check-Ins & Clearance</h1>
          <p class="page-sub">Monitor real-time guest arrivals, venue door clearance, and manual overrides.</p>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/scanner" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            </svg>
            Launch Camera QR Scanner
          </a>
        </div>
      </div>

      <!-- Realtime Gauge & Clearance Cards -->
      <div class="clearance-stats-grid">
        <div class="stat-card card-base">
          <span class="stat-lbl">Total Admitted Tickets</span>
          <div class="stat-val">{{ totalTickets }}</div>
          <span class="stat-sub">Across all confirmed bookings</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Checked In</span>
          <div class="stat-val text-success">{{ checkedInCount }}</div>
          <span class="stat-sub">Verified at door scanners</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Remaining to Arrive</span>
          <div class="stat-val">{{ remainingCount }}</div>
          <span class="stat-sub">Expected prior to curfew</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Door Clearance</span>
          <div class="stat-val">{{ clearanceRate }}%</div>
          <div class="clearance-bar">
            <div class="bar-fill" [style.width.%]="clearanceRate"></div>
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search attendee, ticket code, or event..."
            class="form-control"
          />
        </div>

        <div class="filter-tabs">
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'all'"
            (click)="tabFilter = 'all'"
          >
            All Guests ({{ eventService.bookings().length }})
          </button>
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'checked'"
            (click)="tabFilter = 'checked'"
          >
            Checked In ({{ checkedInCount }})
          </button>
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'pending'"
            (click)="tabFilter = 'pending'"
          >
            Pending Door ({{ remainingCount }})
          </button>
        </div>
      </div>

      <!-- Live Attendee Check-In Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Ticket Code</th>
                <th>Gathering</th>
                <th>Tier & Party</th>
                <th>Door Status</th>
                <th>Check-In Time</th>
                <th class="text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredAttendees">
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.phone }}</span>
                </td>
                <td>
                  <span class="cell-code font-mono">{{ b.ticketCode }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.eventCity }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.ticketTierName }}</span>
                  <span class="cell-secondary">{{ b.quantity }} Person{{ b.quantity > 1 ? 's' : '' }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [class.status-verified]="b.checkedIn"
                    [class.status-subtle]="!b.checkedIn"
                  >
                    {{ b.checkedIn ? 'ENTRY VERIFIED' : 'Pending Door' }}
                  </span>
                </td>
                <td>
                  <span class="cell-secondary font-mono" *ngIf="b.checkedIn">
                    {{ b.checkedInTime ? (b.checkedInTime | date:'shortTime') : 'Verified' }}
                  </span>
                  <span class="cell-secondary text-muted" *ngIf="!b.checkedIn">
                    —
                  </span>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-sm"
                    [class.btn-primary]="!b.checkedIn"
                    [class.btn-outline]="b.checkedIn"
                    (click)="toggleCheckIn(b)"
                  >
                    {{ b.checkedIn ? 'Undo Check-In' : 'One-Click Verify' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkins-admin-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .clearance-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 580px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 20px;
      border-radius: var(--radius-md);

      .stat-lbl {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .stat-val {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .stat-sub {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
    }

    .text-success {
      color: var(--badge-success-text);
    }

    .clearance-bar {
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      margin-top: 8px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        background: var(--accent);
        border-radius: 2px;
      }
    }

    .toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      flex: 1;
      min-width: 260px;
    }

    .filter-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .filter-tab {
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-xs);

      &.active {
        background: var(--bg-surface-elevated);
        color: var(--text-primary);
        box-shadow: var(--shadow-subtle);
      }
    }

    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .cell-code {
      font-size: 0.8rem;
      color: var(--accent);
    }

    .font-mono {
      font-family: monospace;
    }

    .text-right {
      text-align: right;
    }
  `]
})
export class AdminCheckinsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  tabFilter: 'all' | 'checked' | 'pending' = 'all';

  get totalTickets(): number {
    return this.eventService.totalTicketsSold();
  }

  get checkedInCount(): number {
    return this.eventService.bookings().filter(b => b.checkedIn).length;
  }

  get remainingCount(): number {
    return Math.max(0, this.totalTickets - this.checkedInCount);
  }

  get clearanceRate(): number {
    if (this.totalTickets === 0) return 0;
    return Math.round((this.checkedInCount / this.totalTickets) * 100);
  }

  get filteredAttendees(): Booking[] {
    let list = this.eventService.bookings();

    if (this.tabFilter === 'checked') {
      list = list.filter(b => b.checkedIn);
    } else if (this.tabFilter === 'pending') {
      list = list.filter(b => !b.checkedIn);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.customer.fullName.toLowerCase().includes(q) ||
        b.ticketCode.toLowerCase().includes(q) ||
        b.eventTitle.toLowerCase().includes(q)
      );
    }

    return list;
  }

  toggleCheckIn(booking: Booking): void {
    this.eventService.toggleCheckIn(booking.id);
    const updated = this.eventService.getBookingById(booking.id);
    if (updated) {
      if (updated.checkedIn) {
        this.toast.success('Check-In Verified', `${updated.customer.fullName} admitted.`);
      } else {
        this.toast.info('Check-In Reverted', `${updated.customer.fullName} reverted to pending.`);
      }
    }
  }
}

```


<a id="frontend-src-app-admin-create-event-admin-create-event-component-ts"></a>
## `frontend/src/app/admin/create-event/admin-create-event.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="create-event-page container container-narrow">
      <div class="page-header">
        <a routerLink="/admin/events" class="back-link">&larr; Return to Events Inventory</a>
        <h1 class="page-title">Curate New Gathering</h1>
        <p class="page-sub">Configure scheduling, venue sanctuary parameters, and cryptographic admission tiers.</p>
      </div>

      <form (submit)="saveGathering($event, 'published')" class="create-form">
        <!-- 1. BASIC INFORMATION -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 01</span>
            <h3 class="section-heading">Basic Information & Narrative</h3>
          </div>

          <div class="form-group">
            <label for="evTitle">Event Name *</label>
            <input
              id="evTitle"
              type="text"
              class="form-control"
              [(ngModel)]="title"
              name="title"
              placeholder="e.g. VELVET FREQUENCIES"
              required
            />
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evEdition">Edition / Volume *</label>
              <input
                id="evEdition"
                type="text"
                class="form-control"
                [(ngModel)]="edition"
                name="edition"
                placeholder="e.g. VOL. 01 · ROOFTOP SALON"
                required
              />
            </div>

            <div class="form-group">
              <label for="evCategory">Category</label>
              <select id="evCategory" class="form-control" [(ngModel)]="category" name="category">
                <option value="House Party">House Party</option>
                <option value="Rooftop Sessions">Rooftop Sessions</option>
                <option value="Intimate DJ">Intimate DJ</option>
                <option value="Private Gathering">Private Gathering</option>
                <option value="Pop-up Experience">Pop-up Experience</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="evSubtitle">Editorial Tagline</label>
            <input
              id="evSubtitle"
              type="text"
              class="form-control"
              [(ngModel)]="subtitle"
              name="subtitle"
              placeholder="e.g. Analog deep house, warm vinyl selections, and low-intervention natural wine."
            />
          </div>

          <div class="form-group">
            <label for="evDesc">Event Description & Atmosphere *</label>
            <textarea
              id="evDesc"
              class="form-control"
              rows="4"
              [(ngModel)]="description"
              name="description"
              placeholder="Detail the acoustic philosophy, lighting mood, bar curation, and room energy..."
              required
            ></textarea>
          </div>

          <!-- Hero Image -->
          <div class="form-group">
            <label for="heroImg">Hero Image URL</label>
            <input
              id="heroImg"
              type="text"
              class="form-control"
              [(ngModel)]="heroImage"
              name="heroImage"
              placeholder="https://images.unsplash.com/..."
            />
            <div class="preset-images-row">
              <span class="preset-label">Atmosphere Presets:</span>
              <button
                type="button"
                class="preset-btn"
                *ngFor="let p of imagePresets; let i = index"
                (click)="heroImage = p.url"
              >
                {{ p.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 2. SCHEDULE & TIMING -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 02</span>
            <h3 class="section-heading">Schedule & Timing</h3>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evDate">Event Date *</label>
              <input
                id="evDate"
                type="text"
                class="form-control"
                [(ngModel)]="date"
                name="date"
                placeholder="e.g. Saturday, 21 November 2026"
                required
              />
            </div>

            <div class="form-group">
              <label for="isoDate">Calendar Date (YYYY-MM-DD)</label>
              <input
                id="isoDate"
                type="date"
                class="form-control"
                [(ngModel)]="isoDate"
                name="isoDate"
              />
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evTime">Event Time Span *</label>
              <input
                id="evTime"
                type="text"
                class="form-control"
                [(ngModel)]="time"
                name="time"
                placeholder="e.g. 9:00 PM – 3:30 AM"
                required
              />
            </div>

            <div class="form-group">
              <label for="doorsOpen">Doors Open</label>
              <input
                id="doorsOpen"
                type="text"
                class="form-control"
                [(ngModel)]="doorsOpen"
                name="doorsOpen"
                placeholder="e.g. 8:30 PM"
              />
            </div>
          </div>
        </div>

        <!-- 3. VENUE & ENCLAVE -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 03</span>
            <h3 class="section-heading">Venue & Location</h3>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="venueName">Venue Name *</label>
              <input
                id="venueName"
                type="text"
                class="form-control"
                [(ngModel)]="venue"
                name="venue"
                placeholder="e.g. The Sanctuary Terrace Loft"
                required
              />
            </div>

            <div class="form-group">
              <label for="citySelect">City *</label>
              <select id="citySelect" class="form-control" [(ngModel)]="city" name="city">
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Goa">Goa</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="venueAddress">Private Address (Disclosed 6hr prior) *</label>
            <input
              id="venueAddress"
              type="text"
              class="form-control"
              [(ngModel)]="address"
              name="address"
              placeholder="e.g. 80ft Road, Koramangala 4th Block, Bengaluru, KA"
              required
            />
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="capacity">Hard-Capped Capacity (Guests) *</label>
              <input
                id="capacity"
                type="number"
                class="form-control"
                [(ngModel)]="capacity"
                name="capacity"
                min="20"
                max="500"
                required
              />
            </div>

            <div class="form-group">
              <label for="ageLimit">Age Verification Protocol</label>
              <input
                id="ageLimit"
                type="text"
                class="form-control"
                [(ngModel)]="ageLimit"
                name="ageLimit"
              />
            </div>
          </div>
        </div>

        <!-- 4. TICKETS & ACCESS TIERS -->
        <div class="form-card card-base">
          <div class="card-section-header flex-between">
            <div>
              <span class="editorial-kicker">Section 04</span>
              <h3 class="section-heading">Admission Tiers Builder</h3>
            </div>
            <button type="button" class="btn btn-subtle btn-sm" (click)="addTier()">
              + Add Tier
            </button>
          </div>

          <div class="tiers-builder-list">
            <div class="tier-builder-card" *ngFor="let t of ticketTiers; let i = index">
              <div class="builder-top-row">
                <span class="tier-index">Tier 0{{ i + 1 }}</span>
                <button
                  type="button"
                  class="remove-tier-btn"
                  *ngIf="ticketTiers.length > 1"
                  (click)="removeTier(i)"
                >
                  &times; Remove
                </button>
              </div>

              <div class="form-row-3">
                <div class="form-group">
                  <label>Tier Name</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="t.name"
                    [name]="'t_name_' + i"
                    placeholder="e.g. Regular Pass"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    class="form-control"
                    [(ngModel)]="t.price"
                    [name]="'t_price_' + i"
                    placeholder="699"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Allocation Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    [(ngModel)]="t.totalQuantity"
                    [name]="'t_qty_' + i"
                    placeholder="60"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Tier Perks / Description</label>
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="t.description"
                  [name]="'t_desc_' + i"
                  placeholder="Includes 1 welcome beverage and priority rooftop access"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 5. ETIQUETTE & HOUSE RULES -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 05</span>
            <h3 class="section-heading">House Sanctuary Rules</h3>
          </div>

          <div class="form-group">
            <label for="dressCode">Dress Code Aesthetic</label>
            <input
              id="dressCode"
              type="text"
              class="form-control"
              [(ngModel)]="dressCode"
              name="dressCode"
              placeholder="e.g. Tailored Dark Neutrals / Atmospheric"
            />
          </div>

          <div class="form-group">
            <label for="rulesText">House Rules (One per line)</label>
            <textarea
              id="rulesText"
              class="form-control"
              rows="4"
              [(ngModel)]="rulesRaw"
              name="rulesRaw"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions Footer -->
        <div class="form-actions-footer card-base glass-panel">
          <button
            type="button"
            class="btn btn-outline"
            (click)="saveGathering($event, 'draft')"
          >
            Save as Draft
          </button>
          <button type="submit" class="btn btn-primary btn-lg">
            Publish Event & Activate Guestlist
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-event-page {
      padding-bottom: 80px;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;
      display: inline-block;
      margin-bottom: 12px;

      &:hover {
        text-decoration: underline;
      }
    }

    .page-title {
      font-size: 2.2rem;
      margin-bottom: 6px;
    }

    .page-sub {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .create-form {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .form-card {
      padding: 32px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 20px;
      }
    }

    .card-section-header {
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);

      &.flex-between {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .section-heading {
      font-size: 1.3rem;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    .form-row-3 {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 16px;

      @media (max-width: 680px) {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    .preset-images-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .preset-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .preset-btn {
      font-size: 0.75rem;
      padding: 4px 10px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    /* Tiers Builder */
    .tiers-builder-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .tier-builder-card {
      padding: 20px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
    }

    .builder-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .tier-index {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .remove-tier-btn {
      font-size: 0.75rem;
      color: var(--badge-error-text);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    /* Form Actions Footer */
    .form-actions-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      padding: 20px 32px;
      border-radius: var(--radius-md);
      position: sticky;
      bottom: 24px;
      z-index: 80;
    }
  `]
})
export class AdminCreateEventComponent {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  // Form Fields
  title = '';
  edition = 'VOL. 01';
  subtitle = 'An intimate gathering curated around analog sound and good company.';
  category: any = 'House Party';
  description = 'An unhurried late-night gathering hosted in a private architectural penthouse. Features custom analog sound tuning, bespoke botanicals, and curated company.';
  heroImage = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80';

  date = 'Friday, 28 November 2026';
  isoDate = '2026-11-28';
  time = '9:30 PM – 3:30 AM';
  doorsOpen = '9:00 PM';

  venue = 'The Glass Sanctuary Penthouse';
  address = 'Lavelle Road, Shanthala Nagar, Bengaluru, KA 560001';
  city: any = 'Bengaluru';
  capacity = 160;
  ageLimit = '21+';
  dressCode = 'Atmospheric / Tailored Dark Palette';

  rulesRaw = `Entry strictly 21+ with verified government photo proof.\nStrict no-flash photography policy in the listening salon.\nZero tolerance for harassment or disruptive demeanor.\nDoors lock at 01:30 AM.`;

  ticketTiers: TicketTier[] = [
    {
      id: 'tier-early',
      name: 'Early Bird',
      price: 599,
      description: 'Entry before 10:30 PM with 1 welcome signature spritz.',
      perks: ['Entry before 10:30 PM', '1 house beverage token'],
      totalQuantity: 40,
      availableQuantity: 40,
      badge: 'Limited'
    },
    {
      id: 'tier-regular',
      name: 'Regular Admission',
      price: 799,
      description: 'Anytime all-night admission pass.',
      perks: ['Anytime entry', 'Terrace access'],
      totalQuantity: 100,
      availableQuantity: 100,
      badge: 'Popular'
    }
  ];

  readonly imagePresets = [
    { label: 'Indiranagar Penthouse', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Clifftop Solarium', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Underground Loft', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Estate Garden', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80' }
  ];

  addTier(): void {
    const nextIdx = this.ticketTiers.length + 1;
    this.ticketTiers.push({
      id: 'tier-' + nextIdx,
      name: `VIP Access Tier ${nextIdx}`,
      price: 1199,
      description: 'Mezzanine lounge entry with 2 cocktail tokens.',
      perks: ['Priority lounge entry', '2 cocktails'],
      totalQuantity: 25,
      availableQuantity: 25
    });
  }

  removeTier(index: number): void {
    if (this.ticketTiers.length > 1) {
      this.ticketTiers.splice(index, 1);
    }
  }

  saveGathering(event: Event, status: 'published' | 'draft'): void {
    event.preventDefault();

    if (!this.title.trim() || !this.venue.trim()) {
      this.toast.error('Event title and venue name are mandatory.');
      return;
    }

    const rules = this.rulesRaw
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const startingPrice = Math.min(...this.ticketTiers.map(t => t.price));

    const created = this.eventService.createEvent({
      title: this.title.trim(),
      edition: this.edition.trim(),
      subtitle: this.subtitle.trim(),
      category: this.category,
      date: this.date.trim(),
      isoDate: this.isoDate,
      time: this.time.trim(),
      doorsOpen: this.doorsOpen.trim(),
      city: this.city,
      venue: this.venue.trim(),
      address: this.address.trim(),
      startingPrice,
      featured: false,
      status,
      availability: 'Available',
      ageLimit: this.ageLimit,
      dressCode: this.dressCode,
      capacity: Number(this.capacity),
      heroImage: this.heroImage,
      galleryImages: [this.heroImage],
      description: this.description.trim(),
      highlights: [
        'Curated 21+ crowd',
        'Bespoke acoustic sound tuning',
        'Artisanal beverage selections',
        'Digital pass verification'
      ],
      lineup: [
        { name: 'Resident Selector', role: 'Warmup & Groove', time: '10:00 PM – 12:30 AM' },
        { name: 'Headline Guest', role: 'Main Deep Set', time: '12:30 AM – Close' }
      ],
      ticketTiers: this.ticketTiers.map(t => ({
        ...t,
        availableQuantity: Number(t.totalQuantity)
      })),
      rules
    });

    this.toast.success(
      status === 'published' ? 'Gathering Published!' : 'Draft Saved',
      `${created.title} is now in your calendar.`
    );

    this.router.navigate(['/admin/events']);
  }
}

```


<a id="frontend-src-app-admin-dashboard-admin-dashboard-component-ts"></a>
## `frontend/src/app/admin/dashboard/admin-dashboard.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <!-- Page Title & Header -->
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Performance & Capacity</span>
          <h1 class="page-title">Executive Dashboard</h1>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/events/create" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Event
          </a>
        </div>
      </div>

      <!-- 1. STATISTICAL BLOCKS -->
      <div class="stats-grid">
        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Upcoming Events</span>
            <span class="stat-growth-tag">+2 this month</span>
          </div>
          <div class="stat-metric">{{ eventService.upcomingEventsCount() }}</div>
          <div class="stat-sub">Active curated calendars</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Tickets Sold</span>
            <span class="stat-growth-tag">+18% vs LW</span>
          </div>
          <div class="stat-metric">{{ eventService.totalTicketsSold() }}</div>
          <div class="stat-sub">Across 4 major metro enclaves</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Gross Revenue</span>
            <span class="stat-growth-tag font-bold">₹{{ eventService.totalRevenue() | number }}</span>
          </div>
          <div class="stat-metric">₹{{ (eventService.totalRevenue() / 1000).toFixed(1) }}k</div>
          <div class="stat-sub">Average Order: ₹1,640</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Door Check-Ins</span>
            <span class="stat-growth-tag">Active</span>
          </div>
          <div class="stat-metric">{{ eventService.totalCheckedIn() }}</div>
          <div class="stat-sub">{{ ((eventService.totalCheckedIn() / (eventService.totalTicketsSold() || 1)) * 100).toFixed(0) }}% door clearance rate</div>
        </div>
      </div>

      <!-- 2. REVENUE OVERVIEW CHART (Tasteful Editorial SVG Chart) -->
      <div class="chart-card card-base">
        <div class="chart-header">
          <div>
            <span class="editorial-kicker">Financial Trajectory</span>
            <h3 class="chart-title">Revenue Trajectory & Bookings</h3>
          </div>
          <div class="chart-period-tabs">
            <button
              class="period-tab"
              [class.active]="chartView === 'weekly'"
              (click)="chartView = 'weekly'"
            >
              Weekly
            </button>
            <button
              class="period-tab"
              [class.active]="chartView === 'monthly'"
              (click)="chartView = 'monthly'"
            >
              Monthly
            </button>
          </div>
        </div>

        <!-- Clean SVG Bar/Area Visualization -->
        <div class="chart-visual-area">
          <svg viewBox="0 0 800 240" class="editorial-svg-chart" preserveAspectRatio="none">
            <!-- Grid Lines -->
            <line x1="40" y1="40" x2="780" y2="40" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="100" x2="780" y2="100" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="160" x2="780" y2="160" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="210" x2="780" y2="210" stroke="var(--border-medium)" />

            <!-- Area polygon -->
            <polygon
              [attr.points]="chartView === 'weekly' ? weeklyAreaPoints : monthlyAreaPoints"
              fill="var(--accent-subtle)"
            />

            <!-- Stroke Path -->
            <polyline
              [attr.points]="chartView === 'weekly' ? weeklyLinePoints : monthlyLinePoints"
              fill="none"
              stroke="var(--accent)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- Data Point Circles -->
            <g *ngFor="let pt of currentPoints; let i = index">
              <circle
                [attr.cx]="pt.x"
                [attr.cy]="pt.y"
                r="4.5"
                fill="var(--bg-surface-elevated)"
                stroke="var(--accent)"
                stroke-width="2"
              />
              <text
                [attr.x]="pt.x"
                [attr.y]="pt.y - 10"
                font-family="'Syne', sans-serif"
                font-size="10"
                font-weight="700"
                fill="var(--text-secondary)"
                text-anchor="middle"
              >
                ₹{{ pt.amount }}k
              </text>
              <text
                [attr.x]="pt.x"
                y="230"
                font-size="11"
                fill="var(--text-muted)"
                text-anchor="middle"
              >
                {{ pt.label }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 3. SPLIT TABLES (Upcoming Events + Recent Registrations) -->
      <div class="tables-split-grid">
        <!-- Upcoming Events -->
        <div class="table-card card-base">
          <div class="card-table-header">
            <div>
              <span class="editorial-kicker">Active Gatherings</span>
              <h3 class="table-title">Upcoming Schedule</h3>
            </div>
            <a routerLink="/admin/events" class="table-link">Manage All &rarr;</a>
          </div>

          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date & City</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ev of eventService.events().slice(0, 4)">
                  <td>
                    <div class="table-event-cell">
                      <img [src]="ev.heroImage" [alt]="ev.title" class="cell-thumb" />
                      <div>
                        <span class="cell-primary">{{ ev.title }}</span>
                        <span class="cell-secondary">{{ ev.edition }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="cell-primary">{{ ev.city }}</span>
                    <span class="cell-secondary">{{ ev.date }}</span>
                  </td>
                  <td>
                    <div class="capacity-bar-wrap">
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"
                        ></div>
                      </div>
                      <span class="cap-text">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="status-pill" [ngClass]="'status-' + ev.status">
                      {{ ev.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Registrations -->
        <div class="table-card card-base">
          <div class="card-table-header">
            <div>
              <span class="editorial-kicker">Live Transactions</span>
              <h3 class="table-title">Recent Registrations</h3>
            </div>
            <a routerLink="/admin/registrations" class="table-link">View All &rarr;</a>
          </div>

          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Attendee</th>
                  <th>Gathering</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of eventService.bookings().slice(0, 5)">
                  <td>
                    <span class="cell-primary">{{ b.customer.fullName }}</span>
                    <span class="cell-secondary font-mono">{{ b.ticketCode }}</span>
                  </td>
                  <td>
                    <span class="cell-primary">{{ b.eventTitle }}</span>
                    <span class="cell-secondary">{{ b.ticketTierName }} (&times;{{ b.quantity }})</span>
                  </td>
                  <td>
                    <span class="cell-primary">₹{{ b.totalAmount }}</span>
                    <span class="cell-secondary">{{ b.paymentMethod }}</span>
                  </td>
                  <td>
                    <span
                      class="status-pill"
                      [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                    >
                      {{ b.paymentStatus }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .stat-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .stat-title {
      font-family: var(--font-display);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .stat-growth-tag {
      font-size: 0.72rem;
      color: var(--badge-success-text);
      font-weight: 600;

      &.font-bold {
        font-weight: 700;
      }
    }

    .stat-metric {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 8px;
    }

    .stat-sub {
      font-size: 0.78rem;
      color: var(--text-secondary);
    }

    /* Chart */
    .chart-card {
      padding: 28px;
      border-radius: var(--radius-lg);
    }

    .chart-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .chart-title {
      font-size: 1.25rem;
    }

    .chart-period-tabs {
      display: flex;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 3px;
    }

    .period-tab {
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-xs);

      &.active {
        background: var(--bg-surface-elevated);
        color: var(--text-primary);
        box-shadow: var(--shadow-subtle);
      }
    }

    .chart-visual-area {
      width: 100%;
      overflow-x: auto;
    }

    .editorial-svg-chart {
      width: 100%;
      height: 220px;
      min-width: 600px;
    }

    /* Tables Grid */
    .tables-split-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 1080px) {
        grid-template-columns: 1fr;
      }
    }

    .table-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .card-table-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .table-title {
      font-size: 1.15rem;
    }

    .table-link {
      font-size: 0.82rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 10px 12px;
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 12px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .table-event-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cell-thumb {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      object-fit: cover;
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }

    .capacity-bar-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 110px;
    }

    .bar-track {
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
    }

    .cap-text {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
  `]
})
export class AdminDashboardComponent {
  readonly eventService = inject(EventService);

  chartView: 'weekly' | 'monthly' = 'weekly';

  readonly weeklyData = [
    { label: 'Mon', amount: 48, x: 90, y: 150 },
    { label: 'Tue', amount: 82, x: 200, y: 110 },
    { label: 'Wed', amount: 115, x: 310, y: 80 },
    { label: 'Thu', amount: 164, x: 420, y: 55 },
    { label: 'Fri', amount: 240, x: 530, y: 35 },
    { label: 'Sat', amount: 295, x: 640, y: 20 },
    { label: 'Sun', amount: 190, x: 740, y: 48 }
  ];

  readonly monthlyData = [
    { label: 'Jun', amount: 320, x: 90, y: 140 },
    { label: 'Jul', amount: 480, x: 220, y: 95 },
    { label: 'Aug', amount: 620, x: 350, y: 65 },
    { label: 'Sep', amount: 790, x: 480, y: 45 },
    { label: 'Oct', amount: 984, x: 610, y: 22 },
    { label: 'Nov (Proj)', amount: 1200, x: 740, y: 15 }
  ];

  get currentPoints() {
    return this.chartView === 'weekly' ? this.weeklyData : this.monthlyData;
  }

  get weeklyLinePoints(): string {
    return this.weeklyData.map(p => `${p.x},${p.y}`).join(' ');
  }

  get weeklyAreaPoints(): string {
    return `90,210 ${this.weeklyLinePoints} 740,210`;
  }

  get monthlyLinePoints(): string {
    return this.monthlyData.map(p => `${p.x},${p.y}`).join(' ');
  }

  get monthlyAreaPoints(): string {
    return `90,210 ${this.monthlyLinePoints} 740,210`;
  }
}

```


<a id="frontend-src-app-admin-events-admin-events-component-ts"></a>
## `frontend/src/app/admin/events/admin-events.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventItem } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="events-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Curated Inventory</span>
          <h1 class="page-title">Events & Calendar</h1>
          <p class="page-sub">Manage gathering listings, ticket tiers, capacities, and publishing states.</p>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/events/create" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Gathering
          </a>
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div class="admin-toolbar card-base">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by event title, venue, or city..."
            class="form-control"
          />
        </div>

        <div class="status-tabs">
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'all'"
            (click)="selectedStatus = 'all'"
          >
            All ({{ eventService.events().length }})
          </button>
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'published'"
            (click)="selectedStatus = 'published'"
          >
            Published
          </button>
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'draft'"
            (click)="selectedStatus = 'draft'"
          >
            Drafts
          </button>
        </div>
      </div>

      <!-- Events Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Gathering</th>
                <th>Schedule</th>
                <th>Venue & City</th>
                <th>Admission Pricing</th>
                <th>Capacity Sold</th>
                <th>Status</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ev of filteredEvents">
                <td>
                  <div class="event-meta-cell">
                    <img [src]="ev.heroImage" [alt]="ev.title" class="table-thumb" />
                    <div>
                      <span class="cell-title">{{ ev.title }}</span>
                      <span class="cell-edition">{{ ev.edition }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.date }}</span>
                  <span class="cell-secondary">{{ ev.time }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.venue }}</span>
                  <span class="cell-secondary">{{ ev.city }}</span>
                </td>
                <td>
                  <span class="cell-primary">From ₹{{ ev.startingPrice }}</span>
                  <span class="cell-secondary">{{ ev.ticketTiers.length }} Tiers</span>
                </td>
                <td>
                  <div class="cap-meter">
                    <div class="bar-track">
                      <div
                        class="bar-fill"
                        [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"
                      ></div>
                    </div>
                    <span class="cap-label">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                  </div>
                </td>
                <td>
                  <button
                    class="status-pill status-btn"
                    [ngClass]="'status-' + ev.status"
                    (click)="togglePublish(ev.id)"
                    title="Click to toggle publish status"
                  >
                    {{ ev.status }}
                  </button>
                </td>
                <td class="text-right">
                  <div class="actions-dropdown">
                    <a [routerLink]="['/events', ev.id]" target="_blank" class="action-btn" title="View Public Page">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </a>
                    <button class="action-btn" (click)="duplicateEvent(ev.id)" title="Duplicate Gathering">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button>
                    <button class="action-btn action-delete" (click)="deleteEvent(ev.id)" title="Delete Gathering">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-admin-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .admin-toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 260px;
    }

    .status-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .filter-tab {
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-xs);

      &.active {
        background: var(--bg-surface-elevated);
        color: var(--text-primary);
        box-shadow: var(--shadow-subtle);
      }
    }

    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 16px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .text-right {
      text-align: right;
    }

    .event-meta-cell {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .table-thumb {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .cell-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-primary);
      display: block;
    }

    .cell-edition {
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      color: var(--accent);
      font-weight: 600;
      display: block;
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.76rem;
      color: var(--text-muted);
      display: block;
    }

    .cap-meter {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 110px;
    }

    .bar-track {
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
    }

    .cap-label {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .status-btn {
      cursor: pointer;
    }

    .actions-dropdown {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface-subtle);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
        color: var(--text-primary);
      }

      &.action-delete:hover {
        border-color: var(--badge-error-text);
        color: var(--badge-error-text);
      }
    }
  `]
})
export class AdminEventsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  selectedStatus: 'all' | 'published' | 'draft' = 'all';

  get filteredEvents(): EventItem[] {
    let list = this.eventService.events();
    if (this.selectedStatus !== 'all') {
      list = list.filter(e => e.status === this.selectedStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      );
    }
    return list;
  }

  togglePublish(id: string): void {
    this.eventService.togglePublishStatus(id);
    this.toast.info('Status Updated', 'Gathering publishing state toggled.');
  }

  duplicateEvent(id: string): void {
    const copy = this.eventService.duplicateEvent(id);
    if (copy) {
      this.toast.success('Gathering Duplicated', `${copy.title} added as draft.`);
    }
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you wish to remove this gathering?')) {
      this.eventService.deleteEvent(id);
      this.toast.info('Gathering Removed', 'Event removed from calendar.');
    }
  }
}

```


<a id="frontend-src-app-admin-layout-admin-layout-component-ts"></a>
## `frontend/src/app/admin/layout/admin-layout.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-shell">
      <!-- Admin Sidebar -->
      <aside class="admin-sidebar" [class.mobile-open]="sidebarOpen">
        <div class="sidebar-top">
          <a routerLink="/" class="admin-brand" aria-label="SpotBukk Home">
            <img src="/logo.png" alt="SpotBukk" class="admin-brand-logo" />
          </a>
          <button class="close-sidebar-btn" (click)="sidebarOpen = false" aria-label="Close Sidebar">&times;</button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-title">Core Management</div>
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="9"/>
              <rect x="14" y="3" width="7" height="5"/>
              <rect x="14" y="12" width="7" height="9"/>
              <rect x="3" y="16" width="7" height="5"/>
            </svg>
            Dashboard
          </a>

          <a routerLink="/admin/events" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Events & Calendar
          </a>

          <a routerLink="/admin/events/create" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Create Event
          </a>

          <div class="nav-section-title">Guests & Revenue</div>
          <a routerLink="/admin/registrations" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Registrations
          </a>

          <a routerLink="/admin/payments" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Payments & Audits
          </a>

          <a routerLink="/admin/checkins" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Door Check-Ins
          </a>

          <!-- QR Scanner option (Visible ONLY to authenticated ADMIN) -->
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link qr-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <rect x="7" y="7" width="10" height="10" rx="1"/>
            </svg>
            Live QR Scanner
          </a>

          <a routerLink="/admin/analytics" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Analytics & Metrics
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/" class="public-switch-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Return to Public Website
          </a>
          <button type="button" class="sidebar-signout-btn" (click)="authService.logout()">
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Admin Main Area -->
      <div class="admin-main">
        <!-- Top Navbar -->
        <header class="admin-topbar glass-panel">
          <div class="topbar-left">
            <button class="mobile-sidebar-toggle" (click)="sidebarOpen = true" aria-label="Toggle Sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <a routerLink="/" class="admin-mobile-brand" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk" class="admin-mobile-logo" />
            </a>
            <span class="host-enclave-badge">Indiranagar Penthouse Collective</span>
          </div>

          <div class="topbar-right">
            <!-- Direct scanner button (Visible ONLY when user role is ADMIN) -->
            <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" class="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              </svg>
              QR Scanner
            </a>

            <!-- Role Badge -->
            <div class="auth-role-badge">
              <span class="role-pill" [class.admin]="authService.isAdmin()">
                {{ authService.currentUser()?.role || 'GUEST' }}
              </span>
            </div>

            <!-- Sign Out Button -->
            <button
              type="button"
              class="admin-signout-btn"
              (click)="authService.logout()"
              title="Sign Out"
            >
              Sign Out
            </button>

            <!-- Admin avatar -->
            <div class="admin-avatar" title="Curator Account">
              <span>NK</span>
            </div>
          </div>
        </header>

        <!-- Dynamic Admin Child Outlet -->
        <div class="admin-content-viewport">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: flex;
      min-height: 100vh;
      background: var(--bg-page);
    }

    /* Sidebar */
    .admin-sidebar {
      width: 260px;
      background: var(--bg-surface);
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 100;
      transition: transform var(--transition-normal);

      @media (max-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);

        &.mobile-open {
          transform: translateX(0);
          box-shadow: var(--shadow-drawer);
        }
      }
    }

    .sidebar-top {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
    }

    .admin-brand {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .admin-brand-logo {
      height: 44px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .admin-mobile-brand {
      display: none;
      align-items: center;
      text-decoration: none;

      @media (max-width: 900px) {
        display: inline-flex;
      }
    }

    .admin-mobile-logo {
      height: 32px;
      width: auto;
      max-width: 110px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .close-sidebar-btn {
      display: none;
      font-size: 1.6rem;
      color: var(--text-muted);

      @media (max-width: 900px) {
        display: block;
      }
    }

    .sidebar-nav {
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      overflow-y: auto;
    }

    .nav-section-title {
      font-family: var(--font-display);
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      padding: 16px 12px 6px;
    }

    .side-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all var(--transition-fast);

      svg {
        flex-shrink: 0;
      }

      &:hover {
        color: var(--text-primary);
        background: var(--bg-surface-subtle);
      }

      &.active {
        color: var(--accent);
        background: var(--accent-subtle);
        font-weight: 600;
      }
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid var(--border-subtle);
    }

    .public-switch-link {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;

      &:hover {
        color: var(--accent);
      }
    }

    /* Main Area */
    .admin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .admin-topbar {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 90;

      @media (max-width: 768px) {
        padding: 0 16px;
      }
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mobile-sidebar-toggle {
      display: none;
      color: var(--text-primary);

      @media (max-width: 900px) {
        display: block;
      }
    }

    .host-enclave-badge {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .theme-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      color: var(--text-secondary);
      font-weight: 600;

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .theme-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .admin-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      color: var(--accent);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.78rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-signout-btn {
      background: none;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 5px 10px;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.4);
        background: rgba(128, 0, 32, 0.15);
      }
    }

    .sidebar-signout-btn {
      margin-top: 8px;
      width: 100%;
      background: none;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.8rem;
      padding: 8px 12px;
      cursor: pointer;
      text-align: center;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.3);
        background: rgba(128, 0, 32, 0.12);
      }
    }

    .admin-content-viewport {
      padding: 32px;
      flex: 1;

      @media (max-width: 768px) {
        padding: 20px 16px;
      }
    }

    .auth-role-badge {
      display: flex;
      align-items: center;
    }

    .role-pill {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 3px 8px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);

      &.admin {
        background: rgba(128, 0, 32, 0.18);
        border-color: rgba(128, 0, 32, 0.4);
        color: #ff5277;
      }
    }

    .qr-nav-link {
      background: rgba(128, 0, 32, 0.08);
      border: 1px solid rgba(128, 0, 32, 0.25);
      color: #ff5277 !important;

      &:hover {
        background: rgba(128, 0, 32, 0.16);
      }
    }
  `]
})
export class AdminLayoutComponent {
  readonly authService = inject(AuthService);
  sidebarOpen = false;
}

```


<a id="frontend-src-app-admin-payments-admin-payments-component-ts"></a>
## `frontend/src/app/admin/payments/admin-payments.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Booking, PaymentStatus } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payments-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Financial Ledger</span>
          <h1 class="page-title">Payments & Gateway Audit</h1>
          <p class="page-sub">Settlements, transaction statuses, and payment reconciliation logs.</p>
        </div>
      </div>

      <!-- Financial Metrics Summary -->
      <div class="payment-metrics-grid">
        <div class="metric-card card-base">
          <span class="m-lbl">Gross Volume</span>
          <div class="m-val">₹{{ grossVolume | number }}</div>
          <span class="m-sub text-success">98.2% settlement rate</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Successful Transactions</span>
          <div class="m-val">{{ successCount }}</div>
          <span class="m-sub">Across UPI, Cards, Net Banking</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Refunded / Disputed</span>
          <div class="m-val">₹{{ refundedVolume | number }}</div>
          <span class="m-sub text-muted">1.4% refund frequency</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Average Order Value</span>
          <div class="m-val">₹{{ averageOrderValue }}</div>
          <span class="m-sub">₹948 per guest ticket average</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by Transaction ID, attendee, or event..."
            class="form-control"
          />
        </div>

        <div class="status-tabs">
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'all'"
            (click)="statusFilter = 'all'"
          >
            All
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Successful'"
            (click)="statusFilter = 'Successful'"
          >
            Successful
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Pending'"
            (click)="statusFilter = 'Pending'"
          >
            Pending
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Refunded'"
            (click)="statusFilter = 'Refunded'"
          >
            Refunded
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Failed'"
            (click)="statusFilter = 'Failed'"
          >
            Failed
          </button>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Attendee</th>
                <th>Gathering</th>
                <th>Amount</th>
                <th>Gateway & Rail</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredPayments">
                <td>
                  <span class="cell-primary font-mono">{{ b.transactionId }}</span>
                  <span class="cell-secondary font-mono">{{ b.id }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.email }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.ticketTierName }} ({{ b.quantity }})</span>
                </td>
                <td>
                  <span class="cell-primary font-bold">₹{{ b.totalAmount }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.paymentMethod }}</span>
                  <span class="cell-secondary">SpotBukk Gateway</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                  >
                    {{ b.paymentStatus }}
                  </span>
                </td>
                <td>
                  <span class="cell-secondary">{{ b.bookingDate | date:'medium' }}</span>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-subtle btn-sm"
                    *ngIf="b.paymentStatus === 'Successful'"
                    (click)="refundTransaction(b)"
                  >
                    Refund
                  </button>
                  <span *ngIf="b.paymentStatus !== 'Successful'" class="text-muted font-xs">
                    Archived
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payments-admin-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      margin-bottom: 8px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .payment-metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 580px) {
        grid-template-columns: 1fr;
      }
    }

    .metric-card {
      padding: 20px;
      border-radius: var(--radius-md);

      .m-lbl {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .m-val {
        font-family: var(--font-display);
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .m-sub {
        font-size: 0.75rem;
      }
    }

    .text-success {
      color: var(--badge-success-text);
    }

    .text-muted {
      color: var(--text-muted);
    }

    .toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      flex: 1;
      min-width: 260px;
    }

    .status-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .filter-tab {
      padding: 6px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-xs);

      &.active {
        background: var(--bg-surface-elevated);
        color: var(--text-primary);
        box-shadow: var(--shadow-subtle);
      }
    }

    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .font-mono {
      font-family: monospace;
    }

    .font-bold {
      font-weight: 700;
    }

    .font-xs {
      font-size: 0.75rem;
    }

    .text-right {
      text-align: right;
    }
  `]
})
export class AdminPaymentsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  statusFilter = 'all';

  get grossVolume(): number {
    return this.eventService.bookings()
      .filter(b => b.paymentStatus === 'Successful')
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }

  get successCount(): number {
    return this.eventService.bookings().filter(b => b.paymentStatus === 'Successful').length;
  }

  get refundedVolume(): number {
    return this.eventService.bookings()
      .filter(b => b.paymentStatus === 'Refunded')
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }

  get averageOrderValue(): number {
    const list = this.eventService.bookings().filter(b => b.paymentStatus === 'Successful');
    if (list.length === 0) return 0;
    return Math.round(this.grossVolume / list.length);
  }

  get filteredPayments(): Booking[] {
    let list = this.eventService.bookings();

    if (this.statusFilter !== 'all') {
      list = list.filter(b => b.paymentStatus === this.statusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.transactionId.toLowerCase().includes(q) ||
        b.customer.fullName.toLowerCase().includes(q) ||
        b.eventTitle.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }

    return list;
  }

  refundTransaction(b: Booking): void {
    if (confirm(`Authorize full refund of ₹${b.totalAmount} for ${b.customer.fullName}?`)) {
      this.eventService.updatePaymentStatus(b.id, 'Refunded');
      this.toast.info('Refund Initiated', `₹${b.totalAmount} reversed for booking ${b.id}`);
    }
  }
}

```


<a id="frontend-src-app-admin-qr-scanner-admin-qr-scanner-component-ts"></a>
## `frontend/src/app/admin/qr-scanner/admin-qr-scanner.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import jsQR from 'jsqr';

import { AuthService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event.service';
import { CheckInScanResult, Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

export type ScannerState =
  | 'unauthorized'
  | 'initializing'
  | 'scanning'
  | 'verifying'
  | 'verified'
  | 'used'
  | 'invalid'
  | 'camera_error';

@Component({
  selector: 'app-admin-qr-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="qr-scanner-page container">
      <!-- 1. UNAUTHORIZED / 403 STATE (NON-ADMIN PROTECTION) -->
      <div *ngIf="scannerState() === 'unauthorized'" class="unauth-barrier card-base">
        <div class="unauth-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span class="editorial-kicker">Access Denied</span>
        <h2 class="barrier-title">403 Forbidden — Admin Only</h2>
        <p class="barrier-text">
          The camera hardware and QR validation engine are strictly restricted to authenticated Administrator accounts.
        </p>
        <div class="barrier-actions">
          <a routerLink="/login" [queryParams]="{ mode: 'admin', returnUrl: '/admin/scanner' }" class="btn btn-primary">
            Log In as Administrator
          </a>
          <a routerLink="/" class="btn btn-subtle">
            Return to Public Website
          </a>
        </div>
      </div>

      <!-- 2. ADMIN SCANNER WORKSPACE (RENDERED ONLY FOR ADMIN) -->
      <div *ngIf="authService.isAdmin() && scannerState() !== 'unauthorized'" class="scanner-shell">
        <!-- Top Navigation & Title Bar -->
        <div class="scanner-top-bar">
          <div class="bar-left">
            <span class="editorial-kicker">Curator Security Utility</span>
            <h1 class="page-title">Live QR Camera Scanner</h1>
            <p class="page-subtitle">
              High-speed real-time ticket admission scanner using device camera hardware.
            </p>
          </div>

          <div class="bar-right">
            <!-- Active Admin Badge -->
            <div class="admin-badge">
              <span class="status-dot green"></span>
              <span class="admin-text">
                {{ authService.currentUser()?.fullName }} (ADMIN)
              </span>
            </div>

            <!-- Close Scanner Button -->
            <button class="btn btn-subtle btn-sm" (click)="closeScanner()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Close Scanner
            </button>
          </div>
        </div>

        <!-- Main Scanner Grid -->
        <div class="scanner-layout-grid">
          <!-- Left Column: Camera Viewport -->
          <div class="camera-column">
            <div class="camera-viewport-card card-base">
              <!-- Live Video Feed Container -->
              <div class="video-stage" [class.is-torch-on]="isTorchOn">
                <video
                  #videoElement
                  class="live-video"
                  playsinline
                  muted
                  [class.hidden]="scannerState() === 'camera_error' || scannerState() === 'initializing'"
                ></video>

                <!-- Hidden Canvas for QR Frame Extraction -->
                <canvas #canvasElement class="hidden-canvas"></canvas>

                <!-- Initializing / Loading Indicator -->
                <div *ngIf="scannerState() === 'initializing'" class="viewport-placeholder">
                  <div class="spinner"></div>
                  <span class="placeholder-text">Requesting camera device permission...</span>
                </div>

                <!-- Camera Error Display -->
                <div *ngIf="scannerState() === 'camera_error'" class="camera-error-overlay">
                  <div class="error-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  </div>
                  <h3 class="error-title">Camera Unavailable</h3>
                  <p class="error-desc">{{ cameraErrorMessage }}</p>
                  <div class="error-btn-group">
                    <button class="btn btn-primary btn-sm" (click)="startCamera()">
                      Retry Camera Connection
                    </button>
                    <button class="btn btn-subtle btn-sm" (click)="closeScanner()">
                      Close Scanner
                    </button>
                  </div>
                </div>

                <!-- Viewfinder Overlay (When Camera is Active) -->
                <div
                  *ngIf="scannerState() === 'scanning' || scannerState() === 'verifying'"
                  class="viewfinder-overlay"
                >
                  <!-- 4 Targeting Corner Guides -->
                  <div class="corner-bracket corner-tl"></div>
                  <div class="corner-bracket corner-tr"></div>
                  <div class="corner-bracket corner-bl"></div>
                  <div class="corner-bracket corner-br"></div>

                  <!-- Animated Laser Sweep Line -->
                  <div class="laser-scanner-beam" [class.scanning]="scannerState() === 'scanning'"></div>

                  <!-- Center Target Tag -->
                  <div class="targeting-badge">
                    <span class="badge-text">
                      {{ scannerState() === 'verifying' ? 'DECODING QR...' : 'ALIGN QR WITHIN SIGHT' }}
                    </span>
                  </div>
                </div>

                <!-- Live Camera Controls Bar (Overlaid on bottom of video) -->
                <div
                  *ngIf="scannerState() === 'scanning' || scannerState() === 'verifying'"
                  class="camera-controls-bar"
                >
                  <!-- Torch Toggle -->
                  <button
                    *ngIf="hasTorchSupport"
                    type="button"
                    class="cam-tool-btn"
                    [class.active]="isTorchOn"
                    (click)="toggleTorch()"
                    title="Toggle Flash / Torch"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span>{{ isTorchOn ? 'Torch On' : 'Torch Off' }}</span>
                  </button>

                  <!-- Camera Switch Toggle -->
                  <button
                    *ngIf="videoDevices.length > 1"
                    type="button"
                    class="cam-tool-btn"
                    (click)="switchCamera()"
                    title="Switch Camera Device"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>
                      <polyline points="15 2 20 2 20 7"/>
                      <line x1="20" y1="2" x2="14" y2="8"/>
                    </svg>
                    <span>Switch Camera</span>
                  </button>

                  <div class="gate-indicator">
                    <span>Gate 01 · Door Clearance</span>
                  </div>
                </div>
              </div>

              <!-- Manual Barcode Code Entry Fallback -->
              <div class="manual-input-strip">
                <span class="manual-lbl">Manual Override:</span>
                <div class="manual-form">
                  <input
                    type="text"
                    [(ngModel)]="manualCodeInput"
                    (keyup.enter)="verifyManualCode()"
                    placeholder="Enter Ticket Code or Booking ID (e.g. TKT-77312-VIP)..."
                    class="form-control manual-field"
                  />
                  <button class="btn btn-primary btn-sm" (click)="verifyManualCode()">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Verification Result & Status Ledger -->
          <div class="result-column">
            <!-- Active State Cards -->
            <div class="status-display-card card-base">
              <!-- STATE: SCANNING IN PROGRESS -->
              <div *ngIf="scannerState() === 'scanning'" class="state-panel scanning-panel">
                <div class="radar-pulse-wrap">
                  <div class="pulse-ring ring-1"></div>
                  <div class="pulse-ring ring-2"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M3 12a9 9 0 0 1 9-9"/>
                    <path d="M21 12a9 9 0 0 1-9 9"/>
                  </svg>
                </div>
                <h3 class="panel-headline">Ready for Barcode</h3>
                <p class="panel-body">
                  Position attendee's phone screen or printed pass in front of camera lens. QR detection occurs automatically in real time.
                </p>
                <div class="door-status-pill">
                  <span class="pulse-dot green"></span>
                  <span>Sensor Active · Waiting for Attendee</span>
                </div>
              </div>

              <!-- STATE: VERIFYING IN PROGRESS -->
              <div *ngIf="scannerState() === 'verifying'" class="state-panel verifying-panel">
                <div class="spinner large"></div>
                <h3 class="panel-headline">Authorizing Pass...</h3>
                <p class="panel-body">
                  Running cryptographic signature validation and duplicate admission verification against backend ledger.
                </p>
              </div>

              <!-- STATE: VERIFIED (SUCCESSFUL SCAN) -->
              <div *ngIf="scannerState() === 'verified'" class="state-panel verified-panel">
                <div class="outcome-badge success">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>ENTRY GRANTED</span>
                </div>

                <h3 class="outcome-title text-success">Admitted Successfully</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <!-- Ticket Particulars Card -->
                <div *ngIf="scanResult?.ticket as t" class="ticket-details-box">
                  <div class="detail-row highlight">
                    <span class="d-label">Admitted Guest</span>
                    <span class="d-val strong">{{ t.customer.fullName }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Pass Reference</span>
                    <span class="d-val font-mono">{{ t.ticketCode }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Gathering</span>
                    <span class="d-val">{{ t.eventTitle }} ({{ t.eventEdition }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Tier & Party Size</span>
                    <span class="d-val">{{ t.ticketTierName }} ({{ t.quantity }} Passes)</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Clearance Time</span>
                    <span class="d-val">{{ scanResult?.scanTime }}</span>
                  </div>
                  <div *ngIf="t.additionalGuests && t.additionalGuests.length > 0" class="detail-row">
                    <span class="d-label">Guests in Party</span>
                    <span class="d-val">{{ t.additionalGuests.join(', ') }}</span>
                  </div>
                </div>

                <!-- Action Button: Scan Next -->
                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 4v6h-6"/>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                    Scan Next Pass
                  </button>
                </div>
              </div>

              <!-- STATE: USED (DUPLICATE ENTRY DETECTED) -->
              <div *ngIf="scannerState() === 'used'" class="state-panel used-panel">
                <div class="outcome-badge warning">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>DUPLICATE ADMISSION BLOCKED</span>
                </div>

                <h3 class="outcome-title text-warning">Ticket Already Used</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <div *ngIf="scanResult?.ticket as t" class="ticket-details-box alert-box">
                  <div class="detail-row">
                    <span class="d-label">Registered Guest:</span>
                    <span class="d-val strong">{{ t.customer.fullName }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Ticket Code:</span>
                    <span class="d-val font-mono">{{ t.ticketCode }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">First Check-In:</span>
                    <span class="d-val text-warning">{{ t.checkedInTime | date:'mediumTime' }}</span>
                  </div>
                </div>

                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    Scan Another Pass
                  </button>
                </div>
              </div>

              <!-- STATE: INVALID / TAMPERED TICKET -->
              <div *ngIf="scannerState() === 'invalid'" class="state-panel invalid-panel">
                <div class="outcome-badge error">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>ENTRY REJECTED</span>
                </div>

                <h3 class="outcome-title text-error">Unrecognized Barcode</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <p class="invalid-sub-hint">
                  The scanned payload does not match any valid ticket registration record in the organizer database.
                </p>

                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    Scan Again
                  </button>
                </div>
              </div>
            </div>

            <!-- Door Metrics Strip -->
            <div class="metrics-strip card-base">
              <div class="metric-item">
                <span class="m-lbl">Door Admitted</span>
                <span class="m-val text-accent">{{ eventService.totalCheckedIn() }}</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="m-lbl">Sold Capacity</span>
                <span class="m-val">{{ eventService.totalTicketsSold() }}</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="m-lbl">Clearance Rate</span>
                <span class="m-val">
                  {{
                    eventService.totalTicketsSold() > 0
                      ? ((eventService.totalCheckedIn() / eventService.totalTicketsSold()) * 100).toFixed(0) + '%'
                      : '0%'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-scanner-page {
      padding: 30px 20px 60px;
      min-height: calc(100vh - 120px);
    }

    .unauth-barrier {
      max-width: 500px;
      margin: 80px auto;
      padding: 40px;
      text-align: center;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
    }

    .unauth-icon-wrap {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.15);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .barrier-title {
      font-size: 1.5rem;
      margin: 8px 0 12px;
    }

    .barrier-text {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .barrier-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .scanner-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }

    .page-title {
      font-size: 1.75rem;
      letter-spacing: -0.02em;
      margin: 4px 0 6px;
    }

    .page-subtitle {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .bar-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .admin-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: var(--radius-full);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;

      &.green {
        background: #68c49e;
        box-shadow: 0 0 8px rgba(104, 196, 158, 0.5);
      }
    }

    .scanner-layout-grid {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 24px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .camera-viewport-card {
      padding: 16px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .video-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #000000;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .live-video {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.hidden {
        display: none;
      }
    }

    .hidden-canvas {
      display: none;
    }

    .viewport-placeholder,
    .camera-error-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      text-align: center;
      background: #09090b;
      z-index: 10;
    }

    .placeholder-text {
      margin-top: 16px;
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .error-icon {
      color: #e87b7b;
      margin-bottom: 12px;
    }

    .error-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .error-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
      max-width: 360px;
      margin-bottom: 20px;
    }

    .error-btn-group {
      display: flex;
      gap: 10px;
    }

    /* Viewfinder targeting overlay */
    .viewfinder-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 240px;
      pointer-events: none;
      z-index: 5;
    }

    .corner-bracket {
      position: absolute;
      width: 28px;
      height: 28px;
      border: 3px solid var(--accent);

      &.corner-tl {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
        border-top-left-radius: 8px;
      }

      &.corner-tr {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
        border-top-right-radius: 8px;
      }

      &.corner-bl {
        bottom: 0;
        left: 0;
        border-right: none;
        border-top: none;
        border-bottom-left-radius: 8px;
      }

      &.corner-br {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
        border-bottom-right-radius: 8px;
      }
    }

    .laser-scanner-beam {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ff3366, #ffffff, #ff3366, transparent);
      box-shadow: 0 0 12px #ff3366;
      opacity: 0;

      &.scanning {
        opacity: 1;
        animation: beamSweep 2.2s infinite ease-in-out;
      }
    }

    @keyframes beamSweep {
      0% { top: 5%; }
      50% { top: 95%; }
      100% { top: 5%; }
    }

    .targeting-badge {
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid var(--border-medium);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      font-weight: 700;
      color: var(--text-primary);
    }

    .camera-controls-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px 14px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 6;
    }

    .cam-tool-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-size: 0.75rem;
      cursor: pointer;

      &.active {
        background: var(--accent);
        border-color: var(--accent);
      }
    }

    .gate-indicator {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 500;
    }

    .manual-input-strip {
      padding: 12px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .manual-lbl {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 700;
    }

    .manual-form {
      display: flex;
      gap: 8px;
    }

    .manual-field {
      flex: 1;
      font-size: 0.85rem;
      padding: 8px 12px;
    }

    /* Result column card */
    .status-display-card {
      padding: 28px;
      min-height: 380px;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .state-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .panel-headline {
      font-size: 1.35rem;
      margin: 16px 0 8px;
    }

    .panel-body {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      max-width: 380px;
      margin-bottom: 20px;
    }

    .radar-pulse-wrap {
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.15);
      border: 1px solid var(--accent);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pulse-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid var(--accent);
      opacity: 0.4;
      animation: pulseAnim 2s infinite ease-out;

      &.ring-2 {
        inset: -16px;
        animation-delay: 0.6s;
      }
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.9); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .door-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      color: var(--text-secondary);
    }

    .outcome-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 12px;

      &.success {
        background: rgba(104, 196, 158, 0.15);
        border: 1px solid rgba(104, 196, 158, 0.4);
        color: #68c49e;
      }

      &.warning {
        background: rgba(230, 178, 104, 0.15);
        border: 1px solid rgba(230, 178, 104, 0.4);
        color: #e6b268;
      }

      &.error {
        background: rgba(232, 123, 123, 0.15);
        border: 1px solid rgba(232, 123, 123, 0.4);
        color: #e87b7b;
      }
    }

    .outcome-title {
      font-size: 1.5rem;
      margin-bottom: 6px;

      &.text-success { color: #68c49e; }
      &.text-warning { color: #e6b268; }
      &.text-error   { color: #e87b7b; }
    }

    .outcome-msg {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .ticket-details-box {
      width: 100%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      text-align: left;
      font-size: 0.82rem;
      margin-bottom: 20px;

      &.alert-box {
        border-color: rgba(230, 178, 104, 0.3);
      }
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }

      &.highlight {
        .d-val {
          color: var(--text-primary);
          font-size: 0.95rem;
        }
      }
    }

    .d-label {
      color: var(--text-muted);
    }

    .d-val {
      color: var(--text-secondary);

      &.strong {
        font-weight: 700;
      }
    }

    .scan-action-wrap {
      width: 100%;
    }

    .btn-block {
      width: 100%;
      justify-content: center;
      padding: 12px;
    }

    .metrics-strip {
      margin-top: 16px;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .m-lbl {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .m-val {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .metric-divider {
      width: 1px;
      height: 24px;
      background: var(--border-subtle);
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;

      &.large {
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AdminQrScannerComponent implements OnInit, OnDestroy {
  readonly authService = inject(AuthService);
  readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  @ViewChild('videoElement') videoElementRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElementRef?: ElementRef<HTMLCanvasElement>;

  readonly scannerState = signal<ScannerState>('initializing');
  scanResult: CheckInScanResult | null = null;
  cameraErrorMessage = '';

  private mediaStream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  private isProcessingFrame = false;

  manualCodeInput = '';
  isTorchOn = false;
  hasTorchSupport = false;

  videoDevices: MediaDeviceInfo[] = [];
  selectedDeviceIndex = 0;

  ngOnInit(): void {
    this.checkAdminAccess();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  checkAdminAccess(): void {
    if (!this.authService.isAdmin()) {
      this.scannerState.set('unauthorized');
      return;
    }

    this.scannerState.set('initializing');
    // Start camera when component loads for authenticated Admin
    setTimeout(() => {
      this.startCamera();
    }, 100);
  }

  async startCamera(): Promise<void> {
    this.stopCamera();
    this.scannerState.set('initializing');
    this.cameraErrorMessage = '';

    // Verify browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.cameraErrorMessage =
        'Camera API is not supported by this browser. Please use modern Chrome, Safari, or Edge.';
      this.scannerState.set('camera_error');
      return;
    }

    try {
      // Query available video devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(d => d.kind === 'videoinput');

      // Request camera with back/environment camera preference
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err: any) {
        // Fallback constraint if environment facingMode fails
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      this.mediaStream = stream;

      // Check torch capability
      const track = stream.getVideoTracks()[0];
      if (track) {
        const capabilities = (track as any).getCapabilities?.() || {};
        this.hasTorchSupport = !!capabilities.torch;
      }

      // Attach to video element
      const video = this.videoElementRef?.nativeElement;
      if (video) {
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');
        await video.play();

        this.scannerState.set('scanning');
        this.startDetectionLoop();
      }
    } catch (err: any) {
      this.handleCameraError(err);
    }
  }

  private handleCameraError(error: any): void {
    console.error('Camera access error:', error);
    const errName = error.name || '';

    if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
      this.cameraErrorMessage =
        'Camera permission was denied. Please allow camera permissions in your browser address bar settings to scan attendee passes.';
    } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
      this.cameraErrorMessage =
        'No camera device found on this system. Please connect a webcam or use a mobile device.';
    } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
      this.cameraErrorMessage =
        'Camera is currently in use by another application or operating system process. Please close other camera apps and retry.';
    } else if (errName === 'OverconstrainedError') {
      this.cameraErrorMessage =
        'Requested camera resolution is not supported by your camera hardware.';
    } else {
      this.cameraErrorMessage =
        error.message || 'Unable to start camera stream. Please check permissions and device availability.';
    }

    this.scannerState.set('camera_error');
  }

  private startDetectionLoop(): void {
    const loop = async () => {
      if (this.scannerState() !== 'scanning') {
        return;
      }

      await this.scanCurrentFrame();
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  private async scanCurrentFrame(): Promise<void> {
    if (this.isProcessingFrame) return;

    const video = this.videoElementRef?.nativeElement;
    const canvas = this.canvasElementRef?.nativeElement;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }

    this.isProcessingFrame = true;

    try {
      // 1. Native BarcodeDetector API if available
      if ('BarcodeDetector' in window) {
        try {
          const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
          const barcodes = await detector.detect(video);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            await this.onBarcodeDetected(barcodes[0].rawValue);
            this.isProcessingFrame = false;
            return;
          }
        } catch {
          // Fall through to jsQR
        }
      }

      // 2. jsQR Canvas Decoder Fallback
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data && code.data.trim()) {
          await this.onBarcodeDetected(code.data.trim());
          this.isProcessingFrame = false;
          return;
        }
      }
    } catch (e) {
      // Ignore transient frame errors
    } finally {
      this.isProcessingFrame = false;
    }
  }

  async onBarcodeDetected(payload: string): Promise<void> {
    // Stop continuous frame scanning
    this.scannerState.set('verifying');
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    try {
      // Pass scanned QR data to backend verification API
      const result = await this.eventService.verifyTicketWithBackend(payload);
      this.scanResult = result;

      if (result.status === 'verified') {
        this.scannerState.set('verified');
        this.toast.success(
          'Pass Admitted',
          `${result.ticket?.customer?.fullName || 'Guest'} checked in.`
        );
      } else if (result.status === 'used') {
        this.scannerState.set('used');
        this.toast.warning('Duplicate Ticket', 'This ticket has already been checked in.');
      } else {
        this.scannerState.set('invalid');
        this.toast.error('Invalid Ticket', result.message);
      }
    } catch (err: any) {
      this.scannerState.set('invalid');
      this.scanResult = {
        status: 'invalid',
        message: 'Network verification error. Please retry.',
        scanTime: new Date().toLocaleTimeString(),
        gate: 'Gate 01'
      };
    }
  }

  async verifyManualCode(): Promise<void> {
    const code = this.manualCodeInput.trim();
    if (!code) {
      this.toast.warning('Input Required', 'Please enter a ticket code or booking reference.');
      return;
    }

    this.scannerState.set('verifying');
    await this.onBarcodeDetected(code);
    this.manualCodeInput = '';
  }

  resetForNextScan(): void {
    this.scanResult = null;
    this.scannerState.set('scanning');
    this.startDetectionLoop();
  }

  async toggleTorch(): Promise<void> {
    if (!this.mediaStream) return;
    const track = this.mediaStream.getVideoTracks()[0];
    if (track) {
      try {
        this.isTorchOn = !this.isTorchOn;
        await (track as any).applyConstraints({
          advanced: [{ torch: this.isTorchOn }]
        });
      } catch (err) {
        console.warn('Torch constraint failed:', err);
      }
    }
  }

  async switchCamera(): Promise<void> {
    if (this.videoDevices.length <= 1) return;
    this.selectedDeviceIndex = (this.selectedDeviceIndex + 1) % this.videoDevices.length;
    await this.startCamera();
  }

  stopCamera(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      this.mediaStream = null;
    }

    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.srcObject = null;
    }
  }

  closeScanner(): void {
    this.stopCamera();
    this.router.navigate(['/admin/checkins']);
  }
}

```


<a id="frontend-src-app-admin-registrations-admin-registrations-component-ts"></a>
## `frontend/src/app/admin/registrations/admin-registrations.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="registrations-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Attendee Ledger</span>
          <h1 class="page-title">Registrations & Guestlist</h1>
          <p class="page-sub">Comprehensive ledger of all confirmed and pending attendees across gathering editions.</p>
        </div>

        <div class="header-actions">
          <button class="btn btn-outline btn-sm" (click)="exportCSV()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by attendee name, email, or booking reference..."
            class="form-control"
          />
        </div>

        <div class="filters-wrap">
          <select [(ngModel)]="selectedEventFilter" class="form-control select-filter">
            <option value="all">All Gatherings</option>
            <option *ngFor="let ev of eventService.events()" [value]="ev.id">
              {{ ev.title }} ({{ ev.city }})
            </option>
          </select>

          <select [(ngModel)]="selectedStatusFilter" class="form-control select-filter">
            <option value="all">All Payment Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <!-- Registrations Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Attendee & Reference</th>
                <th>Gathering</th>
                <th>Tier & Guests</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Booked On</th>
                <th>Door Status</th>
                <th class="text-right">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBookings">
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.email }}</span>
                  <span class="cell-code font-mono">{{ b.id }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.eventCity }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.ticketTierName }}</span>
                  <span class="cell-secondary">{{ b.quantity }} pass{{ b.quantity > 1 ? 'es' : '' }}</span>
                </td>
                <td>
                  <span class="cell-primary">₹{{ b.totalAmount }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                  >
                    {{ b.paymentStatus }}
                  </span>
                  <span class="cell-secondary mt-1">{{ b.paymentMethod }}</span>
                </td>
                <td>
                  <span class="cell-secondary">{{ b.bookingDate | date:'mediumDate' }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [class.status-verified]="b.checkedIn"
                    [class.status-subtle]="!b.checkedIn"
                  >
                    {{ b.checkedIn ? 'Checked In' : 'Pending Door' }}
                  </span>
                </td>
                <td class="text-right">
                  <button class="btn btn-subtle btn-sm" (click)="openDetail(b)">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Attendee Detail Drawer / Modal -->
      <div class="modal-overlay" *ngIf="activeBooking" (click)="activeBooking = null">
        <div class="detail-drawer glass-panel" (click)="$event.stopPropagation()">
          <div class="drawer-header">
            <div>
              <span class="editorial-kicker">Registration Dossier</span>
              <h3 class="drawer-title">{{ activeBooking.customer.fullName }}</h3>
            </div>
            <button class="close-btn" (click)="activeBooking = null">&times;</button>
          </div>

          <div class="drawer-body">
            <div class="drawer-section">
              <span class="sec-label">Gathering</span>
              <p class="sec-primary">{{ activeBooking.eventTitle }} — {{ activeBooking.eventEdition }}</p>
              <p class="sec-sub">{{ activeBooking.eventDate }} · {{ activeBooking.eventVenue }}</p>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Contact Credentials</span>
              <div class="d-row">
                <span class="d-lbl">Email:</span>
                <span class="d-val">{{ activeBooking.customer.email }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Phone:</span>
                <span class="d-val">{{ activeBooking.customer.phone }}</span>
              </div>
              <div class="d-row" *ngIf="activeBooking.additionalGuests.length > 0">
                <span class="d-lbl">Accompanied Guests:</span>
                <span class="d-val">{{ activeBooking.additionalGuests.join(', ') }}</span>
              </div>
              <div class="d-row" *ngIf="activeBooking.specialRequests">
                <span class="d-lbl">Special Requests:</span>
                <span class="d-val">{{ activeBooking.specialRequests }}</span>
              </div>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Financial Audit</span>
              <div class="d-row">
                <span class="d-lbl">Tier:</span>
                <span class="d-val">{{ activeBooking.ticketTierName }} (&times;{{ activeBooking.quantity }})</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Subtotal:</span>
                <span class="d-val">₹{{ activeBooking.subtotal }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Fees:</span>
                <span class="d-val">₹{{ activeBooking.convenienceFee }}</span>
              </div>
              <div class="d-row total-highlight">
                <span class="d-lbl">Total Paid:</span>
                <span class="d-val">₹{{ activeBooking.totalAmount }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Transaction Ref:</span>
                <span class="d-val font-mono">{{ activeBooking.transactionId }}</span>
              </div>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Door Check-In Action</span>
              <div class="checkin-action-bar">
                <span class="status-pill" [class.status-verified]="activeBooking.checkedIn" [class.status-subtle]="!activeBooking.checkedIn">
                  {{ activeBooking.checkedIn ? 'ENTRY VERIFIED' : 'NOT CHECKED IN' }}
                </span>
                <button
                  class="btn btn-primary btn-sm"
                  (click)="toggleActiveCheckIn()"
                >
                  {{ activeBooking.checkedIn ? 'Revoke Check-In' : 'Mark Checked In Now' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .registrations-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      flex: 1;
      min-width: 260px;
    }

    .filters-wrap {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .select-filter {
      width: auto;
      min-width: 170px;
    }

    .table-card {
      border-radius: var(--radius-md);
      overflow: hidden;
      padding: 0;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .cell-code {
      font-size: 0.72rem;
      color: var(--accent);
      display: block;
      margin-top: 2px;
    }

    .font-mono {
      font-family: monospace;
    }

    .mt-1 {
      margin-top: 4px;
    }

    .text-right {
      text-align: right;
    }

    /* Modal / Drawer */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      justify-content: flex-end;
    }

    .detail-drawer {
      width: 100%;
      max-width: 460px;
      height: 100%;
      background: var(--bg-surface-elevated);
      padding: 32px;
      overflow-y: auto;
      box-shadow: var(--shadow-drawer);
      display: flex;
      flex-direction: column;
    }

    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .drawer-title {
      font-size: 1.4rem;
    }

    .close-btn {
      font-size: 1.6rem;
      color: var(--text-muted);

      &:hover {
        color: var(--text-primary);
      }
    }

    .drawer-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .drawer-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .sec-label {
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
    }

    .sec-primary {
      font-weight: 700;
      font-size: 1rem;
    }

    .sec-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .d-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.84rem;

      .d-lbl {
        color: var(--text-muted);
      }

      .d-val {
        color: var(--text-primary);
        font-weight: 500;
      }

      &.total-highlight {
        font-weight: 700;
        color: var(--text-primary);
        padding-top: 6px;
        border-top: 1px dashed var(--border-subtle);
      }
    }

    .checkin-action-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
    }
  `]
})
export class AdminRegistrationsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  selectedEventFilter = 'all';
  selectedStatusFilter = 'all';

  activeBooking: Booking | null = null;

  get filteredBookings(): Booking[] {
    let list = this.eventService.bookings();

    if (this.selectedEventFilter !== 'all') {
      list = list.filter(b => b.eventId === this.selectedEventFilter);
    }

    if (this.selectedStatusFilter !== 'all') {
      list = list.filter(b => b.paymentStatus === this.selectedStatusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.customer.fullName.toLowerCase().includes(q) ||
        b.customer.email.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.ticketCode.toLowerCase().includes(q)
      );
    }

    return list;
  }

  openDetail(booking: Booking): void {
    this.activeBooking = booking;
  }

  toggleActiveCheckIn(): void {
    if (this.activeBooking) {
      this.eventService.toggleCheckIn(this.activeBooking.id);
      const updated = this.eventService.getBookingById(this.activeBooking.id);
      if (updated) {
        this.activeBooking = updated;
        this.toast.success(
          'Check-In Updated',
          `${updated.customer.fullName} is now ${updated.checkedIn ? 'marked checked in' : 'pending door'}.`
        );
      }
    }
  }

  exportCSV(): void {
    const rows = [
      ['Booking Reference', 'Customer Name', 'Email', 'Phone', 'Event', 'Tier', 'Qty', 'Amount', 'Payment', 'Status', 'Checked In']
    ];

    for (const b of this.filteredBookings) {
      rows.push([
        b.id,
        b.customer.fullName,
        b.customer.email,
        b.customer.phone,
        b.eventTitle,
        b.ticketTierName,
        String(b.quantity),
        String(b.totalAmount),
        b.paymentMethod,
        b.paymentStatus,
        b.checkedIn ? 'Yes' : 'No'
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(s => `"${s}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SpotBukk-registrations-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.toast.success('CSV Export Generated', `${this.filteredBookings.length} registrations downloaded.`);
  }
}

```


<a id="frontend-src-app-app-config-ts"></a>
## `frontend/src/app/app.config.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { NavigationLoggerService } from './core/services/navigation-logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const logger = inject(NavigationLoggerService);
      logger.init();
    }),
  ],
};

```


<a id="frontend-src-app-app-html"></a>
## `frontend/src/app/app.html`
[↑ Back to Top](#-table-of-contents)

```html
<!-- App component template is inlined in app.ts -->

```


<a id="frontend-src-app-app-routes-ts"></a>
## `frontend/src/app/app.routes.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
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

```


<a id="frontend-src-app-app-scss"></a>
## `frontend/src/app/app.scss`
[↑ Back to Top](#-table-of-contents)

```scss



```


<a id="frontend-src-app-app-ts"></a>
## `frontend/src/app/app.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ThemeService } from './core/services/theme.service';
import { NavigationLoggerService } from './core/services/navigation-logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  template: `
    <div class="app-root-container">
      <!-- Public Header (shown only on public views) -->
      <app-header *ngIf="!isAdminRoute()"></app-header>

      <!-- Main Router Viewport -->
      <main [class.public-main]="!isAdminRoute()">
        <router-outlet></router-outlet>
      </main>

      <!-- Public Footer (shown only on public views) -->
      <app-footer *ngIf="!isAdminRoute()"></app-footer>

      <!-- Global Toast Notifications Viewport -->
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-root-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .public-main {
      flex: 1;
    }
  `]
})
export class App {
  private readonly router = inject(Router);
  readonly themeService = inject(ThemeService); // Ensure theme initialized on launch
  private readonly navigationLogger = inject(NavigationLoggerService); // Ensure centralized router logger active

  readonly isAdminRoute = signal<boolean>(false);

  constructor() {
    this.isAdminRoute.set(this.router.url.startsWith('/admin'));

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
        // Scroll to top on navigation unless fragment is present
        if (!event.urlAfterRedirects.includes('#')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}

```


<a id="frontend-src-app-core-data-mock-events-data-ts"></a>
## `frontend/src/app/core/data/mock-events.data.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
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

```


<a id="frontend-src-app-core-data-mock-registrations-data-ts"></a>
## `frontend/src/app/core/data/mock-registrations.data.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Booking } from '../models/booking.model';

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'NOC-89241',
    ticketCode: 'TKT-89241-AD',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-regular',
    ticketTierName: 'Regular Admission',
    ticketPrice: 699,
    quantity: 2,
    subtotal: 1398,
    convenienceFee: 100,
    totalAmount: 1498,
    customer: {
      fullName: 'Rohan Mehra',
      email: 'rohan.mehra@gmail.com',
      phone: '+91 98450 18239'
    },
    additionalGuests: ['Natasha Roy'],
    specialRequests: 'Arriving together around 10:15 PM',
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-90182749',
    bookingDate: '2026-10-18T19:42:10Z',
    checkedIn: true,
    checkedInTime: '2026-10-24T22:14:00Z',
    qrPayload: 'SpotBukk:TKT-89241-AD:RohanMehra:after-dark-04'
  },
  {
    id: 'NOC-77312',
    ticketCode: 'TKT-77312-VIP',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-vip',
    ticketTierName: 'VIP Backstage & Loft',
    ticketPrice: 999,
    quantity: 1,
    subtotal: 999,
    convenienceFee: 50,
    totalAmount: 1049,
    customer: {
      fullName: 'Dr. Siddharth Verma',
      email: 'siddharth.v@healthcorp.in',
      phone: '+91 99201 44589'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-88129031',
    bookingDate: '2026-10-19T14:10:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-77312-VIP:DrSiddharthVerma:after-dark-04'
  },
  {
    id: 'NOC-64509',
    ticketCode: 'TKT-64509-SD',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-cabana',
    ticketTierName: 'Cliffside Cabana Pass (Pair)',
    ticketPrice: 2499,
    quantity: 1,
    subtotal: 2499,
    convenienceFee: 150,
    totalAmount: 2649,
    customer: {
      fullName: 'Aanya Sen & Kabir',
      email: 'aanya.sen@designcollective.io',
      phone: '+91 97114 38290'
    },
    additionalGuests: ['Kabir Malhotra'],
    specialRequests: 'Celebrating wedding anniversary. Request sea-facing cabana #4.',
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-77401924',
    bookingDate: '2026-10-20T11:25:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-26T16:45:00Z',
    qrPayload: 'SpotBukk:TKT-64509-SD:AanyaSen:house-of-sundown'
  },
  {
    id: 'NOC-53901',
    ticketCode: 'TKT-53901-MS',
    eventId: 'midnight-social',
    eventTitle: 'MIDNIGHT SOCIAL',
    eventEdition: 'SECRET LOFT II',
    eventDate: 'Saturday, 1 November 2026',
    eventTime: '10:00 PM – 4:00 AM',
    eventVenue: 'The Mill Vaults Loft',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ms-regular',
    ticketTierName: 'Community Pass',
    ticketPrice: 799,
    quantity: 2,
    subtotal: 1598,
    convenienceFee: 100,
    totalAmount: 1698,
    customer: {
      fullName: 'Devansh Kothari',
      email: 'devansh.kothari@finly.com',
      phone: '+91 98205 91823'
    },
    additionalGuests: ['Reva Kapoor'],
    paymentMethod: 'Net Banking',
    paymentStatus: 'Successful',
    transactionId: 'TXN-NB-66120943',
    bookingDate: '2026-10-20T21:15:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-53901-MS:DevanshKothari:midnight-social'
  },
  {
    id: 'NOC-41829',
    ticketCode: 'TKT-41829-SB',
    eventId: 'slow-burn',
    eventTitle: 'SLOW BURN',
    eventEdition: 'MEZCAL & VINYL',
    eventDate: 'Thursday, 5 November 2026',
    eventTime: '8:00 PM – 1:30 AM',
    eventVenue: 'Atelier Saloon & Terrace',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sb-collector',
    ticketTierName: 'Collector Reserve Pass',
    ticketPrice: 949,
    quantity: 2,
    subtotal: 1898,
    convenienceFee: 120,
    totalAmount: 2018,
    customer: {
      fullName: 'Zainab Merchant',
      email: 'zainab.merchant@architecture.in',
      phone: '+91 98190 77123'
    },
    additionalGuests: ['Farhan Merchant'],
    specialRequests: 'Allergies to tree nuts for food tasting.',
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-55198270',
    bookingDate: '2026-10-21T09:30:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-41829-SB:ZainabMerchant:slow-burn'
  },
  {
    id: 'NOC-32718',
    ticketCode: 'TKT-32718-SU',
    eventId: 'saturday-unfiltered',
    eventTitle: 'SATURDAY UNFILTERED',
    eventEdition: 'PRIVATE VILLA SHOWCASE',
    eventDate: 'Saturday, 7 November 2026',
    eventTime: '6:00 PM – 2:00 AM',
    eventVenue: 'The Orchard Courtyard Farmhouse',
    eventCity: 'Delhi',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'su-group',
    ticketTierName: 'Gathering Quad (Pass for 4)',
    ticketPrice: 3499,
    quantity: 1,
    subtotal: 3499,
    convenienceFee: 200,
    totalAmount: 3699,
    customer: {
      fullName: 'Vikramaditya Rao',
      email: 'vikram.rao@venturecraft.co',
      phone: '+91 99800 23114'
    },
    additionalGuests: ['Kiran Paul', 'Aditi Rao', 'Sameer Bhatia'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-44910283',
    bookingDate: '2026-10-21T18:04:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-32718-SU:VikramadityaRao:saturday-unfiltered'
  },
  {
    id: 'NOC-29014',
    ticketCode: 'TKT-29014-RS',
    eventId: 'rooftop-sessions',
    eventTitle: 'ROOFTOP SESSIONS',
    eventEdition: 'SKYLINE ECHOES',
    eventDate: 'Friday, 13 November 2026',
    eventTime: '9:00 PM – 3:00 AM',
    eventVenue: 'Highline Observatory 38',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'rs-vip',
    ticketTierName: 'Sea Link Lounge VIP',
    ticketPrice: 1399,
    quantity: 2,
    subtotal: 2798,
    convenienceFee: 150,
    totalAmount: 2948,
    customer: {
      fullName: 'Pooja Bhattacharya',
      email: 'pooja.b@luminagency.com',
      phone: '+91 97690 41258'
    },
    additionalGuests: ['Tara Deshmukh'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-33829104',
    bookingDate: '2026-10-22T13:40:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-29014-RS:PoojaBhattacharya:rooftop-sessions'
  },
  {
    id: 'NOC-18492',
    ticketCode: 'TKT-18492-AD',
    eventId: 'after-dark-04',
    eventTitle: 'AFTER DARK',
    eventEdition: 'VOL. 04',
    eventDate: 'Friday, 24 October 2026',
    eventTime: '9:30 PM – 3:30 AM',
    eventVenue: 'The Glass House Penthouse',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'ad04-early',
    ticketTierName: 'Early Bird',
    ticketPrice: 499,
    quantity: 1,
    subtotal: 499,
    convenienceFee: 50,
    totalAmount: 549,
    customer: {
      fullName: 'Tara Sharma',
      email: 'tara.sharma94@outlook.com',
      phone: '+91 96191 00293'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Successful',
    transactionId: 'TXN-CARD-22019485',
    bookingDate: '2026-10-22T16:12:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-24T21:40:00Z',
    qrPayload: 'SpotBukk:TKT-18492-AD:TaraSharma:after-dark-04'
  },
  {
    id: 'NOC-99201',
    ticketCode: 'TKT-99201-PEN',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-regular',
    ticketTierName: 'Full Gathering Pass',
    ticketPrice: 1199,
    quantity: 1,
    subtotal: 1199,
    convenienceFee: 80,
    totalAmount: 1279,
    customer: {
      fullName: 'Kunal Singhal',
      email: 'kunal.singhal@rediffmail.com',
      phone: '+91 94110 59283'
    },
    additionalGuests: [],
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    transactionId: 'TXN-UPI-11928471',
    bookingDate: '2026-10-23T08:15:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-99201-PEN:KunalSinghal:house-of-sundown'
  },
  {
    id: 'NOC-88402',
    ticketCode: 'TKT-88402-REF',
    eventId: 'slow-burn',
    eventTitle: 'SLOW BURN',
    eventEdition: 'MEZCAL & VINYL',
    eventDate: 'Thursday, 5 November 2026',
    eventTime: '8:00 PM – 1:30 AM',
    eventVenue: 'Atelier Saloon & Terrace',
    eventCity: 'Bengaluru',
    heroImage: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sb-tasting',
    ticketTierName: 'Tasting & Entry Pass',
    ticketPrice: 649,
    quantity: 1,
    subtotal: 649,
    convenienceFee: 50,
    totalAmount: 699,
    customer: {
      fullName: 'Arya Sen',
      email: 'arya.sen@creativestudios.co',
      phone: '+91 98300 48291'
    },
    additionalGuests: [],
    paymentMethod: 'Card',
    paymentStatus: 'Refunded',
    transactionId: 'TXN-CARD-00291845',
    bookingDate: '2026-10-17T11:00:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-88402-REF:AryaSen:slow-burn'
  },
  {
    id: 'NOC-77519',
    ticketCode: 'TKT-77519-FAIL',
    eventId: 'rooftop-sessions',
    eventTitle: 'ROOFTOP SESSIONS',
    eventEdition: 'SKYLINE ECHOES',
    eventDate: 'Friday, 13 November 2026',
    eventTime: '9:00 PM – 3:00 AM',
    eventVenue: 'Highline Observatory 38',
    eventCity: 'Mumbai',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'rs-regular',
    ticketTierName: 'Skyline Tier',
    ticketPrice: 849,
    quantity: 2,
    subtotal: 1698,
    convenienceFee: 100,
    totalAmount: 1798,
    customer: {
      fullName: 'Meera Nambiar',
      email: 'meera.nambiar@techfin.in',
      phone: '+91 99401 23094'
    },
    additionalGuests: ['Rohit Nair'],
    paymentMethod: 'Net Banking',
    paymentStatus: 'Failed',
    transactionId: 'TXN-NB-99018471',
    bookingDate: '2026-10-23T10:45:00Z',
    checkedIn: false,
    qrPayload: 'SpotBukk:TKT-77519-FAIL:MeeraNambiar:rooftop-sessions'
  },
  {
    id: 'NOC-66381',
    ticketCode: 'TKT-66381-SD',
    eventId: 'house-of-sundown',
    eventTitle: 'HOUSE OF SUNDOWN',
    eventEdition: 'GOLDEN HOUR SPECIAL',
    eventDate: 'Sunday, 26 October 2026',
    eventTime: '4:30 PM – 11:30 PM',
    eventVenue: 'Villa Solarium Clifftop',
    eventCity: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80',
    ticketTierId: 'sundown-regular',
    ticketTierName: 'Full Gathering Pass',
    ticketPrice: 1199,
    quantity: 2,
    subtotal: 2398,
    convenienceFee: 150,
    totalAmount: 2548,
    customer: {
      fullName: 'Pranav Joshi',
      email: 'pranav.joshi@wanderlust.io',
      phone: '+91 98860 11928'
    },
    additionalGuests: ['Sameera Khan'],
    paymentMethod: 'UPI',
    paymentStatus: 'Successful',
    transactionId: 'TXN-UPI-88491029',
    bookingDate: '2026-10-23T12:00:00Z',
    checkedIn: true,
    checkedInTime: '2026-10-26T17:10:00Z',
    qrPayload: 'SpotBukk:TKT-66381-SD:PranavJoshi:house-of-sundown'
  }
];

```


<a id="frontend-src-app-core-guards-admin-auth-guard-ts"></a>
## `frontend/src/app/core/guards/admin-auth.guard.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  // 1. Unauthenticated users -> Redirect to Login Page
  if (!authService.isAuthenticated()) {
    toast.error('Authentication Required', 'Please sign in with an Administrator account to access the admin portal.');
    router.navigate(['/login'], {
      queryParams: { reason: 'unauthenticated', returnUrl: state.url, mode: 'admin' }
    });
    return false;
  }

  // 2. Authenticated but non-admin users (END_USER) -> Strictly 403 Forbidden
  if (!authService.isAdmin()) {
    toast.error('403 Forbidden', 'Access restricted. This section is strictly reserved for Admin accounts.');
    router.navigate(['/unauthorized'], {
      queryParams: { reason: 'forbidden', returnUrl: state.url }
    });
    return false;
  }

  return true;
};

```


<a id="frontend-src-app-core-guards-user-auth-guard-ts"></a>
## `frontend/src/app/core/guards/user-auth.guard.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (!authService.isAuthenticated()) {
    toast.info('Sign In Required', 'Please sign in to access your bookings and digital passes.');
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  return true;
};

```


<a id="frontend-src-app-core-models-booking-model-ts"></a>
## `frontend/src/app/core/models/booking.model.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
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

```


<a id="frontend-src-app-core-models-event-model-ts"></a>
## `frontend/src/app/core/models/event.model.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
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

```


<a id="frontend-src-app-core-models-theme-model-ts"></a>
## `frontend/src/app/core/models/theme.model.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
export type ThemeId = 'Burgundy';

export interface ThemeRgb {
  r: number;
  g: number;
  b: number;
}

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  hex: string;
  rgb: ThemeRgb;
  palette: {
    bg: string;
    surface: string;
    accent: string;
    text: string;
    hex?: string;
    rgb?: ThemeRgb;
  };
}

export const BURGUNDY_THEME: ThemeOption = {
  id: 'Burgundy',
  name: 'Burgundy',
  tagline: 'Deep charcoal, warm white & signature burgundy',
  hex: '#800020',
  rgb: {
    r: 128,
    g: 0,
    b: 32
  },
  palette: {
    bg: '#0b0c0e',
    surface: '#121417',
    accent: '#800020',
    text: '#f5f2eb',
    hex: '#800020',
    rgb: {
      r: 128,
      g: 0,
      b: 32
    }
  }
};

export const THEME: ThemeOption = BURGUNDY_THEME;
export const THEMES: ThemeOption[] = [BURGUNDY_THEME];

```


<a id="frontend-src-app-core-models-user-model-ts"></a>
## `frontend/src/app/core/models/user.model.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
export type UserRole = 'ADMIN' | 'END_USER' | 'USER';

export type AuthProvider = 'GOOGLE' | 'PHONE' | 'EMAIL' | 'ADMIN' | 'MOCK';

export interface User {
  id: string;
  name?: string;
  fullName: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  authenticationProvider: AuthProvider;
  role: UserRole;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
  message?: string;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  error?: string;
  cooldownSeconds?: number;
  expiresInSeconds?: number;
}

```


<a id="frontend-src-app-core-services-auth-service-ts"></a>
## `frontend/src/app/core/services/auth.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, OtpResponse } from '../models/user.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  private readonly TOKEN_STORAGE_KEY = 'spotbukk_auth_token';
  private readonly USER_STORAGE_KEY = 'spotbukk_auth_user';

  readonly currentUser = signal<User | null>(null);
  readonly token = signal<string | null>(null);
  readonly isLoading = signal<boolean>(false);

  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');
  readonly isEndUser = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'END_USER' || role === 'USER';
  });
  readonly isUser = computed(() => this.isEndUser());

  constructor() {
    this.restoreSession();
  }

  /**
   * Restores user session from storage and validates token with backend.
   * Never automatically authenticates guests as Admin.
   */
  private async restoreSession(): Promise<void> {
    const storedToken = localStorage.getItem(this.TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(this.USER_STORAGE_KEY);

    if (!storedToken) {
      return;
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        this.token.set(storedToken);
        this.currentUser.set(parsed);
      } catch {
        this.clearSession();
        return;
      }
    }

    // Verify token with backend /api/auth/me
    try {
      const headers = new HttpHeaders({ Authorization: `Bearer ${storedToken}` });
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; user: User }>(`${this.apiUrl}/api/auth/me`, { headers })
      );

      if (res && res.success && res.user) {
        this.saveSession(storedToken, res.user);
      } else {
        this.clearSession();
      }
    } catch (err: any) {
      // If token expired or rejected by server (401/403), invalidate session
      if (err.status === 401 || err.status === 403) {
        this.clearSession();
      }
      // If server unreachable, keep restored user but log note
    }
  }

  /**
   * Option 1: Continue with Google (End User)
   */
  async loginWithGoogle(credential?: string, userInfo?: { email?: string; name?: string; picture?: string }): Promise<User> {
    this.isLoading.set(true);
    try {
      const payload = {
        credential,
        email: userInfo?.email || 'guest.curator@gmail.com',
        name: userInfo?.name || 'SpotBukk Attendee',
        picture: userInfo?.picture || ''
      };

      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/google`, payload)
      );

      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Welcome!', `Signed in with Google as ${res.user.fullName || res.user.name}`);
        return res.user;
      }
      throw new Error(res.error || 'Google authentication failed');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Google authentication failed';
      this.toast.error('Authentication Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Phone OTP — Request Verification Code
   */
  async sendPhoneOtp(phone: string): Promise<OtpResponse> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<OtpResponse>(`${this.apiUrl}/api/auth/phone/send-otp`, { phone })
      );
      if (res && res.success) {
        this.toast.info('Verification Code Sent', res.message || 'Check your SMS for the 6-digit code.');
        return res;
      }
      throw new Error(res.error || 'Failed to send verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to send phone OTP';
      this.toast.error('SMS Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Phone OTP — Verify Code & Sign In
   */
  async verifyPhoneOtp(phone: string, otp: string): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/phone/verify-otp`, { phone, otp })
      );
      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Verified', `Signed in successfully with phone (${res.user.phone || phone})`);
        return res.user;
      }
      throw new Error(res.error || 'Invalid verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to verify code';
      this.toast.error('Verification Failed', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Email OTP — Request Verification Code
   */
  async sendEmailOtp(email: string): Promise<OtpResponse> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<OtpResponse>(`${this.apiUrl}/api/auth/email/send-otp`, { email })
      );
      if (res && res.success) {
        this.toast.info('Verification Code Sent', res.message || 'Check your inbox for the 6-digit code.');
        return res;
      }
      throw new Error(res.error || 'Failed to send email verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to send email OTP';
      this.toast.error('Email Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Email OTP — Verify Code & Sign In
   */
  async verifyEmailOtp(email: string, otp: string): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/email/verify-otp`, { email, otp })
      );
      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Verified', `Signed in successfully as ${res.user.email}`);
        return res.user;
      }
      throw new Error(res.error || 'Invalid verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to verify email code';
      this.toast.error('Verification Failed', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Administrator Authentication: Verified strictly by backend with admin credentials
   */
  async loginAsAdmin(email: string, password: string, notify = true): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/admin/login`, { email, password })
      );

      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        if (notify) {
          this.toast.success('Curator Clearance Granted', `Authenticated as Administrator: ${res.user.fullName}`);
        }
        return res.user;
      }
      throw new Error(res.error || 'Administrator authentication rejected');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Invalid administrator credentials';
      this.toast.error('401 Unauthorized', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Secure Sign Out: Clears tokens, local state, and invalidates session
   */
  logout(notify = true): void {
    // Attempt backend logout notice
    try {
      const token = this.token();
      if (token) {
        firstValueFrom(
          this.http.post(`${this.apiUrl}/api/auth/logout`, {}, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
          })
        ).catch(() => {});
      }
    } catch {
      // Ignore background logout network errors
    }

    const wasAdmin = this.isAdmin();
    this.clearSession();

    if (notify) {
      this.toast.info('Signed Out', 'Your session has been terminated securely.');
    }

    // If logging out from an admin view, redirect immediately to login
    if (wasAdmin || this.router.url.startsWith('/admin') || this.router.url.startsWith('/check-in')) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private saveSession(token: string, user: User): void {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.USER_STORAGE_KEY);
  }

  getAuthHeaders(): HttpHeaders {
    const t = this.token();
    if (t) {
      return new HttpHeaders({
        Authorization: `Bearer ${t}`
      });
    }
    return new HttpHeaders();
  }
}

```


<a id="frontend-src-app-core-services-event-service-ts"></a>
## `frontend/src/app/core/services/event.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EventItem, TicketTier } from '../models/event.model';
import { Booking, CheckInScanResult, PaymentMethod, PaymentStatus } from '../models/booking.model';
import { MOCK_EVENTS } from '../data/mock-events.data';
import { MOCK_BOOKINGS } from '../data/mock-registrations.data';
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
        this.events.set(JSON.parse(storedEvents));
      } catch {
        this.events.set(MOCK_EVENTS);
      }
    } else {
      this.events.set(MOCK_EVENTS);
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
    return this.events().find(e => e.id === id || e.slug === id);
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

```


<a id="frontend-src-app-core-services-navigation-logger-service-ts"></a>
## `frontend/src/app/core/services/navigation-logger.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, inject, isDevMode, ApplicationRef } from '@angular/core';
import {
  Router,
  NavigationStart,
  RoutesRecognized,
  GuardsCheckStart,
  GuardsCheckEnd,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  NavigationSkipped,
  Event as RouterEvent
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export interface NavigationLogRecord {
  timestamp: string;
  event: string;
  navigationId: number;
  from: string;
  to: string;
  durationMs: number;
  status: 'success' | 'cancelled' | 'error' | 'skipped' | 'in-progress';
  reason?: string;
  error?: string;
  trigger?: string;
}

interface ActiveNavigation {
  id: number;
  startTime: number;
  from: string;
  to: string;
  trigger?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationLoggerService {
  private readonly router = inject(Router);
  private readonly appRef = inject(ApplicationRef);

  private readonly STORAGE_KEY = 'SpotBukk_navigation_logs';
  private readonly MAX_LOGS = 500;

  private currentUrl = '/';
  private readonly activeNavigations = new Map<number, ActiveNavigation>();
  private initialized = false;

  private readonly logsSubject = new BehaviorSubject<NavigationLogRecord[]>([]);
  public readonly logs$: Observable<NavigationLogRecord[]> = this.logsSubject.asObservable();

  constructor() {
    this.init();
  }

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Load initial logs into subject for reactive consumers
    this.refreshMemoryLogs();

    // Determine initial URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      this.currentUrl = `${path}${search}${hash}` || '/';
    }

    if (this.isLoggingEnabled()) {
      console.log('[SpotBukk APP]\nApplication initialized');
      if (typeof window !== 'undefined') {
        (window as any).__SpotBukkRouter = this.router;
        (window as any).__SpotBukkLogger = this;
      }
    }

    // Lifecycle: App ready
    this.appRef.isStable
      .pipe(
        filter((stable) => !!stable),
        take(1)
      )
      .subscribe(() => {
        if (this.isLoggingEnabled()) {
          console.log('[SpotBukk APP]\nApplication ready');
        }
      });

    // Centralized Router Event Stream
    this.router.events.subscribe((event: RouterEvent) => {
      this.handleRouterEvent(event);
    });
  }

  public isLoggingEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    if (isDevMode()) return true;
    try {
      return window.localStorage?.getItem('SpotBukk_enable_nav_logging') === 'true';
    } catch {
      return false;
    }
  }

  private handleRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.onNavigationStart(event);
    } else if (event instanceof RoutesRecognized) {
      this.onRoutesRecognized(event);
    } else if (event instanceof GuardsCheckStart) {
      this.onGuardsCheckStart(event);
    } else if (event instanceof GuardsCheckEnd) {
      this.onGuardsCheckEnd(event);
    } else if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event);
    } else if (event instanceof NavigationCancel) {
      this.onNavigationCancel(event);
    } else if (event instanceof NavigationError) {
      this.onNavigationError(event);
    } else if (event instanceof NavigationSkipped) {
      this.onNavigationSkipped(event);
    }
  }

  private onNavigationStart(event: NavigationStart): void {
    const from = this.currentUrl;
    const to = event.url;
    const startTime = performance.now();

    this.activeNavigations.set(event.id, {
      id: event.id,
      startTime,
      from,
      to,
      trigger: event.navigationTrigger
    });

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nNavigationStart\nFROM: ${from}\nTO: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationStart',
      navigationId: event.id,
      from,
      to,
      durationMs: 0,
      status: 'in-progress',
      trigger: event.navigationTrigger
    });
  }

  private onRoutesRecognized(event: RoutesRecognized): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.urlAfterRedirects || event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nRoutesRecognized\nFROM: ${from}\nTO: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'RoutesRecognized',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: 'in-progress'
    });
  }

  private onGuardsCheckStart(event: GuardsCheckStart): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nGuardsCheckStart\nURL: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'GuardsCheckStart',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: 'in-progress'
    });
  }

  private onGuardsCheckEnd(event: GuardsCheckEnd): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(
        `[SpotBukk ROUTER] ${timeStr}\nGuardsCheckEnd\nURL: ${to}\nID: ${event.id}\nStatus: ${event.shouldActivate ? 'PASSED' : 'BLOCKED'
        }`
      );
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'GuardsCheckEnd',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: event.shouldActivate ? 'in-progress' : 'cancelled',
      reason: event.shouldActivate ? undefined : 'Guard activation blocked'
    });
  }

  private onNavigationEnd(event: NavigationEnd): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.urlAfterRedirects || event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;

    this.currentUrl = to;
    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(
        `[SpotBukk ROUTER] ${timeStr}\nNavigationEnd\nFROM: ${from}\nTO: ${to}\nID: ${event.id}\nDuration: ${durationMs}ms\nStatus: SUCCESS`
      );
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationEnd',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'success'
    });
  }

  private onNavigationCancel(event: NavigationCancel): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const reason = event.reason || 'Navigation cancelled by guard or redirect';

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      console.warn(`[SpotBukk ROUTER]\nNavigationCancel\nURL: ${to}\nReason: ${reason}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationCancel',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'cancelled',
      reason
    });
  }

  private onNavigationError(event: NavigationError): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const errorMsg = String(event.error?.message || event.error || 'Unknown navigation error');

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      console.error(`[SpotBukk ROUTER ERROR]\nNavigationError\nURL: ${to}\nError: ${errorMsg}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationError',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'error',
      error: errorMsg
    });
  }

  private onNavigationSkipped(event: NavigationSkipped): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const reason = event.reason || 'Navigation skipped (target same as current URL)';

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nNavigationSkipped\nURL: ${to}\nID: ${event.id}\nReason: ${reason}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationSkipped',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'skipped',
      reason
    });
  }

  public logNavigation(record: NavigationLogRecord): void {
    if (!this.isLoggingEnabled()) return;
    if (typeof window === 'undefined') return;

    try {
      const logs = this.getLogs();
      const updated = [record, ...logs].slice(0, this.MAX_LOGS);
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      this.logsSubject.next(updated);
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to persist log record to localStorage', err);
    }
  }

  public getLogs(): NavigationLogRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to read logs from localStorage', err);
      return [];
    }
  }

  public clearLogs(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(this.STORAGE_KEY);
      this.logsSubject.next([]);
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to clear logs from localStorage', err);
    }
  }

  public getRecentLogs(limit: number = 50): NavigationLogRecord[] {
    return this.getLogs().slice(0, limit);
  }

  public exportLogsAsJson(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  }

  public downloadLogsJson(): void {
    if (typeof window === 'undefined') return;
    const jsonStr = this.exportLogsAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `SpotBukk-navigation-logs-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private refreshMemoryLogs(): void {
    const current = this.getLogs();
    this.logsSubject.next(current);
  }

  private getFormattedTime(date: Date = new Date()): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
}

```


<a id="frontend-src-app-core-services-payment-service-ts"></a>
## `frontend/src/app/core/services/payment.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

export interface PaymentUser {
  name: string;
  email: string;
  contact: string;
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  key: string;
  order?: any;
}

export interface VerifyPaymentResponse {
  success?: boolean;
  ok?: boolean;
  message?: string;
  error?: string;
}

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Razorpay Standard Web Checkout Integration:
   * 1. Calls backend POST /api/create-order with amount in paise (>= 100 paise)
   * 2. Opens Razorpay modal (https://checkout.razorpay.com/v1/checkout.js)
   * 3. On success, receives razorpay_payment_id, razorpay_order_id, razorpay_signature
   * 4. Sends all three to backend POST /api/verify-payment for HMAC-SHA256 signature verification
   * 5. Resolves true if verified, false if modal dismissed or verification fails
   */
  async pay(amountInRupees: number, user: PaymentUser): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }

    if (typeof (window as any).Razorpay === 'undefined') {
      this.toast.error('Payment SDK Missing', 'Razorpay Checkout SDK is still loading. Please refresh and try again.');
      return false;
    }

    // Convert Rupees to Paise (minimum 100 paise)
    const amountInPaise = Math.max(100, Math.round(amountInRupees * 100));

    try {
      // STEP 1: BACKEND - Call /api/create-order
      const orderRes = await firstValueFrom(
        this.http.post<CreateOrderResponse>(`${this.apiUrl}/api/create-order`, {
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        })
      );

      const orderId = orderRes?.order_id || orderRes?.order?.id;
      const keyId = orderRes?.key;

      if (!orderId || !keyId) {
        throw new Error('Invalid order payload returned from create-order endpoint');
      }

      // STEP 2: FRONTEND - Open Razorpay Modal
      return new Promise<boolean>((resolve) => {
        let isSettled = false;

        const options = {
          key: keyId,
          amount: orderRes.amount || amountInPaise,
          currency: orderRes.currency || 'INR',
          name: 'SpotBukk',
          description: 'Nights Worth Remembering | Pass Reservation',
          order_id: orderId,
          prefill: {
            name: user.name || '',
            email: user.email || '',
            contact: user.contact || ''
          },
          theme: {
            color: '#8b1d31' // Matches SpotBukk signature luxury burgundy accent
          },
          modal: {
            ondismiss: () => {
              if (!isSettled) {
                isSettled = true;
                this.toast.info('Payment Dismissed', 'You closed the checkout modal.');
                resolve(false);
              }
            }
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            if (isSettled) return;

            try {
              // STEP 3: BACKEND - Verify Signature at /api/verify-payment
              const verifyRes = await firstValueFrom(
                this.http.post<VerifyPaymentResponse>(`${this.apiUrl}/api/verify-payment`, {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              );

              if (verifyRes && (verifyRes.success || verifyRes.ok)) {
                isSettled = true;
                resolve(true);
              } else {
                isSettled = true;
                this.toast.error('Verification Mismatch', verifyRes?.error || 'Payment signature mismatch.');
                resolve(false);
              }
            } catch (verifyErr: any) {
              console.error('Signature verification error:', verifyErr);
              isSettled = true;
              const errMsg = verifyErr?.error?.error || verifyErr?.message || 'Server failed to verify payment signature.';
              this.toast.error('Verification Error', errMsg);
              resolve(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);

        // Handle payment.failed event
        rzp.on('payment.failed', (failData: any) => {
          console.error('Razorpay payment failed:', failData);
          const reason = failData?.error?.description || 'Payment was declined.';
          this.toast.error('Payment Failed', reason);
          if (!isSettled) {
            isSettled = true;
            resolve(false);
          }
        });

        rzp.open();
      });
    } catch (orderErr: any) {
      console.error('Order creation error:', orderErr);
      const errMsg = orderErr?.error?.error || orderErr?.message || 'Unable to communicate with order creation service.';
      this.toast.error('Order Creation Failed', errMsg);
      return false;
    }
  }
}

```


<a id="frontend-src-app-core-services-theme-service-ts"></a>
## `frontend/src/app/core/services/theme.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, signal } from '@angular/core';
import { THEMES, ThemeId, ThemeOption } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'SpotBukk_active_theme';
  readonly themes: ThemeOption[] = THEMES;
  readonly currentTheme = signal<ThemeId>('Burgundy');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeId;
    if (saved && THEMES.some(t => t.id === saved)) {
      this.setTheme(saved);
    } else {
      this.setTheme('Burgundy');
    }
  }

  setTheme(themeId: ThemeId): void {
    this.currentTheme.set(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem(this.STORAGE_KEY, themeId);
  }

  getCurrentThemeDetails(): ThemeOption {
    return this.themes.find(t => t.id === this.currentTheme()) || this.themes[0];
  }
}

```


<a id="frontend-src-app-core-services-toast-service-ts"></a>
## `frontend/src/app/core/services/toast.service.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  show(toast: Omit<ToastMessage, 'id'>): void {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration ?? 4000
    };

    this.toasts.update(current => [...current, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }
  }

  success(title: string, message?: string): void {
    this.show({ type: 'success', title, message });
  }

  error(title: string, message?: string): void {
    this.show({ type: 'error', title, message });
  }

  info(title: string, message?: string): void {
    this.show({ type: 'info', title, message });
  }

  warning(title: string, message?: string): void {
    this.show({ type: 'warning', title, message });
  }

  dismiss(id: string): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}

```


<a id="frontend-src-app-dev-logs-dev-logs-component-ts"></a>
## `frontend/src/app/dev/logs/dev-logs.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationLoggerService, NavigationLogRecord } from '../../core/services/navigation-logger.service';

@Component({
  selector: 'app-dev-logs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="dev-logs-container">
      <div class="container">
        <!-- HEADER SECTION -->
        <header class="dev-header">
          <div class="header-left">
            <div class="kicker-row">
              <span class="editorial-kicker">SYSTEM TELEMETRY // INTERNAL DEBUG</span>
              <span class="status-live-pill">
                <span class="live-dot"></span>
                Router Event Bus Active
              </span>
            </div>
            <h1 class="dev-title">Navigation & Route Telemetry</h1>
            <p class="dev-subtitle">
              Observing real-time router events, execution timings, network interface captures, and persistent browser storage.
            </p>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="header-actions">
            <button (click)="refreshLogs()" class="btn-dev btn-secondary" title="Re-read records from localStorage">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
              Refresh Logs
            </button>
            <button (click)="clearLogs()" class="btn-dev btn-danger" title="Clear all stored logs">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
              </svg>
              Clear Logs
            </button>
            <button (click)="exportJson()" class="btn-dev btn-primary" title="Download logs as JSON file">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Export Logs as JSON
            </button>
          </div>
        </header>

        <!-- STATS BAR -->
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">TOTAL STORED RECORDS</span>
            <span class="stat-value">{{ logs().length }} <small>/ 500 max</small></span>
          </div>
          <div class="stat-card">
            <span class="stat-label">COMPLETED TRANSITIONS</span>
            <span class="stat-value highlight-success">{{ completedCount() }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">AVG TRANSITION LATENCY</span>
            <span class="stat-value">{{ avgDuration() }}<small>ms</small></span>
          </div>
          <div class="stat-card">
            <span class="stat-label">ERRORS / CANCELS</span>
            <span class="stat-value" [class.highlight-error]="errorCount() > 0">{{ errorCount() }}</span>
          </div>
        </div>

        <!-- QUICK ROUTE TESTER -->
        <div class="quick-tester-card">
          <div class="tester-header">
            <span class="tester-title">QUICK ROUTE TRIGGER BENCHMARK</span>
            <span class="tester-hint">Click any target to test router transition and logging</span>
          </div>
          <div class="tester-links">
            <button (click)="navigateTo('/')" class="test-pill">/ (Home)</button>
            <button (click)="navigateTo('/events')" class="test-pill">/events</button>
            <button (click)="navigateTo('/events/after-dark-vol-04')" class="test-pill">/events/after-dark-vol-04</button>
            <button (click)="navigateTo('/events/after-dark-vol-04/register')" class="test-pill">/events/.../register</button>
            <button (click)="navigateTo('/checkout')" class="test-pill">/checkout</button>
            <button (click)="navigateTo('/payment-success')" class="test-pill">/payment-success</button>
            <button (click)="navigateTo('/check-in')" class="test-pill">/check-in</button>
            <button (click)="navigateTo('/admin')" class="test-pill">/admin</button>
            <button (click)="navigateTo('/admin/events')" class="test-pill">/admin/events</button>
            <button (click)="navigateTo('/admin/analytics')" class="test-pill">/admin/analytics</button>
            <button (click)="navigateTo('/dev/logs')" class="test-pill active">/dev/logs</button>
          </div>
        </div>

        <!-- FILTER & SEARCH TOOLBAR -->
        <div class="filter-toolbar">
          <div class="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search by URL, event, ID, or status..."
              class="search-input"
            />
            <button *ngIf="searchQuery" (click)="searchQuery = ''" class="clear-search-btn">✕</button>
          </div>

          <div class="filter-pills">
            <button
              [class.active]="selectedFilter === 'all'"
              (click)="selectedFilter = 'all'"
              class="filter-pill"
            >
              All Events ({{ logs().length }})
            </button>
            <button
              [class.active]="selectedFilter === 'NavigationEnd'"
              (click)="selectedFilter = 'NavigationEnd'"
              class="filter-pill"
            >
              NavigationEnd ({{ countEvent('NavigationEnd') }})
            </button>
            <button
              [class.active]="selectedFilter === 'NavigationStart'"
              (click)="selectedFilter = 'NavigationStart'"
              class="filter-pill"
            >
              NavigationStart ({{ countEvent('NavigationStart') }})
            </button>
            <button
              [class.active]="selectedFilter === 'failures'"
              (click)="selectedFilter = 'failures'"
              class="filter-pill"
            >
              Errors & Cancels ({{ errorCount() }})
            </button>
          </div>
        </div>

        <!-- LOGS TABLE -->
        <div class="table-wrapper">
          <table class="dev-table" *ngIf="filteredLogs().length > 0; else noLogsTemplate">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event</th>
                <th>From</th>
                <th>To</th>
                <th>Navigation ID</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of filteredLogs(); trackBy: trackByRecord" [class.row-highlight-error]="record.status === 'error' || record.status === 'cancelled'">
                <td class="col-timestamp">
                  <div class="time-main">{{ formatDisplayTime(record.timestamp) }}</div>
                  <div class="time-sub">{{ formatDisplayDate(record.timestamp) }}</div>
                </td>
                <td class="col-event">
                  <span class="event-badge" [attr.data-event]="record.event">
                    {{ record.event }}
                  </span>
                </td>
                <td class="col-from">
                  <span class="route-badge">{{ record.from || '/' }}</span>
                </td>
                <td class="col-to">
                  <span class="route-badge active-route">{{ record.to }}</span>
                  <div *ngIf="record.reason" class="record-meta-note">Reason: {{ record.reason }}</div>
                  <div *ngIf="record.error" class="record-meta-error">Err: {{ record.error }}</div>
                </td>
                <td class="col-id">
                  <span class="id-tag">#{{ record.navigationId }}</span>
                </td>
                <td class="col-duration">
                  <span *ngIf="record.durationMs > 0; else noDuration" class="duration-badge">
                    {{ record.durationMs }}ms
                  </span>
                  <ng-template #noDuration>
                    <span class="duration-empty">-</span>
                  </ng-template>
                </td>
                <td class="col-status">
                  <span class="status-pill" [attr.data-status]="record.status">
                    <span class="status-indicator"></span>
                    {{ record.status | uppercase }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <ng-template #noLogsTemplate>
            <div class="empty-state">
              <div class="empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 class="empty-title">No Navigation Logs Recorded</h3>
              <p class="empty-desc">
                {{ searchQuery ? 'No logs match your current search criteria.' : 'Navigate between pages or click the benchmark links above to record events.' }}
              </p>
            </div>
          </ng-template>
        </div>

        <!-- FOOTER INFO -->
        <footer class="dev-footer">
          <div class="footer-info">
            <span>Storage Key: <code>SpotBukk_navigation_logs</code></span>
            <span>Max Ring Buffer: <code>500 entries</code></span>
            <span>Interface: <code>0.0.0.0:4300</code></span>
          </div>
          <div class="footer-hint">
            Direct console mirror available in browser DevTools with tag <code>[SpotBukk ROUTER]</code>
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .dev-logs-container {
      min-height: calc(100vh - 160px);
      padding: 40px 0 80px;
      background: var(--bg-page);
      color: var(--text-primary);
      font-family: var(--font-body);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* HEADER */
    .dev-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      gap: 24px;
      flex-wrap: wrap;
    }

    .kicker-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .editorial-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--accent);
    }

    .status-live-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(46, 117, 89, 0.15);
      border: 1px solid rgba(104, 196, 158, 0.3);
      color: #68c49e;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #68c49e;
      box-shadow: 0 0 8px #68c49e;
    }

    .dev-title {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0 0 8px;
    }

    .dev-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 680px;
      line-height: 1.5;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-dev {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-primary {
      background: var(--accent);
      color: #ffffff;
      border-color: var(--accent);
    }
    .btn-primary:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      border-color: var(--border-medium);
    }
    .btn-secondary:hover {
      background: var(--bg-surface-subtle);
      border-color: var(--border-strong);
    }

    .btn-danger {
      background: rgba(139, 29, 49, 0.15);
      color: #ff6b81;
      border-color: rgba(255, 107, 129, 0.3);
    }
    .btn-danger:hover {
      background: rgba(139, 29, 49, 0.3);
      border-color: #ff6b81;
    }

    /* STATS GRID */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .stat-label {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--text-primary);
    }
    .stat-value small {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-left: 4px;
    }

    .highlight-success {
      color: #68c49e;
    }
    .highlight-error {
      color: #ff6b81;
    }

    /* QUICK ROUTE TESTER */
    .quick-tester-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 18px 22px;
      margin-bottom: 24px;
    }

    .tester-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tester-title {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
    }

    .tester-hint {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .tester-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .test-pill {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: monospace;
      font-size: 0.8rem;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .test-pill:hover {
      background: var(--bg-surface-subtle);
      color: var(--text-primary);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .test-pill.active {
      border-color: var(--accent);
      color: var(--accent);
      background: var(--accent-subtle);
    }

    /* FILTER TOOLBAR */
    .filter-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 320px;
      flex: 1;
      max-width: 480px;
    }
    .search-box svg {
      position: absolute;
      left: 14px;
      color: var(--text-muted);
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px 36px 10px 40px;
      color: var(--text-primary);
      font-size: 0.88rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .clear-search-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
    }

    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-pill {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .filter-pill:hover {
      border-color: var(--border-medium);
      color: var(--text-primary);
    }
    .filter-pill.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }

    /* TABLE */
    .table-wrapper {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow-x: auto;
      box-shadow: var(--shadow-subtle);
    }

    .dev-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.86rem;
    }

    .dev-table th {
      background: var(--bg-surface-elevated);
      color: var(--text-muted);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      white-space: nowrap;
    }

    .dev-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: middle;
    }

    .dev-table tbody tr {
      transition: background var(--transition-fast);
    }
    .dev-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .row-highlight-error {
      background: rgba(255, 107, 129, 0.04) !important;
    }

    /* TABLE CELL STYLES */
    .col-timestamp {
      white-space: nowrap;
    }
    .time-main {
      font-family: monospace;
      font-weight: 700;
      color: var(--text-primary);
      font-size: 0.88rem;
    }
    .time-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .event-badge {
      display: inline-block;
      font-family: monospace;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: var(--radius-xs);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
    }
    .event-badge[data-event='NavigationEnd'] {
      background: rgba(46, 117, 89, 0.15);
      border-color: rgba(104, 196, 158, 0.3);
      color: #68c49e;
    }
    .event-badge[data-event='NavigationStart'] {
      background: rgba(74, 144, 226, 0.15);
      border-color: rgba(74, 144, 226, 0.3);
      color: #70a1ff;
    }
    .event-badge[data-event='NavigationCancel'] {
      background: rgba(186, 126, 38, 0.15);
      border-color: rgba(230, 178, 104, 0.3);
      color: #e6b268;
    }
    .event-badge[data-event='NavigationError'] {
      background: rgba(255, 107, 129, 0.15);
      border-color: rgba(255, 107, 129, 0.3);
      color: #ff6b81;
    }

    .route-badge {
      display: inline-block;
      font-family: monospace;
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: var(--bg-page);
      padding: 3px 8px;
      border-radius: var(--radius-xs);
      border: 1px solid var(--border-subtle);
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active-route {
      color: var(--text-primary);
      border-color: var(--border-medium);
      font-weight: 600;
    }

    .record-meta-note {
      font-size: 0.72rem;
      color: #e6b268;
      margin-top: 4px;
    }
    .record-meta-error {
      font-size: 0.72rem;
      color: #ff6b81;
      margin-top: 4px;
    }

    .id-tag {
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .duration-badge {
      font-family: monospace;
      font-size: 0.82rem;
      font-weight: 600;
      color: #68c49e;
      background: rgba(46, 117, 89, 0.1);
      padding: 3px 8px;
      border-radius: var(--radius-xs);
      border: 1px solid rgba(104, 196, 158, 0.2);
    }
    .duration-empty {
      color: var(--text-muted);
      font-family: monospace;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }
    .status-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .status-pill[data-status='success'] {
      background: rgba(46, 117, 89, 0.15);
      color: #68c49e;
      border: 1px solid rgba(104, 196, 158, 0.3);
    }
    .status-pill[data-status='success'] .status-indicator {
      background: #68c49e;
      box-shadow: 0 0 6px #68c49e;
    }

    .status-pill[data-status='cancelled'] {
      background: rgba(186, 126, 38, 0.15);
      color: #e6b268;
      border: 1px solid rgba(230, 178, 104, 0.3);
    }
    .status-pill[data-status='cancelled'] .status-indicator {
      background: #e6b268;
    }

    .status-pill[data-status='error'] {
      background: rgba(255, 107, 129, 0.15);
      color: #ff6b81;
      border: 1px solid rgba(255, 107, 129, 0.3);
    }
    .status-pill[data-status='error'] .status-indicator {
      background: #ff6b81;
      box-shadow: 0 0 6px #ff6b81;
    }

    .status-pill[data-status='in-progress'] {
      background: rgba(74, 144, 226, 0.15);
      color: #70a1ff;
      border: 1px solid rgba(74, 144, 226, 0.3);
    }
    .status-pill[data-status='in-progress'] .status-indicator {
      background: #70a1ff;
    }

    .status-pill[data-status='skipped'] {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }
    .status-pill[data-status='skipped'] .status-indicator {
      background: var(--text-muted);
    }

    /* EMPTY STATE */
    .empty-state {
      padding: 60px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .empty-icon {
      color: var(--text-muted);
    }
    .empty-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .empty-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      max-width: 440px;
      margin: 0;
    }

    /* FOOTER */
    .dev-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-info {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    .footer-info code, .footer-hint code {
      font-family: monospace;
      color: var(--text-secondary);
      background: var(--bg-surface);
      padding: 2px 6px;
      border-radius: var(--radius-xs);
    }

    @media (max-width: 768px) {
      .dev-header {
        flex-direction: column;
      }
      .header-actions {
        width: 100%;
      }
      .btn-dev {
        flex: 1;
        justify-content: center;
      }
    }
  `]
})
export class DevLogsComponent implements OnInit, OnDestroy {
  private readonly logger = inject(NavigationLoggerService);
  private readonly router = inject(Router);

  private sub?: Subscription;

  public logs = signal<NavigationLogRecord[]>([]);
  public searchQuery = '';
  public selectedFilter = 'all';

  public filteredLogs = computed(() => {
    let list = this.logs();

    if (this.selectedFilter === 'failures') {
      list = list.filter((r) => r.status === 'error' || r.status === 'cancelled');
    } else if (this.selectedFilter !== 'all') {
      list = list.filter((r) => r.event === this.selectedFilter);
    }

    if (!this.searchQuery.trim()) return list;

    const query = this.searchQuery.toLowerCase().trim();
    return list.filter((r) =>
      r.event.toLowerCase().includes(query) ||
      (r.from && r.from.toLowerCase().includes(query)) ||
      (r.to && r.to.toLowerCase().includes(query)) ||
      r.status.toLowerCase().includes(query) ||
      String(r.navigationId).includes(query) ||
      (r.reason && r.reason.toLowerCase().includes(query)) ||
      (r.error && r.error.toLowerCase().includes(query))
    );
  });

  public completedCount = computed(() => {
    return this.logs().filter((r) => r.event === 'NavigationEnd').length;
  });

  public errorCount = computed(() => {
    return this.logs().filter((r) => r.status === 'error' || r.status === 'cancelled').length;
  });

  public avgDuration = computed(() => {
    const completed = this.logs().filter((r) => r.event === 'NavigationEnd' && r.durationMs > 0);
    if (!completed.length) return 0;
    const sum = completed.reduce((acc, curr) => acc + curr.durationMs, 0);
    return Math.round(sum / completed.length);
  });

  ngOnInit(): void {
    // Initial fetch from localStorage
    this.refreshLogs();

    // Subscribe to live updates from the service
    this.sub = this.logger.logs$.subscribe((records) => {
      this.logs.set(records);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refreshLogs(): void {
    const records = this.logger.getLogs();
    this.logs.set(records);
  }

  public clearLogs(): void {
    if (confirm('Clear all stored navigation logs from localStorage?')) {
      this.logger.clearLogs();
      this.logs.set([]);
    }
  }

  public exportJson(): void {
    this.logger.downloadLogsJson();
  }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  public countEvent(eventName: string): number {
    return this.logs().filter((r) => r.event === eventName).length;
  }

  public formatDisplayTime(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
    } catch {
      return isoString;
    }
  }

  public formatDisplayDate(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  }

  public trackByRecord(_index: number, item: NavigationLogRecord): string {
    return `${item.navigationId}-${item.event}-${item.timestamp}`;
  }
}

```


<a id="frontend-src-app-public-check-in-check-in-component-ts"></a>
## `frontend/src/app/public/check-in/check-in.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { CheckInScanResult } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkin-page container">
      <!-- Header -->
      <div class="checkin-header">
        <div>
          <span class="editorial-kicker">Host Door Utility</span>
          <h1 class="checkin-title">SCAN TICKET</h1>
          <p class="checkin-subtext">
            High-speed door verification engine with instant tamper & duplicate detection.
          </p>
        </div>

        <div class="checkin-quick-stats">
          <div class="stat-pill">
            <span class="stat-lbl">Active Enclave</span>
            <span class="stat-val">AFTER DARK — VOL. 04</span>
          </div>
          <div class="stat-pill">
            <span class="stat-lbl">Checked In</span>
            <span class="stat-val text-accent">{{ eventService.totalCheckedIn() }} / {{ eventService.totalTicketsSold() }}</span>
          </div>
        </div>
      </div>

      <div class="checkin-grid">
        <!-- Scanner Viewport Column -->
        <div class="scanner-viewport-col">
          <div class="scanner-screen card-base">
            <!-- Simulated Camera Feed -->
            <div class="camera-lens-feed" [class.torch-on]="torchActive">
              <div class="viewfinder-frame">
                <!-- Corner Guides -->
                <div class="corner-guide corner-tl"></div>
                <div class="corner-guide corner-tr"></div>
                <div class="corner-guide corner-bl"></div>
                <div class="corner-guide corner-br"></div>

                <!-- Animated Laser Scan Bar -->
                <div class="laser-scanner-line" [class.scanning]="isScanning"></div>

                <!-- Center targeting label -->
                <div class="targeting-center">
                  <span class="target-text">ALIGN QR CODE WITHIN SIGHT</span>
                </div>
              </div>

              <!-- Scanner Controls Overlay -->
              <div class="scanner-controls-overlay">
                <button
                  type="button"
                  class="control-icon-btn"
                  (click)="torchActive = !torchActive"
                  [class.active]="torchActive"
                  title="Toggle Torch / Flash"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span>{{ torchActive ? 'Flash ON' : 'Flash OFF' }}</span>
                </button>

                <div class="gate-tag">
                  Gate 01 · Penthouse
                </div>
              </div>
            </div>

            <!-- Manual Barcode Search Bar -->
            <div class="manual-search-bar">
              <input
                type="text"
                [(ngModel)]="manualCode"
                (keyup.enter)="scanManual()"
                placeholder="Enter Serial Code or Booking ID (e.g. NOC-89241)..."
                class="form-control"
              />
              <button class="btn btn-primary btn-sm" (click)="scanManual()">
                Verify Pass
              </button>
            </div>
          </div>

          <!-- Demo State Controller Buttons -->
          <div class="demo-state-selector card-base">
            <div class="selector-header">
              <span class="editorial-kicker">Interactive Evaluation</span>
              <h4 class="selector-title">Test Required Scan States</h4>
              <p class="selector-desc">
                Click any state below to verify the door scanner response in real time:
              </p>
            </div>

            <div class="demo-buttons-group">
              <button
                class="btn btn-subtle demo-btn btn-state-valid"
                (click)="simulateState('valid')"
              >
                <span class="dot-indicator dot-success"></span>
                <span>Test State 01: Valid</span>
                <small>"ENTRY VERIFIED"</small>
              </button>

              <button
                class="btn btn-subtle demo-btn btn-state-used"
                (click)="simulateState('used')"
              >
                <span class="dot-indicator dot-warning"></span>
                <span>Test State 02: Already Used</span>
                <small>"TICKET ALREADY USED"</small>
              </button>

              <button
                class="btn btn-subtle demo-btn btn-state-invalid"
                (click)="simulateState('invalid')"
              >
                <span class="dot-indicator dot-error"></span>
                <span>Test State 03: Invalid</span>
                <small>"INVALID TICKET"</small>
              </button>
            </div>
          </div>
        </div>

        <!-- Verification Results & Live History Column -->
        <div class="results-stream-col">
          <!-- Active Scan Verification Result Card -->
          <div
            class="scan-result-card card-base"
            *ngIf="latestResult"
            [ngClass]="'state-' + latestResult.status"
          >
            <div class="result-status-header">
              <span class="result-status-badge">
                {{ latestResult.status.toUpperCase() }}
              </span>
              <span class="result-timestamp">{{ latestResult.scanTime }}</span>
            </div>

            <h3 class="result-headline">{{ latestResult.message }}</h3>

            <div class="result-guest-details" *ngIf="latestResult.ticket">
              <div class="res-row">
                <span class="res-lbl">Attendee:</span>
                <span class="res-val highlight-name">{{ latestResult.ticket.customer.fullName }}</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Ticket Tier:</span>
                <span class="res-val">{{ latestResult.ticket.ticketTierName }} (Party of {{ latestResult.ticket.quantity }})</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Event:</span>
                <span class="res-val">{{ latestResult.ticket.eventTitle }} {{ latestResult.ticket.eventEdition }}</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Ticket Serial:</span>
                <span class="res-val font-mono">{{ latestResult.ticket.ticketCode }}</span>
              </div>
              <div class="res-row" *ngIf="latestResult.ticket.additionalGuests.length > 0">
                <span class="res-lbl">With Guests:</span>
                <span class="res-val">{{ latestResult.ticket.additionalGuests.join(', ') }}</span>
              </div>
              <div class="res-row" *ngIf="latestResult.ticket.checkedInTime">
                <span class="res-lbl">Check-In Timestamp:</span>
                <span class="res-val">{{ latestResult.ticket.checkedInTime | date:'medium' }}</span>
              </div>
            </div>

            <div class="result-actions" *ngIf="latestResult.status === 'verified'">
              <span class="welcome-pass-pill">✓ WRISTBAND / ACCESS ISSUED</span>
            </div>
          </div>

          <!-- Live Gate Attendance Feed -->
          <div class="attendance-feed-card card-base">
            <div class="feed-header">
              <span class="feed-title">Door Verification Log</span>
              <span class="feed-badge">Live Feed</span>
            </div>

            <div class="feed-list">
              <div
                class="feed-item"
                *ngFor="let b of checkedInBookings"
              >
                <div class="feed-left">
                  <span class="feed-guest-name">{{ b.customer.fullName }}</span>
                  <span class="feed-tier-sub">{{ b.ticketTierName }} · {{ b.ticketCode }}</span>
                </div>
                <div class="feed-right">
                  <span class="status-pill status-verified">Verified</span>
                  <span class="feed-time">{{ b.checkedInTime ? (b.checkedInTime | date:'shortTime') : 'Just now' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkin-page {
      padding: 48px 24px 80px;
    }

    .checkin-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 20px;
    }

    .checkin-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      letter-spacing: -0.01em;
      margin-bottom: 6px;
    }

    .checkin-subtext {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .checkin-quick-stats {
      display: flex;
      gap: 16px;
    }

    .stat-pill {
      display: flex;
      flex-direction: column;
      padding: 10px 16px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);

      .stat-lbl {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .stat-val {
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 700;
      }
    }

    .text-accent {
      color: var(--accent);
    }

    .checkin-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    /* Scanner Viewport */
    .scanner-viewport-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .scanner-screen {
      padding: 24px;
      border-radius: var(--radius-lg);
      background: var(--bg-surface);
    }

    .camera-lens-feed {
      position: relative;
      height: 320px;
      background: #08090b;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 200ms;

      &.torch-on {
        background: #14171a;
      }
    }

    .viewfinder-frame {
      position: relative;
      width: 220px;
      height: 220px;
    }

    .corner-guide {
      position: absolute;
      width: 28px;
      height: 28px;
      border-color: var(--accent);
      border-style: solid;
    }

    .corner-tl {
      top: 0;
      left: 0;
      border-width: 3px 0 0 3px;
    }

    .corner-tr {
      top: 0;
      right: 0;
      border-width: 3px 3px 0 0;
    }

    .corner-bl {
      bottom: 0;
      left: 0;
      border-width: 0 0 3px 3px;
    }

    .corner-br {
      bottom: 0;
      right: 0;
      border-width: 0 3px 3px 0;
    }

    .laser-scanner-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
      animation: scanSweep 2.2s ease-in-out infinite alternate;
    }

    @keyframes scanSweep {
      0% { top: 10px; }
      100% { top: 210px; }
    }

    .targeting-center {
      position: absolute;
      bottom: -32px;
      left: 0;
      right: 0;
      text-align: center;
    }

    .target-text {
      font-size: 0.65rem;
      letter-spacing: 0.14em;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
    }

    .scanner-controls-overlay {
      position: absolute;
      bottom: 12px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .control-icon-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-sm);
      color: #ffffff;
      font-size: 0.75rem;

      &.active {
        background: var(--accent);
        border-color: var(--accent);
      }
    }

    .gate-tag {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
    }

    .manual-search-bar {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    /* Demo state buttons */
    .demo-state-selector {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .selector-header {
      margin-bottom: 18px;
    }

    .selector-title {
      font-size: 1.15rem;
      margin-bottom: 4px;
    }

    .selector-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .demo-buttons-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .demo-btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 14px 18px;
      text-align: left;

      small {
        margin-left: auto;
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 0.78rem;
      }
    }

    .dot-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;

      &.dot-success { background: var(--badge-success-text); }
      &.dot-warning { background: var(--badge-warning-text); }
      &.dot-error { background: var(--badge-error-text); }
    }

    /* Results Column */
    .results-stream-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .scan-result-card {
      padding: 28px;
      border-radius: var(--radius-lg);
      animation: popIn 200ms cubic-bezier(0.16, 1, 0.3, 1);

      &.state-verified {
        border-color: var(--badge-success-text);
        background: radial-gradient(circle at top right, var(--badge-success-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-success-bg);
          color: var(--badge-success-text);
        }
      }

      &.state-used {
        border-color: var(--badge-warning-text);
        background: radial-gradient(circle at top right, var(--badge-warning-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-warning-bg);
          color: var(--badge-warning-text);
        }
      }

      &.state-invalid {
        border-color: var(--badge-error-text);
        background: radial-gradient(circle at top right, var(--badge-error-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-error-bg);
          color: var(--badge-error-text);
        }
      }
    }

    .result-status-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .result-status-badge {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }

    .result-timestamp {
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .result-headline {
      font-size: 1.45rem;
      letter-spacing: -0.01em;
      margin-bottom: 20px;
    }

    .result-guest-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 16px;
      font-size: 0.85rem;
    }

    .res-row {
      display: flex;
      justify-content: space-between;

      .res-lbl {
        color: var(--text-muted);
      }

      .res-val {
        color: var(--text-primary);
        font-weight: 500;
      }

      .highlight-name {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 700;
      }
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }

    .result-actions {
      display: flex;
      justify-content: center;
    }

    .welcome-pass-pill {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--badge-success-text);
      letter-spacing: 0.06em;
    }

    /* Attendance Feed */
    .attendance-feed-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .feed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .feed-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .feed-badge {
      font-size: 0.7rem;
      color: var(--accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .feed-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
    }

    .feed-left {
      display: flex;
      flex-direction: column;
    }

    .feed-guest-name {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
    }

    .feed-tier-sub {
      font-size: 0.74rem;
      color: var(--text-muted);
    }

    .feed-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .feed-time {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class CheckInComponent implements OnInit {
  readonly eventService = inject(EventService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  manualCode = '';
  isScanning = true;
  torchActive = false;

  latestResult: CheckInScanResult | null = null;

  get checkedInBookings() {
    return this.eventService.bookings().filter(b => b.checkedIn);
  }

  ngOnInit(): void {
    // Check if ticket code passed in queryParams
    this.route.queryParamMap.subscribe(params => {
      const ticket = params.get('ticket');
      if (ticket) {
        this.manualCode = ticket;
        this.scanManual();
      } else {
        // Initial default state: valid
        this.simulateState('valid');
      }
    });
  }

  scanManual(): void {
    if (!this.manualCode.trim()) {
      this.toast.warning('Please enter a ticket code or booking reference.');
      return;
    }

    this.latestResult = this.eventService.verifyTicket(this.manualCode);
    if (this.latestResult.status === 'verified') {
      this.toast.success('Entry Verified', this.latestResult.ticket?.customer.fullName);
    } else if (this.latestResult.status === 'used') {
      this.toast.warning('Ticket Already Used', this.latestResult.message);
    } else {
      this.toast.error('Invalid Ticket', this.latestResult.message);
    }
  }

  simulateState(state: 'valid' | 'used' | 'invalid'): void {
    this.latestResult = this.eventService.verifyTicket('SIMULATED_TEST', state);

    if (state === 'valid') {
      this.toast.success('Simulation: ENTRY VERIFIED', 'Attendee admission granted.');
    } else if (state === 'used') {
      this.toast.warning('Simulation: TICKET ALREADY USED', 'Duplicate entry attempt flagged.');
    } else {
      this.toast.error('Simulation: INVALID TICKET', 'Revoked or non-existent ticket pass.');
    }
  }
}

```


<a id="frontend-src-app-public-checkout-checkout-component-ts"></a>
## `frontend/src/app/public/checkout/checkout.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { PaymentMethod } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkout-page container container-narrow" *ngIf="session">
      <!-- Top Bar -->
      <div class="checkout-top">
        <a [routerLink]="['/events', session.event.id, 'register']" class="back-link">
          &larr; Back to Registration
        </a>
        <div class="secure-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>256-Bit Encrypted Checkout</span>
        </div>
      </div>

      <div class="checkout-grid">
        <!-- Left: Payment Method Selection & Form -->
        <div class="payment-col card-base">
          <div class="col-header">
            <span class="editorial-kicker">Payment Selection</span>
            <h2 class="col-title">Select Payment Instrument</h2>
            <p class="col-desc">Choose your preferred payment method. This is a secure demo environment.</p>
          </div>

          <!-- Method Tabs -->
          <div class="method-tabs">
            <button
              class="method-tab"
              [class.active]="selectedMethod === 'UPI'"
              (click)="selectedMethod = 'UPI'"
            >
              <span class="method-name">UPI / QR</span>
              <span class="method-hint">Instant</span>
            </button>

            <button
              class="method-tab"
              [class.active]="selectedMethod === 'Card'"
              (click)="selectedMethod = 'Card'"
            >
              <span class="method-name">Credit / Debit Card</span>
              <span class="method-hint">Visa, MC, Amex</span>
            </button>

            <button
              class="method-tab"
              [class.active]="selectedMethod === 'Net Banking'"
              (click)="selectedMethod = 'Net Banking'"
            >
              <span class="method-name">Net Banking</span>
              <span class="method-hint">All Major Banks</span>
            </button>
          </div>

          <!-- UPI Form -->
          <div class="method-content" *ngIf="selectedMethod === 'UPI'">
            <div class="upi-apps-row">
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'gpay'"
                (click)="selectedUpiApp = 'gpay'"
              >
                <span>Google Pay</span>
              </button>
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'phonepe'"
                (click)="selectedUpiApp = 'phonepe'"
              >
                <span>PhonePe</span>
              </button>
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'paytm'"
                (click)="selectedUpiApp = 'paytm'"
              >
                <span>Paytm UPI</span>
              </button>
            </div>

            <div class="or-separator">
              <span>OR ENTER VPA / UPI ID</span>
            </div>

            <div class="form-group">
              <label for="vpaInput">Virtual Payment Address (VPA)</label>
              <input
                id="vpaInput"
                type="text"
                class="form-control"
                [(ngModel)]="vpaAddress"
                placeholder="e.g. rohan.mehra@okhdfcbank"
              />
              <span class="form-hint">A mock payment notification request will be simulated.</span>
            </div>
          </div>

          <!-- Card Form -->
          <div class="method-content" *ngIf="selectedMethod === 'Card'">
            <div class="form-group">
              <label for="cardHolder">Cardholder Name</label>
              <input
                id="cardHolder"
                type="text"
                class="form-control"
                [(ngModel)]="cardHolder"
                placeholder="Name as printed on card"
              />
            </div>

            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                class="form-control"
                [(ngModel)]="cardNumber"
                placeholder="4532 •••• •••• 8920"
                maxlength="19"
              />
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  class="form-control"
                  [(ngModel)]="cardExpiry"
                  placeholder="MM / YY"
                  maxlength="5"
                />
              </div>
              <div class="form-group">
                <label for="cvv">Security Code (CVV)</label>
                <input
                  id="cvv"
                  type="password"
                  class="form-control"
                  [(ngModel)]="cardCvv"
                  placeholder="•••"
                  maxlength="4"
                />
              </div>
            </div>
          </div>

          <!-- Net Banking Form -->
          <div class="method-content" *ngIf="selectedMethod === 'Net Banking'">
            <div class="form-group">
              <label>Select Your Bank</label>
              <div class="bank-grid">
                <label
                  class="bank-box"
                  *ngFor="let b of banks"
                  [class.selected]="selectedBank === b"
                >
                  <input
                    type="radio"
                    name="bankChoice"
                    [value]="b"
                    [(ngModel)]="selectedBank"
                  />
                  <span>{{ b }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Payment Action Button -->
          <div class="pay-cta-wrap">
            <button
              class="btn btn-primary btn-lg w-full"
              (click)="processPayment()"
              [disabled]="isProcessing"
            >
              <span *ngIf="!isProcessing">Pay ₹{{ session.total }} with Razorpay</span>
              <span *ngIf="isProcessing" class="processing-wrap">
                <span class="spinner"></span>
                Processing Payment (₹{{ session.total }})...
              </span>
            </button>
          </div>

          <p class="demo-disclaimer">
            * Razorpay Test Mode: UPI, Cards & Net Banking enabled.
          </p>
        </div>

        <!-- Right: Order Summary Sticky Panel -->
        <aside class="summary-col">
          <div class="summary-card card-base glass-panel">
            <h3 class="summary-title">Order Summary</h3>

            <!-- Event item -->
            <div class="summary-event-row">
              <img [src]="session.event.heroImage" [alt]="session.event.title" class="summary-thumb" />
              <div>
                <h4 class="summary-event-name">{{ session.event.title }}</h4>
                <p class="summary-event-edition">{{ session.event.edition }}</p>
                <p class="summary-event-sub">{{ session.event.date }}</p>
                <p class="summary-event-sub">{{ session.event.venue }}, {{ session.event.city }}</p>
              </div>
            </div>

            <!-- Breakdown -->
            <div class="summary-breakdown">
              <div class="summary-line">
                <span class="line-label">{{ session.tier.name }} &times; {{ session.quantity }}</span>
                <span class="line-val">₹{{ session.subtotal }}</span>
              </div>
              <div class="summary-line">
                <span class="line-label">Platform Convenience Fee</span>
                <span class="line-val">₹{{ session.convenienceFee }}</span>
              </div>
              <div class="summary-line total-line">
                <span class="total-lbl">Total Payable</span>
                <span class="total-val">₹{{ session.total }}</span>
              </div>
            </div>

            <!-- Attendee Summary -->
            <div class="summary-guest-box">
              <span class="guest-box-lbl">Primary Guest</span>
              <p class="guest-name">{{ session.attendee.fullName }}</p>
              <p class="guest-contact">{{ session.attendee.email }}</p>
              <p class="guest-contact">{{ session.attendee.phone }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 48px 24px 80px;
    }

    .checkout-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .secure-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;

      svg {
        color: var(--badge-success-text);
      }
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 36px;

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
      }
    }

    .payment-col {
      padding: 32px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 20px;
      }
    }

    .col-header {
      margin-bottom: 24px;
    }

    .col-title {
      font-size: 1.5rem;
      margin-bottom: 4px;
    }

    .col-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    /* Method Tabs */
    .method-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 28px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .method-tab {
      padding: 12px 14px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .method-name {
          color: var(--accent);
        }
      }
    }

    .method-name {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .method-hint {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .method-content {
      padding: 20px 0;
      border-top: 1px solid var(--border-subtle);
      margin-bottom: 24px;
    }

    .upi-apps-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .upi-app-btn {
      padding: 12px 8px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);

      &:hover {
        border-color: var(--border-medium);
      }

      &.selected {
        border-color: var(--accent);
        background: var(--accent-subtle);
        color: var(--accent);
      }
    }

    .or-separator {
      text-align: center;
      margin: 16px 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--border-subtle);
      }

      span {
        position: relative;
        background: var(--bg-surface);
        padding: 0 12px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--text-muted);
      }
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .bank-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .bank-box {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.85rem;

      &.selected {
        border-color: var(--accent);
      }

      input {
        accent-color: var(--accent);
      }
    }

    .pay-cta-wrap {
      margin-top: 16px;
      margin-bottom: 12px;
    }

    .w-full {
      width: 100%;
    }

    .demo-disclaimer {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-align: center;
    }

    .processing-wrap {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 600ms linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Summary Column */
    .summary-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .summary-title {
      font-size: 1.15rem;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .summary-event-row {
      display: flex;
      gap: 14px;
      margin-bottom: 20px;
    }

    .summary-thumb {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .summary-event-name {
      font-size: 1rem;
      line-height: 1.2;
    }

    .summary-event-edition {
      font-size: 0.76rem;
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .summary-event-sub {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .summary-breakdown {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 16px;
      font-size: 0.85rem;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);

      &.total-line {
        padding-top: 8px;
        margin-top: 4px;
        border-top: 1px dashed var(--border-subtle);
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .total-val {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    .summary-guest-box {
      padding: 12px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
    }

    .guest-box-lbl {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-bottom: 4px;
      font-weight: 700;
    }

    .guest-name {
      font-weight: 700;
      color: var(--text-primary);
    }

    .guest-contact {
      color: var(--text-secondary);
      font-size: 0.76rem;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);
  private readonly paymentService = inject(PaymentService);

  session = this.eventService.activeCheckoutSession();

  selectedMethod: PaymentMethod = 'UPI';
  selectedUpiApp = 'gpay';
  vpaAddress = 'rohan.mehra@okhdfcbank';

  // Card fields
  cardHolder = 'Rohan Mehra';
  cardNumber = '4532 8901 2341 8920';
  cardExpiry = '08/28';
  cardCvv = '849';

  // Net banking
  readonly banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'IndusInd Bank'];
  selectedBank = 'HDFC Bank';

  isProcessing = false;

  ngOnInit(): void {
    // If user navigated directly to /checkout with no active session, create a default demo session
    if (!this.session) {
      const fallbackEvent = this.eventService.events()[0];
      const fallbackTier = fallbackEvent.ticketTiers[0];
      const qty = 2;
      const sub = fallbackTier.price * qty;
      const fee = Math.round(sub * 0.05);

      this.session = {
        event: fallbackEvent,
        tier: fallbackTier,
        quantity: qty,
        attendee: {
          fullName: 'Rohan Mehra',
          email: 'rohan.mehra@gmail.com',
          phone: '+91 98450 18239'
        },
        additionalGuests: ['Natasha Roy'],
        subtotal: sub,
        convenienceFee: fee,
        total: sub + fee
      };
      this.eventService.setCheckoutSession(this.session);
    }
  }

  async processPayment(): Promise<void> {
    if (this.isProcessing || !this.session) return;
    this.isProcessing = true;

    const userDetails = {
      name: this.session.attendee.fullName || 'Guest',
      email: this.session.attendee.email || '',
      contact: this.session.attendee.phone || ''
    };

    try {
      // 1. Invoke Razorpay checkout via PaymentService
      const isPaid = await this.paymentService.pay(this.session.total, userDetails);

      // 2. Only if verified successfully, commit booking and navigate to success
      if (isPaid) {
        const booking = this.eventService.createBookingFromSession(this.selectedMethod);
        this.toast.success('Payment Authorized', `Booking reference ${booking.id} confirmed.`);
        this.router.navigate(['/payment-success'], { queryParams: { id: booking.id } });
      } else {
        // If user cancelled popup or verification failed, stay on /checkout and notify
        this.toast.error('Payment Incomplete', 'Payment was cancelled or could not be verified.');
      }
    } catch (err: any) {
      console.error('Error during checkout payment:', err);
      this.toast.error('Payment Error', err?.message || 'Payment processing failed.');
    } finally {
      this.isProcessing = false;
    }
  }

  simulatePayment(): void {
    this.processPayment();
  }
}

```


<a id="frontend-src-app-public-event-detail-event-detail-component-ts"></a>
## `frontend/src/app/public/event-detail/event-detail.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, CheckoutSession } from '../../core/services/event.service';
import { EventItem, TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="event-detail-page" *ngIf="event">
      <!-- 1. EDITORIAL HERO -->
      <section class="detail-hero">
        <div class="detail-hero-media">
          <img [src]="event.heroImage" [alt]="event.title" class="detail-bg-img" />
          <div class="hero-curtain"></div>
        </div>

        <div class="container detail-hero-content">
          <div class="breadcrumb-row">
            <a routerLink="/events" class="back-link">
              &larr; Return to Calendar
            </a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ event.city }}</span>
          </div>

          <div class="hero-kicker-meta">
            <span class="category-capsule">{{ event.category }}</span>
            <span
              class="status-pill"
              [ngClass]="'status-' + event.availability.toLowerCase().replace(' ', '-')"
            >
              {{ event.availability }}
            </span>
          </div>

          <h1 class="event-main-title">
            {{ event.title }}
            <span class="event-edition-tag">{{ event.edition }}</span>
          </h1>

          <div class="hero-date-location">
            <div class="meta-unit">
              <span class="meta-label">Date & Time</span>
              <span class="meta-value">{{ event.date }} · {{ event.time }}</span>
            </div>
            <div class="meta-unit">
              <span class="meta-label">Location</span>
              <span class="meta-value">{{ event.venue }}, {{ event.city }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. MAIN SPLIT LAYOUT (Editorial Content + Sticky Booking Panel) -->
      <div class="container detail-body-layout">
        <!-- Left: Editorial Story, Highlights, Lineup, Rules -->
        <main class="story-column">
          <!-- Quick Metadata Bar -->
          <div class="quick-meta-bar card-base">
            <div class="meta-cell">
              <span class="cell-label">Age Protocol</span>
              <span class="cell-val">{{ event.ageLimit }} Photo ID</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Dress Code</span>
              <span class="cell-val">{{ event.dressCode }}</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Curated Capacity</span>
              <span class="cell-val">{{ event.capacity }} Guests Max</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Doors Open</span>
              <span class="cell-val">{{ event.doorsOpen }}</span>
            </div>
          </div>

          <!-- Description Section -->
          <section class="editorial-section">
            <span class="editorial-kicker">Atmosphere & Narrative</span>
            <h2 class="sub-heading">About This Gathering</h2>
            <p class="story-paragraph">{{ event.description }}</p>
          </section>

          <!-- Highlights Section -->
          <section class="editorial-section">
            <span class="editorial-kicker">Experience Inclusions</span>
            <h2 class="sub-heading">Event Highlights</h2>
            <div class="highlights-grid">
              <div class="highlight-card card-base" *ngFor="let h of event.highlights">
                <span class="highlight-dot"></span>
                <span class="highlight-text">{{ h }}</span>
              </div>
            </div>
          </section>

          <!-- Artist Lineup Section -->
          <section class="editorial-section" *ngIf="event.lineup.length > 0">
            <span class="editorial-kicker">Selectors & Sets</span>
            <h2 class="sub-heading">Sound Curation</h2>
            <div class="lineup-table card-base">
              <div class="lineup-row" *ngFor="let item of event.lineup">
                <div class="artist-col">
                  <span class="artist-name">{{ item.name }}</span>
                  <span class="artist-role">{{ item.role }}</span>
                </div>
                <div class="time-col">
                  <span class="set-time">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Venue & Secrecy Policy -->
          <section class="editorial-section">
            <span class="editorial-kicker">Location Sanctuary</span>
            <h2 class="sub-heading">The Venue</h2>
            <div class="venue-card card-base">
              <div class="venue-details">
                <h4 class="venue-name">{{ event.venue }}</h4>
                <p class="venue-address">{{ event.address }}</p>
                <div class="venue-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <span>Exact gate entry coordinates & host check-in instructions are delivered to your ticket pass 6 hours prior to door opening.</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Gathering Etiquette / Rules -->
          <section class="editorial-section">
            <span class="editorial-kicker">Sanctuary Rules</span>
            <h2 class="sub-heading">House Etiquette</h2>
            <ul class="rules-list">
              <li *ngFor="let rule of event.rules">{{ rule }}</li>
            </ul>
          </section>
        </main>

        <!-- Right: Sticky Ticket Booking Panel -->
        <aside class="booking-column">
          <div class="sticky-booking-panel card-base glass-panel">
            <div class="panel-header">
              <span class="editorial-kicker">Reserve Admission</span>
              <h3 class="panel-title">Select Access Pass</h3>
              <p class="panel-desc">Tickets are limited and verified upon entry.</p>
            </div>

            <!-- Ticket Tiers Radio Selector -->
            <div class="tiers-selector">
              <div
                *ngFor="let tier of event.ticketTiers"
                class="tier-option"
                [class.selected]="selectedTier?.id === tier.id"
                [class.sold-out]="tier.availableQuantity === 0"
                (click)="selectTier(tier)"
              >
                <div class="tier-top-row">
                  <div class="tier-name-badge">
                    <span class="radio-indicator"></span>
                    <span class="tier-title">{{ tier.name }}</span>
                  </div>
                  <span class="tier-price">₹{{ tier.price }}</span>
                </div>

                <p class="tier-desc">{{ tier.description }}</p>

                <div class="tier-bottom-row">
                  <span class="tier-badge" *ngIf="tier.badge">{{ tier.badge }}</span>
                  <span class="tier-availability" *ngIf="tier.availableQuantity > 0">
                    {{ tier.availableQuantity }} remaining
                  </span>
                  <span class="tier-soldout-label" *ngIf="tier.availableQuantity === 0">
                    Sold Out
                  </span>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="quantity-row" *ngIf="selectedTier && selectedTier.availableQuantity > 0">
              <span class="qty-label">Quantity (Passes)</span>
              <div class="qty-stepper">
                <button
                  type="button"
                  class="stepper-btn"
                  (click)="decreaseQty()"
                  [disabled]="ticketQuantity <= 1"
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span class="qty-value">{{ ticketQuantity }}</span>
                <button
                  type="button"
                  class="stepper-btn"
                  (click)="increaseQty()"
                  [disabled]="ticketQuantity >= maxAllowedQty"
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>
            </div>

            <!-- Subtotal & Price Summary -->
            <div class="price-breakdown" *ngIf="selectedTier">
              <div class="breakdown-row">
                <span>Pass (₹{{ selectedTier.price }} &times; {{ ticketQuantity }})</span>
                <span>₹{{ subtotal }}</span>
              </div>
              <div class="breakdown-row">
                <span>Guest Convenience Fee (5%)</span>
                <span>₹{{ convenienceFee }}</span>
              </div>
              <div class="breakdown-total">
                <span>Total Amount</span>
                <span class="total-number">₹{{ totalAmount }}</span>
              </div>
            </div>

            <!-- Booking CTA -->
            <div class="booking-cta-wrap">
              <button
                class="btn btn-primary btn-lg w-full"
                [disabled]="!selectedTier || selectedTier.availableQuantity === 0"
                (click)="proceedToRegistration()"
              >
                Continue to Guest Details &rarr;
              </button>
            </div>

            <!-- Security Assurance Microcopy -->
            <div class="booking-footer-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Instant digital pass · Encrypted QR validation</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .detail-hero {
      position: relative;
      min-height: 480px;
      display: flex;
      align-items: flex-end;
      padding-bottom: 48px;
      overflow: hidden;

      @media (max-width: 768px) {
        min-height: 380px;
        padding-bottom: 32px;
      }
    }

    .detail-hero-media {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .detail-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.35) saturate(0.9);
    }

    .hero-curtain {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(11, 12, 14, 0.2) 0%,
        rgba(11, 12, 14, 0.7) 60%,
        var(--bg-page) 100%
      );
    }

    .detail-hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
    }

    .breadcrumb-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;
      margin-bottom: 20px;
      color: var(--text-muted);
    }

    .back-link {
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .hero-kicker-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .category-capsule {
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-sm);
      color: #ffffff;
    }

    .event-main-title {
      font-size: clamp(2.4rem, 5.5vw, 4.4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
      line-height: 1.05;

      .event-edition-tag {
        display: block;
        font-size: clamp(1rem, 2vw, 1.4rem);
        letter-spacing: 0.12em;
        color: var(--text-secondary);
        margin-top: 4px;
      }
    }

    .hero-date-location {
      display: flex;
      gap: 36px;
      flex-wrap: wrap;
    }

    .meta-unit {
      display: flex;
      flex-direction: column;

      .meta-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .meta-value {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--text-primary);
      }
    }

    /* Split layout */
    .detail-body-layout {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 48px;
      padding-top: 40px;
      padding-bottom: 80px;

      @media (max-width: 980px) {
        grid-template-columns: 1fr;
      }
    }

    .quick-meta-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 18px 24px;
      border-radius: var(--radius-md);
      margin-bottom: 48px;
      gap: 16px;

      @media (max-width: 680px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .meta-cell {
      display: flex;
      flex-direction: column;

      .cell-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin-bottom: 2px;
      }

      .cell-val {
        font-family: var(--font-display);
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .editorial-section {
      margin-bottom: 48px;
    }

    .sub-heading {
      font-size: 1.6rem;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }

    .story-paragraph {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .highlight-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: var(--radius-sm);
    }

    .highlight-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
    }

    .highlight-text {
      font-size: 0.9rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    /* Lineup table */
    .lineup-table {
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .lineup-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }
    }

    .artist-col {
      display: flex;
      flex-direction: column;

      .artist-name {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 700;
      }

      .artist-role {
        font-size: 0.8rem;
        color: var(--text-secondary);
      }
    }

    .time-col {
      .set-time {
        font-size: 0.82rem;
        color: var(--text-muted);
        font-weight: 600;
      }
    }

    /* Venue */
    .venue-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .venue-name {
      font-size: 1.2rem;
      margin-bottom: 4px;
    }

    .venue-address {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .venue-note {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
      padding: 12px 16px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);

      svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent);
      }
    }

    /* Rules list */
    .rules-list {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
      }
    }

    /* Sticky Booking Column */
    .booking-column {
      position: relative;
    }

    .sticky-booking-panel {
      position: sticky;
      top: 96px;
      padding: 28px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-elevated);
    }

    .panel-title {
      font-size: 1.35rem;
      margin-bottom: 4px;
    }

    .panel-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .tiers-selector {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .tier-option {
      padding: 16px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover:not(.sold-out) {
        border-color: var(--border-strong);
      }

      &.selected {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .radio-indicator {
          border-color: var(--accent);
          background: var(--accent);
        }
      }

      &.sold-out {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .tier-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .tier-name-badge {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .radio-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid var(--border-medium);
      display: inline-block;
      transition: all var(--transition-fast);
    }

    .tier-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
    }

    .tier-price {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
    }

    .tier-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .tier-bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.74rem;
    }

    .tier-badge {
      color: var(--accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .tier-availability {
      color: var(--text-muted);
    }

    .tier-soldout-label {
      color: var(--badge-error-text);
      font-weight: 700;
    }

    .quantity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 20px;
    }

    .qty-label {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .qty-stepper {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 4px;
    }

    .stepper-btn {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: var(--text-primary);
      border-radius: var(--radius-xs);

      &:hover:not(:disabled) {
        background: var(--bg-surface-elevated);
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .qty-value {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      min-width: 24px;
      text-align: center;
    }

    .price-breakdown {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .breakdown-row {
      display: flex;
      justify-content: space-between;
    }

    .breakdown-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-weight: 700;

      .total-number {
        font-family: var(--font-display);
        font-size: 1.3rem;
        color: var(--text-primary);
      }
    }

    .booking-cta-wrap {
      margin-bottom: 16px;
    }

    .w-full {
      width: 100%;
    }

    .booking-footer-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `]
})
export class EventDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  event?: EventItem;
  selectedTier?: TicketTier;
  ticketQuantity = 1;
  readonly maxAllowedQty = 6;

  get subtotal(): number {
    if (!this.selectedTier) return 0;
    return this.selectedTier.price * this.ticketQuantity;
  }

  get convenienceFee(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get totalAmount(): number {
    return this.subtotal + this.convenienceFee;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.event = this.eventService.getEventById(id);
        if (this.event && this.event.ticketTiers.length > 0) {
          // Select first available tier
          const available = this.event.ticketTiers.find(t => t.availableQuantity > 0);
          this.selectedTier = available || this.event.ticketTiers[0];
        }
      }
    });
  }

  selectTier(tier: TicketTier): void {
    if (tier.availableQuantity === 0) return;
    this.selectedTier = tier;
  }

  increaseQty(): void {
    if (!this.selectedTier) return;
    const limit = Math.min(this.selectedTier.availableQuantity, this.maxAllowedQty);
    if (this.ticketQuantity < limit) {
      this.ticketQuantity++;
    }
  }

  decreaseQty(): void {
    if (this.ticketQuantity > 1) {
      this.ticketQuantity--;
    }
  }

  proceedToRegistration(): void {
    if (!this.event || !this.selectedTier) return;

    const session: CheckoutSession = {
      event: this.event,
      tier: this.selectedTier,
      quantity: this.ticketQuantity,
      attendee: {
        fullName: '',
        email: '',
        phone: ''
      },
      additionalGuests: [],
      subtotal: this.subtotal,
      convenienceFee: this.convenienceFee,
      total: this.totalAmount
    };

    this.eventService.setCheckoutSession(session);
    this.router.navigate(['/events', this.event.id, 'register']);
  }
}

```


<a id="frontend-src-app-public-events-events-component-ts"></a>
## `frontend/src/app/public/events/events.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventItem } from '../../core/models/event.model';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EventCardComponent],
  template: `
    <div class="events-discovery-page">
      <!-- Discovery Header -->
      <section class="discovery-hero">
        <div class="container">
          <span class="editorial-kicker">Curated Calendar · 2026</span>
          <h1 class="discovery-title">Upcoming Events</h1>
          <p class="discovery-subtext">Find your next night out.</p>

          <!-- Top Search & Quick Bar -->
          <div class="search-sort-bar">
            <div class="search-input-wrap">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search by event, artist, or enclave..."
                class="search-input"
              />
              <button
                *ngIf="searchQuery"
                (click)="searchQuery = ''; applyFilters()"
                class="clear-search-btn"
              >
                &times;
              </button>
            </div>

            <div class="actions-right">
              <!-- Sort Selector -->
              <div class="sort-selector-wrap">
                <span class="sort-label">Sort:</span>
                <select [(ngModel)]="sortBy" (ngModelChange)="applyFilters()" class="sort-select">
                  <option value="date-asc">Date: Upcoming</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <!-- Mobile Filter Drawer Trigger -->
              <button class="btn btn-subtle mobile-filter-btn" (click)="mobileFilterOpen = true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filters
                <span class="filter-count" *ngIf="activeFiltersCount > 0">{{ activeFiltersCount }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Layout (Desktop sidebar + Grid) -->
      <section class="discovery-main container">
        <div class="discovery-layout">
          <!-- Desktop Filter Sidebar -->
          <aside class="desktop-filters card-base">
            <div class="filter-header">
              <span class="filter-heading">Filter Gatherings</span>
              <button class="reset-link" (click)="resetFilters()" *ngIf="activeFiltersCount > 0">
                Clear all
              </button>
            </div>

            <!-- City Filter -->
            <div class="filter-group">
              <label class="filter-label">City</label>
              <div class="chip-list">
                <button
                  *ngFor="let c of cities"
                  class="filter-chip"
                  [class.active]="selectedCity === c"
                  (click)="selectedCity = c; applyFilters()"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- Event Category -->
            <div class="filter-group">
              <label class="filter-label">Experience Type</label>
              <div class="chip-list">
                <button
                  *ngFor="let cat of categories"
                  class="filter-chip"
                  [class.active]="selectedCategory === cat"
                  (click)="selectedCategory = cat; applyFilters()"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Price Range -->
            <div class="filter-group">
              <label class="filter-label">Price Bracket</label>
              <div class="radio-list">
                <label class="radio-option" *ngFor="let p of priceOptions">
                  <input
                    type="radio"
                    name="priceBracket"
                    [value]="p.value"
                    [(ngModel)]="selectedPriceBracket"
                    (ngModelChange)="applyFilters()"
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>

            <!-- Availability -->
            <div class="filter-group">
              <label class="filter-label">Ticket Status</label>
              <div class="chip-list">
                <button
                  *ngFor="let av of availabilities"
                  class="filter-chip"
                  [class.active]="selectedAvailability === av"
                  (click)="selectedAvailability = av; applyFilters()"
                >
                  {{ av }}
                </button>
              </div>
            </div>
          </aside>

          <!-- Events Listing Column -->
          <div class="discovery-results">
            <!-- Active Filter Bar Summary -->
            <div class="results-header">
              <span class="results-count">
                Showing <strong>{{ filteredEvents.length }}</strong> experience{{ filteredEvents.length === 1 ? '' : 's' }}
              </span>

              <div class="active-chips" *ngIf="activeFiltersCount > 0">
                <span class="active-pill" *ngIf="selectedCity !== 'All Cities'">
                  {{ selectedCity }}
                  <span class="remove" (click)="selectedCity = 'All Cities'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedCategory !== 'All Types'">
                  {{ selectedCategory }}
                  <span class="remove" (click)="selectedCategory = 'All Types'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedPriceBracket !== 'all'">
                  Price Filter
                  <span class="remove" (click)="selectedPriceBracket = 'all'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedAvailability !== 'All'">
                  {{ selectedAvailability }}
                  <span class="remove" (click)="selectedAvailability = 'All'; applyFilters()">&times;</span>
                </span>
              </div>
            </div>

            <!-- Events Grid -->
            <div class="events-grid" *ngIf="filteredEvents.length > 0">
              <div *ngFor="let ev of filteredEvents" class="grid-item">
                <app-event-card [event]="ev"></app-event-card>
              </div>
            </div>

            <!-- Empty State -->
            <div class="empty-state card-base" *ngIf="filteredEvents.length === 0">
              <span class="empty-kicker">No Gatherings Found</span>
              <h3 class="empty-title">Refine Your Atmospheric Query</h3>
              <p class="empty-desc">
                No events currently match your selected filters. Try broadening your criteria or reset filters.
              </p>
              <button class="btn btn-outline" (click)="resetFilters()">
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Mobile Filter Drawer / Bottom Sheet -->
      <div class="mobile-drawer-overlay" *ngIf="mobileFilterOpen" (click)="mobileFilterOpen = false">
        <div class="mobile-filter-sheet glass-panel" (click)="$event.stopPropagation()">
          <div class="drawer-header">
            <h3>Filter Gatherings</h3>
            <button class="close-drawer-btn" (click)="mobileFilterOpen = false">&times;</button>
          </div>

          <div class="drawer-body">
            <!-- City -->
            <div class="filter-group">
              <label class="filter-label">City</label>
              <div class="chip-list">
                <button
                  *ngFor="let c of cities"
                  class="filter-chip"
                  [class.active]="selectedCity === c"
                  (click)="selectedCity = c; applyFilters()"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- Experience Type -->
            <div class="filter-group">
              <label class="filter-label">Experience Type</label>
              <div class="chip-list">
                <button
                  *ngFor="let cat of categories"
                  class="filter-chip"
                  [class.active]="selectedCategory === cat"
                  (click)="selectedCategory = cat; applyFilters()"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Price -->
            <div class="filter-group">
              <label class="filter-label">Price Bracket</label>
              <div class="radio-list">
                <label class="radio-option" *ngFor="let p of priceOptions">
                  <input
                    type="radio"
                    name="mobilePriceBracket"
                    [value]="p.value"
                    [(ngModel)]="selectedPriceBracket"
                    (ngModelChange)="applyFilters()"
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>

            <!-- Availability -->
            <div class="filter-group">
              <label class="filter-label">Availability</label>
              <div class="chip-list">
                <button
                  *ngFor="let av of availabilities"
                  class="filter-chip"
                  [class.active]="selectedAvailability === av"
                  (click)="selectedAvailability = av; applyFilters()"
                >
                  {{ av }}
                </button>
              </div>
            </div>
          </div>

          <div class="drawer-footer">
            <button class="btn btn-outline" (click)="resetFilters()">Clear</button>
            <button class="btn btn-primary" (click)="mobileFilterOpen = false">
              Show {{ filteredEvents.length }} Events
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .discovery-hero {
      padding: 64px 0 32px;
      border-bottom: 1px solid var(--border-subtle);
      background: radial-gradient(circle at 10% 20%, var(--bg-surface-elevated) 0%, transparent 60%);
    }

    .discovery-title {
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      margin-bottom: 8px;
    }

    .discovery-subtext {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }

    .search-sort-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      position: relative;
      flex: 1;
      min-width: 280px;

      .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
      }

      .search-input {
        width: 100%;
        padding: 12px 38px 12px 42px;
        background: var(--bg-input);
        border: 1px solid var(--border-medium);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: var(--accent);
        }
      }

      .clear-search-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        font-size: 1.2rem;
      }
    }

    .actions-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .sort-selector-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);

      .sort-select {
        padding: 10px 14px;
        background: var(--bg-input);
        border: 1px solid var(--border-medium);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-size: 0.85rem;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: var(--accent);
        }
      }
    }

    .mobile-filter-btn {
      display: none;

      @media (max-width: 900px) {
        display: inline-flex;
      }
    }

    .filter-count {
      background: var(--accent);
      color: var(--accent-text);
      font-size: 0.72rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Main Layout */
    .discovery-main {
      padding: 48px 24px 80px;
    }

    .discovery-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 36px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    /* Desktop Sidebar */
    .desktop-filters {
      padding: 24px;
      border-radius: var(--radius-md);
      height: fit-content;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .filter-heading {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .reset-link {
      font-size: 0.76rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .filter-group {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .filter-label {
      display: block;
      font-family: var(--font-display);
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .filter-chip {
      padding: 6px 12px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-size: 0.8rem;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
        color: var(--text-primary);
      }

      &.active {
        background: var(--accent-subtle);
        border-color: var(--accent);
        color: var(--accent);
        font-weight: 600;
      }
    }

    .radio-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.84rem;
      color: var(--text-secondary);
      cursor: pointer;

      input {
        accent-color: var(--accent);
      }
    }

    /* Results Header */
    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .results-count {
      font-size: 0.88rem;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
      }
    }

    .active-chips {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .active-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.74rem;
      color: var(--text-primary);

      .remove {
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        color: var(--accent);
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    /* Empty state */
    .empty-state {
      padding: 64px 32px;
      text-align: center;
      border-radius: var(--radius-md);
    }

    .empty-kicker {
      font-family: var(--font-display);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--accent);
      display: block;
      margin-bottom: 12px;
    }

    .empty-title {
      font-size: 1.6rem;
      margin-bottom: 12px;
    }

    .empty-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 24px;
    }

    /* Mobile Bottom Sheet */
    .mobile-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: flex-end;
    }

    .mobile-filter-sheet {
      width: 100%;
      max-height: 80vh;
      border-radius: 20px 20px 0 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--shadow-drawer);
    }

    .drawer-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 1.2rem;
      }

      .close-drawer-btn {
        font-size: 1.6rem;
        color: var(--text-muted);
      }
    }

    .drawer-body {
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .drawer-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      gap: 12px;
      background: var(--bg-surface);

      .btn {
        flex: 1;
      }
    }
  `]
})
export class EventsComponent implements OnInit {
  private readonly eventService = inject(EventService);
  private readonly route = inject(ActivatedRoute);

  searchQuery = '';
  selectedCity = 'All Cities';
  selectedCategory = 'All Types';
  selectedPriceBracket = 'all';
  selectedAvailability = 'All';
  sortBy = 'date-asc';

  mobileFilterOpen = false;

  readonly cities = ['All Cities', 'Bengaluru', 'Mumbai', 'Goa', 'Delhi'];
  readonly categories = [
    'All Types',
    'House Party',
    'Rooftop Sessions',
    'Intimate DJ',
    'Private Gathering',
    'Pop-up Experience'
  ];
  readonly priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹750', value: 'under-750' },
    { label: '₹750 – ₹1,200', value: '750-1200' },
    { label: 'Above ₹1,200', value: 'above-1200' }
  ];
  readonly availabilities = ['All', 'Available', 'Selling Fast', 'Limited Spots'];

  filteredEvents: EventItem[] = [];

  get activeFiltersCount(): number {
    let count = 0;
    if (this.selectedCity !== 'All Cities') count++;
    if (this.selectedCategory !== 'All Types') count++;
    if (this.selectedPriceBracket !== 'all') count++;
    if (this.selectedAvailability !== 'All') count++;
    if (this.searchQuery.trim().length > 0) count++;
    return count;
  }

  ngOnInit(): void {
    // Check query params (e.g. from footer links)
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['city']) {
        this.selectedCity = params['city'];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let list = [...this.eventService.events()];

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.edition.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.lineup.some(artist => artist.name.toLowerCase().includes(q))
      );
    }

    // City
    if (this.selectedCity !== 'All Cities') {
      list = list.filter(e => e.city.toLowerCase() === this.selectedCity.toLowerCase());
    }

    // Category
    if (this.selectedCategory !== 'All Types') {
      list = list.filter(e => e.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Price
    if (this.selectedPriceBracket === 'under-750') {
      list = list.filter(e => e.startingPrice < 750);
    } else if (this.selectedPriceBracket === '750-1200') {
      list = list.filter(e => e.startingPrice >= 750 && e.startingPrice <= 1200);
    } else if (this.selectedPriceBracket === 'above-1200') {
      list = list.filter(e => e.startingPrice > 1200);
    }

    // Availability
    if (this.selectedAvailability !== 'All') {
      list = list.filter(e => e.availability.toLowerCase() === this.selectedAvailability.toLowerCase());
    }

    // Sorting
    if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (this.sortBy === 'popular') {
      list.sort((a, b) => b.ticketsSold - a.ticketsSold);
    } else {
      // date-asc
      list.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
    }

    this.filteredEvents = list;
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCity = 'All Cities';
    this.selectedCategory = 'All Types';
    this.selectedPriceBracket = 'all';
    this.selectedAvailability = 'All';
    this.sortBy = 'date-asc';
    this.applyFilters();
  }
}

```


<a id="frontend-src-app-public-home-home-component-ts"></a>
## `frontend/src/app/public/home/home.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, EventCardComponent],
  template: `
    <div class="home-page">
      <!-- 1. HERO SECTION -->
      <section class="hero-section">
        <div class="hero-background-wrapper">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80"
            alt="Atmospheric SpotBukk Gathering"
            class="hero-bg-img"
          />
          <div class="hero-gradient-overlay"></div>
        </div>

        <div class="container hero-content">
          <div class="hero-kicker-row">
            <span class="editorial-kicker">CURATED NIGHTLIFE & PRIVATE SESSIONS</span>
            <span class="live-pill">
              <span class="pulse-indicator"></span>
              Autumn/Winter 2026 Season Active
            </span>
          </div>

          <h1 class="hero-headline">
            MAKE TONIGHT<br />
            WORTH REMEMBERING.
          </h1>

          <p class="hero-subtext">
            Curated house parties, music nights and unforgettable experiences across Bengaluru, Mumbai, Goa, and Delhi.
          </p>

          <div class="hero-cta-group">
            <a routerLink="/events" class="btn btn-primary btn-lg">
              Explore Events
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/admin/events/create" class="btn btn-outline btn-lg">
              Host an Event
            </a>
          </div>

          <!-- Quick Enclave Counter -->
          <div class="hero-stats-bar glass-panel">
            <div class="stat-item">
              <span class="stat-number">06</span>
              <span class="stat-desc">Curated Gatherings</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">180</span>
              <span class="stat-desc">Cap Per Event</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-desc">Vetted Entry</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">04</span>
              <span class="stat-desc">Cities</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. FEATURED EVENT BANNER (Editorial Master Showcase) -->
      <section class="section featured-section" *ngIf="featuredEvent as feat">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="editorial-kicker">Spotlight Gathering</span>
              <h2 class="section-title">The Signature Edition</h2>
            </div>
            <a [routerLink]="['/events', feat.id]" class="view-link">
              View Event Story &rarr;
            </a>
          </div>

          <div class="featured-editorial-card card-base">
            <div class="featured-image-col">
              <img [src]="feat.heroImage" [alt]="feat.title" class="featured-img" />
              <div class="featured-badge-pill">
                <span class="status-pill status-selling-fast">Selling Fast</span>
              </div>
            </div>

            <div class="featured-info-col">
              <div class="feat-top-meta">
                <span class="feat-category">{{ feat.category }}</span>
                <span class="feat-date">{{ feat.date }}</span>
              </div>

              <h2 class="feat-title">
                {{ feat.title }}
                <span class="feat-edition">{{ feat.edition }}</span>
              </h2>

              <p class="feat-desc">
                {{ feat.description }}
              </p>

              <div class="feat-highlights-grid">
                <div class="highlight-item" *ngFor="let h of feat.highlights.slice(0, 3)">
                  <span class="highlight-check">✓</span>
                  <span>{{ h }}</span>
                </div>
              </div>

              <div class="feat-action-row">
                <div class="feat-price">
                  <span class="label">Tickets From</span>
                  <span class="val">₹{{ feat.startingPrice }}</span>
                </div>
                <div class="feat-btns">
                  <a [routerLink]="['/events', feat.id]" class="btn btn-primary">
                    View Event & Reserve
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. UPCOMING EVENTS GRID -->
      <section class="section events-section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="editorial-kicker">Current Calendar</span>
              <h2 class="section-title">Upcoming Gatherings</h2>
            </div>
            <a routerLink="/events" class="view-link">
              Browse All Experiences &rarr;
            </a>
          </div>

          <div class="events-grid">
            <div *ngFor="let ev of upcomingEvents" class="event-grid-col">
              <app-event-card [event]="ev"></app-event-card>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. EXPERIENCE SECTION (Editorial Brand Essence) -->
      <section class="section experience-section" id="experience">
        <div class="container">
          <div class="experience-header text-center">
            <span class="editorial-kicker">The SpotBukk Philosophy</span>
            <h2 class="experience-main-title">
              NOT JUST A PARTY.<br />
              AN EXPERIENCE.
            </h2>
            <p class="experience-lead">
              We reimagined nightlife for those fatigued by sterile commercial venues, chaotic overcrowding, and generic party templates.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-card card-base">
              <div class="feature-number">01</div>
              <h3 class="feature-title">Curated Spaces</h3>
              <p class="feature-text">
                Every gathering is hosted in architecturally distinct residences: penthouse conservatories, cliffside estates, restored industrial vaults, and secluded open-air gardens.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">02</div>
              <h3 class="feature-title">Music & Atmosphere</h3>
              <p class="feature-text">
                Analog warmth, vinyl-only warmups, and deep underground selections tuned to bespoke acoustic setups. Warm incandescent lighting, never harsh strobe clutter.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">03</div>
              <h3 class="feature-title">Limited Capacity</h3>
              <p class="feature-text">
                Guestlists are strictly hard-capped (80–220 guests max). No elbow-to-elbow crush at the bar, no thirty-minute bathroom lines, no anonymous crowds.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">04</div>
              <h3 class="feature-title">Easy Digital Entry</h3>
              <p class="feature-text">
                Frictionless digital pass with animated security signature and QR barcode. One-second door verification with our mobile host check-in engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FAQ SECTION -->
      <section class="section faq-section" id="faq">
        <div class="container container-narrow">
          <div class="text-center mb-48">
            <span class="editorial-kicker">Guidance & Etiquette</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>

          <div class="faq-list">
            <div class="faq-card card-base" *ngFor="let item of faqs; let i = index">
              <button class="faq-question" (click)="toggleFaq(i)" [attr.aria-expanded]="activeFaq === i">
                <span>{{ item.q }}</span>
                <span class="faq-icon">{{ activeFaq === i ? '−' : '+' }}</span>
              </button>
              <div class="faq-answer" *ngIf="activeFaq === i">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. FINAL EDITORIAL CTA -->
      <section class="final-cta-section">
        <div class="container text-center">
          <span class="editorial-kicker">Intimate & Electric</span>
          <h2 class="cta-headline">SEE YOU AFTER DARK.</h2>
          <p class="cta-subtext">
            Spaces fill quickly. Reserve your place on the guestlist for upcoming weekends.
          </p>
          <div class="cta-button-wrap">
            <a routerLink="/events" class="btn btn-primary btn-lg">
              Explore Upcoming Events
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 86vh;
      display: flex;
      align-items: center;
      padding: 80px 0 60px;
      overflow: hidden;

      @media (max-width: 768px) {
        min-height: 75vh;
        padding: 40px 0;
      }
    }

    .hero-background-wrapper {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.38) saturate(0.85);
    }

    .hero-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(11, 12, 14, 0.4) 0%,
        var(--bg-page) 95%
      );
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 900px;
    }

    .hero-kicker-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #f5f2eb;
    }

    .pulse-indicator {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
    }

    .hero-headline {
      font-size: clamp(2.5rem, 6.5vw, 4.8rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.05;
      margin-bottom: 24px;
      text-transform: uppercase;
      color: #ffffff;
    }

    .hero-subtext {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      max-width: 620px;
      line-height: 1.6;
      margin-bottom: 36px;
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .hero-stats-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-radius: var(--radius-md);
      max-width: 720px;

      @media (max-width: 640px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 16px 20px;

        .stat-divider {
          display: none;
        }
      }
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .stat-desc {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .stat-divider {
      width: 1px;
      height: 32px;
      background: var(--border-medium);
    }

    /* Section structure */
    .section {
      padding: 96px 0;

      @media (max-width: 768px) {
        padding: 60px 0;
      }
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 40px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      letter-spacing: -0.01em;
    }

    .view-link {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--accent);

      &:hover {
        text-decoration: underline;
      }
    }

    /* Featured Editorial Card */
    .featured-editorial-card {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      overflow: hidden;
      border-radius: var(--radius-lg);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .featured-image-col {
      position: relative;
      min-height: 420px;

      @media (max-width: 900px) {
        min-height: 280px;
      }
    }

    .featured-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .featured-badge-pill {
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .featured-info-col {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 768px) {
        padding: 24px;
      }
    }

    .feat-top-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 16px;

      .feat-category {
        color: var(--accent);
        font-weight: 700;
      }
    }

    .feat-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      margin-bottom: 16px;
      line-height: 1.1;

      .feat-edition {
        display: block;
        font-size: 1rem;
        letter-spacing: 0.12em;
        color: var(--text-secondary);
        margin-top: 4px;
      }
    }

    .feat-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .feat-highlights-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 32px;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--text-primary);
    }

    .highlight-check {
      color: var(--accent);
      font-weight: bold;
    }

    .feat-action-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-subtle);
      padding-top: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .feat-price {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 0.72rem;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .val {
        font-family: var(--font-display);
        font-size: 1.4rem;
        font-weight: 800;
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    /* Experience Features Grid */
    .experience-header {
      max-width: 740px;
      margin: 0 auto 56px;
    }

    .experience-main-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      line-height: 1.1;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }

    .experience-lead {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .feature-card {
      padding: 32px 24px;
      border-radius: var(--radius-md);
      position: relative;
    }

    .feature-number {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--accent);
      margin-bottom: 20px;
      opacity: 0.8;
    }

    .feature-title {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }

    .feature-text {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* FAQ */
    .mb-48 {
      margin-bottom: 48px;
    }

    .text-center {
      text-align: center;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-card {
      overflow: hidden;
      border-radius: var(--radius-md);
    }

    .faq-question {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .faq-icon {
      font-size: 1.4rem;
      color: var(--accent);
      font-weight: 300;
    }

    .faq-answer {
      padding: 0 24px 20px;
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
      border-top: 1px solid var(--border-subtle);
      padding-top: 16px;
    }

    /* Final CTA */
    .final-cta-section {
      padding: 110px 0;
      background: radial-gradient(
        ellipse at bottom,
        var(--bg-surface-elevated) 0%,
        var(--bg-page) 80%
      );
      border-top: 1px solid var(--border-subtle);
    }

    .cta-headline {
      font-size: clamp(2.4rem, 5.5vw, 4.2rem);
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-bottom: 16px;
    }

    .cta-subtext {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto 36px;
    }

    .cta-button-wrap {
      display: flex;
      justify-content: center;
    }
  `]
})
export class HomeComponent {
  private readonly eventService = inject(EventService);

  readonly featuredEvent = this.eventService.events().find(e => e.featured) || this.eventService.events()[0];
  readonly upcomingEvents = this.eventService.events().slice(1, 7);

  activeFaq = 0;

  readonly faqs = [
    {
      q: 'How does the secret venue disclosure work?',
      a: 'To maintain intimate sanctuary and prevent drop-in congestion, exact gate and penthouse addresses are disclosed via SMS/WhatsApp and your digital ticket 6 hours prior to door opening.'
    },
    {
      q: 'What is the attendee age requirement and dress code?',
      a: 'All gatherings are strictly 21+ with government photo identification verified at the entrance scanner. Dress codes favor atmospheric smart casual or tailored dark palettes.'
    },
    {
      q: 'Are tickets transferable if I cannot attend?',
      a: 'Yes, tickets may be transferred to a friend up to 12 hours before doors open through the ticket link in your confirmation pass.'
    },
    {
      q: 'What is the sound policy and photography ethos?',
      a: 'SpotBukk prioritizes present immersion. Most gatherings maintain a strict no-flash photography policy in active listening salons to protect both artists and guests.'
    }
  ];

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }
}

```


<a id="frontend-src-app-public-login-login-component-ts"></a>
## `frontend/src/app/public/login/login.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type LoginMode = 'options' | 'phone' | 'email' | 'admin';
type VerificationStep = 'input' | 'otp';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-backdrop-glow"></div>

      <div class="login-container">
        <!-- Main Login Card -->
        <div class="login-card glass-panel">
          
          <!-- Logo & Header -->
          <div class="card-header">
            <a routerLink="/" class="brand-logo-link" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk Logo" class="login-logo-img" />
            </a>

            <!-- Mode-dependent Titles -->
            <div *ngIf="mode() !== 'admin'" class="header-titles">
              <h1 class="welcome-title">Welcome Back</h1>
              <p class="welcome-subtitle">Sign in to continue</p>
            </div>

            <div *ngIf="mode() === 'admin'" class="header-titles">
              <div class="admin-badge">
                <span class="security-dot"></span>
                Curator Security Portal
              </div>
              <h1 class="welcome-title">Administrator Sign In</h1>
              <p class="welcome-subtitle">Authorized personnel & organizers only</p>
            </div>
          </div>

          <!-- Alert / Error Banner -->
          <div *ngIf="errorMessage()" class="alert-banner alert-error" role="alert">
            <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="alert-text">{{ errorMessage() }}</span>
          </div>

          <!-- Success Banner -->
          <div *ngIf="successMessage()" class="alert-banner alert-success" role="alert">
            <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span class="alert-text">{{ successMessage() }}</span>
          </div>

          <!-- ======================================================== -->
          <!-- 1. OPTIONS VIEW: Google, Phone, Email Buttons            -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'options'" class="view-content fade-in">
            
            <!-- OPTION 1: Continue with Google -->
            <button
              type="button"
              id="btn-google-login"
              class="auth-provider-btn google-btn"
              (click)="handleGoogleLogin()"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon google-svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span class="btn-text">Continue with Google</span>
              <span *ngIf="isGoogleLoading()" class="btn-spinner"></span>
            </button>

            <!-- OR Divider -->
            <div class="auth-divider">
              <span class="divider-line"></span>
              <span class="divider-text">OR</span>
              <span class="divider-line"></span>
            </div>

            <!-- OPTION 2: Continue with Phone -->
            <button
              type="button"
              id="btn-phone-option"
              class="auth-provider-btn option-btn"
              (click)="switchToMode('phone')"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <span class="btn-text">Continue with Phone Number</span>
              <span class="chevron-arrow">&rarr;</span>
            </button>

            <!-- OPTION 3: Continue with Email -->
            <button
              type="button"
              id="btn-email-option"
              class="auth-provider-btn option-btn"
              (click)="switchToMode('email')"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span class="btn-text">Continue with Email</span>
              <span class="chevron-arrow">&rarr;</span>
            </button>

            <!-- Switcher to Admin Sign In -->
            <div class="card-footer-switch">
              <span class="curator-text">Staff or Organizer?</span>
              <button type="button" class="admin-link-btn" (click)="switchToMode('admin')">
                Sign in to Admin Portal &rarr;
              </button>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 2. PHONE NUMBER LOGIN FLOW                                -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'phone'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Back to all options
            </button>

            <!-- Step A: Enter Phone Number -->
            <div *ngIf="phoneStep() === 'input'">
              <div class="step-desc">
                Enter your mobile number to receive a 6-digit one-time verification code.
              </div>

              <form (ngSubmit)="handleSendPhoneOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="phone-input">Phone Number</label>
                  <div class="phone-input-wrap">
                    <span class="phone-prefix">+91</span>
                    <input
                      id="phone-input"
                      type="tel"
                      [(ngModel)]="phoneNumber"
                      name="phoneNumber"
                      placeholder="98765 43210"
                      class="form-control phone-field"
                      autocomplete="tel"
                      maxlength="14"
                      required
                    />
                  </div>
                  <span class="field-hint">Indian (+91) & International formats supported</span>
                </div>

                <button
                  type="submit"
                  id="btn-send-phone-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || !phoneNumber.trim()"
                >
                  <span *ngIf="!isLoading()">Send Verification Code</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Sending SMS...
                  </span>
                </button>
              </form>
            </div>

            <!-- Step B: Enter Phone OTP -->
            <div *ngIf="phoneStep() === 'otp'" class="otp-view">
              <div class="step-desc">
                Enter the 6-digit code sent to <strong class="text-contrast">+91 {{ phoneNumber }}</strong>
              </div>

              <form (ngSubmit)="handleVerifyPhoneOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="phone-otp-input">Verification Code</label>
                  <input
                    id="phone-otp-input"
                    type="text"
                    [(ngModel)]="phoneOtp"
                    name="phoneOtp"
                    placeholder="Enter 6-digit code"
                    class="form-control text-center otp-input-field"
                    autocomplete="one-time-code"
                    maxlength="6"
                    required
                  />
                </div>

                <div class="resend-row">
                  <span *ngIf="phoneTimer() > 0" class="cooldown-text">
                    Resend code in <strong>{{ phoneTimer() }}s</strong>
                  </span>
                  <button
                    *ngIf="phoneTimer() === 0"
                    type="button"
                    class="resend-btn"
                    (click)="handleSendPhoneOtp()"
                    [disabled]="isLoading()"
                  >
                    Resend Code
                  </button>
                  <button type="button" class="change-entry-btn" (click)="phoneStep.set('input')">
                    Edit Phone Number
                  </button>
                </div>

                <button
                  type="submit"
                  id="btn-verify-phone-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || phoneOtp.length < 6"
                >
                  <span *ngIf="!isLoading()">Verify & Sign In</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Verifying...
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 3. EMAIL LOGIN FLOW                                      -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'email'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Back to all options
            </button>

            <!-- Step A: Enter Email -->
            <div *ngIf="emailStep() === 'input'">
              <div class="step-desc">
                Enter your email address to receive a secure login verification code.
              </div>

              <form (ngSubmit)="handleSendEmailOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="email-input">Email Address</label>
                  <input
                    id="email-input"
                    type="email"
                    [(ngModel)]="emailAddress"
                    name="emailAddress"
                    placeholder="curator@example.com"
                    class="form-control"
                    autocomplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  id="btn-send-email-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || !emailAddress.trim()"
                >
                  <span *ngIf="!isLoading()">Send Verification Code</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Dispatching Code...
                  </span>
                </button>
              </form>
            </div>

            <!-- Step B: Enter Email OTP -->
            <div *ngIf="emailStep() === 'otp'" class="otp-view">
              <div class="step-desc">
                We sent a 6-digit code to <strong class="text-contrast">{{ emailAddress }}</strong>
              </div>

              <form (ngSubmit)="handleVerifyEmailOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="email-otp-input">Verification Code</label>
                  <input
                    id="email-otp-input"
                    type="text"
                    [(ngModel)]="emailOtp"
                    name="emailOtp"
                    placeholder="Enter 6-digit code"
                    class="form-control text-center otp-input-field"
                    autocomplete="one-time-code"
                    maxlength="6"
                    required
                  />
                </div>

                <div class="resend-row">
                  <span *ngIf="emailTimer() > 0" class="cooldown-text">
                    Resend code in <strong>{{ emailTimer() }}s</strong>
                  </span>
                  <button
                    *ngIf="emailTimer() === 0"
                    type="button"
                    class="resend-btn"
                    (click)="handleSendEmailOtp()"
                    [disabled]="isLoading()"
                  >
                    Resend Code
                  </button>
                  <button type="button" class="change-entry-btn" (click)="emailStep.set('input')">
                    Change Email
                  </button>
                </div>

                <button
                  type="submit"
                  id="btn-verify-email-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || emailOtp.length < 6"
                >
                  <span *ngIf="!isLoading()">Verify & Sign In</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Verifying...
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 4. ADMINISTRATOR PORTAL SIGN IN                          -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'admin'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Return to Attendee Sign In
            </button>

            <form (ngSubmit)="handleAdminLogin()" class="auth-form admin-form">
              <div class="form-group">
                <label class="form-label" for="admin-email">Administrator Email</label>
                <input
                  id="admin-email"
                  type="email"
                  [(ngModel)]="adminEmail"
                  name="adminEmail"
                  placeholder="admin@spotbukk.com"
                  class="form-control"
                  autocomplete="username"
                  required
                />
              </div>

              <div class="form-group">
                <div class="label-with-hint">
                  <label class="form-label" for="admin-password">Security Password / Key</label>
                </div>
                <div class="password-input-wrap">
                  <input
                    id="admin-password"
                    [type]="showPassword ? 'text' : 'password'"
                    [(ngModel)]="adminPassword"
                    name="adminPassword"
                    placeholder="Enter security password"
                    class="form-control"
                    autocomplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    class="toggle-pwd-btn"
                    (click)="showPassword = !showPassword"
                    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                  >
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
              </div>

              <div class="admin-notice-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Curator privileges are verified strictly on the SpotBukk security server. Client role forging is prohibited.</span>
              </div>

              <button
                type="submit"
                id="btn-admin-submit"
                class="btn btn-primary btn-block submit-btn admin-submit"
                [disabled]="isLoading() || !adminEmail.trim() || !adminPassword.trim()"
              >
                <span *ngIf="!isLoading()">Authenticate as Administrator</span>
                <span *ngIf="isLoading()" class="btn-spinner-text">
                  <span class="btn-spinner"></span> Verifying Security Clearance...
                </span>
              </button>

              <div class="demo-creds-hint">
                <span>Default test administrator credentials:</span>
                <code>admin&#64;spotbukk.com / SpotBukkAdmin2026!</code>
              </div>
            </form>
          </div>

        </div>

        <!-- Security Footer -->
        <div class="login-footer-info">
          <span>Protected by SpotBukk End-to-End Cryptographic Clearance Protocol</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 140px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      position: relative;
      background: var(--bg-page);
    }

    .login-backdrop-glow {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(128, 0, 32, 0.22) 0%, rgba(128, 0, 32, 0.05) 50%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(40px);
    }

    .login-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 460px;
      margin: 0 auto;
    }

    .login-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 40px 32px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(12px);
    }

    .card-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .brand-logo-link {
      display: inline-block;
      margin-bottom: 20px;
      transition: transform var(--transition-fast);
      &:hover { transform: scale(1.03); }
    }

    .login-logo-img {
      height: 58px;
      width: auto;
      max-width: 150px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      border-radius: var(--radius-xs);
    }

    .welcome-title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 6px;
      letter-spacing: -0.02em;
    }

    .welcome-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .admin-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(128, 0, 32, 0.25);
      border: 1px solid rgba(128, 0, 32, 0.45);
      color: #ff9999;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    .security-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff4d4d;
      box-shadow: 0 0 8px #ff4d4d;
    }

    /* Alerts */
    .alert-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      margin-bottom: 20px;
      font-size: 0.88rem;
      line-height: 1.4;
    }

    .alert-error {
      background: rgba(163, 44, 44, 0.18);
      border: 1px solid rgba(163, 44, 44, 0.45);
      color: #fca5a5;
    }

    .alert-success {
      background: rgba(46, 117, 89, 0.18);
      border: 1px solid rgba(46, 117, 89, 0.45);
      color: #86efac;
    }

    .alert-icon {
      flex-shrink: 0;
    }

    /* Provider Buttons */
    .view-content {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .auth-provider-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      font-size: 0.96rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid var(--border-medium);
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      text-align: center;
      position: relative;

      &:hover:not(:disabled) {
        border-color: var(--border-strong);
        background: var(--bg-surface-subtle);
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .google-btn {
      background: #ffffff;
      color: #1f1f1f;
      border-color: #dadce0;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

      &:hover:not(:disabled) {
        background: #f8f9fa;
        border-color: #c1c3c7;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
      }
    }

    .google-svg {
      flex-shrink: 0;
    }

    .option-btn {
      justify-content: flex-start;
      padding-left: 20px;
      padding-right: 20px;

      .btn-text {
        flex: 1;
        text-align: left;
      }

      .chevron-arrow {
        font-size: 1.1rem;
        color: var(--text-muted);
        transition: transform var(--transition-fast);
      }

      &:hover .chevron-arrow {
        transform: translateX(3px);
        color: var(--text-primary);
      }
    }

    /* Divider */
    .auth-divider {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 8px 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: var(--border-medium);
    }

    .divider-text {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.1em;
    }

    /* Footer switch to admin */
    .card-footer-switch {
      text-align: center;
      padding-top: 14px;
      margin-top: 6px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .curator-text {
      color: var(--text-muted);
    }

    .admin-link-btn {
      background: none;
      border: none;
      color: #d16b80;
      font-weight: 600;
      cursor: pointer;
      transition: color var(--transition-fast);
      text-decoration: underline;
      text-underline-offset: 3px;

      &:hover {
        color: #ff9999;
      }
    }

    .back-link-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.86rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      padding: 0;
      margin-bottom: 6px;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--text-primary);
      }
    }

    .step-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .text-contrast {
      color: var(--text-primary);
    }

    /* Forms */
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .label-with-hint {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-control {
      width: 100%;
      padding: 12px 14px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-size: 0.96rem;
      transition: border-color var(--transition-fast);

      &:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-subtle);
      }
    }

    .phone-input-wrap {
      display: flex;
      align-items: center;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      overflow: hidden;

      &:focus-within {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-subtle);
      }
    }

    .phone-prefix {
      padding: 12px 14px;
      background: var(--bg-surface-elevated);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.92rem;
      border-right: 1px solid var(--border-medium);
    }

    .phone-field {
      border: none;
      background: transparent;
      &:focus { box-shadow: none; }
    }

    .field-hint {
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .password-input-wrap {
      position: relative;
    }

    .toggle-pwd-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.82rem;
      cursor: pointer;
      &:hover { color: var(--text-primary); }
    }

    .otp-input-field {
      font-size: 1.5rem;
      letter-spacing: 0.3em;
      font-family: monospace;
      font-weight: 700;
      padding: 14px;
    }

    .resend-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.84rem;
    }

    .cooldown-text {
      color: var(--text-muted);
    }

    .resend-btn {
      background: none;
      border: none;
      color: #d16b80;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      &:hover { color: #ff9999; }
    }

    .change-entry-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0;
      &:hover { color: var(--text-primary); }
    }

    .submit-btn {
      padding: 13px 20px;
      font-size: 0.96rem;
      font-weight: 600;
      margin-top: 4px;
    }

    .admin-submit {
      background: #800020;
      border-color: #960026;
      &:hover:not(:disabled) {
        background: #960026;
      }
    }

    .admin-notice-box {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      background: rgba(128, 0, 32, 0.12);
      border: 1px solid rgba(128, 0, 32, 0.35);
      border-radius: var(--radius-sm);
      color: #e5a3b2;
      font-size: 0.78rem;
      line-height: 1.45;
    }

    .demo-creds-hint {
      padding: 10px 12px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      color: var(--text-secondary);
      display: flex;
      flex-direction: column;
      gap: 4px;

      code {
        font-family: monospace;
        color: #ffb3c1;
        font-size: 0.84rem;
      }
    }

    .login-footer-info {
      text-align: center;
      margin-top: 24px;
      font-size: 0.76rem;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }

    .btn-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    .btn-spinner-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .fade-in {
      animation: fadeIn 0.22s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  readonly mode = signal<LoginMode>('options');
  readonly phoneStep = signal<VerificationStep>('input');
  readonly emailStep = signal<VerificationStep>('input');

  phoneNumber = '';
  phoneOtp = '';
  emailAddress = '';
  emailOtp = '';

  adminEmail = 'admin@spotbukk.com';
  adminPassword = '';
  showPassword = false;

  readonly isLoading = signal<boolean>(false);
  readonly isGoogleLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly phoneTimer = signal<number>(0);
  readonly emailTimer = signal<number>(0);
  private phoneTimerInterval: any = null;
  private emailTimerInterval: any = null;

  returnUrl = '';

  ngOnInit(): void {
    const qParams = this.route.snapshot.queryParams;
    this.returnUrl = qParams['returnUrl'] || '';

    // Check if mode was specified in query params
    if (qParams['mode'] === 'admin') {
      this.mode.set('admin');
    }

    // If reason was unauthenticated
    if (qParams['reason'] === 'unauthenticated') {
      this.errorMessage.set('Administrator authentication required to access this portal.');
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  switchToMode(targetMode: LoginMode): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.mode.set(targetMode);
  }

  /**
   * Option 1: Continue with Google
   */
  async handleGoogleLogin(): Promise<void> {
    this.errorMessage.set(null);
    this.isGoogleLoading.set(true);

    try {
      // Authenticate with Google
      const user = await this.authService.loginWithGoogle();
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Google sign-in was unsuccessful.');
    } finally {
      this.isGoogleLoading.set(false);
    }
  }

  /**
   * Option 2: Send Phone OTP
   */
  async handleSendPhoneOtp(): Promise<void> {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const clean = this.phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      this.errorMessage.set('Please enter a valid 10-digit phone number.');
      return;
    }

    this.isLoading.set(true);
    try {
      const res = await this.authService.sendPhoneOtp(this.phoneNumber);
      this.phoneStep.set('otp');
      this.phoneOtp = '';
      this.successMessage.set(res.message || 'Verification code dispatched via SMS.');
      this.startPhoneCooldown(res.cooldownSeconds || 30);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Unable to send SMS verification code.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Verify Phone OTP
   */
  async handleVerifyPhoneOtp(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.phoneOtp || this.phoneOtp.trim().length !== 6) {
      this.errorMessage.set('Please enter the full 6-digit verification code.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.verifyPhoneOtp(this.phoneNumber, this.phoneOtp.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Send Email OTP
   */
  async handleSendEmailOtp(): Promise<void> {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.emailAddress.trim() || !emailRegex.test(this.emailAddress.trim())) {
      this.errorMessage.set('Please enter a valid email address.');
      return;
    }

    this.isLoading.set(true);
    try {
      const res = await this.authService.sendEmailOtp(this.emailAddress.trim());
      this.emailStep.set('otp');
      this.emailOtp = '';
      this.successMessage.set(res.message || 'Verification code sent to your email.');
      this.startEmailCooldown(res.cooldownSeconds || 30);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Unable to send email verification code.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Verify Email OTP
   */
  async handleVerifyEmailOtp(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.emailOtp || this.emailOtp.trim().length !== 6) {
      this.errorMessage.set('Please enter the full 6-digit verification code.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.verifyEmailOtp(this.emailAddress.trim(), this.emailOtp.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 4: Admin Login
   */
  async handleAdminLogin(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.adminEmail.trim() || !this.adminPassword.trim()) {
      this.errorMessage.set('Administrator email and security password are required.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.loginAsAdmin(this.adminEmail.trim(), this.adminPassword.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid administrator credentials. Access restricted.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private handlePostLoginRedirect(role: string): void {
    if (role === 'ADMIN') {
      if (this.returnUrl && (this.returnUrl.startsWith('/admin') || this.returnUrl.startsWith('/check-in'))) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/admin']);
      }
    } else {
      // END_USER: If they attempted to access /admin, redirect to /events instead of forbidden admin page
      if (this.returnUrl && !this.returnUrl.startsWith('/admin') && !this.returnUrl.startsWith('/check-in') && this.returnUrl !== '/unauthorized') {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/events']);
      }
    }
  }

  private startPhoneCooldown(seconds: number): void {
    this.phoneTimer.set(seconds);
    if (this.phoneTimerInterval) clearInterval(this.phoneTimerInterval);
    this.phoneTimerInterval = setInterval(() => {
      const current = this.phoneTimer();
      if (current <= 1) {
        clearInterval(this.phoneTimerInterval);
        this.phoneTimer.set(0);
      } else {
        this.phoneTimer.set(current - 1);
      }
    }, 1000);
  }

  private startEmailCooldown(seconds: number): void {
    this.emailTimer.set(seconds);
    if (this.emailTimerInterval) clearInterval(this.emailTimerInterval);
    this.emailTimerInterval = setInterval(() => {
      const current = this.emailTimer();
      if (current <= 1) {
        clearInterval(this.emailTimerInterval);
        this.emailTimer.set(0);
      } else {
        this.emailTimer.set(current - 1);
      }
    }, 1000);
  }

  private clearTimers(): void {
    if (this.phoneTimerInterval) clearInterval(this.phoneTimerInterval);
    if (this.emailTimerInterval) clearInterval(this.emailTimerInterval);
  }
}

```


<a id="frontend-src-app-public-payment-success-payment-success-component-ts"></a>
## `frontend/src/app/public/payment-success/payment-success.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { QrCodeComponent } from '../../shared/components/qr-code/qr-code.component';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule, QrCodeComponent],
  template: `
    <div class="success-page container container-narrow" *ngIf="booking">
      <div class="success-card card-base glass-panel">
        <!-- Top Status Indicator -->
        <div class="status-marker">
          <div class="check-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span class="editorial-kicker">Admission Confirmed</span>
        </div>

        <h1 class="success-headline">YOU'RE IN.</h1>
        <p class="success-subtext">
          Your booking is confirmed. Your digital pass has been generated and added to your private guest registry.
        </p>

        <!-- Booking Pass Card Preview -->
        <div class="pass-preview-card card-base">
          <div class="pass-left">
            <img [src]="booking.heroImage" [alt]="booking.eventTitle" class="pass-thumb" />
            <div class="pass-details">
              <span class="pass-edition">{{ booking.eventEdition }}</span>
              <h3 class="pass-event-title">{{ booking.eventTitle }}</h3>
              <p class="pass-meta-line">{{ booking.eventDate }} · {{ booking.eventTime }}</p>
              <p class="pass-venue">{{ booking.eventVenue }}, {{ booking.eventCity }}</p>

              <div class="pass-badges-row">
                <span class="pass-pill">{{ booking.quantity }} &times; {{ booking.ticketTierName }}</span>
                <span class="pass-pill pill-gold">Paid ₹{{ booking.totalAmount }}</span>
              </div>
            </div>
          </div>

          <div class="pass-qr-side">
            <app-qr-code [value]="booking.qrPayload" [size]="100"></app-qr-code>
            <span class="qr-label">Pass #{{ booking.id }}</span>
          </div>
        </div>

        <!-- Audit & Receipt Details Table -->
        <div class="receipt-table">
          <div class="receipt-row">
            <span class="r-lbl">Booking Reference:</span>
            <span class="r-val font-mono">{{ booking.id }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Ticket Serial Code:</span>
            <span class="r-val font-mono">{{ booking.ticketCode }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Guest Name:</span>
            <span class="r-val">{{ booking.customer.fullName }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Confirmation Sent To:</span>
            <span class="r-val">{{ booking.customer.email }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Transaction Reference:</span>
            <span class="r-val font-mono">{{ booking.transactionId }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="success-actions">
          <a [routerLink]="['/ticket', booking.id]" class="btn btn-primary btn-lg">
            View Digital Ticket Pass
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a routerLink="/events" class="btn btn-outline">
            Browse More Events
          </a>
        </div>

        <p class="door-instruction-note">
          Exact penthouse coordinates and door entry code will be activated on your ticket pass 6 hours prior to door opening.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .success-page {
      padding: 60px 24px 96px;
    }

    .success-card {
      padding: 48px;
      border-radius: var(--radius-xl);
      text-align: center;
      position: relative;
      overflow: hidden;

      @media (max-width: 600px) {
        padding: 28px 20px;
      }
    }

    .status-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .check-circle {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--accent-text);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .success-headline {
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      letter-spacing: -0.01em;
      margin-bottom: 12px;
    }

    .success-subtext {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 540px;
      margin: 0 auto 36px;
      line-height: 1.6;
    }

    /* Pass Preview Card */
    .pass-preview-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      border-radius: var(--radius-md);
      background: var(--bg-surface-elevated);
      text-align: left;
      margin-bottom: 32px;
      gap: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .pass-left {
      display: flex;
      align-items: center;
      gap: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .pass-thumb {
      width: 88px;
      height: 88px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .pass-edition {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    .pass-event-title {
      font-size: 1.25rem;
      line-height: 1.15;
      margin-bottom: 4px;
    }

    .pass-meta-line,
    .pass-venue {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .pass-badges-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .pass-pill {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);

      &.pill-gold {
        border-color: var(--accent);
        color: var(--accent);
      }
    }

    .pass-qr-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .qr-label {
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    /* Receipt Table */
    .receipt-table {
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-md);
      padding: 18px 24px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 36px;
      font-size: 0.85rem;
    }

    .receipt-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 8px;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    .r-lbl {
      color: var(--text-muted);
    }

    .r-val {
      color: var(--text-primary);
      font-weight: 600;
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }

    .success-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .door-instruction-note {
      font-size: 0.78rem;
      color: var(--text-muted);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.5;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);

  booking?: Booking;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.booking = this.eventService.getBookingById(id);
      }
      if (!this.booking) {
        this.booking = this.eventService.bookings()[0];
      }
    });
  }
}

```


<a id="frontend-src-app-public-registration-registration-component-ts"></a>
## `frontend/src/app/public/registration/registration.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, CheckoutSession } from '../../core/services/event.service';
import { EventItem, TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="registration-page container container-narrow" *ngIf="event">
      <!-- Breadcrumb & Top Indicator -->
      <div class="reg-top-bar">
        <a [routerLink]="['/events', event.id]" class="back-link">
          &larr; Back to {{ event.title }}
        </a>
        <span class="reg-step-indicator">Step {{ currentStep }} of 3</span>
      </div>

      <!-- Stepper Progress Header -->
      <div class="stepper-header card-base">
        <div class="step-node" [class.active]="currentStep === 1" [class.completed]="currentStep > 1" (click)="goToStep(1)">
          <span class="step-num">1</span>
          <span class="step-title">Select Pass</span>
        </div>
        <div class="step-line" [class.filled]="currentStep > 1"></div>
        <div class="step-node" [class.active]="currentStep === 2" [class.completed]="currentStep > 2" (click)="goToStep(2)">
          <span class="step-num">2</span>
          <span class="step-title">Attendee Details</span>
        </div>
        <div class="step-line" [class.filled]="currentStep > 2"></div>
        <div class="step-node" [class.active]="currentStep === 3">
          <span class="step-num">3</span>
          <span class="step-title">Review Order</span>
        </div>
      </div>

      <!-- STEP 1: Pass & Quantity Confirmation -->
      <div class="step-card card-base" *ngIf="currentStep === 1">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 01</span>
          <h2 class="step-heading">Confirm Ticket Tier & Quantity</h2>
          <p class="step-desc">Select the admission category best matched to your party.</p>
        </div>

        <div class="tiers-list">
          <div
            *ngFor="let tier of event.ticketTiers"
            class="tier-box"
            [class.active]="selectedTier?.id === tier.id"
            [class.disabled]="tier.availableQuantity === 0"
            (click)="selectTier(tier)"
          >
            <div class="tier-box-left">
              <div class="tier-select-circle"></div>
              <div>
                <h4 class="tier-box-title">{{ tier.name }}</h4>
                <p class="tier-box-desc">{{ tier.description }}</p>
                <div class="tier-perks-row">
                  <span class="perk-badge" *ngFor="let p of tier.perks">{{ p }}</span>
                </div>
              </div>
            </div>
            <div class="tier-box-right">
              <span class="tier-box-price">₹{{ tier.price }}</span>
              <span class="tier-box-status" *ngIf="tier.availableQuantity > 0">
                {{ tier.availableQuantity }} left
              </span>
              <span class="tier-box-status text-danger" *ngIf="tier.availableQuantity === 0">
                Sold Out
              </span>
            </div>
          </div>
        </div>

        <!-- Quantity row -->
        <div class="qty-select-bar" *ngIf="selectedTier">
          <div>
            <span class="qty-title">Number of Attendees</span>
            <span class="qty-hint">Each ticket pass requires full name verification at check-in.</span>
          </div>
          <div class="qty-controls">
            <button class="btn btn-subtle btn-sm" (click)="decreaseQty()" [disabled]="quantity <= 1">&minus;</button>
            <span class="qty-count">{{ quantity }}</span>
            <button class="btn btn-subtle btn-sm" (click)="increaseQty()" [disabled]="quantity >= 6">&#43;</button>
          </div>
        </div>

        <div class="step-nav-footer">
          <div></div>
          <button class="btn btn-primary" (click)="goToStep(2)" [disabled]="!selectedTier">
            Proceed to Details &rarr;
          </button>
        </div>
      </div>

      <!-- STEP 2: Guest Details & Optional Requests -->
      <div class="step-card card-base" *ngIf="currentStep === 2">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 02</span>
          <h2 class="step-heading">Attendee Verification</h2>
          <p class="step-desc">
            Passes are strictly vetted. Ensure names match government photo ID.
          </p>
        </div>

        <form (submit)="onAttendeeSubmit($event)">
          <!-- Primary Attendee -->
          <div class="form-section-title">Primary Attendee (Booking Holder)</div>
          
          <div class="form-group">
            <label for="fullName">Full Name (As on Photo ID) *</label>
            <input
              id="fullName"
              type="text"
              class="form-control"
              [(ngModel)]="primaryName"
              name="primaryName"
              placeholder="e.g. Rohan Mehra"
              required
            />
            <div class="form-error" *ngIf="submitted && !primaryName.trim()">
              Full name is mandatory for 21+ entry.
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                id="email"
                type="email"
                class="form-control"
                [(ngModel)]="primaryEmail"
                name="primaryEmail"
                placeholder="name@example.com"
                required
              />
              <span class="form-hint">Digital pass and gate secrets sent here.</span>
              <div class="form-error" *ngIf="submitted && (!primaryEmail.trim() || !primaryEmail.includes('@'))">
                A valid email address is required.
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone / WhatsApp Number *</label>
              <input
                id="phone"
                type="tel"
                class="form-control"
                [(ngModel)]="primaryPhone"
                name="primaryPhone"
                placeholder="+91 98450 18239"
                required
              />
              <span class="form-hint">For day-of door coordination and emergency updates.</span>
              <div class="form-error" *ngIf="submitted && !primaryPhone.trim()">
                Contact number is required.
              </div>
            </div>
          </div>

          <!-- Additional Attendees (if quantity > 1) -->
          <div *ngIf="quantity > 1" class="additional-guests-block">
            <div class="form-section-title">Additional Guest Names</div>
            <p class="section-microcopy">
              Enter names for the remaining {{ quantity - 1 }} guest{{ quantity > 2 ? 's' : '' }}.
            </p>

            <div class="form-group" *ngFor="let g of additionalGuests; let i = index; trackBy: trackByIndex">
              <label>Guest {{ i + 2 }} Full Name</label>
              <input
                type="text"
                class="form-control"
                [(ngModel)]="additionalGuests[i]"
                [name]="'guest_' + i"
                placeholder="Guest Full Name"
              />
            </div>
          </div>

          <!-- Special Requests / Dietary / Notes -->
          <div class="form-group">
            <label for="specialRequests">Special Requests / Notes (Optional)</label>
            <textarea
              id="specialRequests"
              class="form-control"
              rows="3"
              [(ngModel)]="specialRequests"
              name="specialRequests"
              placeholder="Allergies, arrival time, celebrating a birthday, or specific music preferences..."
            ></textarea>
          </div>

          <div class="step-nav-footer">
            <button type="button" class="btn btn-outline" (click)="goToStep(1)">
              &larr; Back
            </button>
            <button type="submit" class="btn btn-primary">
              Review Summary &rarr;
            </button>
          </div>
        </form>
      </div>

      <!-- STEP 3: Order Review & Confirmation -->
      <div class="step-card card-base" *ngIf="currentStep === 3">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 03</span>
          <h2 class="step-heading">Review Gathering Registration</h2>
          <p class="step-desc">Verify your information before proceeding to payment.</p>
        </div>

        <div class="review-grid">
          <!-- Gathering Summary -->
          <div class="review-box card-base">
            <div class="review-box-header">Gathering Summary</div>
            <div class="review-event-line">
              <img [src]="event.heroImage" [alt]="event.title" class="review-event-thumb" />
              <div>
                <h4 class="review-event-title">{{ event.title }} <small>{{ event.edition }}</small></h4>
                <p class="review-event-meta">{{ event.date }} · {{ event.time }}</p>
                <p class="review-event-venue">{{ event.venue }}, {{ event.city }}</p>
              </div>
            </div>
          </div>

          <!-- Attendee Summary -->
          <div class="review-box card-base">
            <div class="review-box-header">Primary Guest Details</div>
            <div class="review-details-list">
              <div class="detail-row">
                <span class="lbl">Primary Attendee:</span>
                <span class="val">{{ primaryName }}</span>
              </div>
              <div class="detail-row">
                <span class="lbl">Email:</span>
                <span class="val">{{ primaryEmail }}</span>
              </div>
              <div class="detail-row">
                <span class="lbl">Phone:</span>
                <span class="val">{{ primaryPhone }}</span>
              </div>
              <div class="detail-row" *ngIf="additionalGuests.length > 0">
                <span class="lbl">Guests:</span>
                <span class="val">{{ additionalGuests.join(', ') }}</span>
              </div>
              <div class="detail-row" *ngIf="specialRequests">
                <span class="lbl">Special Notes:</span>
                <span class="val">{{ specialRequests }}</span>
              </div>
            </div>
          </div>

          <!-- Cost Breakdown -->
          <div class="review-box card-base">
            <div class="review-box-header">Financial Summary</div>
            <div class="cost-table">
              <div class="cost-row">
                <span>{{ selectedTier?.name }} &times; {{ quantity }}</span>
                <span>₹{{ subtotal }}</span>
              </div>
              <div class="cost-row">
                <span>Convenience & Verification Fee</span>
                <span>₹{{ convenienceFee }}</span>
              </div>
              <div class="cost-total-row">
                <span>Total Due</span>
                <span class="cost-total-amount">₹{{ totalAmount }}</span>
              </div>
            </div>
          </div>

          <!-- Consent Checkbox -->
          <div class="consent-block">
            <label class="consent-label">
              <input type="checkbox" [(ngModel)]="termsAccepted" />
              <span>
                I confirm all attendees are 21+ with government photo identification. I agree to the SpotBukk house etiquette and no-flash policy.
              </span>
            </label>
            <div class="form-error" *ngIf="submitted && !termsAccepted">
              You must agree to the house guidelines to proceed.
            </div>
          </div>
        </div>

        <div class="step-nav-footer">
          <button type="button" class="btn btn-outline" (click)="goToStep(2)">
            &larr; Edit Details
          </button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            (click)="proceedToPayment()"
            [disabled]="!termsAccepted"
          >
            Continue to Payment (₹{{ totalAmount }}) &rarr;
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .registration-page {
      padding: 48px 24px 80px;
    }

    .reg-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .reg-step-indicator {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
    }

    /* Stepper Header */
    .stepper-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-radius: var(--radius-md);
      margin-bottom: 36px;

      @media (max-width: 600px) {
        padding: 14px 16px;
      }
    }

    .step-node {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity var(--transition-fast);

      &.active {
        opacity: 1;

        .step-num {
          background: var(--accent);
          color: var(--accent-text);
          border-color: var(--accent);
        }

        .step-title {
          color: var(--text-primary);
          font-weight: 700;
        }
      }

      &.completed {
        opacity: 0.85;

        .step-num {
          background: var(--bg-surface-elevated);
          color: var(--accent);
          border-color: var(--accent);
        }
      }
    }

    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--border-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .step-title {
      font-family: var(--font-display);
      font-size: 0.84rem;
      color: var(--text-secondary);

      @media (max-width: 600px) {
        display: none;
      }
    }

    .step-line {
      flex: 1;
      height: 1px;
      background: var(--border-subtle);
      margin: 0 16px;

      &.filled {
        background: var(--accent);
      }
    }

    /* Step Card */
    .step-card {
      padding: 36px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 24px 18px;
      }
    }

    .step-card-header {
      margin-bottom: 32px;
    }

    .step-heading {
      font-size: 1.6rem;
      margin-bottom: 6px;
    }

    .step-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    /* Tiers Box */
    .tiers-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 28px;
    }

    .tier-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover:not(.disabled) {
        border-color: var(--border-medium);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .tier-select-circle {
          background: var(--accent);
          border-color: var(--accent);
        }
      }

      &.disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
    }

    .tier-box-left {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .tier-select-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid var(--border-medium);
      margin-top: 3px;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }

    .tier-box-title {
      font-family: var(--font-display);
      font-size: 1.05rem;
      margin-bottom: 4px;
    }

    .tier-box-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .tier-perks-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .perk-badge {
      font-size: 0.72rem;
      padding: 2px 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
    }

    .tier-box-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media (max-width: 640px) {
        align-items: flex-start;
      }
    }

    .tier-box-price {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 800;
    }

    .tier-box-status {
      font-size: 0.75rem;
      color: var(--text-muted);

      &.text-danger {
        color: var(--badge-error-text);
      }
    }

    /* Qty Bar */
    .qty-select-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-md);
      margin-bottom: 32px;

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
    }

    .qty-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      display: block;
    }

    .qty-hint {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .qty-count {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      min-width: 24px;
      text-align: center;
    }

    /* Forms */
    .form-section-title {
      font-family: var(--font-display);
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-primary);
      margin: 24px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .section-microcopy {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    /* Step 3 Review */
    .review-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 32px;
    }

    .review-box {
      padding: 20px;
      border-radius: var(--radius-md);
    }

    .review-box-header {
      font-family: var(--font-display);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 14px;
      font-weight: 700;
    }

    .review-event-line {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .review-event-thumb {
      width: 72px;
      height: 72px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }

    .review-event-title {
      font-size: 1.15rem;
      margin-bottom: 4px;

      small {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
    }

    .review-event-meta,
    .review-event-venue {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .review-details-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .detail-row {
      display: flex;
      font-size: 0.85rem;

      .lbl {
        width: 140px;
        color: var(--text-muted);
        flex-shrink: 0;
      }

      .val {
        color: var(--text-primary);
        font-weight: 500;
      }
    }

    .cost-table {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.88rem;
    }

    .cost-row {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);
    }

    .cost-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
      font-weight: 700;
      color: var(--text-primary);
    }

    .cost-total-amount {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--text-primary);
    }

    .consent-block {
      padding: 16px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
      margin-top: 8px;
    }

    .consent-label {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.5;
      cursor: pointer;

      input {
        margin-top: 3px;
        accent-color: var(--accent);
      }
    }

    .step-nav-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 28px;
      border-top: 1px solid var(--border-subtle);
      margin-top: 24px;
    }
  `]
})
export class RegistrationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  event?: EventItem;
  selectedTier?: TicketTier;
  quantity = 1;

  currentStep = 1;
  submitted = false;

  // Form fields
  primaryName = '';
  primaryEmail = '';
  primaryPhone = '';
  additionalGuests: string[] = [];
  specialRequests = '';
  termsAccepted = false;

  get subtotal(): number {
    if (!this.selectedTier) return 0;
    return this.selectedTier.price * this.quantity;
  }

  get convenienceFee(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get totalAmount(): number {
    return this.subtotal + this.convenienceFee;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.event = this.eventService.getEventById(id);
        if (this.event) {
          // Check if checkout session exists
          const session = this.eventService.activeCheckoutSession();
          if (session && session.event.id === this.event.id) {
            this.selectedTier = session.tier;
            this.quantity = session.quantity;
            this.primaryName = session.attendee.fullName;
            this.primaryEmail = session.attendee.email;
            this.primaryPhone = session.attendee.phone;
            this.additionalGuests = [...session.additionalGuests];
            this.specialRequests = session.specialRequests || '';
            // If details already provided, jump to step 2
            if (this.selectedTier) {
              this.currentStep = 2;
            }
          } else {
            this.selectedTier = this.event.ticketTiers[0];
            this.syncAdditionalGuests();
          }
        }
      }
    });
  }

  selectTier(tier: TicketTier): void {
    if (tier.availableQuantity === 0) return;
    this.selectedTier = tier;
  }

  increaseQty(): void {
    if (this.quantity < 6) {
      this.quantity++;
      this.syncAdditionalGuests();
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.syncAdditionalGuests();
    }
  }

  syncAdditionalGuests(): void {
    const required = Math.max(0, this.quantity - 1);
    while (this.additionalGuests.length < required) {
      this.additionalGuests.push('');
    }
    if (this.additionalGuests.length > required) {
      this.additionalGuests = this.additionalGuests.slice(0, required);
    }
  }

  goToStep(step: number): void {
    if (step === 2 && !this.selectedTier) {
      this.toast.error('Please select an admission pass first.');
      return;
    }
    if (step === 3 && (!this.primaryName.trim() || !this.primaryEmail.trim() || !this.primaryPhone.trim())) {
      this.submitted = true;
      this.toast.error('Please complete all required attendee fields.');
      return;
    }
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onAttendeeSubmit(e: Event): void {
    e.preventDefault();
    this.submitted = true;

    if (!this.primaryName.trim() || !this.primaryEmail.trim() || !this.primaryPhone.trim()) {
      this.toast.error('Please fill in required fields.');
      return;
    }

    this.goToStep(3);
  }

  proceedToPayment(): void {
    if (!this.event || !this.selectedTier) return;
    if (!this.termsAccepted) {
      this.submitted = true;
      this.toast.warning('Please agree to house etiquette before proceeding.');
      return;
    }

    const session: CheckoutSession = {
      event: this.event,
      tier: this.selectedTier,
      quantity: this.quantity,
      attendee: {
        fullName: this.primaryName.trim(),
        email: this.primaryEmail.trim(),
        phone: this.primaryPhone.trim()
      },
      additionalGuests: this.additionalGuests.filter(g => g.trim().length > 0),
      specialRequests: this.specialRequests.trim(),
      subtotal: this.subtotal,
      convenienceFee: this.convenienceFee,
      total: this.totalAmount
    };

    this.eventService.setCheckoutSession(session);
    this.router.navigate(['/checkout']);
  }

  trackByIndex(index: number): number {
    return index;
  }
}

```


<a id="frontend-src-app-public-ticket-ticket-component-ts"></a>
## `frontend/src/app/public/ticket/ticket.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { QrCodeComponent } from '../../shared/components/qr-code/qr-code.component';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule, QrCodeComponent],
  template: `
    <div class="ticket-page container container-narrow" *ngIf="booking">
      <!-- Top Action Bar -->
      <div class="ticket-top-bar">
        <a routerLink="/events" class="back-link">
          &larr; Discover Events
        </a>
        <div class="ticket-actions-group">
          <button class="btn btn-subtle btn-sm" (click)="savePass()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Save Pass
          </button>
          <a *ngIf="authService.isAdmin()" [routerLink]="['/admin/scanner']" class="btn btn-primary btn-sm">
            Door Scanner (Admin)
          </a>
        </div>
      </div>

      <!-- DIGITAL TICKET MASTER PASS -->
      <div class="ticket-master-container">
        <!-- Physical/Editorial Pass Card -->
        <div class="editorial-pass-card card-base">
          <!-- Pass Top: Event Media & Hero Information -->
          <div class="pass-hero-header">
            <img [src]="booking.heroImage" [alt]="booking.eventTitle" class="pass-artwork" />
            <div class="artwork-gradient"></div>

            <div class="pass-brand-tag">
              <span class="SpotBukk-seal">SpotBukk PASS</span>
              <span class="entry-status-badge" [class.verified]="booking.checkedIn">
                {{ booking.checkedIn ? 'ENTRY VERIFIED' : 'READY TO SCAN' }}
              </span>
            </div>

            <div class="pass-title-group">
              <span class="pass-edition-label">{{ booking.eventEdition }}</span>
              <h1 class="pass-main-title">{{ booking.eventTitle }}</h1>
              <p class="pass-location-tag">{{ booking.eventVenue }} · {{ booking.eventCity }}</p>
            </div>
          </div>

          <!-- Pass Mid: Schedule & Guest Ledger -->
          <div class="pass-mid-grid">
            <div class="grid-cell">
              <span class="cell-label">Date of Event</span>
              <span class="cell-value">{{ booking.eventDate }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Doors Open</span>
              <span class="cell-value">{{ booking.eventTime }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Admitted Guest</span>
              <span class="cell-value">{{ booking.customer.fullName }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Tier & Party Size</span>
              <span class="cell-value">{{ booking.ticketTierName }} ({{ booking.quantity }})</span>
            </div>
          </div>

          <!-- Perforated Tear-off Line with Realistic Notches -->
          <div class="perforation-divider">
            <div class="cutout-notch notch-left"></div>
            <div class="dashed-stitch-line"></div>
            <div class="cutout-notch notch-right"></div>
          </div>

          <!-- Pass Bottom: High Security QR & Barcode Section -->
          <div class="pass-bottom-section">
            <div class="qr-cluster">
              <div class="qr-frame">
                <app-qr-code [value]="booking.qrPayload" [size]="160"></app-qr-code>
              </div>
              <div class="qr-badge-banner">
                <span class="scan-entry-kicker">SCAN AT ENTRY</span>
              </div>
            </div>

            <div class="pass-security-column">
              <div class="sec-item">
                <span class="sec-lbl">Booking Reference</span>
                <span class="sec-val font-mono">{{ booking.id }}</span>
              </div>
              <div class="sec-item">
                <span class="sec-lbl">Ticket Serial Code</span>
                <span class="sec-val font-mono">{{ booking.ticketCode }}</span>
              </div>
              <div class="sec-item">
                <span class="sec-lbl">Gate / Check-in Portal</span>
                <span class="sec-val">Penthouse Express Gate 01</span>
              </div>
              <div class="sec-item" *ngIf="booking.additionalGuests.length > 0">
                <span class="sec-lbl">Registered Guests</span>
                <span class="sec-val">{{ booking.additionalGuests.join(', ') }}</span>
              </div>
            </div>
          </div>

          <!-- Pass Footer Notice -->
          <div class="pass-rules-strip">
            <span>21+ ID VERIFICATION MANDATORY · ADMITTANCE HARD-CAPPED · NON-TRANSFERABLE AT DOOR</span>
          </div>
        </div>

        <!-- Wallet Shortcuts -->
        <div class="wallet-buttons-row">
          <button class="wallet-btn" (click)="mockAddToWallet('Apple Wallet')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.39-.56.65-.96 1.7-0.83 2.73 1.05.08 2.06-.54 2.58-1.25z"/>
            </svg>
            Add to Apple Wallet
          </button>
          <button class="wallet-btn" (click)="mockAddToWallet('Google Wallet')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Add to Google Wallet
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticket-page {
      padding: 48px 24px 80px;
    }

    .ticket-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .ticket-actions-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ticket-master-container {
      max-width: 580px;
      margin: 0 auto;
    }

    /* Editorial Physical-Style Pass Card */
    .editorial-pass-card {
      background: var(--bg-surface);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-drawer);
      position: relative;
    }

    .pass-hero-header {
      position: relative;
      min-height: 220px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .pass-artwork {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.35) saturate(0.9);
      z-index: 0;
    }

    .artwork-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
      z-index: 1;
    }

    .pass-brand-tag {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .SpotBukk-seal {
      font-family: var(--font-display);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #ffffff;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-sm);
    }

    .entry-status-badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);

      &.verified {
        background: var(--badge-success-bg);
        color: var(--badge-success-text);
        border-color: var(--badge-success-text);
      }
    }

    .pass-title-group {
      position: relative;
      z-index: 2;
      margin-top: 24px;
    }

    .pass-edition-label {
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    .pass-main-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-weight: 800;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .pass-location-tag {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.8);
    }

    /* Mid Grid */
    .pass-mid-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 24px;
      gap: 16px;
      background: var(--bg-surface-elevated);
    }

    .grid-cell {
      display: flex;
      flex-direction: column;

      .cell-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin-bottom: 2px;
      }

      .cell-value {
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    /* Perforation / Tear-off Notches */
    .perforation-divider {
      position: relative;
      height: 24px;
      background: var(--bg-surface-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .dashed-stitch-line {
      width: 100%;
      height: 0;
      border-top: 2px dashed var(--border-medium);
    }

    .cutout-notch {
      position: absolute;
      top: 50%;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--bg-page);
      transform: translateY(-50%);
      z-index: 3;
    }

    .notch-left {
      left: -11px;
    }

    .notch-right {
      right: -11px;
    }

    /* Bottom Section */
    .pass-bottom-section {
      padding: 28px 24px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 28px;
      align-items: center;
      background: var(--bg-surface-elevated);

      @media (max-width: 540px) {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
      }
    }

    .qr-cluster {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .qr-frame {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .scan-entry-kicker {
      font-family: var(--font-display);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: var(--accent);
    }

    .pass-security-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sec-item {
      display: flex;
      flex-direction: column;

      .sec-lbl {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .sec-val {
        font-size: 0.88rem;
        color: var(--text-primary);
        font-weight: 600;
      }
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.06em;
    }

    .pass-rules-strip {
      padding: 12px 20px;
      background: var(--bg-surface);
      border-top: 1px solid var(--border-subtle);
      text-align: center;
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Wallet Row */
    .wallet-buttons-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 24px;

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }
    }

    .wallet-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--text-primary);
        transform: translateY(-1px);
      }
    }
  `]
})
export class TicketComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);
  readonly authService = inject(AuthService);

  booking?: Booking;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.booking = this.eventService.getBookingById(id);
      }
      if (!this.booking) {
        this.booking = this.eventService.bookings()[0];
      }
    });
  }

  savePass(): void {
    this.toast.success(
      'Pass Saved',
      'Offline cryptographic token cached to device storage.'
    );
  }

  mockAddToWallet(walletType: string): void {
    this.toast.info(
      `Pass Added to ${walletType}`,
      'NFC contactless pass ready for door tap.'
    );
  }
}

```


<a id="frontend-src-app-public-unauthorized-unauthorized-component-ts"></a>
## `frontend/src/app/public/unauthorized/unauthorized.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauth-page container container-narrow">
      <div class="unauth-card card-base">
        <!-- Brand Logo -->
        <div class="auth-brand">
          <a routerLink="/" aria-label="SpotBukk Home">
            <img src="/logo.png" alt="SpotBukk" class="auth-logo-img" />
          </a>
        </div>

        <!-- Shield Icon with Burgundy Warning Glow -->
        <div class="icon-wrap">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <span class="editorial-kicker">Security Clearance Protocol</span>
        <h1 class="unauth-title">403 FORBIDDEN</h1>
        <p class="unauth-subtitle">
          The QR Scanner and Door Clearance Engine are strictly restricted to authenticated <strong>ADMINISTRATOR</strong> accounts.
        </p>

        <!-- Current Session Diagnosis -->
        <div class="session-diagnosis">
          <div class="diag-row">
            <span class="diag-label">Authentication Status:</span>
            <span class="diag-val" [class.text-danger]="!authService.isAuthenticated()">
              {{ authService.isAuthenticated() ? 'Authenticated' : 'Unauthenticated / Guest' }}
            </span>
          </div>
          <div class="diag-row">
            <span class="diag-label">Current Active Role:</span>
            <span class="diag-val badge-role" [class.admin]="authService.isAdmin()" [class.user]="authService.isUser()">
              {{ authService.currentUser()?.role || 'NONE' }}
            </span>
          </div>
          <div class="diag-row">
            <span class="diag-label">Requested Protected Route:</span>
            <span class="diag-val font-mono">{{ returnUrl || '/check-in' }}</span>
          </div>
        </div>

        <div class="unauth-reasons">
          <p>
            Normal attendees, guests, and general customer accounts cannot operate the camera hardware or verify attendee admission barcodes.
          </p>
        </div>

        <!-- Action CTAs -->
        <div class="actions-stack">
          <button class="btn btn-primary btn-block" (click)="signInAsAdmin()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Authenticate as Administrator (Curator Account)
          </button>

          <a routerLink="/events" class="btn btn-subtle btn-block">
            &larr; Return to Curated Events
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauth-page {
      padding: 60px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 160px);
    }

    .unauth-card {
      width: 100%;
      max-width: 540px;
      padding: 40px;
      text-align: center;
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-elevated);
      border-radius: var(--radius-lg);
      background: var(--bg-surface);
    }

    .auth-brand {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;

      a {
        display: inline-block;
        transition: opacity var(--transition-fast);
        &:hover { opacity: 0.92; }
      }
    }

    .auth-logo-img {
      height: 52px;
      width: auto;
      max-width: 160px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .icon-wrap {
      width: 72px;
      height: 72px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.12);
      border: 1px solid rgba(128, 0, 32, 0.35);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .unauth-title {
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 6px 0 12px;
    }

    .unauth-subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 24px;

      strong {
        color: var(--accent);
        font-weight: 700;
      }
    }

    .session-diagnosis {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 24px;
      text-align: left;
      font-size: 0.85rem;
    }

    .diag-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }
    }

    .diag-label {
      color: var(--text-muted);
    }

    .diag-val {
      color: var(--text-primary);
      font-weight: 600;
    }

    .badge-role {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &.admin {
        background: rgba(128, 0, 32, 0.2);
        color: #ff4d6d;
        border: 1px solid rgba(128, 0, 32, 0.4);
      }

      &.user {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-secondary);
      }
    }

    .unauth-reasons {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 28px;
    }

    .actions-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .btn-block {
      width: 100%;
      justify-content: center;
    }

    .text-danger {
      color: #e87b7b;
    }
  `]
})
export class UnauthorizedComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  returnUrl = '';

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  signInAsAdmin(): void {
    this.router.navigate(['/login'], {
      queryParams: { mode: 'admin', returnUrl: this.returnUrl || '/admin' }
    });
  }
}

```


<a id="frontend-src-app-shared-components-event-card-event-card-component-ts"></a>
## `frontend/src/app/shared/components/event-card/event-card.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventItem } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="event-card card-base" [class.featured-layout]="featured">
      <!-- Media Wrap -->
      <a [routerLink]="['/events', event.id]" class="media-link">
        <div class="image-wrapper">
          <img [src]="event.heroImage" [alt]="event.title" loading="lazy" class="card-img" />
          <div class="media-overlay"></div>
          
          <!-- Badges on media -->
          <div class="card-badges">
            <span class="category-tag">{{ event.category }}</span>
            <span
              class="status-pill"
              [ngClass]="'status-' + event.availability.toLowerCase().replace(' ', '-')"
            >
              {{ event.availability }}
            </span>
          </div>

          <div class="date-capsule">
            <span class="date-text">{{ event.date }}</span>
          </div>
        </div>
      </a>

      <!-- Content -->
      <div class="card-content">
        <div class="location-row">
          <span class="city">{{ event.city }}</span>
          <span class="dot">·</span>
          <span class="venue">{{ event.venue }}</span>
        </div>

        <a [routerLink]="['/events', event.id]" class="title-link">
          <h3 class="event-title">
            {{ event.title }}
            <span class="event-edition">{{ event.edition }}</span>
          </h3>
        </a>

        <p class="event-subtitle" *ngIf="featured || showSubtitle">{{ event.subtitle }}</p>

        <!-- Meta footer -->
        <div class="card-footer">
          <div class="price-block">
            <span class="price-label">Tickets From</span>
            <span class="price-value">₹{{ event.startingPrice }}</span>
          </div>

          <div class="action-block">
            <a [routerLink]="['/events', event.id]" class="btn btn-subtle btn-sm">
              View Event
            </a>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .event-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg-surface);
      height: 100%;

      &:hover {
        .card-img {
          transform: scale(1.05);
        }
      }
    }

    .media-link {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 240px;
      overflow: hidden;
      background: var(--bg-surface-elevated);
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%);
    }

    .card-badges {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .category-tag {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-sm);
      color: #ffffff;
    }

    .date-capsule {
      position: absolute;
      bottom: 12px;
      left: 14px;
      z-index: 2;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 4px 10px;
      border-radius: var(--radius-sm);

      .date-text {
        font-size: 0.74rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: #f5f2eb;
      }
    }

    .card-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .location-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;

      .city {
        color: var(--accent);
      }

      .venue {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .event-title {
      font-size: 1.15rem;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
      line-height: 1.25;

      .event-edition {
        display: block;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: var(--text-secondary);
        margin-top: 2px;
      }
    }

    .event-subtitle {
      font-size: 0.84rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price-block {
      display: flex;
      flex-direction: column;
    }

    .price-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .price-value {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  `]
})
export class EventCardComponent {
  @Input({ required: true }) event!: EventItem;
  @Input() featured = false;
  @Input() showSubtitle = true;
}

```


<a id="frontend-src-app-shared-components-footer-footer-component-ts"></a>
## `frontend/src/app/shared/components/footer/footer.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container footer-content">
        <!-- Top row: Brand & Guestlist -->
        <div class="footer-top">
          <div class="footer-brand-col">
            <a routerLink="/" class="footer-brand" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk" class="footer-logo-img" />
            </a>
            <p class="brand-desc">
              A private platform for curated house parties, boutique music nights, and high-hospitality social gatherings.
            </p>
            <div class="curated-cities">
              <span class="city-label">Active Enclaves:</span>
              <span class="city-tag">Bengaluru</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Mumbai</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Goa</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Delhi</span>
            </div>
          </div>

          <!-- Private Guestlist Form -->
          <div class="guestlist-col">
            <span class="editorial-kicker">Private Access</span>
            <h4 class="guestlist-title">Join The SpotBukk Circle</h4>
            <p class="guestlist-desc">
              Receive unlisted gathering locations and secret drop invitations directly to your phone.
            </p>
            <form class="guestlist-form" (submit)="joinCircle($event)">
              <input
                type="email"
                placeholder="Enter your private email..."
                required
                class="form-control guestlist-input"
                #emailInput
              />
              <button type="submit" class="btn btn-primary btn-sm">Request Access</button>
            </form>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="footer-links-grid">
          <div class="link-column">
            <h5 class="column-title">Gatherings</h5>
            <a routerLink="/events" class="f-link">Discover Events</a>
            <a routerLink="/events" [queryParams]="{category: 'House Party'}" class="f-link">House Parties</a>
            <a routerLink="/events" [queryParams]="{category: 'Rooftop Sessions'}" class="f-link">Rooftop Sessions</a>
            <a routerLink="/events" [queryParams]="{category: 'Intimate DJ'}" class="f-link">Listening Rooms</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Hosts & Curators</h5>
            <a routerLink="/admin" class="f-link">Organizer Dashboard</a>
            <a routerLink="/admin/events/create" class="f-link">Host a Gathering</a>
            <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" class="f-link">Door Scanner Utility</a>
            <a routerLink="/admin/analytics" class="f-link">Audience Analytics</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Platform</h5>
            <a routerLink="/" fragment="experience" class="f-link">The Experience</a>
            <a routerLink="/" fragment="faq" class="f-link">Rules & Etiquette</a>
            <a routerLink="/" class="f-link">Sound & Acoustics</a>
            <a routerLink="/login" class="f-link">Sign In / Account</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Safety & Ethos</h5>
            <span class="f-text">21+ Curated Attendance</span>
            <span class="f-text">No Non-Consensual Recording</span>
            <span class="f-text">Zero Tolerance Harassment</span>
            <span class="f-text">Vetted Entry Protocol</span>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="footer-bottom">
          <div class="copyright">
            © 2026 SpotBukk INC. ALL RIGHTS RESERVED · NIGHTS WORTH REMEMBERING.
          </div>
          <div class="client-demo-tag">
            <span>CLIENT DEMO PLATFORM · PREMIUM HOUSE PARTY ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: var(--bg-surface);
      border-top: 1px solid var(--border-subtle);
      padding: 72px 0 32px;
      margin-top: 96px;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 48px;
      padding-bottom: 56px;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .footer-brand {
      display: inline-block;
      margin-bottom: 20px;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .footer-logo-img {
      height: 52px;
      width: auto;
      max-width: 160px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);

      @media (max-width: 600px) {
        height: 44px;
      }
    }

    .brand-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      max-width: 440px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .curated-cities {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.8rem;
    }

    .city-label {
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    .city-tag {
      color: var(--text-primary);
      font-weight: 600;
    }

    .city-separator {
      color: var(--text-muted);
    }

    .guestlist-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    .guestlist-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .guestlist-form {
      display: flex;
      gap: 8px;

      @media (max-width: 500px) {
        flex-direction: column;
      }
    }

    .guestlist-input {
      flex: 1;
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      padding: 56px 0;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 860px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .column-title {
      font-family: var(--font-display);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      margin-bottom: 18px;
    }

    .link-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .f-link {
      font-size: 0.85rem;
      color: var(--text-secondary);

      &:hover {
        color: var(--text-primary);
        transform: translateX(2px);
      }
    }

    .f-text {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 28px;
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }

    .client-demo-tag {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: 0.08em;
    }
  `]
})
export class FooterComponent {
  private readonly toast = inject(ToastService);
  readonly authService = inject(AuthService);

  joinCircle(event: Event): void {
    event.preventDefault();
    this.toast.success(
      'Guestlist Request Received',
      'You are on the priority waitlist for unlisted secret gatherings.'
    );
  }
}

```


<a id="frontend-src-app-shared-components-header-header-component-ts"></a>
## `frontend/src/app/shared/components/header/header.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header glass-panel">
      <div class="container header-inner">
        <!-- Logo -->
        <a routerLink="/" class="brand-link" (click)="closeMobileMenu()" aria-label="SpotBukk Home">
          <img src="/logo.png" alt="SpotBukk" class="brand-logo-img" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a routerLink="/events" routerLinkActive="active" class="nav-link">Events</a>
          <a routerLink="/" fragment="experience" class="nav-link">Experience</a>
          <a routerLink="/" fragment="faq" class="nav-link">FAQ</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" routerLinkActive="active" class="nav-link">
            <span class="pulse-dot"></span>
            Door Scanner
          </a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin" routerLinkActive="active" class="nav-link admin-pill">
            Admin Portal
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="header-actions">
          <!-- Unauthenticated: Sign In button -->
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" class="nav-link signin-btn">
            Sign In
          </a>

          <!-- Authenticated User Profile Pill & Sign Out -->
          <div *ngIf="authService.isAuthenticated()" class="user-profile-menu">
            <span class="user-tag" [class.admin]="authService.isAdmin()">
              <span class="role-icon">{{ authService.isAdmin() ? '🛡️' : '👤' }}</span>
              <span class="user-name">{{ authService.currentUser()?.name || authService.currentUser()?.fullName }}</span>
              <span class="user-role-badge">{{ authService.currentUser()?.role }}</span>
            </span>
            <button
              type="button"
              class="sign-out-btn"
              (click)="authService.logout()"
              title="Sign Out"
              aria-label="Sign Out"
            >
              Sign Out
            </button>
          </div>

          <!-- Primary CTA -->
          <a routerLink="/events" class="btn btn-primary btn-sm cta-desktop">
            Explore Events
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="mobile-toggle"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen"
            aria-label="Toggle Navigation"
          >
            <span class="bar" [class.open]="mobileMenuOpen"></span>
            <span class="bar" [class.open]="mobileMenuOpen"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen">
        <div class="mobile-drawer-brand">
          <img src="/logo.png" alt="SpotBukk" class="drawer-logo-img" />
        </div>
        <div class="mobile-nav-links">
          <a routerLink="/" (click)="closeMobileMenu()" class="mobile-link">Home</a>
          <a routerLink="/events" (click)="closeMobileMenu()" class="mobile-link">Discover Events</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" (click)="closeMobileMenu()" class="mobile-link">Door Scanner</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin" (click)="closeMobileMenu()" class="mobile-link admin-highlight">Admin Dashboard</a>
          
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" (click)="closeMobileMenu()" class="mobile-link signin-highlight">
            Sign In
          </a>
        </div>

        <div class="mobile-drawer-bottom">
          <div *ngIf="authService.isAuthenticated()" class="mobile-user-card">
            <div class="user-meta">
              <span class="user-title">{{ authService.currentUser()?.name || authService.currentUser()?.fullName }}</span>
              <span class="user-sub">{{ authService.currentUser()?.email || authService.currentUser()?.phone }}</span>
              <span class="user-role-badge" [class.admin]="authService.isAdmin()">{{ authService.currentUser()?.role }}</span>
            </div>
            <button class="btn btn-subtle w-full" (click)="authService.logout(); closeMobileMenu()">
              Sign Out
            </button>
          </div>

          <a routerLink="/events" (click)="closeMobileMenu()" class="btn btn-primary w-full">
            Explore Events
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-top: none;
      border-left: none;
      border-right: none;
      transition: background-color var(--transition-fast);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .brand-logo-img {
      height: 48px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);

      @media (max-width: 600px) {
        height: 40px;
      }
    }

    .mobile-drawer-brand {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
    }

    .drawer-logo-img {
      height: 46px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 28px;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .nav-link {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: color var(--transition-fast);
      display: inline-flex;
      align-items: center;
      gap: 8px;

      &:hover,
      &.active {
        color: var(--text-primary);
      }
    }

    .admin-pill {
      padding: 4px 12px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      background: var(--bg-surface-subtle);
      font-size: 0.8rem;
      color: var(--text-secondary);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 6px var(--accent);
      animation: pulseDot 2s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .signin-btn {
      padding: 6px 14px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--text-primary);
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent);
        background: var(--accent-subtle);
        color: #ffffff;
      }
    }

    .user-profile-menu {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      color: var(--text-secondary);

      &.admin {
        border-color: rgba(128, 0, 32, 0.4);
        background: rgba(128, 0, 32, 0.15);
        color: #ffb3c1;
      }

      .role-icon {
        font-size: 0.85rem;
      }

      .user-name {
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
      }

      .user-role-badge {
        font-size: 0.68rem;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: var(--radius-xs);
        background: rgba(255, 255, 255, 0.08);
      }
    }

    .sign-out-btn {
      background: none;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.76rem;
      padding: 4px 8px;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.3);
      }
    }

    .mobile-user-card {
      padding: 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 10px;

      .user-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .user-title {
        font-size: 0.94rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .user-sub {
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      .user-role-badge {
        align-self: flex-start;
        margin-top: 4px;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);

        &.admin {
          background: rgba(128, 0, 32, 0.3);
          color: #ffb3c1;
          border: 1px solid rgba(128, 0, 32, 0.45);
        }
      }
    }

    .signin-highlight {
      color: #ff9999 !important;
    }

    .theme-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .theme-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .cta-desktop {
      @media (max-width: 600px) {
        display: none;
      }
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      width: 36px;
      height: 36px;
      padding: 6px;

      @media (max-width: 900px) {
        display: flex;
      }

      .bar {
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        transition: transform var(--transition-fast);

        &.open:nth-child(1) {
          transform: translateY(4px) rotate(45deg);
        }
        &.open:nth-child(2) {
          transform: translateY(-4px) rotate(-45deg);
        }
      }
    }

    .mobile-drawer {
      display: none;

      @media (max-width: 900px) {
        display: block;
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: var(--bg-surface-elevated);
        border-bottom: 1px solid var(--border-medium);
        padding: 24px;
        box-shadow: var(--shadow-drawer);
        transform: translateY(-120%);
        transition: transform var(--transition-normal);
        z-index: 999;

        &.open {
          transform: translateY(0);
        }
      }
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .mobile-link {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      padding: 8px 0;
      border-bottom: 1px solid var(--border-subtle);

      &.admin-highlight {
        color: var(--accent);
      }
    }

    .mobile-drawer-bottom {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}

```


<a id="frontend-src-app-shared-components-qr-code-qr-code-component-ts"></a>
## `frontend/src/app/shared/components/qr-code/qr-code.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qr-container" [style.width.px]="size" [style.height.px]="size">
      <svg
        [attr.viewBox]="'0 0 ' + matrixSize + ' ' + matrixSize"
        class="qr-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Background -->
        <rect width="100%" height="100%" fill="#ffffff" rx="8" />

        <!-- Top-Left Finder Pattern -->
        <rect x="2" y="2" width="7" height="7" fill="#111111" rx="1" />
        <rect x="3" y="3" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="4" y="4" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Top-Right Finder Pattern -->
        <rect x="20" y="2" width="7" height="7" fill="#111111" rx="1" />
        <rect x="21" y="3" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="22" y="4" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Bottom-Left Finder Pattern -->
        <rect x="2" y="20" width="7" height="7" fill="#111111" rx="1" />
        <rect x="3" y="21" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="4" y="22" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Timing Patterns -->
        <g fill="#111111">
          <rect x="10" y="4" width="1" height="1" rx="0.2"/>
          <rect x="12" y="4" width="1" height="1" rx="0.2"/>
          <rect x="14" y="4" width="1" height="1" rx="0.2"/>
          <rect x="16" y="4" width="1" height="1" rx="0.2"/>
          <rect x="18" y="4" width="1" height="1" rx="0.2"/>

          <rect x="4" y="10" width="1" height="1" rx="0.2"/>
          <rect x="4" y="12" width="1" height="1" rx="0.2"/>
          <rect x="4" y="14" width="1" height="1" rx="0.2"/>
          <rect x="4" y="16" width="1" height="1" rx="0.2"/>
          <rect x="4" y="18" width="1" height="1" rx="0.2"/>
        </g>

        <!-- Simulated Data Matrix Points based on payload hash -->
        @for (dot of dots(); track $index) {
          <rect
            [attr.x]="dot.x"
            [attr.y]="dot.y"
            width="0.9"
            height="0.9"
            rx="0.2"
            fill="#111111"
          />
        }

        <!-- Central subtle emblem -->
        <circle cx="14.5" cy="14.5" r="2.2" fill="#ffffff" stroke="#111111" stroke-width="0.6" />
        <text
          x="14.5"
          y="15.2"
          text-anchor="middle"
          font-family="'Syne', sans-serif"
          font-size="1.4"
          font-weight="800"
          fill="#111111"
        >N</text>
      </svg>
    </div>
  `,
  styles: [`
    .qr-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    .qr-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class QrCodeComponent {
  @Input() value: string = 'SpotBukk-TICKET-DEMO';
  @Input() size: number = 180;

  readonly matrixSize = 29;

  // Generate pseudo-random deterministic data dots based on payload string
  readonly dots = computed(() => {
    const list: { x: number; y: number }[] = [];
    const text = this.value || 'SpotBukk-PASS';
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
      seed = (seed * 31 + text.charCodeAt(i)) & 0xffffffff;
    }

    const pseudoRandom = (x: number, y: number) => {
      const n = Math.sin(seed + x * 374761393 + y * 668265263) * 43758.5453;
      return n - Math.floor(n);
    };

    for (let y = 1; y < this.matrixSize - 1; y++) {
      for (let x = 1; x < this.matrixSize - 1; x++) {
        // Skip finder areas
        if (
          (x <= 9 && y <= 9) || // Top-left
          (x >= 19 && y <= 9) || // Top-right
          (x <= 9 && y >= 19) || // Bottom-left
          (x >= 12 && x <= 16 && y >= 12 && y <= 16) // Center logo
        ) {
          continue;
        }

        if (pseudoRandom(x, y) > 0.48) {
          list.push({ x, y });
        }
      }
    }

    return list;
  });
}

```


<a id="frontend-src-app-shared-components-theme-switcher-theme-switcher-component-ts"></a>
## `frontend/src/app/shared/components/theme-switcher/theme-switcher.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeId, ThemeOption } from '../../../core/models/theme.model';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-overlay" *ngIf="isOpen" (click)="close()">
      <div class="theme-modal glass-panel" (click)="$event.stopPropagation()">
        <div class="theme-modal-header">
          <div>
            <span class="editorial-kicker">Multi-Theme System</span>
            <h3 class="theme-title">Visual Atmosphere</h3>
          </div>
          <button class="close-btn" (click)="close()" aria-label="Close modal">&times;</button>
        </div>

        <p class="theme-subtitle">
          Select an aesthetic profile designed with muted, atmospheric palettes. No neon. No electric blues.
        </p>

        <div class="theme-grid">
          <div
            *ngFor="let theme of themeService.themes"
            class="theme-card"
            [class.active]="themeService.currentTheme() === theme.id"
            (click)="selectTheme(theme.id)"
          >
            <div class="swatches-bar">
              <span class="swatch" [style.background-color]="theme.palette.bg" title="Background"></span>
              <span class="swatch" [style.background-color]="theme.palette.surface" title="Surface"></span>
              <span class="swatch" [style.background-color]="theme.palette.accent" title="Accent"></span>
              <span class="swatch" [style.background-color]="theme.palette.text" title="Text"></span>
            </div>

            <div class="theme-info">
              <div class="theme-header-row">
                <span class="theme-name">{{ theme.name }}</span>
                <span class="active-badge" *ngIf="themeService.currentTheme() === theme.id">Active</span>
              </div>
              <span class="theme-tagline">{{ theme.tagline }}</span>
            </div>
          </div>
        </div>

        <div class="theme-footer">
          <span>Tokens update dynamically across public site & organizer admin.</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 180ms ease-out;
    }

    .theme-modal {
      width: 100%;
      max-width: 520px;
      border-radius: var(--radius-lg);
      padding: 28px;
      box-shadow: var(--shadow-drawer);
      animation: scaleUp 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .theme-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .theme-title {
      font-size: 1.35rem;
      letter-spacing: -0.01em;
    }

    .close-btn {
      font-size: 1.5rem;
      color: var(--text-muted);
      line-height: 1;
      padding: 4px;

      &:hover {
        color: var(--text-primary);
      }
    }

    .theme-subtitle {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .theme-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .theme-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-strong);
        transform: translateX(4px);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);
      }
    }

    .swatches-bar {
      display: flex;
      gap: 4px;
      padding: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      flex-shrink: 0;
    }

    .swatch {
      width: 16px;
      height: 24px;
      border-radius: 3px;
      display: block;
    }

    .theme-info {
      flex: 1;
    }

    .theme-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }

    .theme-name {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .active-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
    }

    .theme-tagline {
      font-size: 0.78rem;
      color: var(--text-secondary);
      display: block;
    }

    .theme-footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class ThemeSwitcherComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  readonly themeService = inject(ThemeService);

  selectTheme(themeId: ThemeId): void {
    this.themeService.setTheme(themeId);
    this.close();
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}

```


<a id="frontend-src-app-shared-components-toast-toast-component-ts"></a>
## `frontend/src/app/shared/components/toast/toast.component.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-viewport" *ngIf="toastService.toasts().length > 0">
      <div
        *ngFor="let toast of toastService.toasts()"
        class="toast-item"
        [ngClass]="'toast-' + toast.type"
      >
        <div class="toast-accent-line"></div>
        <div class="toast-content">
          <div class="toast-title">{{ toast.title }}</div>
          <div class="toast-desc" *ngIf="toast.message">{{ toast.message }}</div>
        </div>
        <button class="toast-close" (click)="toastService.dismiss(toast.id)" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-viewport {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 380px;
      width: calc(100vw - 32px);
      pointer-events: none;
    }

    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: stretch;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-drawer);
      overflow: hidden;
      animation: slideIn 220ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .toast-accent-line {
      width: 4px;
      background: var(--accent);
      flex-shrink: 0;
    }

    .toast-success .toast-accent-line {
      background: var(--badge-success-text);
    }

    .toast-error .toast-accent-line {
      background: var(--badge-error-text);
    }

    .toast-warning .toast-accent-line {
      background: var(--badge-warning-text);
    }

    .toast-content {
      padding: 12px 16px;
      flex: 1;
    }

    .toast-title {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.02em;
    }

    .toast-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: 3px;
      line-height: 1.4;
    }

    .toast-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      line-height: 1;
      padding: 0 14px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        color: var(--text-primary);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}

```


<a id="frontend-src-environments-environment-ts"></a>
## `frontend/src/environments/environment.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

```


<a id="frontend-src-index-html"></a>
## `frontend/src/index.html`
[↑ Back to Top](#-table-of-contents)

```html
<!doctype html>
<html lang="en" data-theme="Burgundy">

<head>
  <meta charset="utf-8" />
  <title>SpotBukk — Nights Worth Remembering | Curated House Parties & Events</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description"
    content="Discover curated house parties, boutique nightlife, private DJ sessions, and unforgettable social gatherings with SpotBukk." />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="icon" type="image/x-icon" href="favicon.ico" />

  <!-- Google Fonts: Syne (Headings), Plus Jakarta Sans (Body), Cinzel (Serif accents) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@500;600;700;800&display=swap"
    rel="stylesheet">

  <!-- Razorpay Checkout SDK -->
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>

<body>
  <app-root></app-root>
</body>

</html>


```


<a id="frontend-src-main-ts"></a>
## `frontend/src/main.ts`
[↑ Back to Top](#-table-of-contents)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

```


<a id="frontend-src-styles-scss"></a>
## `frontend/src/styles.scss`
[↑ Back to Top](#-table-of-contents)

```scss
/* ===================================================================
   SpotBukk DESIGN SYSTEM & THEME TOKENS
   Aesthetic: Boutique Nightlife / High Hospitality / Editorial
   Strictly NO neon, NO bright cyan/blue, NO excessive glassmorphism.
   =================================================================== */

:root {
  --font-display: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Cinzel', Georgia, serif;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 240ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 350ms cubic-bezier(0.16, 1, 0.3, 1);

  --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.15);
  --shadow-elevated: 0 12px 36px rgba(0, 0, 0, 0.25);
  --shadow-drawer: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* ===================================================================
   THEME: BURGUNDY (Signature)
   Deep charcoal, warm white, muted grey, burgundy accent (#800020)
   =================================================================== */
html[data-theme='Burgundy'],
html[data-theme='midnight'],
html:not([data-theme]) {
  --bg-page: #0b0c0e;
  --bg-surface: #121417;
  --bg-surface-elevated: #1a1d22;
  --bg-surface-subtle: #16181d;
  --bg-input: #15171b;

  --text-primary: #f5f2eb;
  --text-secondary: #b5afa5;
  --text-muted: #7d776f;

  --border-subtle: rgba(245, 242, 235, 0.08);
  --border-medium: rgba(245, 242, 235, 0.15);
  --border-strong: rgba(245, 242, 235, 0.28);

  --accent: #800020;
  --accent-hover: #960026;
  --accent-active: #66001a;
  --accent-subtle: rgba(128, 0, 32, 0.18);
  --accent-text: #ffffff;

  --glass-bg: rgba(18, 20, 23, 0.78);
  --glass-border: rgba(245, 242, 235, 0.1);

  --badge-success-bg: rgba(46, 117, 89, 0.2);
  --badge-success-text: #68c49e;
  --badge-warning-bg: rgba(186, 126, 38, 0.2);
  --badge-warning-text: #e6b268;
  --badge-error-bg: rgba(163, 44, 44, 0.2);
  --badge-error-text: #e87b7b;
}

/* ===================================================================
   THEME 02: CHAMPAGNE
   Warm ivory, sand, dark charcoal, muted gold
   =================================================================== */
html[data-theme='champagne'] {
  --bg-page: #f6f3eb;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #eae4d7;
  --bg-surface-subtle: #f0ebe0;
  --bg-input: #fdfbf7;

  --text-primary: #191816;
  --text-secondary: #5e5a52;
  --text-muted: #8c867c;

  --border-subtle: rgba(25, 24, 22, 0.09);
  --border-medium: rgba(25, 24, 22, 0.18);
  --border-strong: rgba(25, 24, 22, 0.32);

  --accent: #9d7328;
  --accent-hover: #b08230;
  --accent-active: #825f1f;
  --accent-subtle: rgba(157, 115, 40, 0.15);
  --accent-text: #ffffff;

  --glass-bg: rgba(246, 243, 235, 0.86);
  --glass-border: rgba(25, 24, 22, 0.1);

  --badge-success-bg: rgba(38, 115, 75, 0.15);
  --badge-success-text: #226b45;
  --badge-warning-bg: rgba(184, 118, 25, 0.15);
  --badge-warning-text: #965f12;
  --badge-error-bg: rgba(163, 44, 44, 0.15);
  --badge-error-text: #a82727;
}

/* ===================================================================
   THEME 03: WINE
   Deep wine, cream, warm grey, burgundy tones
   =================================================================== */
html[data-theme='wine'] {
  --bg-page: #13060a;
  --bg-surface: #1d0b11;
  --bg-surface-elevated: #281018;
  --bg-surface-subtle: #210d14;
  --bg-input: #1a0a0f;

  --text-primary: #fcf1eb;
  --text-secondary: #c4b0b3;
  --text-muted: #8f797d;

  --border-subtle: rgba(252, 241, 235, 0.08);
  --border-medium: rgba(252, 241, 235, 0.16);
  --border-strong: rgba(252, 241, 235, 0.3);

  --accent: #a52646;
  --accent-hover: #bd2f53;
  --accent-active: #871c36;
  --accent-subtle: rgba(165, 38, 70, 0.2);
  --accent-text: #ffffff;

  --glass-bg: rgba(29, 11, 17, 0.8);
  --glass-border: rgba(252, 241, 235, 0.1);

  --badge-success-bg: rgba(56, 128, 98, 0.2);
  --badge-success-text: #6fd1a7;
  --badge-warning-bg: rgba(199, 137, 47, 0.2);
  --badge-warning-text: #e8b671;
  --badge-error-bg: rgba(184, 45, 65, 0.25);
  --badge-error-text: #f08395;
}

/* ===================================================================
   THEME 04: OLIVE
   Deep olive, warm beige, cream, olive accent
   =================================================================== */
html[data-theme='olive'] {
  --bg-page: #0c120e;
  --bg-surface: #141c16;
  --bg-surface-elevated: #1c2720;
  --bg-surface-subtle: #17211a;
  --bg-input: #121a14;

  --text-primary: #f0ece0;
  --text-secondary: #b6bfb5;
  --text-muted: #79857a;

  --border-subtle: rgba(240, 236, 224, 0.08);
  --border-medium: rgba(240, 236, 224, 0.16);
  --border-strong: rgba(240, 236, 224, 0.28);

  --accent: #5e7d53;
  --accent-hover: #719664;
  --accent-active: #4a6341;
  --accent-subtle: rgba(94, 125, 83, 0.2);
  --accent-text: #ffffff;

  --glass-bg: rgba(20, 28, 22, 0.8);
  --glass-border: rgba(240, 236, 224, 0.1);

  --badge-success-bg: rgba(74, 138, 92, 0.2);
  --badge-success-text: #82cca0;
  --badge-warning-bg: rgba(184, 136, 44, 0.2);
  --badge-warning-text: #e6bf71;
  --badge-error-bg: rgba(168, 52, 52, 0.2);
  --badge-error-text: #eb8181;
}

/* ===================================================================
   THEME 05: MONOCHROME
   Black, crisp white, soft grey, obsidian charcoal
   =================================================================== */
html[data-theme='monochrome'] {
  --bg-page: #0a0a0a;
  --bg-surface: #131313;
  --bg-surface-elevated: #1c1c1c;
  --bg-surface-subtle: #171717;
  --bg-input: #111111;

  --text-primary: #f8f8f8;
  --text-secondary: #a3a3a3;
  --text-muted: #6e6e6e;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.18);
  --border-strong: rgba(255, 255, 255, 0.35);

  --accent: #eaeaea;
  --accent-hover: #ffffff;
  --accent-active: #cccccc;
  --accent-subtle: rgba(255, 255, 255, 0.12);
  --accent-text: #0a0a0a;

  --glass-bg: rgba(19, 19, 19, 0.82);
  --glass-border: rgba(255, 255, 255, 0.12);

  --badge-success-bg: rgba(255, 255, 255, 0.12);
  --badge-success-text: #f0f0f0;
  --badge-warning-bg: rgba(255, 255, 255, 0.08);
  --badge-warning-text: #cccccc;
  --badge-error-bg: rgba(255, 255, 255, 0.15);
  --badge-error-text: #ffffff;
}

/* ===================================================================
   BASE & RESET STYLES
   =================================================================== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  min-height: 100vh;
  transition: background-color var(--transition-normal), color var(--transition-normal);
  overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

a {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-fast);
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

input,
textarea,
select {
  font-family: var(--font-body);
  color: var(--text-primary);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ===================================================================
   UTILITY & COMPONENT CLASSES
   =================================================================== */

.container {
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.container-narrow {
  width: 100%;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Editorial Badge */
.editorial-kicker {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 12px;
}

/* Glassmorphism Panel */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.btn-primary {
    background: var(--accent);
    color: var(--accent-text);
    border: 1px solid transparent;

    &:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
    }

    &:active {
      background: var(--accent-active);
      transform: translateY(0);
    }
  }

  &.btn-outline {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-medium);

    &:hover {
      border-color: var(--text-primary);
      background: var(--bg-surface-subtle);
    }
  }

  &.btn-subtle {
    background: var(--bg-surface-subtle);
    color: var(--text-primary);
    border: 1px solid var(--border-subtle);

    &:hover {
      background: var(--bg-surface-elevated);
      border-color: var(--border-medium);
    }
  }

  &.btn-sm {
    padding: 8px 14px;
    font-size: 0.8rem;
    gap: 6px;
  }

  &.btn-lg {
    padding: 16px 32px;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
  }
}

/* Card base */
.card-base {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), transform var(--transition-fast);

  &:hover {
    border-color: var(--border-medium);
  }
}

/* Status Pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: capitalize;

  &.status-success,
  &.status-published,
  &.status-verified {
    background: var(--badge-success-bg);
    color: var(--badge-success-text);
  }

  &.status-warning,
  &.status-selling-fast,
  &.status-pending {
    background: var(--badge-warning-bg);
    color: var(--badge-warning-text);
  }

  &.status-error,
  &.status-sold-out,
  &.status-failed,
  &.status-invalid {
    background: var(--badge-error-bg);
    color: var(--badge-error-text);
  }

  &.status-subtle,
  &.status-draft {
    background: var(--bg-surface-subtle);
    color: var(--text-secondary);
    border: 1px solid var(--border-subtle);
  }
}

/* Form Inputs */
.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .form-control {
    width: 100%;
    padding: 12px 16px;
    background: var(--bg-input);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 0.92rem;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    &::placeholder {
      color: var(--text-muted);
    }
  }

  .form-hint {
    font-size: 0.76rem;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .form-error {
    font-size: 0.78rem;
    color: var(--badge-error-text);
    margin-top: 6px;
  }
}

/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-page);
}

::-webkit-scrollbar-thumb {
  background: var(--border-medium);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}


```


<a id="frontend-tsconfig-app-json"></a>
## `frontend/tsconfig.app.json`
[↑ Back to Top](#-table-of-contents)

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}

```


<a id="frontend-tsconfig-json"></a>
## `frontend/tsconfig.json`
[↑ Back to Top](#-table-of-contents)

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    }
  ]
}

```


<a id="frontend-tsconfig-spec-json"></a>
## `frontend/tsconfig.spec.json`
[↑ Back to Top](#-table-of-contents)

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.d.ts", "src/**/*.spec.ts"]
}

```


<a id="readme-md"></a>
## `README.md`
[↑ Back to Top](#-table-of-contents)

```markdown
# SpotBukk — Nights Worth Remembering

> **A curated, boutique nightlife, private gathering, and high-hospitality event ticketing and door-clearance platform.**

SpotBukk combines an editorial, high-aesthetic guest experience with an enterprise-grade organizer back-office. From discoverability and multi-tier pass checkout to Razorpay payment verification, cryptographic digital passes, and live camera-based QR door check-in, SpotBukk delivers an end-to-end event management engine.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
  - [Guest Experience (Public Portal)](#1-guest-experience-public-portal)
  - [Organizer & Staff Operations (Admin Portal)](#2-organizer--staff-operations-admin-portal)
  - [Security & Role-Based Access Control](#3-security--role-based-access-control-rbac)
  - [Payment Engine (Razorpay Checkout)](#4-payment-engine-razorpay-checkout)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Configuration & Environment Variables](#-configuration--environment-variables)
- [Default & Test Credentials](#-default--test-credentials)
- [API Reference](#-api-reference)
  - [Authentication](#authentication-endpoints)
  - [Payments](#payment-endpoints)
  - [Door Check-in & Admin](#door-check-in--admin-endpoints)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [Developer Tools & Telemetry](#-developer-tools--telemetry)
- [License](#-license)

---

## 🏛 Overview & Architecture

SpotBukk is engineered with a strict separation of concerns between client presentation, business logic, and security authority:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (ANGULAR 21)                       │
├────────────────────────────────────┬───────────────────────────────────┤
│        Public Guest Portal         │        Admin / Door Portal        │
│  - Event Discovery & Tiers         │  - Real-time Executive Dashboard  │
│  - Guest Registration & Checkout   │  - Live Camera QR Code Scanner    │
│  - Razorpay Web Checkout Modal     │  - Events & Schedule Manager      │
│  - Cryptographic Pass Display      │  - Guest Ledger & Financial Audit │
└─────────────────┬──────────────────┴───────────────────┬───────────────┘
                  │                                      │
                  │ HTTPS / JSON REST API                │ Bearer JWT Token
                  ▼                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER (EXPRESS / NODE)                   │
├────────────────────────────────────────────────────────────────────────┤
│  - JWT Authentication Middleware (`authenticateToken`, `requireAdmin`) │
│  - OTP Dispatch & Verification Engine (SMS & Email rate-limiting)      │
│  - Razorpay SDK Order Creation & HMAC-SHA256 Signature Verification   │
│  - Ticket Verification & Duplicate Check-in Prevention Engine          │
│  - In-Memory Ledger with Mock Registrations Seed                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 1. Guest Experience (Public Portal)
- **Curated Gathering Discovery**: Filter and browse by city (Bengaluru, Mumbai, Goa, Delhi) and category (House Party, Rooftop Sessions, Intimate DJ, Pop-up Experiences).
- **Multi-Tier Ticket Selection**: Real-time pass availability with tiered pricing, tier badges, and perks breakdown.
- **Seamless Registration Flow**: Collect primary attendee contact info, party size, guest names, and special requests.
- **Interactive Checkout**: Support for UPI (Google Pay, PhonePe, Paytm, custom VPA), Cards, and Net Banking.
- **Editorial Digital Pass**: Perforated tear-off pass design with dynamic QR code generation, date/time badges, venue information, and "Save Pass" download capability.

### 2. Organizer & Staff Operations (Admin Portal)
- **Executive Dashboard**: KPI summary cards for upcoming events, tickets sold, door clearance rates, and gross revenue with interactive SVG charts.
- **Live Camera QR Door Scanner**: High-performance browser camera feed using `jsQR` to scan digital passes at venue gates with instant feedback (`Verified`, `Already Used`, `Invalid Ticket`, `Event Mismatch`).
- **Events Calendar & Creator**: Form to draft and publish new gatherings with custom tiers, lineups, guidelines, and capacities.
- **Registrations & Payments Ledger**: Searchable, filterable attendee log with transaction details, payment statuses, and door check-in states.
- **Door Clearance Monitoring**: Real-time gate logging showing exact entry timestamps and admitted parties.

### 3. Security & Role-Based Access Control (RBAC)
- **Strict Server Truth**: Admin roles are never granted from client requests. The server validates administrative credentials and issues signed JWTs.
- **Route Protection**: Angular Route Guards (`adminAuthGuard`, `canActivateChild`) ensure non-admin accounts cannot access `/admin/*` or `/check-in`.
- **API Middleware Guard**: All protected administrative endpoints strictly enforce `authenticateToken` and `requireAdmin`.
- **Multi-Factor Auth Options**:
  - **Google One-Tap / OAuth** (strictly issues `END_USER` role)
  - **Phone OTP** (SMS simulation with 30s rate-limiting & 5-minute expiry)
  - **Email OTP** (Email simulation with 30s rate-limiting & 10-minute expiry)
  - **Admin Password Authentication** (verified against trusted server registry)

### 4. Payment Engine (Razorpay Checkout)
- **Two-Step Verification Architecture**:
  1. Frontend requests an order creation: Backend creates an order via Razorpay SDK with amounts converted to paise (minimum ₹1).
  2. Razorpay Modal renders client-side: Upon completion, client receives `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`.
  3. Server-side HMAC-SHA256 signature verification guarantees transaction authenticity before passes are issued.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Angular 21 (Signals, Computed, Modern Control Flow `@if` / `@for`)
- **Styling**: SCSS + Custom CSS Variable Design System (Burgundy Luxury Palette)
- **Iconography**: Lucide Angular (`lucide-angular`) & Custom SVGs
- **QR Code Scanning**: `jsQR`
- **Routing & State**: Angular Router + In-memory Signals & LocalStorage Cache

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.21
- **Security & Tokens**: `jsonwebtoken` (JWT), `crypto` (HMAC-SHA256)
- **Payments**: `razorpay` official SDK
- **CORS & Environment**: `cors`, `dotenv`

---

## 📁 Repository Structure

```
Spotbukk/
├── backend/                        # Node.js Express Backend Service
│   ├── .env.example                # Sample environment configuration
│   ├── mock-registrations.js       # Seed dataset for demo tickets & attendees
│   ├── package.json                # Backend dependencies & npm scripts
│   └── server.js                   # Main API server, auth, Razorpay & QR verification
├── frontend/                       # Angular 21 Single Page Application
│   ├── angular.json                # Angular workspace configuration
│   ├── package.json                # Frontend dependencies & npm scripts
│   ├── tsconfig.json               # TypeScript compiler configuration
│   └── src/
│       ├── app/
│       │   ├── admin/              # Organizer dashboard, scanner & event management
│       │   │   ├── analytics/      # Gathering performance & demographics
│       │   │   ├── checkins/       # Door clearance log
│       │   │   ├── create-event/   # New gathering publishing wizard
│       │   │   ├── dashboard/      # Executive KPI overview & charts
│       │   │   ├── events/         # Curated events list
│       │   │   ├── layout/         # Admin shell navigation & header
│       │   │   ├── payments/       # Financial ledger & transaction audit
│       │   │   ├── qr-scanner/     # Live camera QR scanner engine
│       │   │   └── registrations/  # Attendee records table
│       │   ├── core/               # Singleton services, guards, and domain models
│       │   │   ├── data/           # Seed mock events & bookings
│       │   │   ├── guards/         # `admin-auth.guard.ts` & `user-auth.guard.ts`
│       │   │   ├── models/         # TypeScript interfaces (Booking, Event, User, Theme)
│       │   │   └── services/       # AuthService, EventService, PaymentService, etc.
│       │   ├── dev/                # Developer debugging & telemetry tools
│       │   │   └── logs/           # Navigation & router event telemetry
│       │   ├── public/             # Public-facing views
│       │   │   ├── checkout/       # Multi-instrument checkout
│       │   │   ├── event-detail/   # Gathering detail & tier selector
│       │   │   ├── events/         # Discover gatherings feed
│       │   │   ├── home/           # Editorial hero & featured showcases
│       │   │   ├── login/          # Auth modal (Google, Phone OTP, Email, Admin)
│       │   │   ├── payment-success/# Confirmation screen
│       │   │   ├── registration/   # Attendee intake form
│       │   │   ├── ticket/         # Digital pass with tear-off & QR code
│       │   │   └── unauthorized/   # 403 Forbidden screen
│       │   └── shared/             # Reusable UI components (header, footer, cards, toasts)
│       ├── environments/           # Environment definitions (API URLs)
│       ├── styles.scss             # Global design tokens, themes & typography
│       └── main.ts                 # Angular application bootstrap
├── Doc/                            # Documentation & brand assets
│   ├── Noctra – Platform Documentation.html
│   ├── Noctra – Server & Architecture Guide.html
│   ├── Content_Collection_Document.docx
│   └── logo.png                    # Brand logos & badges
└── README.md                       # Master project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or v20.x+ (Recommended: LTS)
- **npm**: v9.x or later
- **Angular CLI**: v21.x (`npm install -g @angular/cli`)

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Verify or update `.env` with your Razorpay test credentials and server port:
   ```env
   RAZORPAY_KEY_ID=rzp_test_TkwHgGeuy1OFaE
   RAZORPAY_KEY_SECRET=MBTFaCx0gnbV7aDdpUgBQu6z
   PORT=3000
   CLIENT_URL=http://localhost:4200
   JWT_SECRET=spotbukk_secure_jwt_secret_key_2026
   ADMIN_PASSWORD=SpotBukkAdmin2026!
   ```

5. Launch the backend server:
   ```bash
   npm run dev
   # Server runs at http://localhost:3000
   ```

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   # By default, runs at http://localhost:4300 (or http://localhost:4200 via `ng serve`)
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4300
   ```

---

## ⚙ Configuration & Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | HTTP port on which the Express server listens | `3000` |
| `CLIENT_URL` | Frontend origin allowed by CORS | `http://localhost:4200` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID (Test or Live) | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret (Test or Live) | `...` |
| `JWT_SECRET` | Secret key used to sign session JWTs | `spotbukk_secure_jwt_secret_key_2026` |
| `ADMIN_PASSWORD` | Security password for administrator login | `SpotBukkAdmin2026!` |

### Frontend (`frontend/src/environments/environment.ts`)

| Setting | Description | Value |
| :--- | :--- | :--- |
| `production` | Production mode toggle | `false` |
| `apiUrl` | Target backend REST endpoint base URL | `http://localhost:3000` |

---

## 🔑 Default & Test Credentials

The backend comes pre-configured with test accounts and OTP development logging:

### Administrator Access
- **Email**: `admin@spotbukk.com` or `curator@spotbukk.com`
- **Password**: `SpotBukkAdmin2026!` (or `admin123`)
- **Direct Portal Route**: Navigate to `/login?mode=admin` or click "Curator Clearance" in the login screen.

### End User Access (Attendee)
- **Google Sign-In**: Click "Continue with Google" on the login modal.
- **Phone / Email OTP**: Enter any 10-digit phone number or valid email. In development mode, the server prints the 6-digit generated OTP directly to the **terminal console**:
  ```
  [AUTH SMS SERVICE] Verification code for +919876543210: 481920 (valid for 5 mins)
  ```

---

## 📡 API Reference

### Health Check
- `GET /` — Service status check.

### Authentication Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/google` | Public | Authenticates via Google credential/profile; assigns `END_USER` role. |
| `POST` | `/api/auth/phone/send-otp` | Public | Sends a 6-digit SMS OTP (cooldown: 30s). |
| `POST` | `/api/auth/phone/verify-otp` | Public | Validates SMS OTP; generates signed 24h JWT. |
| `POST` | `/api/auth/email/send-otp` | Public | Sends a 6-digit email OTP (cooldown: 30s). |
| `POST` | `/api/auth/email/verify-otp` | Public | Validates email OTP; generates signed 24h JWT. |
| `POST` | `/api/auth/admin/login` | Public | Verifies admin credentials against server registry; issues `ADMIN` JWT. |
| `POST` | `/api/auth/login` | Public | General login fallback with strict server role enforcement. |
| `GET` | `/api/auth/me` | User / Admin | Verifies Bearer JWT and returns authenticated profile. |
| `POST` | `/api/auth/logout` | User / Admin | Invalidate current session. |

### Payment Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/create-order` | Public | Creates a Razorpay order in paise (`amount`, `currency`, `receipt`). |
| `POST` | `/api/verify-payment` | Public | Verifies HMAC-SHA256 signature (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`). |

### Door Check-in & Admin Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/overview` | Admin Only | Returns total bookings, revenue, and check-in counts. |
| `POST` | `/api/tickets/verify-qr` | Admin Only | Validates QR code payload, checks admission eligibility, and records entry. |
| `POST` | `/api/check-in/verify` | Admin Only | Alias endpoint for door QR ticket verification. |

---

## 🎨 Design System & Aesthetics

SpotBukk adheres to a luxury, boutique nightlife design philosophy:
- **Palette**: Deep charcoal background (`#0b0c0e`), rich burgundy accents (`#800020` / `#8b1d31`), warm ivory typography (`#f5f2eb`), and subtle gold touches.
- **Typography**:
  - **Display**: `Syne`
  - **Body / Interface**: `Plus Jakarta Sans`
  - **Accents & Editorial Titles**: `Cinzel`
- **Aesthetic Guidelines**:
  - No harsh generic blues, reds, or greens.
  - Tactile editorial cards, glassmorphic header ribbons, and realistic perforated ticket borders.
  - Interactive micro-animations for hover states, modal entries, and camera scanner targeting reticles.

---

## 🔬 Developer Tools & Telemetry

SpotBukk includes built-in internal telemetry available in the client application:
- **Route**: Navigate to `/dev/logs`
- **Features**:
  - Live observation of Angular Router event cycles (`NavigationStart`, `RoutesRecognized`, `NavigationEnd`).
  - Page duration timers, memory storage inspection, and error status traps.
  - Export telemetry logs directly as a `.json` file for debugging.

---

## 📄 License

This project is private and proprietary to **SpotBukk**. All rights reserved.

```
