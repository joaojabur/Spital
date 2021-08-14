import { EditBankAccountProps } from "../platform-pages/ConfigurationsBankAccount";

export default function refreshAddressValidate(
  credentials: EditBankAccountProps
) {
  let errors = {} as EditBankAccountProps;

  if (credentials !== null) {
    if (!credentials?.bank_code?.length ?? 0) {
      errors.bank_code = "Campo de código do banco é necessário.";
    } else if (credentials?.bank_code?.length !== 3) {
      errors.bank_code = "Campo de código do banco inválido.";
    } else if (isNaN(parseInt(credentials?.bank_code))) {
      errors.bank_code = "Campo de código do banco inválido.";
    }

    if (!credentials?.agencia?.length ?? 0) {
      errors.agencia = "Campo de agência é necessário.";
    } else if (isNaN(parseInt(credentials?.agencia))) {
      errors.agencia = "Campo de agência inválido.";
    } else if (credentials?.agencia?.length > 5) {
      errors.agencia = "Campo de agência inválido.";
    }

    if (!credentials?.conta?.length ?? 0) {
      errors.conta = "Campo de conta é necessário.";
    } else if (isNaN(parseInt(credentials?.conta))) {
      errors.conta = "Campo de conta inválido.";
    } else if (credentials?.conta?.length > 12) {
      errors.conta = "Campo de conta inválido.";
    }

    if (!credentials?.conta_dv?.length ?? 0) {
      errors.conta_dv = "Campo de dígito verificador é necessário.";
    } else if (isNaN(parseInt(credentials?.conta_dv))) {
      errors.conta_dv = "Campo de dígito verificador inválido.";
    } else if (credentials?.conta_dv?.length > 2) {
      errors.conta_dv = "Campo de dígito verificador inválido.";
    }
  }

  return errors;
}
