const { date, grade } = require('../../lib/utils');

module.exports = {
  index(req, res) {
    return res.render('teachers/index');
  },
  create(req, res) {
    return res.render('teachers/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    }

    return;
  },
  show(req, res) {
    return;
  },
  edit(req, res) {
    return res.render('teachers/edit');
  },
  put(req, res) {
    return;
  },
  delete(req, res) {
    return;
  }
}