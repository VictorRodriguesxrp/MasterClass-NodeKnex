const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3333;


app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

module.exports = app;