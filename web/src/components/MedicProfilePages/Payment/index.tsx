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
const pagarme = require("pagarme");

const PaymentMedicProfile = ({ previousPage }: NamesProps) => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);
  const { cvvError } = useShareAppointmentForm();
  const [error, setError] = useState("");

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
      setCard(response.data[0]?.card);
      setLoading(false);
    });
  }, [userID, setCard]);

  function handleSubmitAppointment() {
    setLoading(true);
    if (!card?.card_cvv) {
      setError("Campo de CVV vazio");
      setLoading(false);
    } else if (cvvError?.length === null || cvvError?.length > 0) {
      setError("Campo de CVV inválido");
      setLoading(false);
    } else {
      setError("");
      pagarme.client
        .connect({
          api_key: "ak_live_1LTY4ZT4KedK1k68VQRzmVM3znX40e",
        })
        .then((client: any) => client.cards.find({ id: card.id }))
        .then((card: any) => {
          api
            .post("cards", {
              card,
              appointmentData,
            })
            .then(() => {
              setLoading(false);
            });
        });
    }
  }

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title="Pagamento"
        returnFunction={() => previousPage()}
      />
      <div className="container">
        <PaymentInfo card={card} setCard={setCard} error={error} />
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
