import "./styles.css";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import PaymentInfo from "../../../components/PaymentInfo";
import { useModal } from "../../../context/ModalProvider";
import { NamesProps } from "../../Form/Steps/Names";

const PaymentMedicProfile = ({ previousPage }: NamesProps) => {
  const { paymentMethod } = useModal();
  const history = useHistory();

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Pagamento"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo />
        <button
          className="green-button"
          style={{ backgroundColor: "#8F2D56" }}
          onClick={paymentMethod.open}
        >
          Escolher forma de pagamento
        </button>
        <button className="green-button" style={{ marginTop: "-1rem" }}>
          Agendar consulta
        </button>
      </div>
    </div>
  );
};

export default PaymentMedicProfile;
