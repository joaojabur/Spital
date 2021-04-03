export default function validateMedicInfo(credentials) {
  let errors = {};

  if (credentials.firstName.length === 0) {
    errors.firstName = "Campo de nome é necessário";
  }

  if (credentials.lastName.length === 0) {
    errors.lastName = "Campo de sobrenome é necessário";
  }

  if (credentials.email.length === 0) {
    errors.email = "Campo de e-mail é necessário";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email)
  ) {
    errors.email = "E-mail inválido";
  }

  if (credentials.password.length === 0) {
    errors.password = "Campo de senha é necessário";
  } else if (credentials.password.length < 6) {
    errors.password = "A senha precisa de 6 ou mais caracteres";
  }

  if (credentials.confirmPassword.length === 0) {
    errors.confirmPassword = "Campo de confirmação de senha é necessário";
  } else if (credentials.confirmPassword !== credentials.password) {
    errors.confirmPassword = "As senhas não combinam";
  }

  const phoneNumbers = credentials.phoneNumber.replace(/\s/g, "");

  if (isNaN(phoneNumbers)) {
    errors.phoneNumber = "Número de telefone inválido";
  } else if (phoneNumbers.length === 0) {
    errors.phoneNumber = "Campo de telefone é necessário";
  } else if (phoneNumbers.length <= 8) {
    errors.phoneNumber = "O número de caracteres precisa ser 8 ou mais";
  }

  if (credentials.area.length === 0) {
    errors.area = "Campo de área é necessário";
  }

  if (credentials.graduation.length === 0) {
    errors.graduation = "Campo de graduação é necessário";
  } else if (credentials.graduation.length < 10) {
    errors.graduation = "Campo de graduação com poucos caracteres";
  }

  if (credentials.masterDegree >= 1 && credentials.masterDegree <= 10) {
    errors.masterDegree = "Campo de mestrado com poucos caracteres";
  }

  if (credentials.doctorateDegree >= 1 && credentials.doctorateDegree <= 10) {
    errors.doctorateDegree = "Campo de doutorado com poucos caracteres";
  }

  const cpfNumbers = credentials.cpf.replace(/[-. ]/g, "");

  if (cpfNumbers.length === 0) {
    errors.cpf = "Campo de CPF é necessário";
  } else if (cpfNumbers.length !== 11) {
    errors.cpf = "CPF inválido";
  } else if (isNaN(cpfNumbers)) {
    errors.rg = "Caracteres não aceitos";
  }

  const rgNumbers = credentials.rg.replace(/[-. ]/g, "");

  if (rgNumbers.length === 0) {
    errors.rg = "Campo de RG é necessário";
  } else if (rgNumbers.length !== 9) {
    errors.rg = "RG inválido";
  } else if (isNaN(rgNumbers)) {
    errors.rg = "Caracteres não aceitos";
  }

  if (credentials.birthDate.length === 0) {
    errors.birthDate = "Campo de data de nascimento é necessário";
  }

  return errors;
}
