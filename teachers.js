const fs = require('fs');
const Intl = require('intl');

const data = require('./data.json');
const { age, graduation } = require('./src/public/js/utils');

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
    if(err) return res.send('Error! Falaha na escrita dos dados!');

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
// PUT

// DELETE