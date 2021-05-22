import React, { useEffect, useState } from "react";
import "./styles.css";
import creditCard from "../../assets/images/icons/credit-card.png";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";
import { ParamTypes } from "../../components/MedicProfilePages/Main";
import { useParams } from "react-router";
import api from "../../services/api";
import { TextField } from "@material-ui/core";
import mask from "../../utils/mask";

const PaymentInfo = ({ card, setCard }: any) => {
  const [firstName, setFirstName] = useState("");

  const { cvvError, setCvvError } = useShareAppointmentForm();
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    api.get(`users?id=${id}`).then((response: any) => {
      setFirstName(response.data.firstName);
    });
  }, [id]);

  return (
    <div className="payment-info">
      <h1>Informações</h1>
      <div className="line-global"></div>
      <h2 className="payment-info-date">
        Dia {appointmentData?.date}, {appointmentData?.time} AM
      </h2>
      <div className="line-global"></div>
      <h1 className="payment-info-doctor-name">Dr(a). {firstName}</h1>
      <p className="payment-info-consult-type">Consulta urologia comum</p>
      <div className="line-global"></div>
      <div className="payment-info-flex">
        <h3>Total</h3>
        <p className="payment-info-price">R$ {appointmentData?.price}</p>
      </div>
      <div className="line-global"></div>
      <div className="payment-info-flex">
        <div style={{ display: "flex" }}>
          <img src={creditCard} alt="Cartão de Crédito" />
          <div className="payment-info-card">
            <p>Cartão pelo app</p>
            <span className="payment-info-card-number">
              Cartão terminado em {card.last_digits}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Insira o código de segurança
        </span>
        <TextField
          style={{
            width: "40%",
          }}
          label={<span style={{ fontSize: "1.5rem" }}>CVV</span>}
          variant="filled"
          onChange={(e) => {
            setCard({ ...card, card_cvv: mask(e.target.value, "###") });
            if (card?.card_cvv?.length === 0) {
              setCvvError("Campo de CVV é necessário para a transação");
            } else if (!(card.card_cvv?.length === 2)) {
              setCvvError("Campo de CVV inválido");
            } else if (isNaN(card.card_cvv)) {
              setCvvError("Campo de CVV só aceita números");
            } else {
              setCvvError("");
            }
          }}
          error={cvvError ? true : false}
          helperText={
            <span style={{ fontSize: "1rem", color: "#f00" }}>{cvvError}</span>
          }
        />
      </div>
    </div>
  );
};

export default PaymentInfo;
