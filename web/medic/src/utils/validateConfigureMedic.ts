import { BankData } from "../components-platform/ConfigureMedicPages/BankData";
import { InvoiceAddressProps } from "../components-platform/ConfigureMedicPages/InvoiceAddress";
import validateCPF from "./validateCpf";
interface MedicConfigureData {
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
  bankData: BankData;
  invoiceAddress: InvoiceAddressProps;
}

export default function refreshUserValidate(credentials: MedicConfigureData) {
  let errors = {} as MedicConfigureData;

  if (credentials !== null) {
    if (!credentials?.address?.length ?? 0) {
      errors.address = "Campo de endereço é necessário.";
    }

    if (!credentials?.number?.length ?? 0) {
      errors.number = "Campo de número é necessário";
    } else if (isNaN(parseInt(credentials?.number))) {
      errors.number = "Campo de número é inválido";
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

    if (!credentials?.bankData?.birthDate?.length ?? 0) {
      errors.bankData = {
        ...errors.bankData,
      } as BankData;

      errors.bankData.birthDate = "Campo de data de nascimento é necessário";
    }

    // Invoice Address

    if (!credentials?.invoiceAddress?.street?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.street = "Campo de rua necessário";
    }

    if (!credentials?.invoiceAddress?.streetNumber?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.streetNumber = "Campo de número é necessário";
    }

    if (!credentials?.invoiceAddress?.complement?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.complement = "Campo de complemento é necessário";
    }

    if (!credentials?.invoiceAddress?.district?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.district = "Campo de bairro é necessário";
    }

    if (!credentials?.invoiceAddress?.zipCode?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.zipCode = "Campo de CEP é necessário";
    }

    if (!credentials?.invoiceAddress?.city?.length ?? 0) {
      errors.invoiceAddress = {
        ...errors.invoiceAddress,
      } as InvoiceAddressProps;

      errors.invoiceAddress.city = "Campo de cidade é necessário";
    }
  }

  return errors;
}
