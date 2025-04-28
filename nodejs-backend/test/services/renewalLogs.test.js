const assert = require('assert');
const app = require('../../src/app');

describe('\'renewalLogs\' service', () => {
  it('registered the service', () => {
    const service = app.service('renewalLogs');

    assert.ok(service, 'Registered the service (renewalLogs)');
  });
});
