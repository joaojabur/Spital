import "./styles.css";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import PaymentInfo from "../../../components/PaymentInfo";
import { useModal } from "../../../context/ModalProvider";
import { NamesProps } from "../../Form/Steps/Names";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";
import Loader from "react-loader-spinner";

const PaymentMedicProfile = ({ previousPage }: NamesProps) => {
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);

  const { paymentMethod } = useModal();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get(`cards?userID=${userID}`).then((response: any) => {
      setCards(response.data);
      setLoading(false);
    });
  }, [userID, setCards]);

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Pagamento"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo cards={cards} />
        {loading ? (
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={100}
            width={100}
          />
        ) : (
          <>
            <button
              className="green-button"
              style={{ backgroundColor: "#8F2D56" }}
              onClick={(e) => {
                paymentMethod.open({ cards });
              }}
            >
              Escolher forma de pagamento
            </button>

            <button className="green-button" style={{ marginTop: "-1rem" }}>
              Agendar consulta
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMedicProfile;
