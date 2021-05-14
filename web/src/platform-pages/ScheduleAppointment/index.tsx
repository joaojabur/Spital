import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import { ParamTypes, MedicProps, UserProps } from "../MedicProfile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoArrowUndoSharp,
  IoArrowRedoSharp,
} from "react-icons/io5";
import DaySchedule from "../../components/DaySchedule";
import AppointmentType from "../../components/AppointmentType";
import GreenButton from "../../components/GreenButton";

const ScheduleAppointment = () => {
  const history = useHistory();
  const [date, setDate] = useState(new Date());

  const [medic, setMedic] = useState<MedicProps | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const dateString = date.toString();

  const [week_day, month, month_day, year] = dateString.split(" ");

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    api.get(`medics?userID=${id}`).then((response: any) => {
      setMedic(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`users?id=${id}`).then((response: any) => {
      setUser(response.data);
    });
  }, []);

  function transformWeekday() {
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

  function transformMonth() {
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

  return (
    <div className="client-platform">
      <SubHeaderPlatform
        title={`Agendar consulta com Dr(a). ${user?.firstName}`}
        returnFunction={() => history.goBack()}
      />
      <div className="container">
        <Calendar
          prevLabel={<IoChevronBackOutline color="#07B3D6" />}
          nextLabel={<IoChevronForwardOutline color="#07B3D6" />}
          prev2Label={<IoArrowUndoSharp color="#07B3D6" />}
          next2Label={<IoArrowRedoSharp color="#07B3D6" />}
          className="big-calendar"
          value={date}
          onChange={(e: any) => {
            setDate(e);
          }}
        />

        <DaySchedule
          getMonth={transformMonth}
          getWeekDay={transformWeekday}
          year={year}
          monthDay={month_day}
        />

        <AppointmentType />

        <GreenButton label="Ir para o pagamento" />
      </div>
    </div>
  );
};

export default ScheduleAppointment;
