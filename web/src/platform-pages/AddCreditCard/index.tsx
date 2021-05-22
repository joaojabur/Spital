import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import "./styles.css";
import mask from "../../utils/mask";
import validateCard from "../../utils/validateCard";
import { useModal } from "../../context/ModalProvider";
import api from "../../services/api";
import { useAuth } from "../../context/AuthProvider";
// ak_test_i0ggSEBPCYYeCVZXIwNoKgcCfGOSht API
const pagarme = require("pagarme");

const AddCreditCard = () => {
  const { spinner, sucesso } = useModal();
  const { userID } = useAuth();
  const [pagarmeError, setPagarmeError] = useState("");
  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    api.get(`cards?userID=${userID}`).then((response: any) => {
      setCards(response.data);
    });
  }, []);

  const history = useHistory();
  const [card, setCard] = useState({
    card_number: "",
    card_holder_name: "",
    card_expiration_date: "",
    card_cvv: "",
    client_id: "",
  });
  const [errors, setErrors] = useState(validateCard(card));
  const [hasError, setHasError] = useState(false);

  function validate() {
    setErrors(validateCard(card));
  }

  const cardValidation = pagarme.validate({ card });

  async function submitHandleFormCard(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setHasError(true);
      setPagarmeError("");
    } else if (cards.length > 0) {
      setPagarmeError("Não é possível cadastrar mais de um cartão");
    } else if (cardValidation.card.card_holder_name === false) {
      setPagarmeError("Nome no cartão inválido");
      setHasError(false);
    } else if (cardValidation.card.card_number === false) {
      setPagarmeError("Número do cartão inválido");
      setHasError(false);
    } else if (cardValidation.card.card_expiration_date === false) {
      setPagarmeError("Data de expiração inválida");
      setHasError(false);
    } else if (cardValidation.card.card_cvv === false) {
      setPagarmeError("CVV inválido");
      setHasError(false);
    } else {
      spinner.open();
      setPagarmeError("");
      setHasError(false);
      //const card_number_without_space = card.card_number.replace(/[ ]/g, "");
      //const card_expiration_date_withou_slash =
      //card.card_expiration_date.replace(/[/]/g, "");

      pagarme.client
        .connect({
          encryption_key: "ek_live_umV8Rv1MmMupcC0lorpGrAYo0j3ifN",
        })
        .then((client: any) => client.security.encrypt(card))
        .then((card_hash: any) => {
          console.log(card_hash);
        });

      sucesso.open({
        name: "Cartão cadastrado com sucesso!",
        close: () => {
          sucesso.close();
        },
        description: "Método de pagamento adicionado.",
      });

      setCards((previousCards: any) => ([
        ...previousCards,
        card,
      ]));
    }
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
      <form
        onSubmit={submitHandleFormCard}
        id="add-credit-card-form"
        className="form-container"
      >
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

        {hasError && (
          <span style={{ marginTop: "2rem", fontSize: "1.5rem" }}>
            Formulário possui erros
          </span>
        )}

        <span style={{ marginTop: "2rem", fontSize: "1.5rem", color: "#f00" }}>
          {pagarmeError}
        </span>

        <button type="submit" className="primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default AddCreditCard;
