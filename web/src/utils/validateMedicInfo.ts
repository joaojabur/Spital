interface Medic {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  area: string;
  graduation: string;
  masterDegree: string;
  doctorateDegree: string;
  cpf: string;
  rg: string;
  birthDate: string;
  schedule: Array<Schedule>;
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

export default function validateMedicInfo(credentials?: Medic) {
  let errors = {} as Medic;

  if (credentials !== null){
    if (!credentials?.firstName?.length ?? 0) {
      errors.firstName = "Campo de nome é necessário";
    }

    if (!credentials?.lastName?.length ?? 0) {
      errors.lastName = "Campo de sobrenome é necessário";
    }

    if (!credentials?.email?.length ?? 0) {
      errors.email = "Campo de e-mail é necessário";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials?.email ?? '')
    ) {
      errors.email = "E-mail inválido";
    }

    if (!credentials?.password?.length ?? 0) {
      errors.password = "Campo de senha é necessário";
    } else if (credentials?.password?.length < 6) {
      errors.password = "A senha precisa de 6 ou mais caracteres";
    }

    if (!credentials?.confirmPassword?.length ?? 0) {
      errors.confirmPassword = "Campo de confirmação de senha é necessário";
    } else if (credentials?.confirmPassword !== credentials?.password) {
      errors.confirmPassword = "As senhas não combinam";
    }

    const phoneNumbers = credentials?.phoneNumber?.replace(/[-.() ]/g, "") ?? '0';
    
    if (isNaN(parseInt(phoneNumbers))) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (phoneNumbers.length !== 11) {
      errors.phoneNumber = "Número de telefone inválido";
    } else if (!phoneNumbers.length ?? 0) {
      errors.phoneNumber = "Campo de telefone é necessário";
    }

    if (!credentials?.area?.length ?? 0) {
      errors.area = "Campo de área é necessário";
    }

    if (!credentials?.graduation?.length ?? 0) {
      errors.graduation = "Campo de graduação é necessário";
    } else if (credentials?.graduation?.length < 10) {
      errors.graduation = "Campo de graduação com poucos caracteres";
    }

    if ((credentials?.masterDegree?.length ?? 0>= 1)
      && (credentials?.masterDegree?.length ?? 0 <= 10)) {
      errors.masterDegree = "Campo de mestrado com poucos caracteres";
    }

    if ((credentials?.doctorateDegree?.length ?? 0 >= 1)
       && (credentials?.doctorateDegree?.length ?? 0<= 10)) {
      errors.doctorateDegree = "Campo de doutorado com poucos caracteres";
    }

    const cpfNumbers = credentials?.cpf?.replace(/[-. ]/g, "") ?? '0';

    if (!cpfNumbers?.length ?? 0) {
      errors.cpf = "Campo de CPF é necessário";
    } else if (cpfNumbers.length !== 11) {
      errors.cpf = "CPF inválido";
    } else if (isNaN(parseInt(cpfNumbers))) {
      errors.rg = "Caracteres não aceitos";
    }

    const rgNumbers = credentials?.rg?.replace(/[-. ]/g, "") ?? '0';

    if (!rgNumbers?.length ?? 0) {
      errors.rg = "Campo de RG é necessário";
    } else if (rgNumbers?.length !== 9) {
      errors.rg = "RG inválido";
    } else if (isNaN(parseInt(rgNumbers))) {
      errors.rg = "Caracteres não aceitos";
    }

    if (!credentials?.birthDate?.length ?? 0) {
      errors.birthDate = "Campo de data de nascimento é necessário";
    }
  }

  console.log(errors);

  return errors;
}
