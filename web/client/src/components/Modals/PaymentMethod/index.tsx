import Overlay from "../Overlay";
import "./styles.css";
import { IoAddCircleOutline, IoCloseOutline } from "react-icons/io5";
import { useModal } from "../../../context/ModalProvider";

export interface PaymentMethodProps {
  id: string;
  first_digits: string;
  last_digits: string;
  holder_name: string;
  expiration_date: string;
  card_cvv: string;
}

const PaymentMethod = ({ card }: any) => {
  const { paymentMethod } = useModal();

  return (
    <Overlay>
      <div className="payment-method">
        <div onClick={paymentMethod.close} className="close-button">
          <IoCloseOutline size={"4rem"} color="#fff" />
        </div>
        <h1>Formas de pagamento</h1>
        <div className="gray-line"></div>
        <h2>Cartões cadastrados</h2>
        {!card ? (
          <span style={{ color: "#f00", fontSize: "1.5rem" }}>
            Sem cartões cadastrados
          </span>
        ) : (
          <div style={{ width: "100%" }}>
            <h1>Cartão terminado em: {card?.last_digits}</h1>
          </div>
        )}

        <div className="gray-line"></div>
        <h2>Adicionar cartão</h2>
        <div className="gray-line"></div>
        <a
          href="/cadastrar-cartao"
          target="_blank"
          className="payment-method-flex"
        >
          <span>Adicionar cartão de crédito ou débito</span>
          <IoAddCircleOutline size={30} color="#07B3D6" />
        </a>
        <div className="gray-line"></div>
      </div>
    </Overlay>
  );
};

export default PaymentMethod;
