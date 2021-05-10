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
  console.log(
    `Week day: ${week_day}, month: ${month}, month day: ${month_day}, year: ${year}`
  );

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

        <DaySchedule />

        <AppointmentType />

        <GreenButton label="Ir para o pagamento" />
      </div>
    </div>
  );
};

export default ScheduleAppointment;
