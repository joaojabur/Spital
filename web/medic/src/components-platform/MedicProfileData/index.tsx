import React, { useState, useEffect } from "react";
import { IoSaveOutline, IoSaveSharp, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import api from "../../services/api";
import Stars from "../Stars";
import "./styles.css";

interface MedicProfileInfoProps {
  week_day: number;
  id: string | undefined;
  medic: MedicProps | null;
}

export interface MedicProps {
  id: string | undefined;
  userID: string;
  area: string;
  birth_date: string;
  cpf: string;
  doctorate_degree: string;
  graduation: string;
  rg: string;
  phoneNumber: string;
  master_degree: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: string;
  location: {
    address: string;
    number: number;
  };
}

interface ScheduleItemProps {
  week_day: number | undefined;
  from: number;
  to: number;
}

const MedicProfileData: React.FC<MedicProfileInfoProps> = ({
  week_day,
  id
}) => {
  const [schedule, setSchedule] = useState([]);

  const { user } = useAuth();

  const [isFavorited, setIsFavorited] = useState(false);

  function handleFavoriteMedic() {
    setIsFavorited(!isFavorited);
  }

  useEffect(() => {
    api.get(`medic-schedule/${user.id}`).then((response) => {
      setSchedule(response.data);
    });
  }, [user.id]);

  const today_week_day = schedule.filter(
    (scheduleItem: ScheduleItemProps) => scheduleItem.week_day === week_day
  );

  return (
    <div className="medic-profile-info">
      <div className="medic-profile-info-time">
        <div className="medic-profile-info-time-today">
          <h3>Horário de trabalho hoje:</h3>
          {today_week_day.length > 0 ? (
            today_week_day.map((string: ScheduleItemProps, index) => {
              const formatedFrom = string.from / 60;
              const formatedTo = string.to / 60;

              const formatedFromString = formatedFrom.toString();
              const [hours, minutes] = formatedFromString.split(".");
              const min = Number(minutes) * 6;

              const formatedToString = formatedTo.toString();
              const [hoursTo, minutesTo] = formatedToString.split(".");
              const minTo = Number(minutesTo) * 6;

              return (
                <span key={index}>
                  <span style={{ color: "#3eb713" }}>
                    {hours}:{isNaN(min) ? "00" : min.toString().substring(0, 2)}{" "}
                    - {hoursTo}:
                    {isNaN(minTo) ? "00" : minTo.toString().substring(0, 2)}
                  </span>
                </span>
              );
            })
          ) : (
            <span style={{ fontSize: "1.5rem" }}>
              Médico descansando hoje 😴
            </span>
          )}
        </div>
        <div
          onClick={handleFavoriteMedic}
          className="medic-profile-info-time-save"
        >
          {isFavorited ? (
            <IoSaveSharp color="#fff" size={30} />
          ) : (
            <IoSaveOutline color="#fff" size={30} />
          )}
        </div>
      </div>

      <div className="medic-profile-info-local">
        <h2>Onde me encontrar?</h2>
        <div className="medic-profile-info-local-data">
          <IoLocationOutline color="#333" size={30} />
          <p>
            {user.location.address} {user.location.number}
          </p>
        </div>
      </div>

      <div className="medic-profile-info-line">
        <div className="line-global"></div>
      </div>

      <Link
        to={`/medicos/${id}/avaliacoes`}
        className="medic-profile-info-rating"
      >
        <div className="medic-profile-info-rating-stars">
          <Stars rating={Number(user.rating ? user.rating : 4)} />
        </div>

        <h2>{Number(user.rating).toFixed(1)}</h2>

        <div className="medic-profile-info-assessments">Ver avaliações</div>
      </Link>
    </div>
  );
};

export default MedicProfileData;
