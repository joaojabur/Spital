import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import api from "../../services/api";
import "./styles.css";

export interface AppointmentProps {
  area: string;
  birth_date: string;
  clientID: number;
  cpf: string;
  created_at: string;
  crm: string;
  date: string;
  doctorate_degree: string;
  graduation: string;
  id: number;
  master_degree: string;
  medicID: number;
  phoneNumber: string;
  price: string;
  rg: string;
  scheduleID: number;
  time: string;
  email: string;
  first_name: string;
  last_name: string;
  confirmed: boolean;
  rated: boolean;
  transactionID: string;
  url: string;
}

const ListAppointments = () => {
  const { userID } = useAuth();
  const [clientID, setClientID] = useState("");
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`clients?id=${userID}`).then((response: any) => {
      setClientID(response.data.id);
      setLoading(false);
    });
  }, [userID]);

  useEffect(() => {
    setLoading(true);
    api.get(`appointments/${clientID}`).then((response: any) => {
      setAppointments(response.data);
      setLoading(false);
    });
  }, [clientID, setAppointments]);

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

  if (appointments.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>
          Sem consultas agendadas
        </h1>
      </div>
    );
  }

  return (
    <div className="list-appointments">
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          {appointments.map((appointment: AppointmentProps, index: number) => {
            const [month, day, year] = appointment.date.split("/");
            const dateResult = Number(month) * Number(year) + Number(day);

            const today = new Date();
            const todayString = today.toString();
            const [today_week_day, today_month, today_month_day, today_year] =
              todayString.split(" ");
            const todayNumberMonth = calculateMonth(today_month);
            const today_totalDate =
              Number(today_month_day) + todayNumberMonth * Number(today_year);

            return (
              <Link
                key={index}
                to={`/consultas/${appointment.scheduleID}`}
                className="list-appointments-unique"
              >
                <div className="list-appoints-unique-information">
                  <div className="list-appoints-unique-information-flex">
                    <img
                      src={appointment.url}
                      alt="Avatar"
                      className="list-appoints-unique-information-image"
                    />
                    <div className="list-appoints-unique-information-text">
                      <h2>Consulta Dr(a) {appointment.first_name}</h2>
                      <span>{appointment.area}</span>
                    </div>
                  </div>
                  <div className="list-appoints-unique-status">
                    {dateResult < today_totalDate ? (
                      <div className="list-appoints-unique-status-value">
                        Concluída
                      </div>
                    ) : (
                      <div className="list-appoints-unique-status-value">
                        Ativa
                      </div>
                    )}
                    <p className="list-appoints-unique-status-text">
                      Dia {`${day}/${month}/${year}`}
                    </p>
                  </div>
                </div>
                <footer>
                  <p style={{ marginRight: "2rem" }}>{appointment.time}</p>
                </footer>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListAppointments;
