import React from "react";
import "./styles.css";
import creditCard from "../../assets/images/icons/credit-card.png";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";

const PaymentInfo = () => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();

  return (
    <div className="payment-info">
      <h1>Informações</h1>
      <div className="line-global"></div>
      <h2 className="payment-info-date">Dia 30/12, 12:00 AM</h2>
      <div className="line-global"></div>
      <h1 className="payment-info-doctor-name">Dr(a). Jaison</h1>
      <p className="payment-info-consult-type">Consulta urologia comum</p>
      <div className="line-global"></div>
      <div className="payment-info-flex">
        <h3>Total</h3>
        <p className="payment-info-price">R$ 300,00</p>
      </div>
      <div className="line-global"></div>
      <div className="payment-info-flex">
        <div style={{ display: "flex" }}>
          <img src={creditCard} alt="Cartão de Crédito" />
          <div className="payment-info-card">
            <p>Cartão pelo app</p>
            <span className="payment-info-card-number">Cartão terminado em 4715</span>
          </div>
        </div>
        <button>Trocar</button>
      </div>
    </div>
  );
};

export default PaymentInfo;
