const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

const server = express();

server.use(express.urlencoded({ extended: true }))
server.use(express.static('./src/public'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('./src/views', {
  express: server,
  autoescape: false,
  noCache: false,
  watch: true
});

server.listen(5000, () => {
  console.log('Server is runnig on port 5000')
});