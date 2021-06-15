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
import { MoipCreditCard, MoipValidator } from "moip-sdk-js";
import JSEncrypt from "node-jsencrypt";
import mask from "../../../utils/mask";

const FinalizePayment = ({ previousPage }) => {
  const [card, setCard] = useState({
    number: "",
    cvc: "",
    expiration: "",
  });

  const pubKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgv+gyND23De2/xrE1HNS
  U0i8mOt2VqA9YHuGsPfbm/hDs/g6s6V3XmufsQnSrjwKn8oA4Y5Y2XD+JU1mNQtT
  2uZFmQKySlMnTouNfdosnaHllqL4vDDem6SxkkLwOXFioC5728AOb/+kyDuZbYrE
  CyDTUSK8g21sNgG7XCKofqndfvjnMxMaPgLvd0dRoE50lBA1awJ95AN3UjQL0CsF
  8KiT5S/T1CQPDJPhuGvcgURgTsdWVqO4E/4XgGg9jnCDhOfhX2Oomwd2ZBmooZSI
  ENQuscrxYikmcA0qaLmsRJnTlHDunpjfUSyVSJCst0IrcB/52/Y6DHNOJlW7cKjb
  WwIDAQAB`;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { appointmentData } = useShareAppointmentForm();
  const [clientID, setClientID] = useState("");
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
  }, [userID, setClientID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [day, month, year] = appointmentData.date.split("/");
    const date = `${month}/${day}/${year}`;

    const isCardCorrect = checkCard();

    if (isCardCorrect) {
      setError("");
      setLoading(true);
      api
        .post(`appointments?clientID=${clientID}`, {
          appointmentData,
        })
        .then((response) => {
          console.log(response);

          if (response.status === 201) {
            MoipCreditCard.setEncrypter(JSEncrypt, "node")
              .setPubKey(pubKey)
              .setCreditCard({
                number: "4012001037141112",
                cvc: "123",
                expirationMonth: "05",
                expirationYear: "22",
              })
              .hash()
              .then((hash) => {
                api
                  .post(
                    `appointments/${response.data.orderID}?clientID=${clientID}medicID=${medicID}`,
                    {
                      date,
                      time: appointmentData.time,
                      hash,
                    }
                  )
                  .then((res) => {
                    if (res.status === 201) {
                      setSuccess(true);
                      setLoading(false);
                    } else {
                      setSuccess(false);
                      setLoading(false);
                    }
                  });
              });
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setError("Cartão de crédito inválido");
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

    if (
      numberIsCorrect &&
      cvcIsCorrect === true &&
      expirationIsCorrect === true
    ) {
      return true;
    } else {
      return false;
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
            <div className="card-div">
              <TextField
                value={card.number}
                placeholder="Número"
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
                  setCard({ ...card, cvc: mask(e.target.value, "###") });
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
                  <span style={{ fontSize: "1.5rem" }}>Data de expiração</span>
                }
              />
            </div>
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
