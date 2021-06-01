import "./styles.css";
import SubHeaderPlatform from "../../SubHeaderPlatform";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useShareAppointmentForm } from "../../../context/ShareAppointmentFormProvider";
import Loader from "react-loader-spinner";
import finish from "../../../assets/images/finish.svg";
import { useHistory } from "react-router-dom";

const FinalizePayment = ({ previousPage }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { appointmentData } = useShareAppointmentForm();
  const elements = useElements();
  const stripe = useStripe();
  const { medicID } = useParams();
  const [clientID, setClientID] = useState("");
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api.get(`clients?userID=${userID}`).then((response) => {
      setClientID(response.data[0]?.id);
      setLoading(false);
    });
  }, [userID, setClientID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        setLoading(true);
        const { id } = paymentMethod;
        const [day, month, year] = appointmentData.date.split("/");
        const date = `${month}/${day}/${year}`;
        await api
          .post(`appointments?medicID=${medicID}&clientID=${clientID}`, {
            amount: appointmentData.price * 100,
            id,
            appointmentData,
            date,
          })
          .then((response) => {
            if (response.data.success) {
              console.log("Successful payment!");
              setSuccess(true);
            }
            setLoading(false);
          });
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <div className="client-platform">
      {success ? (
        <div className="success-payment">
          <h1>Pagamento concluído!</h1>
          <img src={finish} alt="Pagamento realizado!" />
          <p>
            Coloque em sua agenda a consulta:<br></br>{" "}
            <span className="date-text">{appointmentData.date}</span>
            <span className="time-text">{appointmentData.time}</span>
          </p>
          <button
            onClick={() => {
              history.replace("/consultas");
            }}
            className="return-button"
          >
            Voltar para a plataforma
          </button>
        </div>
      ) : (
        <>
          <SubHeaderPlatform
            title="Pagamento"
            returnFunction={() => previousPage()}
          />
          <form onSubmit={handleSubmit} className="form-finalize-payment">
            <h1>Insira os dados do cartão</h1>
            <CardElement className="form-finalize-payment-info" />

            {loading ? (
              <div className="spinner-div">
                <Loader
                  type="TailSpin"
                  color="var(--color-button-primary)"
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <button type="submit" className="green-button">
                Agendar consulta
              </button>
            )}
          </form>
          <span style={{ color: "#f00", fontSize: "2rem", fontWeight: "bold" }}>
            {error}
          </span>
        </>
      )}
    </div>
  );
};

export default FinalizePayment;
