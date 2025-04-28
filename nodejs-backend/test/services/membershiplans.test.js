const assert = require('assert');
const app = require('../../src/app');

describe('\'membershiplans\' service', () => {
  it('registered the service', () => {
    const service = app.service('membershiplans');

    assert.ok(service, 'Registered the service (membershiplans)');
  });
});
