import React from "react";
import Overlay from "../Overlay";
import "./styles.css";
import { IoAddCircleOutline, IoCloseOutline } from "react-icons/io5";
import { useModal } from "../../../context/ModalProvider";

const PaymentMethod = () => {
  const { paymentMethod } = useModal();
  return (
    <Overlay>
      <div className="payment-method">
        <div onClick={paymentMethod.close} className="close-button">
          <IoCloseOutline size={"4rem"} color="#fff" />
        </div>
        <h1>Formas de pagamento</h1>
        <div className="gray-line"></div>
        <h2>Adicionar cartão</h2>
        <div className="gray-line"></div>
        <div className="payment-method-flex">
          <span>Adicionar cartão de crédito ou débito</span>
          <IoAddCircleOutline size={30} color="#07B3D6" />
        </div>
        <div className="gray-line"></div>
        <div className="payment-method-flex">
          <span>Conta Paypal</span>
          <IoAddCircleOutline size={30} color="#07B3D6" />
        </div>
      </div>
    </Overlay>
  );
};

export default PaymentMethod;
