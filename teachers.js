const fs = require('fs');
const Intl = require('intl');

const data = require('./data.json');
const { age, graduation, date } = require('./src/public/js/utils');

// POST
exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  // Validação de dados
  for(key of keys) {
    if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
  }

  // Desestrutura os dados
  let {avatar_url, name, date_birth, graduation, type_class, subjects} = req.body;

  // Cria data
  date_birth = Date.parse(req.body.date_birth) ;
  const created_at = Date.now();

  // Cria o ID - Temporariamente
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    date_birth,
    graduation,
    type_class,
    subjects,
    created_at
  });

  // Escreve os dados em um arquivo JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error! Falha na escrita dos dados!');

    return res.redirect('teachers')
  })
}

// SHOW
exports.show = function(req, res) {
  const { id } = req.params;

  const foundTeachers = data.teachers.find(function(teachers) {
    return teachers.id == id
  });

  if(!foundTeachers) return res.send('Não Há Professor Aqui!');

  const teacher = {
    ...foundTeachers,
    age: age(foundTeachers.date_birth),
    subjects: foundTeachers.subjects.split(","),
    graduation: graduation(foundTeachers.graduation),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeachers.created_at)
  }

  return res.render('teachers/show', { teacher })
};

// EDIT
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundTeachers = data.teachers.find(function(teachers) {
    return teachers.id == id
  });

  if(!foundTeachers) return res.send('Não Há Professor Aqui!');

  const teacher = {
    ...foundTeachers,
    birthDate: date(foundTeachers.date_birth)
  }

  return res.render('teachers/edit', { teacher })
};

// PUT
exports.put = function(req, res) {
  const { id } = req.body;

  let index = 0;

  const foundTeachers = data.teachers.find(function(teachers, foundIndex) {
    if(teachers.id == id) {
      index = foundIndex
      return true;
    };
  });

  if(!foundTeachers) return res.send('Não Há Professor Aqui!');

  const teacher = {
    ...foundTeachers,
    ...req.body,
    birth: Date.parse(req.body.birth)
  };

  data.teachers[index] = teacher;
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error! Falha na escrita dos dados!');

    return res.redirect(`teachers/${id}`)
  });
}

// DELETE
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredTeachers = data.teachers.filter(function(teacher) {
    return teacher.id != id
  });

  data.teachers = filteredTeachers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Falha Ao Tentar Excluir');

    return res.redirect('/teachers');
  })
}