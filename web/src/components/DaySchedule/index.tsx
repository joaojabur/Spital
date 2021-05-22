import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useShareAppointmentForm } from "../../context/ShareAppointmentFormProvider";
import { ParamTypes } from "../../components/MedicProfilePages/Main";
import api from "../../services/api";
import "./styles.css";

export interface DayScheduleProps {
  getMonth: () => number;
  year: string;
  monthDay: string;
}

interface DateProps {
  date: string;
  time: string;
  isOn: boolean;
}

interface MedicScheduleProps {
  from: string;
  to: string;
  week_day: number;
}

const DaySchedule = ({ getMonth, year, monthDay }: DayScheduleProps) => {
  const { appointmentData, setAppointmentData } = useShareAppointmentForm();
  const [medicSchedule, setMedicSchedule] =
    useState<MedicScheduleProps | null>(null);
  const [appointments, setAppointments] = useState<DateProps[]>([]);
  const { id } = useParams<ParamTypes>();

  const month = getMonth();
  const completeDate = `${month}/${monthDay}/${year}`;
  const newCompleteDate = new Date(completeDate);
  const newWeekDay = newCompleteDate.getDay();

  useEffect(() => {
    api
      .get(`appointments?medicID=${id}&date=${completeDate}`)
      .then((response: any) => {
        setAppointments(response.data);
      });

    api
      .get(`medic-schedule?medicID=${id}&week_day=${newWeekDay}`)
      .then((response: any) => {
        setMedicSchedule(response.data[0]);
      });
  }, [newWeekDay, completeDate, id]);

  const numberFrom = Number(medicSchedule?.from);
  const numberTo = Number(medicSchedule?.to);

  const quantityOfTimes = (numberTo - numberFrom) / 30;
  const quantityOfTimesArray = [];
  for (let i = 0; i <= quantityOfTimes; i++) {
    quantityOfTimesArray.push(i);
  }

  return (
    <>
      <div className="day-schedule">
        {quantityOfTimesArray.map((time) => {
          const total = numberFrom + 30 * time;
          const hour = total / 60;
          const stringHour = hour.toString();
          const [hours, minutes] = stringHour.split(".");
          const completeMinutes = Number(minutes) * 6;

          let isReserved = false;

          for (let appointment of appointments) {
            if (
              appointment.time ===
              `${hours}:${isNaN(completeMinutes) ? "00" : completeMinutes}`
            ) {
              isReserved = true;
            }
          }

          if (isReserved) {
            return (
              <button key={time} className="day-schedule-unique-reserved">
                Reservado
              </button>
            );
          }

          return (
            <button
              value={`${hours}:${
                isNaN(completeMinutes) ? "00" : completeMinutes
              }`}
              key={time}
              className="day-schedule-unique"
              onClick={(e: any) => {
                setAppointmentData({
                  ...appointmentData,
                  time: e.target.value,
                });
              }}
            >
              {hours}:{isNaN(completeMinutes) ? "00" : completeMinutes}
            </button>
          );
        })}
      </div>
      <div className="chosenTime">
        Horário escolhido: <span>{appointmentData?.time}</span>
      </div>
    </>
  );
};

export default DaySchedule;
