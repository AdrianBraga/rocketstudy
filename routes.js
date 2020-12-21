const express = require('express');
const routes = express.Router();

routes.get('/', function(req, res) {
  return res.send('Funcionando!')
});

module.exports = routes;