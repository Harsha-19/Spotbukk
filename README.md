# SpotBukk — Nights Worth Remembering

> **A curated, boutique nightlife, private gathering, and high-hospitality event ticketing and door-clearance platform.**

SpotBukk combines an editorial, high-aesthetic guest experience with an enterprise-grade organizer back-office. From discoverability and multi-tier pass checkout to Razorpay payment verification, cryptographic digital passes, live camera-based QR door check-in, and staff operational workflows, SpotBukk delivers an end-to-end event management engine.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
  - [Guest Experience (Public Portal)](#1-guest-experience-public-portal)
  - [Top 5 Experiences Slider & 12 Category Verticals](#2-top-5-experiences-slider--12-category-verticals)
  - [Staff Operations Portal](#3-staff-operations-portal)
  - [Organizer Back-Office (Admin Portal)](#4-organizer-back-office-admin-portal)
  - [Security & Role-Based Access Control (RBAC)](#5-security--role-based-access-control-rbac)
  - [Payment Engine (Razorpay Checkout)](#6-payment-engine-razorpay-checkout)
- [Category Architecture & Visual Assets](#-category-architecture--visual-assets)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Configuration & Environment Variables](#-configuration--environment-variables)
- [Default & Test Credentials](#-default--test-credentials)
- [API Reference](#-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Payment Endpoints](#payment-endpoints)
  - [Door Check-in & Admin Endpoints](#door-check-in--admin-endpoints)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [Developer Tools & Telemetry](#-developer-tools--telemetry)
- [License](#-license)

---

## 🏛 Overview & Architecture

SpotBukk is engineered with a strict separation of concerns between client presentation, business logic, and security authority:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (ANGULAR 21)                       │
├───────────────────┬──────────────────────┬─────────────────────────────┤
│ Public Guest      │ Staff Operations     │ Organizer / Door Portal     │
│ - Top 5 Slider    │ - Door Flow Feed     │ - Executive KPI Dashboard   │
│ - 12 Categories   │ - Quick Clearance    │ - Live Camera QR Scanner    │
│ - Category Feeds  │ - Activity Monitor   │ - Event & Tier Publishing   │
│ - Razorpay Modal  │ - Staff Session      │ - Financial Audit Ledger    │
│ - Digital Pass QR │                      │                             │
└───────────────────┴──────────┬───────────┴──────────────┬──────────────┘
                               │                          │
                               │ HTTPS / JSON REST API    │ Bearer JWT Token
                               ▼                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER (EXPRESS / NODE)                   │
├────────────────────────────────────────────────────────────────────────┤
│  - JWT Authentication Middleware (`authenticateToken`, `requireAdmin`) │
│  - OTP Dispatch & Verification Engine (SMS & Email rate-limiting)      │
│  - Staff & Admin Credentials Authorization Engine                      │
│  - Razorpay SDK Order Creation & HMAC-SHA256 Signature Verification   │
│  - Ticket Verification & Duplicate Check-in Prevention Engine          │
│  - In-Memory Ledger with Mock Registrations Seed                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 1. Guest Experience (Public Portal)
- **Curated Gathering Discovery**: Filter and browse by city (Bengaluru, Mumbai, Goa, Delhi) and categories.
- **Multi-Tier Ticket Selection**: Real-time pass availability with tiered pricing, tier badges, and perks breakdown.
- **Seamless Registration Flow**: Collect primary attendee contact info, party size, guest names, and special requests.
- **Interactive Checkout**: Support for UPI (Google Pay, PhonePe, Paytm, custom VPA), Cards, and Net Banking.
- **Editorial Digital Pass**: Perforated tear-off pass design with dynamic QR code generation, date/time badges, venue information, and "Save Pass" download capability.

### 2. Top 5 Experiences Slider & 12 Category Verticals
- **Top 5 Experiences Slider**:
  - Balanced portrait poster showcase on the homepage with high-fidelity visual cards.
  - Complete uncropped poster framing (`460px` width, `4:5` ratio) eliminating harsh black side voids.
  - Interactive flanking `<` / `>` directional controls, pagination indicators, and touch swipe gestures.
  - Direct CTA button linking straight to gathering passes.
- **Explore Experiences Grid**:
  - 12 bespoke nightlife and cultural categories showcased in an editorial grid.
  - Live count pill badges reflecting active gatherings per vertical.
  - Hover zoom transitions and gold accent framing.
- **Dedicated Category Pages (`/events/category/:slug`)**:
  - Full-width hero banner with curated editorial description.
  - Interactive horizontal pill switcher to quickly jump between all 12 categories.
  - Filtered grid displaying all category-specific events with direct ticket checkout access.

### 3. Staff Operations Portal
- **Dedicated Route (`/staff/activity`)**: Streamlined operational interface designed specifically for door stewards and venue staff.
- **Role Guard Protection**: Guarded by `staffAuthGuard` to verify `STAFF` or `ADMIN` JWT claims.
- **Activity Feed & Door Clearance**: Live chronological stream of guest arrivals, gate check-in status, and quick pass verification.
- **Dedicated Backend Login**: Secured endpoint (`/api/auth/staff/login`) issuing 12-hour signed JWT tokens.

### 4. Organizer Back-Office (Admin Portal)
- **Executive Dashboard**: KPI summary cards for upcoming events, tickets sold, door clearance rates, and gross revenue with interactive SVG charts.
- **Live Camera QR Door Scanner**: High-performance browser camera feed using `jsQR` to scan digital passes at venue gates with instant feedback (`Verified`, `Already Used`, `Invalid Ticket`, `Event Mismatch`).
- **Events Calendar & Creator**: Form to draft and publish new gatherings with custom tiers, lineups, guidelines, and capacities.
- **Registrations & Payments Ledger**: Searchable, filterable attendee log with transaction details, payment statuses, and door check-in states.
- **Door Clearance Monitoring**: Real-time gate logging showing exact entry timestamps and admitted parties.

### 5. Security & Role-Based Access Control (RBAC)
- **Strict Server Truth**: Administrative and staff roles are never assigned from client requests. The server validates credentials and issues signed JWTs with explicit role claims (`ADMIN`, `STAFF`, `END_USER`).
- **Route Protection**: Angular Route Guards (`adminAuthGuard`, `staffAuthGuard`) protect management surfaces.
- **API Middleware Guard**: All protected administrative endpoints strictly enforce `authenticateToken` and `requireAdmin`.
- **Multi-Factor Auth Options**:
  - **Google One-Tap / OAuth** (strictly issues `END_USER` role)
  - **Phone OTP** (SMS simulation with 30s rate-limiting & 5-minute expiry)
  - **Email OTP** (Email simulation with 30s rate-limiting & 10-minute expiry)
  - **Staff Password Authentication** (`/api/auth/staff/login`)
  - **Admin Password Authentication** (`/api/auth/admin/login`)

### 6. Payment Engine (Razorpay Checkout)
- **Two-Step Verification Architecture**:
  1. Frontend requests order creation: Backend creates an order via Razorpay SDK with amounts converted to paise (minimum ₹1).
  2. Razorpay Modal renders client-side: Upon completion, client receives `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`.
  3. Server-side HMAC-SHA256 signature verification guarantees transaction authenticity before passes are issued.

---

## 🎭 Category Architecture & Visual Assets

SpotBukk organizes gatherings across 12 distinct lifestyle and nightlife verticals:

| Category Slug | Name | Tagline | Banner Asset |
| :--- | :--- | :--- | :--- |
| `house-party` | House Party | Where strangers become stories | `/banners/house-party.png` |
| `pool-party` | Pool Party | Sun-drenched beats & poolside chills | `/banners/pool-party.png` |
| `open-mic` | Open Mic | Raw talent, unfiltered voices, real moments | `/banners/open-mic.png` |
| `college-fest` | College Fest | The campus comes alive — energy unchained | `/banners/college-fest.png` |
| `high-school` | High School | Youth, beats, and the best nights of your youth | `/banners/high-school.png` |
| `standup-comedy` | Standup Comedy | Laugh till your sides hurt — comedy, live & loud | `/banners/standup-comedy.png` |
| `trips` | Trips | Escape the ordinary — trails, tunes, and journeys | `/banners/trips.png` |
| `dj-nights` | DJ Nights | Bass you feel in your chest — all night long | `/banners/dj-nights.png` |
| `flea-markets` | Flea Markets | Curated finds, thrift gems, artisanal bites | `/banners/flea-markets.png` |
| `gaming-esports` | Gaming & Esports | High stakes, high frames — game on | `/banners/gaming-esports.png` |
| `fitness-wellness` | Fitness & Wellness | Move your body, still your mind, feel alive | `/banners/fitness-wellness.png` |
| `workshops-masterclasses` | Workshops & Masterclasses | Master a craft — cocktails, beats, pottery & beyond | `/banners/workshops-masterclasses.png` |

All high-resolution category artwork is maintained in `frontend/public/banners/` and served as static web assets.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Angular 21 (Signals, Computed, Modern Control Flow `@if` / `@for`, Standalone Components)
- **Styling**: SCSS + Custom CSS Variable Design System (Burgundy Luxury Dark Palette)
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
│   ├── public/                     # Public static assets
│   │   └── banners/                # High-res category posters & artwork
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
│       │   │   ├── data/           # Seed mock events, category events & bookings
│       │   │   │   ├── category-seed.data.ts
│       │   │   │   ├── mock-events.data.ts
│       │   │   │   ├── mock-registrations.data.ts
│       │   │   │   └── staff-seed.data.ts
│       │   │   ├── guards/         # admin-auth, staff-auth & user-auth guards
│       │   │   ├── models/         # TypeScript interfaces (Category, Event, User, Booking)
│       │   │   └── services/       # AuthService, CategoryService, EventService, PaymentService
│       │   ├── dev/                # Developer debugging & telemetry tools
│       │   │   └── logs/           # Navigation & router event telemetry
│       │   ├── public/             # Public-facing guest views
│       │   │   ├── category-events/# Dedicated /events/category/:slug category page
│       │   │   ├── checkout/       # Multi-instrument checkout
│       │   │   ├── event-detail/   # Gathering detail & tier selector
│       │   │   ├── events/         # Discover gatherings feed
│       │   │   ├── home/           # Editorial hero & category showcases
│       │   │   │   ├── explore-experiences/ # 12 category vertical cards
│       │   │   │   └── featured-slider/     # Top 5 experiences poster slider
│       │   │   ├── login/          # Auth modal (Google, Phone OTP, Email, Admin, Staff)
│       │   │   ├── payment-success/# Confirmation screen
│       │   │   ├── registration/   # Attendee intake form
│       │   │   ├── ticket/         # Digital pass with tear-off & QR code
│       │   │   └── unauthorized/   # 403 Forbidden screen
│       │   ├── staff/              # Staff operations portal
│       │   │   ├── activity/       # Door activity log & real-time monitoring
│       │   │   └── layout/         # Staff portal navigation shell
│       │   └── shared/             # Reusable UI components (header, footer, cards, toasts)
│       ├── environments/           # Environment definitions (API URLs)
│       ├── styles.scss             # Global design tokens, themes & typography
│       └── main.ts                 # Angular application bootstrap
├── Doc/                            # Documentation, assets & design references
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

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Verify or update `.env` with your Razorpay test credentials and server port:
   ```env
   RAZORPAY_KEY_ID=rzp_test_TkwHgGeuy1OFaE
   RAZORPAY_KEY_SECRET=MBTFaCx0gnbV7aDdpUgBQu6z
   PORT=3000
   CLIENT_URL=http://localhost:4300
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
   # Runs by default at http://localhost:4300
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
| `PORT` | HTTP port on which Express listens | `3000` |
| `CLIENT_URL` | Frontend origin allowed by CORS | `http://localhost:4300` |
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

### Administrator Access
- **Email**: `admin@spotbukk.com` or `curator@spotbukk.com`
- **Password**: `SpotBukkAdmin2026!` (or `admin123`)
- **Direct Route**: Navigate to `/login?mode=admin` or click "Curator Clearance" in the login screen.

### Venue Staff Access
- **Email**: `staff@spotbukk.com`
- **Password**: `SpotBukkStaff2026!` (or `staff123`)
- **Direct Route**: Navigate to `/staff/activity` (redirects to staff auth modal if unauthenticated).

### End User Access (Attendee)
- **Google Sign-In**: Click "Continue with Google" on the login modal.
- **Phone / Email OTP**: Enter any 10-digit phone number or valid email. In development mode, the server prints the 6-digit OTP directly to the **terminal console**:
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
| `POST` | `/api/auth/staff/login` | Public | Verifies staff credentials against server registry; issues `STAFF` JWT. |
| `POST` | `/api/auth/login` | Public | General login fallback with strict server role enforcement. |
| `GET` | `/api/auth/me` | Authenticated | Verifies Bearer JWT and returns authenticated profile. |
| `POST` | `/api/auth/logout` | Authenticated | Invalidates current session. |

### Payment Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/create-order` | Public | Creates a Razorpay order in paise (`amount`, `currency`, `receipt`). |
| `POST` | `/api/verify-payment` | Public | Verifies HMAC-SHA256 signature (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`). |

### Door Check-in & Admin Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/overview` | Admin Only | Returns total bookings, revenue, and check-in counts. |
| `POST` | `/api/tickets/verify-qr` | Admin / Staff | Validates QR code payload, checks admission eligibility, and records entry. |
| `POST` | `/api/check-in/verify` | Admin / Staff | Alias endpoint for door QR ticket verification. |

---

## 🎨 Design System & Aesthetics

SpotBukk adheres to a luxury, boutique nightlife design philosophy:
- **Palette**: Deep charcoal background (`#0b0c0e`), rich burgundy accents (`#800020` / `#8b1d31`), warm ivory typography (`#f5f2eb`), and subtle gold touches (`#d4af37`).
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
