const authentication = require('../routes/api/public/authentication');
const errorHandler = require('../middlewares/errorHandler');

module.exports = app => {
  app.use('/api', authentication);
  app.use(errorHandler);
}