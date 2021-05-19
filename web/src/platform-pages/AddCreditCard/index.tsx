import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import "./styles.css";
import mask from "../../utils/mask";
import validateCard from "../../utils/validateCard";

interface AddCreditCardProps {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
  client_id: string;
}

const AddCreditCard = () => {
  const history = useHistory();
  const [card, setCard] = useState<AddCreditCardProps>({
    card_number: "",
    card_holder_name: "",
    card_expiration_date: "",
    card_cvv: "",
    client_id: "",
  });
  const [errors, setErrors] = useState(validateCard(card));

  function validate() {
    setErrors(validateCard(card));
  }

  useEffect(() => {
    setErrors(validateCard(card));
  }, [card]);

  return (
    <div className="add-credit-card">
      <SubHeaderPlatform
        title="Cadastrar cartão"
        returnFunction={() => {
          history.replace("/");
        }}
      />
      <form id="add-credit-card-form" className="form-container">
        <h2>Dados do cartão de crédito</h2>
        <div className="line"></div>
        <TextField
          placeholder="1111 2222 3333 4444"
          value={card?.card_number}
          name="card_number"
          label={<span style={{ fontSize: "1.5rem" }}>Número do cartão</span>}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setCard({
              ...card,
              card_number: mask(e.target.value, "#### #### #### ####"),
            });
            validate();
          }}
          autoComplete="off"
          required
          error={errors.card_number ? true : false}
          helperText={
            <span style={{ fontSize: "1.5rem" }}>{errors.card_number}</span>
          }
        />

        <div className="flex-credit-card-form">
          <TextField
            value={card?.card_expiration_date}
            name="card_expiration_date"
            label={<span style={{ fontSize: "1.5rem" }}>Data de validade</span>}
            variant="outlined"
            style={{ width: "49%" }}
            onChange={(e) => {
              setCard({
                ...card,
                card_expiration_date: mask(e.target.value, "##/##"),
              });
              validate();
            }}
            autoComplete="off"
            required
            error={errors.card_expiration_date ? true : false}
            helperText={
              <span style={{ fontSize: "1.5rem" }}>
                {errors.card_expiration_date}
              </span>
            }
          />

          <TextField
            value={card?.card_cvv}
            name="firstName"
            label={<span style={{ fontSize: "1.5rem" }}>CVV</span>}
            variant="outlined"
            style={{ width: "49%" }}
            onChange={(e) => {
              setCard({ ...card, card_cvv: mask(e.target.value, "###") });
              validate();
            }}
            autoComplete="off"
            required
            error={errors.card_cvv ? true : false}
            helperText={
              <span style={{ fontSize: "1.5rem" }}>{errors.card_cvv}</span>
            }
          />
        </div>
        <TextField
          value={card?.card_holder_name}
          name="firstName"
          label={<span style={{ fontSize: "1.5rem" }}>Nome no cartão</span>}
          variant="outlined"
          fullWidth
          style={{ marginTop: "1rem" }}
          onChange={(e) => {
            setCard({ ...card, card_holder_name: e.target.value });
            validate();
          }}
          autoComplete="off"
          required
          error={errors.card_holder_name ? true : false}
          helperText={
            <span style={{ fontSize: "1.5rem" }}>
              {errors.card_holder_name}
            </span>
          }
        />
      </form>
    </div>
  );
};

export default AddCreditCard;
