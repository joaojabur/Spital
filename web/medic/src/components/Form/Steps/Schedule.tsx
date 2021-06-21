import "./styles.css";

import Select from "../../Select";
import { useShareFormMedic } from "../../../context/ShareMedicFormProvider";
import { useEffect, useState } from "react";
import validateSchedule from "../../../utils/validateSchedule";

interface MedicScheduleProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicSchedule = ({ nextPage, previousPage }: MedicScheduleProps) => {
  const { setMedicData, medicData } = useShareFormMedic();
  const [error, setError] = useState(false);

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

  function addNewScheduleItem() {
    if (medicData.schedule.length >= 7) {
      // Send message
    } else {
      setMedicData({
        ...medicData,
        schedule: [
          ...medicData.schedule,
          {
            week_day: medicData.schedule.length,
            from: "13:00",
            to: "20:30",
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
    const newScheduleItem = medicData.schedule.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setMedicData({ ...medicData, schedule: newScheduleItem });
  }

  function deleteScheduleItem(position: number) {
    let newScheduleItems = [...medicData.schedule];
    const index = newScheduleItems.findIndex((item: any) => item === position);

    newScheduleItems.splice(index, 1);

    setMedicData({ ...medicData, schedule: newScheduleItems });
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

      {medicData.schedule.map((scheduleItem, index) => {
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

      <p
        style={{
          fontSize: "2rem",
          color: "#f00",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {error && "Algum campo digitado incorretamente"}
      </p>

      <button className="secondary" onClick={previousPage}>
        Anterior
      </button>
      <button className="primary" onClick={nextPage}>
        Próximo
      </button>
    </form>
  );
};

export default MedicSchedule;
