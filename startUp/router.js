const authentication = require('../routes/api/public/authentication');
const recipe = require('../routes/api/public/recipe');
const errorHandler = require('../middlewares/errorHandler');

module.exports = app => {
  app.use('/api/oauth', authentication);
  app.use('/api/recipe', recipe);
  app.use(errorHandler);
}