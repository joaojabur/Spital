import React, { useEffect, useState } from "react";
import "./styles.css";
import creditCard from "../../assets/images/icons/credit-card.png";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";
import { ParamTypes } from "../../components/MedicProfilePages/Main";
import { useParams } from "react-router";
import api from "../../services/api";
import { PaymentMethodProps } from "../Modals/PaymentMethod";
import { useAuth } from "../../context/AuthProvider";

const PaymentInfo = ({ cards }: PaymentMethodProps) => {
  const { cardInUse } = useAuth();
  const [firstName, setFirstName] = useState("");

  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    api.get(`users?id=${id}`).then((response: any) => {
      setFirstName(response.data.firstName);
    });
  }, []);

  const usedCard = cards.filter((card) => card.card.id === cardInUse);
  console.log(usedCard[0]);

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
              Cartão terminado em {usedCard[0]?.card?.last_digits}
            </span>
          </div>
        </div>
        <button>Trocar</button>
      </div>
    </div>
  );
};

export default PaymentInfo;
