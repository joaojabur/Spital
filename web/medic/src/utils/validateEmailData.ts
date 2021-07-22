interface EmailDataProps {
  pacients: string;
  subject: string;
  state: string;
  city: string;
  age: string;
  type: string;
  date: string;
  porcentage: string;
  message: string;
}

export default function validateEmailData(credentials: EmailDataProps) {
  let errors = {} as EmailDataProps;

  if (credentials) {
    if (credentials.city.length === 0) {
      errors.city = "Campo de cidade é necessário";
    }

    if (credentials.type.length === 0) {
      errors.type = "Campo de tipo é necessário";
    }

    if (credentials.date.length === 0) {
      errors.date = "Campo de data é necessário";
    }

    if (credentials.message.length === 0) {
      errors.message = "Campo de mensagem é necessário";
    }
  }

  return errors;
}
