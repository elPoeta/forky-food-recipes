const express = require('express');
const app = express();

const { PORT } = require('./config/keys');

app.listen(PORT, err => {
  if (err) {
    return process.exit(1);
  }
  console.log(`Server listen on port :: ${PORT}`);
});
