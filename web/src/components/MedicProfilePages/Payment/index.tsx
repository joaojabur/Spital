import "./styles.css";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import PaymentInfo from "../../../components/PaymentInfo";
import { useModal } from "../../../context/ModalProvider";
import { NamesProps } from "../../Form/Steps/Names";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";
import Loader from "react-loader-spinner";
import { PaymentMethodProps } from "../../Modals/PaymentMethod";
import { useShareAppointmentForm } from "../../../context/ShareAppointmentFormProvider";
import { useParams } from "react-router-dom";
import { ParamTypes } from "../Main";
import StripeCheckout from "react-stripe-checkout";

const PaymentMedicProfile = ({ previousPage }: NamesProps) => {
  const { id } = useParams<ParamTypes>();
  const [clientID, setClientID] = useState("");
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);
  const { appointmentData } = useShareAppointmentForm();
  const [error, setError] = useState("");

  const { paymentMethod } = useModal();
  const [cardInfo, setCardInfo] = useState<PaymentMethodProps>({
    id: "",
    first_digits: "",
    last_digits: "",
    holder_name: "",
    expiration_date: "",
    card_cvv: "",
  });

  useEffect(() => {
    setLoading(true);
    api.get(`clients?userID=${userID}`).then((response: any) => {
      setClientID(response.data[0]?.id);
      setLoading(false);
    });
  }, [userID, setClientID]);

  function handleToken({ token, addresses }: any) {
    console.log(token, addresses);
  }

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Pagamento"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo card={cardInfo} setCard={setCardInfo} error={error} />
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
              onClick={() => {
                api.post("appointments");
              }}
              className="green-button"
              style={{ marginTop: "-1rem" }}
            >
              Agendar consulta
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMedicProfile;
