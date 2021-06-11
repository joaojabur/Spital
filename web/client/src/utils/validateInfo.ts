interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  image: string;
  birthDate: string;
}

export default function validateInfo(credentials: User) {
  let errors = {} as User;

  if (credentials !== null) {
    if (!credentials?.firstName?.length ?? 0) {
      errors.firstName = "Campo de nome é necessário";
    }

    if (!credentials?.lastName?.trim()) {
      errors.lastName = "Campo de sobrenome é necessário";
    }

    if (!credentials?.email) {
      errors.email = "Campo de e-mail é necessário";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials?.email)
    ) {
      errors.email = "E-mail inválido";
    }

    if (!credentials?.password) {
      errors.password = "Campo de senha é necessário";
    } else if (credentials?.password.length < 6) {
      errors.password = "A senha precisa de 6 ou mais caracteres";
    }

    if (!credentials?.confirmPassword) {
      errors.confirmPassword = "Campo de confirmação de senha é necessário";
    } else if (credentials.confirmPassword !== credentials.password) {
      errors.confirmPassword = "As senhas não combinam";
    }

    const phoneNumbers = credentials?.phoneNumber?.replace(/[-.() ]/g, "");

    if (isNaN(parseInt(phoneNumbers))) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (phoneNumbers.length !== 11) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (!phoneNumbers.length ?? 0) {
      errors.phoneNumber = "Campo de telefone é necessário";
    }

    if (!credentials?.birthDate?.length ?? 0) {
      errors.birthDate = "Campo de data de nascimento é necessário";
    } else {
      let year = new Date(credentials?.birthDate).getFullYear();
      let month = new Date(credentials?.birthDate).getMonth() + 1;
      let day = new Date(credentials?.birthDate).getDate();
      if (new Date().getFullYear() - year >= 18) {
        if (new Date().getFullYear() - year === 18) {
          if (new Date().getMonth() + 1 - month >= 0) {
            if (new Date().getDate() - day <= 0) {
              errors.birthDate = "Você precisa ser maior de 18 anos";
            }
          } else {
            errors.birthDate = "Você precisa ser maior de 18 anos";
          }
        }
      } else {
        errors.birthDate = "Você precisa ser maior de 18 anos";
      }
    }
  }

  return errors;
}
