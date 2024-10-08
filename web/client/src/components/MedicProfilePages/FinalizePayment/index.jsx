import "./styles.css";
import SubHeaderPlatform from "../../SubHeaderPlatform";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthProvider";
import { TextField } from "@material-ui/core";
import { useShareAppointmentForm } from "../../../context/ShareAppointmentFormProvider";
import Loader from "react-loader-spinner";
import finish from "../../../assets/images/finish.svg";
import { useHistory, useParams } from "react-router-dom";
import { MoipValidator } from "moip-sdk-js";
import mask from "../../../utils/mask";
import validateCPF from "../../../utils/validateCpf";
const pagarme = require("pagarme");

const FinalizePayment = ({ previousPage }) => {
  const [card, setCard] = useState({
    holder_name: "",
    number: "",
    cvc: "",
    expiration: "",
  });

  const [cpf, setCpf] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { appointmentData } = useShareAppointmentForm();
  const [clientID, setClientID] = useState("");
  const [medic_id, setMedic_id] = useState("");
  const { userID } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { medicID } = useParams();

  useEffect(() => {
    setLoading(true);
    api.get(`clients?userID=${userID}`).then((response) => {
      setClientID(response.data[0]?.id);
      setLoading(false);
    });

    api.get(`medics?id=${medicID}`).then((response) => {
      setMedic_id(response.data.id);
    });
    api.get();
  }, [userID, setClientID, medicID, setMedic_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [day, month, year] = appointmentData.date.split("/");
    const date = `${month}/${day}/${year}`;

    const isCardCorrect = checkCard();

    if (isCardCorrect) {
      setError("");
      setLoading(true);

      let card_hash = await pagarme.client
        .connect({
          encryption_key: "ek_test_kABVUutCQIYlU7GHmNVsjotvnTY3bc",
        })
        .then((client) =>
          client.security.encrypt({
            card_number: card.number.replace(" ", ""),
            card_cvv: card.cvc,
            card_expiration_date: card.expiration.replace("/", ""),
            card_holder_name: card.holder_name,
          })
        );

      api
        .post(`appointments?clientID=${clientID}&medicID=${medic_id}`, {
          card: card_hash,
          appointmentData,
          cpf,
          time:
            appointmentData.time.length > 6
              ? appointmentData.time.substring(0, 4)
              : appointmentData.time.substring(0, 5),
          date,
        })
        .then((response) => {
          setLoading(false);
          if (response.status === 201) {
            setSuccess(true);
          }
        })
        .catch((err) => {
          if (err) {
            setSuccess(false);
          }
          setLoading(false);
        });
    } else {
      setError("Dados do cartão ou cpf inválidos!");
    }
  };

  function checkCard() {
    const [month, year] = card.expiration.split("/");

    const numberIsCorrect = MoipValidator.isValidNumber(card.number);
    const cvcIsCorrect = MoipValidator.isSecurityCodeValid(
      card.number,
      card.cvc
    );
    const expirationIsCorrect = MoipValidator.isExpiryDateValid(month, year);
    const isCpfCorrect = checkCpf();

    if (
      numberIsCorrect &&
      cvcIsCorrect === true &&
      expirationIsCorrect === true &&
      isCpfCorrect === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkCpf() {
    const cpfNumbers = cpf.replace(/[-. ]/g, "") ?? "0";
    let errors = {};

    if (!cpfNumbers?.length ?? 0) {
      errors.cpf = "Campo de CPF é necessário";
    } else if (isNaN(parseInt(cpfNumbers))) {
      errors.rg = "Caracteres não aceitos";
    } else if (validateCPF({ cpf: cpfNumbers })) {
      errors.cpf = "CPF inválido";
    }

    if (errors.cpf) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="client-platform">
      {success ? (
        <div className="success-payment">
          <h1>Pagamento concluído!</h1>
          <img src={finish} alt="Pagamento realizado!" />
          <p>
            Coloque em sua agenda a consulta:<br></br>{" "}
            <span className="date-text">{appointmentData.date}</span>
            <span className="time-text">
              {appointmentData.time.length > 6
                ? appointmentData.time.substring(0, 4)
                : appointmentData.time.substring(0, 5)}
            </span>
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
            <>
              <div className="card-div">
                <TextField
                  value={card.number}
                  placeholder="2013013010301310"
                  label={
                    <span style={{ fontSize: "1.5rem" }}>Número do cartão</span>
                  }
                  onChange={(e) => {
                    setCard({ ...card, number: e.target.value });
                  }}
                  style={{ width: "70%" }}
                  variant="outlined"
                />

                <TextField
                  value={card.cvc}
                  placeholder="CVC"
                  onChange={(e) => {
                    setCard({ ...card, cvc: mask(e.target.value, "####") });
                  }}
                  style={{ width: "12%" }}
                  variant="outlined"
                  label={<span style={{ fontSize: "1.5rem" }}>Cvc</span>}
                />

                <TextField
                  value={card.expiration}
                  placeholder="MM/YY"
                  onChange={(e) => {
                    setCard({
                      ...card,
                      expiration: mask(e.target.value, "##/##"),
                    });
                  }}
                  style={{ width: "15%" }}
                  variant="outlined"
                  label={
                    <span style={{ fontSize: "1.5rem" }}>
                      Data de expiração
                    </span>
                  }
                />
              </div>
              <div style={{ marginTop: "1rem" }} className="card-div">
                <TextField
                  value={card.holder_name}
                  placeholder="João Silva..."
                  onChange={(e) => {
                    setCard({ ...card, holder_name: e.target.value });
                  }}
                  style={{ width: "49%" }}
                  variant="outlined"
                  label={
                    <span style={{ fontSize: "1.5rem" }}>Nome completo</span>
                  }
                />
                <TextField
                  value={cpf}
                  placeholder="123.456.789-10"
                  onChange={(e) => {
                    setCpf(mask(e.target.value, "###.###.###-##"));
                  }}
                  style={{ width: "49%" }}
                  variant="outlined"
                  label={<span style={{ fontSize: "1.5rem" }}>CPF</span>}
                />
              </div>
            </>
            {loading ? (
              <div className="spinner-div">
                <Loader
                  type="TailSpin"
                  color="var(--color-button-primary)"
                  height={80}
                  width={80}
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
