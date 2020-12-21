const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

const server = express();

server.use(express.static('./src/public'));
server.use(routes);

server.set(express('view engine', 'njk'));

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: false,
  watch: true
});

server.listen(5000, () => {
  console.log('Server is runnig on port 5000')
});