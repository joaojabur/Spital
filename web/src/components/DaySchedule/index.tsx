import React from "react";
import "./styles.css";

interface DayScheduleProps {
  getWeekDay: () => number;
  getMonth: () => number;
  year: string;
  monthDay: string;
}

const DaySchedule = ({ getWeekDay, getMonth, year, monthDay }: DayScheduleProps) => {
  const week_day = getWeekDay();
  const month = getMonth();
  const completeDate = `${monthDay}/${month}/${year}`
  console.log(completeDate)

  return (
    <div className="day-schedule">
      <div className="day-schedule-unique">8:00 AM</div>
      <div className="day-schedule-unique">8:30 AM</div>
      <div className="day-schedule-unique">9:00 AM</div>
      <div className="day-schedule-unique">9:30 AM</div>
      <div className="day-schedule-unique">10:00 AM</div>
      <div
        className="day-schedule-unique"
        id="231"
        onClick={(e) => {
          console.log(e);
        }}
      >
        10:30 AM
      </div>
      <div className="day-schedule-unique">11:00 AM</div>
      <div className="day-schedule-unique">11:30 AM</div>
      <div className="day-schedule-unique">12:00 AM</div>
    </div>
  );
};

export default DaySchedule;
