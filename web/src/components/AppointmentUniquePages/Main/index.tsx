import { useEffect, useState } from "react";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import "./styles.css";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";
import { AppointmentProps } from "../../../components/ListAppointments";
import check from "../../../assets/images/icons/check.png";
import Loader from "react-loader-spinner";
import wallet from "../../../assets/images/wallet.svg";
import { useModal } from "../../../context/ModalProvider";
import { IoStar } from "react-icons/io5";
import done from "../../../assets/images/icons/done.png";

export interface AppointmentParams {
  scheduleID: string;
}

const AppointmentUniqueMain = ({ previousPage, nextPage }: any) => {
  const { areYouSure } = useModal();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { scheduleID } = useParams<AppointmentParams>();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [success, setSuccess] = useState(false);
  const rating = [1, 2, 3, 4, 5];

  function calculateMonth(month: any) {
    switch (month) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;

      default:
        return 0;
    }
  }

  const today = new Date();
  const todayString = today.toString();
  const [today_week_day, today_month, today_month_day, today_year, today_time] =
    todayString.split(" ");
  let [now_hour, now_minute] = today_time.split(":");

  if (now_minute?.length === 1) {
    now_minute = now_minute + "0";
  }

  const stringNowMinuteHour = now_hour.concat(now_minute);

  const todayNumberMonth = calculateMonth(today_month);

  const now_totalDate =
    Number(today_month_day) * 10000 +
    todayNumberMonth * 100000 * (Number(today_year) * 1000000) +
    Number(stringNowMinuteHour);

  useEffect(() => {
    setLoading(true);
    api.get(`appointments?scheduleID=${scheduleID}`).then((response: any) => {
      setAppointments(response.data);
      setLoading(false);
    });
  }, [scheduleID, setAppointments]);

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
          <h1>Reembolso concluído!</h1>
          <img src={wallet} alt="Carteira" />
          <p>
            A consulta foi cancelada e o dinheiro retornou para sua carteira...
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
            title="Consultas agendadas"
            returnFunction={() => {
              previousPage();
            }}
          />
          <div className="container">
            {appointments.map(
              (appointment: AppointmentProps, index: number) => {
                async function refund() {
                  setLoading(true);
                  api
                    .delete(`appointments/${appointment.payment_intent}`)
                    .then((response: any) => {
                      if (response.data.success) {
                        setSuccess(true);
                        setLoading(false);
                      }
                    });
                }

                const [date, time] = appointment.created_at.split("T");
                const [hours, minutes] = time.split(".")[0].split(":");
                const [year, month, day] = date.split("-");

                const [reais, centavos] = appointment.price.split(",");

                const [dateHour, dateMinute] = appointment.time.split(":");

                const stringHourMinte = dateHour.concat(dateMinute);

                const [monthDate, dayDate, yearDate] =
                  appointment.date.split("/");
                const totalDate =
                  Number(dayDate) * 10000 +
                  Number(monthDate) * 100000 * (Number(year) * 1000000) +
                  Number(stringHourMinte);

                return (
                  <div key={index} className="appointment-unique">
                    <div className="appointment-unique-flex">
                      <div className="medic-info">
                        <img
                          src={`https://avatars.dicebear.com/api/human/${
                            appointment.first_name + appointment.last_name
                          }.svg`}
                          alt="Avatar"
                        />
                        <div className="medic-info-name">
                          <h1>Dr(a). {appointment.first_name}</h1>
                          <p>{appointment.area}</p>
                        </div>
                      </div>
                      <Link
                        className="see-profile"
                        to={`/medicos/${appointment.medicID}`}
                      >
                        Ver perfil
                      </Link>
                    </div>
                    <div className="appointment-unique-date">
                      <p>
                        Consulta às {appointment.time} - {dayDate}/{monthDate}/
                        {yearDate}
                      </p>
                      <div className="appointment-unique-date-created_at">
                        <img src={check} alt="Check" /> Paga às {hours}:
                        {minutes} - {day}/{month}/{year}
                      </div>
                    </div>
                    <div
                      style={{ marginTop: 0 }}
                      className="appointment-unique-date"
                    >
                      <p
                        style={{
                          color: "#333",
                          fontSize: "1.8rem",
                          fontWeight: "bolder",
                        }}
                      >
                        Número da consulta: {appointment.scheduleID}
                      </p>
                      <div className="gray-line"></div>
                      <div className="appointment-unique-date-flex">
                        <div className="appointment-unique-date-flex-column">
                          <div className="appointment-unique-date-flex-quantity">
                            1
                          </div>
                          <p>Consuta {appointment.area.toLowerCase()}</p>
                        </div>
                        <p className="appointment-unique-date-flex-price">
                          R$ {reais},{!centavos ? "00" : { centavos }}
                        </p>
                      </div>
                      <div className="gray-line"></div>
                      <div className="appointment-unique-date-flex">
                        <p>Pago pelo app</p>
                        <p style={{ color: "#07B3D6" }}>Cartão</p>
                      </div>
                      <div className="gray-line"></div>
                      <div className="appointment-unique-location">
                        <p style={{ color: "#818183" }}>Endereço de entrega:</p>
                        <p
                          style={{
                            color: "#333333",
                            fontSize: "1.5rem",
                            marginTop: 0,
                          }}
                        >
                          Rua Capitão Waldemar De Figueiredo, 650 Casa 51 -
                          Royal Park - Ribeirão Preto - SP
                        </p>
                      </div>
                      <div className="gray-line"></div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          marginTop: "2rem",
                        }}
                      >
                        {totalDate < now_totalDate ? (
                          <p
                            onClick={() => {
                              areYouSure.open({
                                close: () => {
                                  areYouSure.close();
                                },
                                message:
                                  "Você tem certeza que deseja cancelar sua consulta?",
                                buttonMessage: "Confirmar",
                                sureFunction: () =>
                                  refund().then(() => {
                                    areYouSure.close();
                                  }),
                              });
                            }}
                            style={{
                              textAlign: "center",
                              fontSize: "2rem",
                              color: "#16697A",
                              cursor: "pointer",
                            }}
                          >
                            Cancelar consulta 😪
                          </p>
                        ) : (
                          <>
                            {appointment.rated ? (
                              <div className="rated-appointment">
                                <img src={done} alt="Avaliação já enviada!" />
                                <h1
                                  style={{
                                    textAlign: "center",
                                    color: "#3EB713",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Avaliação já realizada!
                                </h1>
                              </div>
                            ) : (
                              <div onClick={nextPage} className="review-unique">
                                <h1>Como foi sua consulta?</h1>
                                <div className="review-unique-stars">
                                  {rating.map((index) => {
                                    return (
                                      <IoStar
                                        key={index}
                                        color="#CCCCCC"
                                        size="4rem"
                                      />
                                    );
                                  })}
                                </div>
                                <p>
                                  Escolha de 1 a 5 estrelas para avaliar a
                                  consulta.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentUniqueMain;
