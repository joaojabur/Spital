import React, { useState, useEffect } from "react";
import {
  IoSaveOutline,
  IoSaveSharp,
  IoLocationOutline,
  IoStar,
} from "react-icons/io5";
import api from "../../services/api";
import "./styles.css";

interface MedicProfileInfoProps {
  week_day: number;
  id: string | undefined;
}

interface ScheduleItemProps {
  week_day: number | undefined;
  from: number;
  to: number;
}

const MedicProfileInfo: React.FC<MedicProfileInfoProps> = ({
  week_day,
  id,
}) => {
  const [schedule, setSchedule] = useState([]);

  const rating = [1, 1, 1, 1, 1];

  const [isFavorited, setIsFavorited] = useState(false);

  function handleFavoriteMedic() {
    setIsFavorited(!isFavorited);
  }

  useEffect(() => {
    api.get(`medic-schedule/${id}`).then((response) => {
      setSchedule(response.data);
    });
  }, [id]);

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
                    {hours}:{min || "00"} - {hoursTo}:{minTo || "00"}
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
          <p>Rua Capitão de Costa e Silva 611</p>
        </div>
      </div>

      <div className="medic-profile-info-line">
        <div className="line-global"></div>
      </div>

      <div className="medic-profile-info-rating">
        <div className="medic-profile-info-rating-stars">
          {rating.map((star, index) => {
            return <IoStar key={index} color="#FFC107" size={30} />;
          })}
        </div>

        <h2>5.0</h2>

        <div className="medic-profile-info-assessments">Ver avaliações</div>
      </div>
    </div>
  );
};

export default MedicProfileInfo;
