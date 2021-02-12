const fs = require('fs');
const Intl = require('intl');

const data = require('../../data.json');
const { date, grade } = require('../public/js/utils');

// INDEX
exports.index = function(req, res) {
  return res.render('students/index', { students: data.students })
}

// CREATE
exports.create = function(req, res) {
  return res.render('students/create');
}

// POST
exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  // Validação de dados
  for(key of keys) {
    if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
  }

  // Desestrutura os dados
  let {avatar_url, name, email, date_birth, school_formation, carg_hour} = req.body;

  // Cria data
  date_birth = Date.parse(req.body.date_birth) ;

  // Cria o ID - Temporariamente
  // const id = Number(data.students.length + 1);

  id = 1

  for(let i = 0; i < data.students.length; i++) {
    data.students.map(function(element) {
      if(element.id == id)
      return id = id + 1

      return id
    })
  }

  data.students.push({
    id,
    avatar_url,
    name,
    email,
    date_birth,
    school_formation,
    carg_hour
  });

  // Escreve os dados em um arquivo JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error! Falha na escrita dos dados!');

    return res.redirect('students')
  })
}

// SHOW
exports.show = function(req, res) {
  const { id } = req.params;

  const foundTeachers = data.students.find(function(students) {
    return students.id == id
  });

  if(!foundTeachers) return res.send('Não Há Estudantes Aqui!');

  const student = {
    ...foundTeachers,
    school: grade(foundTeachers.school_formation),
    date_birth: date(foundTeachers.date_birth).bithDay 
  }

  return res.render('students/show', { student })
};

// EDIT
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundTeachers = data.students.find(function(students) {
    return students.id == id
  });

  if(!foundTeachers) return res.send('Não Há Estudantes Aqui!');

  const student = {
    ...foundTeachers,
    birthDate: date(foundTeachers.date_birth)
  }

  return res.render('students/edit', { student })
};

// PUT
exports.put = function(req, res) {
  const { id } = req.body;

  let index = 0;

  const foundTeachers = data.students.find(function(students, foundIndex) {
    if(students.id == id) {
      index = foundIndex
      return true;
    };
  });

  if(!foundTeachers) return res.send('Não Há Professor Aqui!');

  const student = {
    ...foundTeachers,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  };

  data.students[index] = student;
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error! Falha na escrita dos dados!');

    return res.redirect(`students/${id}`)
  });
}

// DELETE
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredTeachers = data.students.filter(function(student) {
    return student.id != id
  });

  data.students = filteredTeachers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Falha Ao Tentar Excluir');

    return res.redirect('/students');
  })
}