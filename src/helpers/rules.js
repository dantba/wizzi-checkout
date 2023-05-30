const rules = {
  required(value) {
    if (!value) {
      return "Campo obrigatório."
    }
   return true
  },
  somenteLetras(value) {
    const lettersOnlyRegex = /^[A-Za-z]+$/;


  if (lettersOnlyRegex.test(value)) {
    return true
  } else {
    return "Deve conter somente letras."
  }
  },
  email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return true
    } else {
      return "O email é inválido.";
    }
  },
  datasValidas(dataIda, dataVolta) {
    if (!dataIda && !dataVolta) {
      return true;
    }
    return (
      dataVolta >= dataIda ||
      "Opsss. Acho que você não é o Marty McFly. A data de ida deve ser antes da data de volta."
    );
  },
};

export default rules;
