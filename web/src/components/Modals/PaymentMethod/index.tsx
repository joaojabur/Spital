import Overlay from "../Overlay";
import "./styles.css";
import { IoAddCircleOutline, IoCloseOutline } from "react-icons/io5";
import { useModal } from "../../../context/ModalProvider";

export interface CardProps {
  id: string;
  card: {
    last_digits: string;
    valid: boolean;
    holder_name: string;
    id: string;
  };
}

export interface PaymentMethodProps {
  cards: Array<CardProps>;
}

const PaymentMethod = ({ cards }: PaymentMethodProps) => {
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
        {cards.length === 0 ? (
          <span style={{ color: "f00", fontSize: "1.5rem" }}>
            Sem cartões cadastrados
          </span>
        ) : (
          <select className="payment-method-select">
            {cards.map((cardUnique) => {
              return (
                <option key={cardUnique.id}>
                  Cartão terminado em {cardUnique.card.last_digits}
                </option>
              );
            })}
          </select>
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
