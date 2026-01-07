import test from 'node:test';
import assert from 'node:assert/strict';
import { AuthService } from '../src/core/auth/index.js';

test('expired session is invalidated on load', async () => {
  const auth = new AuthService();
  const sessionPath = '.mm-test-session.json';
  const fs = await import('fs/promises');
  await fs.writeFile(sessionPath, JSON.stringify({
    token: 'expired-token',
    tokenExpiration: '2000-01-01T00:00:00Z',
    createdAt: '2000-01-01T00:00:00Z',
    deviceUuid: 'uuid'
  }), { mode: 0o600 });

  const loaded = await auth.loadSession(sessionPath);
  assert.equal(loaded, undefined);
  await fs.rm(sessionPath, { force: true });
});
