import { useEffect, useState } from "react";
import "./styles.css";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";
import { ParamTypes } from "../../components/MedicProfilePages/Main";
import { useParams } from "react-router";
import api from "../../services/api";
import Loader from "react-loader-spinner";

const PaymentInfo = ({ error }: any) => {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);

  const { appointmentData } = useShareAppointmentForm();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    setLoading(true);
    api.get(`users?id=${id}`).then((response: any) => {
      setFirstName(response.data.firstName);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="payment-info">
      <h1>Informações</h1>
      <div className="line-global"></div>
      <h2 className="payment-info-date">
        Dia {appointmentData?.date}, {appointmentData?.time} AM
      </h2>
      <div className="line-global"></div>
      {loading ? (
        <Loader
          type="TailSpin"
          color="var(--color-button-primary)"
          height={50}
          width={50}
        />
      ) : (
        <h1 className="payment-info-doctor-name">Dr(a). {firstName}</h1>
      )}

      <p className="payment-info-consult-type">Consulta urologia comum</p>
      <div className="line-global"></div>
      <div className="payment-info-flex">
        <h3>Total</h3>
        <p className="payment-info-price">R$ {appointmentData?.price}</p>
      </div>
      <div className="line-global"></div>
      <span
        style={{
          color: "#f00",
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {error}
      </span>
    </div>
  );
};

export default PaymentInfo;
