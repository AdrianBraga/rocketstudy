module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1
    };

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
   };
  },
  date: function(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      bithDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
    
  },
  grade: function(education) {
    if(education == '5_ensino_fundamental') {
      return '5° Ano - Ensino Fundamental'
    } else if (education == '6_ensino_fundamental') {
      return '6° Ano - Ensino Fundamental'
    } else if (education == '7_ensino_fundamental') {
      return '7° Ano - Ensino Fundamental'
    } else if (education == '8_ensino_fundamental'){
      return '8° Ano - Ensino Fundamental'
    } else if (education == '9_ensino_fundamental'){
      return '9° Ano - Ensino Fundamental'
    } else if (education == '1_ensino_medio'){
      return '1° Ano - Ensino Médio'
    } else if (education == '2_ensino_medio'){
      return '2° Ano - Ensino Médio'
    } else if (education == '3_ensino_medio'){
      return '3° Ano - Ensino Médio'
    } else {
      return 'Nenhum Ano Escolar Selecionado!';
    }
   },
};