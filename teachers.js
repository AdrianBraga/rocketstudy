const fs = require('fs');
const data = require('./data.json');

// POST
exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  // Validação de dados
  for(key of keys) {
    if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
  }

  // Desestrutura os dados
  let {avatar_url, name, date_birth, schooling, type_class, subject} = req.body;

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
    schooling,
    type_class,
    subject,
    created_at
  });

  // Escreve os dados em um arquivo JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error! Falaha na escrita dos dados!');

    return res.redirect('teachers')
  })
}
// PUT

// DELETE