interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function refreshUserValidate(credentials: User) {
  let errors = {} as User;

  if (credentials !== null) {
    if (!credentials?.fullName?.length ?? 0) {
      errors.fullName = "Campo de nome é necessário";
    }

    if (!credentials?.email) {
      errors.email = "Campo de e-mail é necessário";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials?.email)
    ) {
      errors.email = "E-mail inválido";
    }

    const phoneNumbers = credentials?.phoneNumber?.replace(/[-.() ]/g, "");

    if (isNaN(parseInt(phoneNumbers))) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (phoneNumbers.length !== 11) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (!phoneNumbers.length ?? 0) {
      errors.phoneNumber = "Campo de telefone é necessário";
    }
  }

  return errors;
}
