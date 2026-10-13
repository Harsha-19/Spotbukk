'use strict';

function requireEnv(name, options = {}, env = process.env) {
  const value = typeof env[name] === 'string' ? env[name].trim() : '';
  const minLength = Number.isInteger(options.minLength) ? options.minLength : 1;

  if (!value || value.length < minLength || /^REPLACE_WITH_/i.test(value)) {
    throw new Error(
      `Missing or invalid required environment variable: ${name} (minimum length: ${minLength})`
    );
  }

  return value;
}

module.exports = { requireEnv };
