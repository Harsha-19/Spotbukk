'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { requireEnv } = require('../config/env');
const { verifyGoogleIdToken } = require('../auth/google-token-verifier');

test('requireEnv returns a trimmed value', () => {
  assert.equal(requireEnv('JWT_SECRET', { minLength: 8 }, { JWT_SECRET: '  abcdefgh  ' }), 'abcdefgh');
});

test('requireEnv rejects missing and too-short values', () => {
  assert.throws(() => requireEnv('JWT_SECRET', { minLength: 8 }, {}), /JWT_SECRET/);
  assert.throws(() => requireEnv('JWT_SECRET', { minLength: 8 }, { JWT_SECRET: 'short' }), /JWT_SECRET/);
});

test('Google verifier rejects missing credential and client ID without network access', async () => {
  await assert.rejects(() => verifyGoogleIdToken('', 'client-id', async () => {
    throw new Error('network should not be called');
  }), /ID token is required/);
  await assert.rejects(() => verifyGoogleIdToken('token', '', async () => {
    throw new Error('network should not be called');
  }), /GOOGLE_CLIENT_ID is required/);
});

test('Google verifier accepts verified, correctly-audienced, unexpired claims', async () => {
  const claims = {
    aud: 'spotbukk-client-id',
    iss: 'https://accounts.google.com',
    exp: String(Math.floor(Date.now() / 1000) + 300),
    email_verified: 'true',
    email: 'person@example.com',
    name: 'SpotBukk User',
    picture: 'https://example.com/avatar.png'
  };
  const fakeFetch = async (url, options) => {
    assert.match(url, /^https:\/\/oauth2\.googleapis\.com\/tokeninfo\?/);
    assert.equal(options.method, 'GET');
    return { ok: true, json: async () => claims };
  };

  assert.deepEqual(await verifyGoogleIdToken('signed-id-token', 'spotbukk-client-id', fakeFetch), claims);
});

test('Google verifier rejects wrong audience, invalid issuer, expired and unverified claims', async (t) => {
  const base = {
    aud: 'spotbukk-client-id',
    iss: 'accounts.google.com',
    exp: String(Math.floor(Date.now() / 1000) + 300),
    email_verified: true,
    email: 'person@example.com'
  };
  const cases = [
    [{ ...base, aud: 'other-client' }, /audience/],
    [{ ...base, iss: 'attacker.example' }, /issuer/],
    [{ ...base, exp: String(Math.floor(Date.now() / 1000) - 1) }, /expired/],
    [{ ...base, email_verified: false }, /not verified/]
  ];

  for (const [claims, expectedError] of cases) {
    await t.test(expectedError.source, async () => {
      await assert.rejects(
        () => verifyGoogleIdToken('signed-id-token', 'spotbukk-client-id', async () => ({
          ok: true,
          json: async () => claims
        })),
        expectedError
      );
    });
  }
});

test('Google verifier rejects non-success responses from Google', async () => {
  await assert.rejects(
    () => verifyGoogleIdToken('bad-token', 'spotbukk-client-id', async () => ({ ok: false })),
    /rejected/
  );
});
