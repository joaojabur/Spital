export interface RefreshConsult {
  type: string;
  price: string;
}

export default function refreshConsultValidate(credentials: RefreshConsult) {
  let errors = {} as RefreshConsult;

  if (credentials !== null) {
    if (!credentials?.type?.length ?? 0) {
      errors.type = "Campo de nome é necessário.";
    }

    if (!credentials?.price?.length ?? 0) {
      errors.price = "Campo de preço é necessário.";
    }
  }

  return errors;
}
