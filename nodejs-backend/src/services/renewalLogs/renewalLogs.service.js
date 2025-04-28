const { RenewalLogs } = require('./renewalLogs.class');
const createModel = require('../../models/renewalLogs.model');
const hooks = require('./renewalLogs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/renewalLogs', new RenewalLogs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('renewalLogs');

  // Get the schema of the collections 
  app.get("/renewalLogsSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};