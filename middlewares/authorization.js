const jwt = require('jsonwebtoken');
const { GOOGLE_SECRET } = require('../config/keys');

module.exports = {
  auth: async (req, res, next) => {
    const bearerToken = req.header('authorization');
    if (!bearerToken) return res.status(401).send('Access denied. No token provided.');

    try {
      if (typeof bearerToken !== 'undefined') {
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        const decoded = jwt.verify(token, GOOGLE_SECRET);

        req.user = decoded;
        await next();
      }
      else {
        res.status(400).send('Invalid token.');
      }

    }
    catch (err) {
      res.status(400).send('Invalid token.');
    }
  }
}
