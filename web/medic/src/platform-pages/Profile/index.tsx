import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import Box from "../../components/Box";
import {
  ExploreOutlined,
  ListOutlined,
  StraightenOutlined,
  PinDropOutlined
}  from '@material-ui/icons';
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import api from "../../services/api";
import Stars from '../../components/Stars';
interface ScheduleItem {
  week_day: number | undefined;
  from: number;
  to: number;
}

const Profile = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(new Array<ScheduleItem>());
  const date = new Date();
  const dateString = date.toString();
  const week_day = dateString.split(" ")[0];

  if (!user.configured) {
    history.replace("/configurar");
  }

  function getWeekday() {
    switch (week_day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return 0;
    }
  }
  const today_week_day = schedule.filter(
    (scheduleItem: ScheduleItem) => scheduleItem.week_day === getWeekday()
  );

  console.log(user);

  useEffect(() => {
    api.get(`medic-schedule/${user.id}`).then((response) => {
      setSchedule(response.data);
    });
  }, []);

  console.log(schedule)

  return (
    <div className="perfil">
      <HorizontalHeader title="Meu Perfil" />
      <VerticalHeader colorIcon="profile" />
      <div className="content">
        <div>
          <div className="left-side">
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem 1rem 1.25rem'
              }}>
              <img src={`https://avatars.dicebear.com/api/human/${user.firstName + user.lastName}.svg`} alt="Medic Profile"/>
              <h2>Dr. {user.firstName}</h2>
              <span>{user.area}</span>
            </Box>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem'
              }}>
              <div className="appointment-button">
                <span>Agendar Consulta</span>
              </div>
            </Box>
          </div>
          <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <div className="right-side">
              <div className="hour">
                Horário de trabalho hoje:
                {
                  today_week_day.length > 0 ? (
                  today_week_day.map((string: ScheduleItem, index) => {
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
              <h1>Onde Estou?</h1>
              <div className="address">
                <div style={{display: 'flex'}}>
                  <PinDropOutlined fontSize="large"/>
                  {user.location.address}
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}}>
                  <ListOutlined fontSize="large"/>
                </div>
                <div style={{display: 'flex'}}>
                  <StraightenOutlined fontSize="large"/>
                  Lat: {user.location.lat} | Lon: {user.location.lon}
                </div>
                <div style={{display: 'flex', alignItems: 'center', color: "var(--color-main)", cursor: 'pointer'}}>
                  <ExploreOutlined fontSize="large"/>
                  Ver no mapa
                </div>
              </div>
              <div
                className="medic-profile-info-rating">
                <div className="medic-profile-info-rating-stars">
                  <Stars 
                      rating={Number(user.rating)}
                      />
                </div>

                <h2>{Number(user.rating).toFixed(1)}</h2>
              </div>
            </div>
          </Box>
        </div>
        <div className="about">
          <Box style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3>Sobre Dr. {user.firstName}:</h3>
            <ul>
              <li><strong>Graduação: </strong>{user.graduation}</li>
              {
                user.masterDegree && <li><strong>Mestrado: </strong>{user.masterDegree}</li>
              }
              {
                user.doctorageDegree && <li><strong>Doutorado: </strong>{user.doctorageDegree}</li>
              }
            </ul>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
