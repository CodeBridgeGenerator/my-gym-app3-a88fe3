const assert = require('assert');
const app = require('../../src/app');

describe('\'membershipPlans\' service', () => {
  it('registered the service', () => {
    const service = app.service('membershipPlans');

    assert.ok(service, 'Registered the service (membershipPlans)');
  });
});
