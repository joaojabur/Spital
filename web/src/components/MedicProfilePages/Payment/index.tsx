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

const PaymentMedicProfile = ({ previousPage }: NamesProps) => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);
  const { cvvError } = useShareAppointmentForm();

  const { paymentMethod } = useModal();
  const [card, setCard] = useState<PaymentMethodProps>({
    id: "",
    first_digits: "",
    last_digits: "",
    holder_name: "",
    expiration_date: "",
    card_cvv: "",
  });

  useEffect(() => {
    setLoading(true);
    api.get(`cards?userID=${userID}`).then((response: any) => {
      console.log(response.data[0]);
      setCard(response.data[0].card);
      setLoading(false);
    });
  }, [userID, setCard]);

  function handleSubmitAppointment() {
    console.log({
      card_id: card.id,
      card_number: card.first_digits + card.last_digits,
      amount: Number(appointmentData.price) * 100,
      card_cvv: card.card_cvv,
      card_holder_name: card.holder_name,
      payment_method: "credit_card",
    });
  }

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Pagamento"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo card={card} setCard={setCard} />
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
                paymentMethod.open({ card });
              }}
            >
              Escolher forma de pagamento
            </button>

            <button
              onClick={handleSubmitAppointment}
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
