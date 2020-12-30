module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1
    }

    return age;
  },
  graduation: function(education) {
   if(education == 'medio') {
     return 'Ensino Médio Completo'
   } else if (education == 'superior') {
     return 'Ensino Superior Completo'
   } else if (education == 'mestrado') {
     return 'Mestrado'
   } else if (education == 'doutorado'){
     return 'Doutorado'
   } else {
     return 'Sem Grau de Escolaridade Selecionado'
   }
  }
}