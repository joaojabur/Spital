import { useEffect, useState } from "react";
import SubHeaderPlatform from "../../SubHeaderPlatform";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import "./styles.css";
import { FaStar } from "react-icons/fa";
import api from "../../../services/api";
import { useParams, useHistory } from "react-router";
import { AppointmentParams } from "../Main";
import { AppointmentProps } from "../../ListAppointments";
import Loader from "react-loader-spinner";
import reviews from "../../../assets/images/reviews.svg";

const AppointmentUniqueReview = ({ previousPage }: any) => {
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { scheduleID } = useParams<AppointmentParams>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api.get(`appointments?scheduleID=${scheduleID}`).then((response: any) => {
      setAppointments(response.data);
      setLoading(false);
    });
  }, [scheduleID, setAppointments]);

  async function handleSubmitReview() {
    setLoading(true);

    api
      .post(
        `reviews?medicID=${appointments[0].medicID}&clientID=${appointments[0].clientID}`,
        {
          stars: rating,
          description: text,
        }
      )
      .then((response: any) => {
        if (response.data.success) {
          setSuccess(true);
        }
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <Loader
        type="TailSpin"
        color="var(--color-button-primary)"
        height={100}
        width={100}
      />
    );
  }

  return (
    <>
      {success ? (
        <div className="success-payment">
          <h1>Consulta avaliada com sucesso!</h1>
          <img src={reviews} alt="Pagamento realizado!" />
          <p>
            Sua avaliação nos ajuda muito a encontrar melhores médicos para
            você!
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
        <div className="client-platform">
          <SubHeaderPlatform
            title="Avalia sua consulta"
            returnFunction={() => {
              previousPage();
            }}
          />
          <div className="container">
            <div className="appointment-unique-review">
              <h1>Avalie sua consulta</h1>
              <div style={{ marginTop: "1rem" }} className="line-gray"></div>
              <h2>O que você achou da consulta?</h2>
              {[...Array(5)].map((star, index: any) => {
                const ratingValue = index + 1;

                return (
                  <label className="star" key={ratingValue}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />

                    <FaStar
                      style={{ transition: "all ease-in-out 0.2s" }}
                      color={ratingValue <= rating! ? "#FFD044" : "#e4e5e9"}
                      size={30}
                    />
                  </label>
                );
              })}
              <p>Escolha de 1 a 5 estrelas para classificar</p>
              <div style={{ marginTop: "1rem" }} className="line-gray"></div>
              <div className="appointment-unique-review-flex">
                <div className="appointment-unique-review-flex-wrap">
                  <IoChatboxEllipsesOutline color="#333" size="3rem" />
                  <h3>Avalie com suas próprias palavras</h3>
                </div>
                <p style={{ letterSpacing: "2px" }}>{text.length}/300</p>
              </div>
              <textarea
                value={text}
                onChange={(e: any) => {
                  if (text.length < 300) {
                    setText(e.target.value);
                  } else {
                    console.log("Já alcançou o limite dos caracteres!");
                  }
                }}
                className="appointment-unique-review-textarea"
              ></textarea>
              <button
                onClick={handleSubmitReview}
                style={{ fontSize: "2.5rem" }}
                className="green-button"
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentUniqueReview;
