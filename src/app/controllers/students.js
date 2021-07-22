const { date, grade } = require('../../lib/utils');

const Student = require('../models/Student');

module.exports = {
  index(req, res) {
   let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page,
        }

        return res.render('students/index', { students, filter, pagination });
      }
    }

    Student.paginate(params)
  },
  create(req, res) {
    Student.teachersSelectOptions((options) => {
      return res.render('students/create', { teacherOptions: options });
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Student.post(req.body, (student) => {
      return res.redirect(`/students/${student.id}`);
    });
  },
  show(req, res) {
    Student.show(req.params.id, (student) => {
      if(!student) return res.send('Professor não encontrado!')

      student.birth_date = date(student.birth_date).format
      student.education_level = grade(student.education_level)

      return res.render('students/show', { student })
    })
  },
  edit(req, res) {
    Student.show(req.params.id, (student) => {
    if(!student) return res.send('Professor não encontrado!')

    student.birth_date = date(student.birth_date).iso

    Student.teachersSelectOptions((options) => {
      return res.render('students/edit', { student, teacherOptions: options });
    })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Student.put(req.body, () => {
      return res.redirect(`/students/${req.body.id}`);
    });
  },
  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect(`/students`)
    })
  },
}