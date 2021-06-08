interface MedicConfigureData {
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
}
export default function refreshUserValidate(credentials: MedicConfigureData) {
  let errors = {} as MedicConfigureData;

  if (credentials !== null) {
    if (!credentials?.address?.length ?? 0) {
      errors.address = "Campo de endereço é necessário.";
    }

    if (!credentials?.number?.length ?? 0) {
      errors.number = "Campo de número é necessário";
    }
  }

  return errors;
}
