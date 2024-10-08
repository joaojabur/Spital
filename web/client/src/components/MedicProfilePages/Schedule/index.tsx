import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import SubHeaderPlatform from "../../../components/SubHeaderPlatform";
import {
  ParamTypes,
  MedicProps,
} from "../../../components/MedicProfilePages/Main";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoArrowUndoSharp,
  IoArrowRedoSharp,
} from "react-icons/io5";
import DaySchedule from "../../../components/DaySchedule";
import AppointmentType from "../../../components/AppointmentType";
import GreenButton from "../../../components/GreenButton";
import { NamesProps } from "../../Form/Steps/Names";

interface ConsultTypeProps {
  type: string;
  price: string;
}

const ScheduleMedicProfile = ({ nextPage, previousPage }: NamesProps) => {
  const [consultTypes, setConsultTypes] = useState<ConsultTypeProps[]>([]);
  const [date, setDate] = useState(new Date());

  const [medic, setMedic] = useState<MedicProps | null>(null);

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

  const dateString = date.toString();

  const [week_day, month, month_day, year] = dateString.split(" ");
  const numberMonth = calculateMonth(month);
  const totalDate = Number(month_day) + numberMonth * Number(year);

  const today = new Date();
  const todayString = today.toString();
  const [today_week_day, today_month, today_month_day, today_year] =
    todayString.split(" ");

  const todayNumberMonth = calculateMonth(today_month);
  const today_totalDate =
    Number(today_month_day) + todayNumberMonth * Number(today_year);

  const { medicID } = useParams<ParamTypes>();

  useEffect(() => {
    api.get(`medics?id=${medicID}`).then((response: any) => {
      setMedic(response.data);
    });
  }, [medicID]);

  useEffect(() => {
    api.get(`consult-type?medicID=${medic?.id}`).then((response: any) => {
      setConsultTypes(response.data);
    });
  }, [medic, setConsultTypes]);

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
        title={`Agendar consulta com Dr(a). ${medic?.firstName}`}
        returnFunction={() => previousPage()}
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

        {totalDate < today_totalDate ? (
          <div
            style={{
              width: "100%",
              padding: "2rem",
              backgroundColor: "#fff",
              fontSize: "1.5rem",
              marginTop: "2rem",
              borderRadius: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Você por acaso possui uma máquina de tempo?
          </div>
        ) : (
          <DaySchedule
            getMonth={transformMonth}
            year={year}
            monthDay={month_day}
            medic_id={medic?.id}
          />
        )}

        <AppointmentType consultTypes={consultTypes} />

        <GreenButton
          nextPage={nextPage}
          getMonth={transformMonth}
          year={year}
          monthDay={month_day}
          label="Revisar consulta"
        />
      </div>
    </div>
  );
};

export default ScheduleMedicProfile;
