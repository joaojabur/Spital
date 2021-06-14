interface Card {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
  client_id: string;
}

export default function validateCard(credentials: Card) {
  let errors = {} as Card;

  const card_number_formatted = credentials?.card_number?.replace(/[ ]/g, "");

  if (!card_number_formatted.length ?? 0) {
    errors.card_number = "Campo de número do cartão é necessário";
  } else if (isNaN(parseInt(card_number_formatted))) {
    errors.card_number = "Número do cartão inválido";
  } else if (!((card_number_formatted?.length ?? 0) === 16)) {
    errors.card_number = "Campo de número de cartão inválido";
  }

  const card_expiration_date_formatted =
    credentials?.card_expiration_date?.replace(/[/]/g, "");

  if (!card_expiration_date_formatted.length ?? 0) {
    errors.card_expiration_date = "Campo de data de validade é necessário";
  } else if (isNaN(parseInt(card_expiration_date_formatted))) {
    errors.card_expiration_date = "Data de validade é composta por números";
  } else if (!((card_expiration_date_formatted?.length ?? 0) === 4)) {
    errors.card_number = "Campo de número de cartão inválido";
  }

  if (isNaN(parseInt(credentials?.card_cvv))) {
    errors.card_cvv = "CVV é composto por números";
  } else if (!credentials?.card_cvv.length ?? 0) {
    errors.card_cvv = "Campo de CVV é necessário";
  } else if (!((credentials?.card_cvv?.length ?? 0) === 3)) {
    errors.card_number = "Campo de número de cartão inválido";
  }

  if (!credentials?.card_holder_name.length ?? 0) {
    errors.card_holder_name = "Campo de nome é necessário";
  }

  return errors;
}
