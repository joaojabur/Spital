import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SubHeaderPlatform from "../../components/SubHeaderPlatform";
import { useHistory } from "react-router-dom";
import { ParamTypes, MedicProps, UserProps } from "../MedicProfile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ScheduleAppointment = () => {
  const history = useHistory();
  const [date, setDate] = useState(new Date());

  const [medic, setMedic] = useState<MedicProps | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const { id } = useParams<ParamTypes>();
  console.log(date);

  useEffect(() => {
    api.get(`medics?userID=${id}`).then((response: any) => {
      setMedic(response.data);
      console.log(response.data);
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
          onChange={(e: any) => {
            setDate(e);
          }}
          value={date}
        />
      </div>
    </div>
  );
};

export default ScheduleAppointment;
