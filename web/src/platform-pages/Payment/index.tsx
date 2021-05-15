import "./styles.css";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import PaymentInfo from "../../components/PaymentInfo";
import { useModal } from "../../context/ModalProvider";
import ShareAppointmentFormProvider, { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";

const ScheduleAppointment = () => {
  const { paymentMethod } = useModal();
  const history = useHistory();

  return (
    <ShareAppointmentFormProvider>
      <div className="client-platform">
        <SubHeaderPlatform
          title="Pagamento"
          returnFunction={() => history.goBack()}
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
    </ShareAppointmentFormProvider>
  );
};

export default ScheduleAppointment;
