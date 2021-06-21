import { RefreshAddress } from "../platform-pages/ConfigurationsAddress";

export default function refreshAddressValidate(credentials: RefreshAddress) {
  let errors = {} as RefreshAddress;

  if (credentials !== null) {
    if (!credentials?.street?.length ?? 0) {
      errors.street = "Campo de endereço é necessário.";
    }

    if (!credentials?.number?.length ?? 0) {
      errors.number = "Campo de número é necessário.";
    }
  }

  return errors;
}
