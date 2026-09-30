// Run: npx tsx tests/validation.test.ts
import assert from 'node:assert/strict';

import { safeRedirect, validateLogin } from '../src/utils/validation';

assert.deepEqual(validateLogin('a@b.co', 'Passw0rdX'), {});
assert.ok(validateLogin(' ', 'Passw0rdX').username);
assert.match(validateLogin('a', 'Pa0').password!, /8 characters/);
assert.match(validateLogin('a', 'Password').password!, /number/);
assert.match(validateLogin('a', 'passw0rd').password!, /uppercase/);
assert.equal(safeRedirect('/portfolio?x=1', '/d'), '/portfolio?x=1');
assert.equal(safeRedirect('//evil.com', '/d'), '/d');
assert.equal(safeRedirect('https://evil.com', '/d'), '/d');
assert.equal(safeRedirect(undefined, '/d'), '/d');
console.log('validation ok');
