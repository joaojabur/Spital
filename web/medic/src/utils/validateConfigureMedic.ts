import { BankData } from "../components-platform/ConfigureMedicPages/BankData";
import { InvoiceAddressProps } from "../components-platform/ConfigureMedicPages/InvoiceAddress";
import convertHourToMinutes from "./convertHourToMinute";
import validateCPF from "./validateCpf";

interface Appointment {
  name: string;
  price: string;
}

interface MedicConfigureData {
  appointments: Array<Appointment>;
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
  bankData: BankData;
  schedule: Array<Schedule>;
  file: File;
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

interface MedicConfigureDataErrors {
  appointments: Array<string>;
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
  bankData: BankData;
  invoiceAddress: InvoiceAddressProps;
  schedule: Array<string>;
  file: string;
}

export default function refreshUserValidate(credentials: MedicConfigureData) {
  let errors = {
    appointments: new Array<string>(),
    schedule: new Array<string>(),
  } as MedicConfigureDataErrors;

  if (credentials !== null) {
    if (!credentials?.schedule?.length ?? 0) {
      if (errors.schedule.length > 0) {
        errors.schedule[0] =
          "Você precisa informar pelo menos um dia da semana.";
      } else {
        errors.schedule.push(
          "Você precisa informar pelo menos um dia da semana."
        );
      }
    } else if (typeof credentials.schedule !== "string") {
      let i = 0;
      for (let appointment of credentials?.schedule) {
        if (appointment.from.length === 0 || appointment.to.length === 0) {
          if (errors?.schedule?.length < i) {
            errors.schedule[i] = "Campo não pode ser vazio";
          } else {
            errors.schedule.push("Campo não pode ser vazio");
          }
        } else {
          const from = convertHourToMinutes(appointment.from);
          const to = convertHourToMinutes(appointment.to);

          if (from > to) {
            if (errors?.schedule?.length < i) {
              errors.schedule[i] = "Carga horária inválida";
            } else {
              errors.schedule.push("Carga horária inválida");
            }
          }
        }
      }
    }

    if (!credentials?.appointments?.length) {
      if (errors.appointments.length > 0) {
        errors.appointments[0] =
          "Você precisa informar pelo menos um dia da semana.";
      } else {
        errors.appointments.push(
          "Você precisa informar pelo menos um dia da semana."
        );
      }
    } else if (typeof credentials.appointments !== "string") {
      let i = 0;
      for (let appointment of credentials?.appointments) {
        if (
          appointment.name.length === 0 ||
          appointment.price.length === 0 ||
          Number(appointment.price) < 0
        ) {
          if (errors?.appointments?.length < i) {
            errors.appointments[i] = "Preço ou nome vazios";
          } else {
            errors.appointments.push("Preço ou nome vazios");
          }
        }
      }
    }

    if (!credentials?.address?.length ?? 0) {
      errors.address = "Campo de endereço é necessário.";
    }

    if (!credentials?.number?.length ?? 0) {
      errors.number = "Campo de número é necessário";
    } else if (isNaN(parseInt(credentials?.number))) {
      errors.number = "Campo de número é inválido";
    }

    // Profile

    if (!credentials?.file){
      errors.file = "Foto de perfil é necessária."
    }
    // Bank Data

    if (!credentials?.bankData?.bankNumber?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.bankNumber = "Campo de número do banco necessário";
    } else if (credentials?.bankData?.bankNumber?.length !== 3) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.bankNumber = "Campo de número do banco inválido";
    } else if (isNaN(parseInt(credentials?.bankData?.bankNumber))) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.bankNumber = "Campo de número do banco inválido";
    }

    if (!credentials?.bankData?.agencyNumber?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.agencyNumber = "Campo de número da agência necessário";
    } else if (isNaN(parseInt(credentials?.bankData?.agencyNumber))) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.agencyNumber = "Campo de número da agência inválido";
    } else if (credentials?.bankData?.agencyNumber?.length > 5) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.agencyNumber = "Campo de número da agência inválido";
    }

    if (!credentials?.bankData?.accountNumber?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.accountNumber = "Campo de número da conta necessário";
    } else if (credentials?.bankData?.accountNumber?.length! > 12) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.accountNumber = "Campo de número da conta inválido";
    } else if (isNaN(parseInt(credentials?.bankData?.accountNumber))) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.accountNumber = "Campo de número da conta inválido";
    }

    if (credentials?.bankData?.accountCheckNumber?.length > 2) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.accountCheckNumber =
        "Campo de dígito verificador da conta necessário";
    }
    if (!credentials?.bankData?.fullName?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.fullName = "Campo de nome é necessário";
    }

    const cpfNumbers = credentials?.bankData?.cpf?.replace(/[-. ]/g, "") ?? "0";

    if (!cpfNumbers?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.cpf = "Campo de CPF é necessário";
    } else if (isNaN(parseInt(cpfNumbers))) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.cpf = "Caracteres não aceitos";
    } else if (validateCPF({ cpf: cpfNumbers })) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.cpf = "CPF inválido";
    }
  }

  return errors;
}
