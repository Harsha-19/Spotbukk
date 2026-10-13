# SpotBukk Phase 0–1: Repository Audit and Security Baseline

## Scope

This change is intentionally limited to the first security foundation. It does not add a database or migrate user/booking data. The current repository uses in-memory user and OTP maps, an in-memory booking list, and local JSON/files for media; these are not durable production persistence.

## Audit snapshot

- Audited default branch: `master`
- Audited base commit: `7892fb99500993a9e9794812f99839ac1420ad8c`
- Backend: Express 4 / CommonJS; existing test script was absent.
- Frontend: Angular 21.
- Database: no production database adapter or schema/migrations found in the audited repository tree.
- Payment: Razorpay SDK is present; payment and booking hardening remain a later phase.

## Changes in this baseline

- `backend/.env.example`: replace credential values with placeholders and document required secrets.
- `backend/config/env.js`: validate required environment values without providing insecure defaults.
- `backend/auth/google-token-verifier.js`: verify Google ID token claims with Google's tokeninfo endpoint, including audience, issuer, expiry, and verified email.
- `frontend/src/app/core/services/auth.service.ts`: stop sending placeholder identity/profile data and require a real Google ID token.
- `backend/server.js`: use required JWT/admin secrets, remove known fallback passwords, and make Google login rely only on verified token claims. The legacy identity-only login route is disabled so a caller cannot mint an authenticated session by submitting an email.
- `backend/tests/security-foundation.test.js` and `backend/package.json`: add Node's built-in test runner coverage for the new security helpers.
- `backend/.gitignore`: ignore local environment variants and common local database artifacts while retaining the example file.

## Required local configuration

Copy `backend/.env.example` to `backend/.env`, then replace placeholders locally. Do not commit `.env`.

Required for startup:
- `JWT_SECRET`: at least 32 random characters.
- `ADMIN_PASSWORD`: a unique, high-entropy password (at least 16 characters).

Required for Google login:
- `GOOGLE_CLIENT_ID`: the exact OAuth client ID used by the Angular Google Identity Services client.
- The frontend must send the Google-issued ID token in `credential`; body-supplied email/name/picture are not trusted.

Staff login must be configured with `STAFF_EMAIL` and `STAFF_PASSWORD`; without them, staff login should fail closed.

Razorpay credentials must be supplied from the deployment secret manager or local ignored `.env`. Never put real values in the example file.

## Test command

From `backend/` run:

```powershell
npm test
```

The tests use Node's built-in `node:test` and mocked Google responses. They do not require live Google or Razorpay credentials. This document does not assert that the tests passed in the developer's local environment.

## Safe migration and rollout

1. Review `git status` locally and preserve any uncommitted work before pulling.
2. Rotate any real credential that was ever committed to a public repository. Replacing a value in the current file does not erase it from Git history.
3. Create a local `.env` from the example and configure the new required secrets before starting the backend.
4. Run `npm ci`, then `npm test`, and start the backend in a non-production environment.
5. Configure the Angular Google client to send the signed ID token as `credential`. Do not restore the old client-asserted identity fallback.
6. Verify the actual admin/staff login flow in a non-production environment. Known fallback passwords must no longer work.
7. Keep existing in-memory data behavior explicitly non-production until the database migration phase has been designed, backed up, rehearsed and validated. Do not attempt an automatic migration from mock data into a production database.
8. Do not enable live payments until durable booking/payment records, Razorpay webhook verification, idempotency and capacity locking are implemented and tested.

## Follow-up work still required

- Replace in-memory users and OTPs with durable storage and a real SMS/email provider.
- Provision admin/staff identities with individual credentials and appropriate password hashing or an identity provider.
- Select PostgreSQL or another explicit database and add versioned migrations.
- Add persistent sessions/revocation, rate limiting, centralized error handling, audit logging and security headers.
- Harden media storage, booking inventory, Razorpay webhooks, and production deployment.


## Compatibility note

This baseline adds JWT issuer/audience validation and removes the legacy identity-only login route. Existing JWTs issued before this change will not pass the new verifier; users will need to sign in again after deployment. Confirm no other API consumer depends on `POST /api/auth/login` before release. The Angular Google Identity Services integration must provide the actual ID token string to `loginWithGoogle(credential)`.
