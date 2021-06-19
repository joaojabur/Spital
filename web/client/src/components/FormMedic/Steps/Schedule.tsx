import React, { useEffect, useState } from "react";
import "./styles.css";

import Select from "../../Select";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";

interface ISchedule {
  week_day: number;
  from: string;
  to: string;
}
interface MedicScheduleProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicSchedule = ({ nextPage, previousPage }: MedicScheduleProps) => {
  const { setMedicData, medicData } = useShareFormMedic();

  const weekDays = [
    {
      value: "0",
      label: "Domingo",
    },
    {
      value: "1",
      label: "Segunda-feira",
    },
    {
      value: "2",
      label: "Terça-feira",
    },
    {
      value: "3",
      label: "Quarta-feira",
    },
    {
      value: "4",
      label: "Quinta-feira",
    },
    {
      value: "5",
      label: "Sexta-feira",
    },
    {
      value: "6",
      label: "Sábado",
    },
  ];

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "08:30",
      to: "17:00",
    },
  ] as Array<ISchedule>);

  useEffect(() => {
    setMedicData((previousState) => ({
      ...previousState,
      schedule: scheduleItems,
    }));
  }, [scheduleItems, setMedicData]);

  function addNewScheduleItem() {
    if (scheduleItems.length >= 7) {
      // Avisar
    } else {
      setMedicData({
        ...medicData,
        schedule: [
          ...medicData.schedule,
          {
            week_day: medicData.schedule.length + 1,
            from: "",
            to: "",
          },
        ],
      });
    }
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(newScheduleItems);
  }

  function deleteScheduleItem(position: number) {
    let newScheduleItems = [...scheduleItems];
    const index = newScheduleItems.findIndex((item: any) => item === position);

    newScheduleItems.splice(index, 1);

    setScheduleItems(newScheduleItems);
  }
  return (
    <form className="form-container">
      <div className="form-container-flex">
        <h2>Horários disponíveis</h2>

        <div className="add-button" onClick={addNewScheduleItem}>
          + Novo horário
        </div>
      </div>

      <div className="line"></div>

      {scheduleItems.map((scheduleItem, index) => {
        return (
          <div key={scheduleItem.week_day} className="schedule-item">
            <span className="schedule-item-label">Dia da semana</span>
            <Select
              name="week_day"
              onChange={(e: any) =>
                setScheduleItemValue(index, "week_day", e.target.value)
              }
              value={scheduleItem.week_day}
              options={weekDays}
            />

            <div className="schedule-item-horizontal">
              <div className="schedule-item-input">
                <span className="schedule-item-label">Das</span>
                <input
                  value={scheduleItem.from}
                  name="from"
                  type="time"
                  onChange={(e: any) => {
                    setScheduleItemValue(index, "from", e.target.value);
                  }}
                />
              </div>

              <div className="schedule-item-input">
                <span className="schedule-item-label">Até</span>
                <input
                  value={scheduleItem.to}
                  name="to"
                  type="time"
                  onChange={(e: any) => {
                    setScheduleItemValue(index, "to", e.target.value);
                  }}
                />
              </div>
            </div>

            <div
              onClick={(e: any) => {
                deleteScheduleItem(index);
              }}
              className="line-gray"
            >
              <span>Excluir horário</span>
            </div>
          </div>
        );
      })}

      <button className="secondary" onClick={(e) => previousPage()}>
        Anterior
      </button>
      <button className="primary" onClick={(e) => nextPage()}>
        Próximo
      </button>
    </form>
  );
};

export default MedicSchedule;
