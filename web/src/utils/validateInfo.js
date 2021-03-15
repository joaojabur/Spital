export default function validateInfo(credentials) {
  let errors = {};

  if (credentials.firstName.length === 0) {
    errors.firstName = "Campo de nome é necessário";
  }

  if (!credentials.lastName.trim()) {
    errors.lastName = "Campo de sobrenome é necessário";
  }

  if (!credentials.email) {
    errors.email = "Campo de e-mail é necessário";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email)
  ) {
    errors.email = "E-mail inválido";
  }

  if (!credentials.password) {
    errors.password = "Campo de senha é necessário";
  } else if (credentials.password.length < 6) {
    errors.password = "A senha precisa de 6 ou mais caracteres";
  }

  if (!credentials.confirmPassword) {
    errors.confirmPassword = "Campo de confirmação de senha é necessário";
  } else if (credentials.confirmPassword !== credentials.password) {
    errors.confirmPassword = "As senhas não combinam";
  }

  if (isNaN(credentials.phoneNumber)) {
    errors.phoneNumber = "Número de telefone inválido";
  } else if (
    credentials.phoneNumber.length < 8 &&
    credentials.phoneNumber >= 1
  ) {
    errors.phoneNumber = "O número de caracteres precisa ser 8 ou mais";
  }

  return errors;
}
