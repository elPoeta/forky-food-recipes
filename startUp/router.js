const authentication = require('../routes/api/public/authentication');

module.exports = app => {
  app.use('/api', authentication);
}