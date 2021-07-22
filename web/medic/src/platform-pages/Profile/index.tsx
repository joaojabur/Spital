import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import api from "../../services/api";
import MedicProfileBox from "../../components-platform/MedicProfileBox";
import MedicProfileInfo from "../../components-platform/MedicProfileInfo";
import MedicProfileData from "../../components-platform/MedicProfileData";
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

  useEffect(() => {
    api.get(`medic-schedule/${user.id}`).then((response) => {
      setSchedule(response.data);
    });
  }, []);

  return (
    <div className="agenda">
      <HorizontalHeader title="Meu Perfil" />
      <VerticalHeader colorIcon="profile" />
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="content"
      >
        <div className="container-perfil">
          <MedicProfileBox />
          <MedicProfileData week_day={getWeekday()} />
        </div>
        <MedicProfileInfo />
      </div>
    </div>
  );
};

export default Profile;
