const express = require('express');
const app = express();

require('./startUp/initDB')();
require('./startUp/parse')(app);

const { PORT } = require('./config/keys');

app.listen(PORT, err => {
  if (err) {
    console.error(`Error to connect server ::  ${err}`);
    process.exit(1);
  }
  console.log(`Server listen on port :: ${PORT}`);
});
