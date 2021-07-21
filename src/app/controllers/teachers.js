const { graduation, age, date } = require('../../lib/utils');

const Teacher = require('../models/Teacher');

module.exports = {
  index(req, res) {
   let { filter, page, limit } = req.query;

   page = page || 1;
   limit = limit || 1;
   let offset = limit * (page - 1);

   const params = {
     filter,
     page,
     limit,
     offset,
     callback(teacher) {
       const pagination = {
         total: Math.ceil(teacher[0].total / limit),
         page,
       }

       return res.render('teachers/index', { teacher, filter, pagination });
     }
   }

   Teacher.paginate(params)
  },
  create(req, res) {
    return res.render('teachers/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Teacher.post(req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },
  show(req, res) {
    Teacher.show(req.params.id, (teacher) => {
      if(!teacher) return res.send('Professor não encontrado!')

      teacher.birth_date = age(teacher.birth_date)
      teacher.education_level = graduation(teacher.education_level)
      teacher.subjects_taught = teacher.subjects_taught.split(',')
      teacher.created_at = date(teacher.created_at).format

      return res.render('teachers/show', { teacher })
    })
  },
  edit(req, res) {
    Teacher.show(req.params.id, (teacher) => {
    if(!teacher) return res.send('Professor não encontrado!')

    teacher.birth_date = date(teacher.birth_date).iso

    return res.render('teachers/edit', { teacher });
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Teacher.put(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect(`/teachers`)
    })
  }
}