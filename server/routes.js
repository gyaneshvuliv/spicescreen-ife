/**
 * Main application routes
 */

'use strict';

const errors = require('./components/errors');
const path = require('path');

module.exports = (app) => {

  // Insert routes below
  app.use('/api/vuscreen', require('./api/vuscreen'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
