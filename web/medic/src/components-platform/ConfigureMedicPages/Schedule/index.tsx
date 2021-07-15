import "./styles.css";

import Select from "../../../components/Select";
import { useEffect, useState } from "react";
import { useShareFormMedicConfigure } from "../../../context/ShareMedicConfigureFormProvider";
import validateConfigureMedic from "../../../utils/validateConfigureMedic";

interface MedicScheduleProps {
  nextPage: () => void;
  previousPage: () => void;
}

const MedicSchedule = ({ nextPage, previousPage }: MedicScheduleProps) => {
  const { medicDataConfigure, setMedicDataConfigure } =
    useShareFormMedicConfigure();
  const [errors, setErrors] = useState(
    validateConfigureMedic(medicDataConfigure)
  );

  useEffect(() => {
    setErrors(validateConfigureMedic(medicDataConfigure));
  }, [medicDataConfigure]);

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
    if (medicDataConfigure.schedule.length >= 7) {
      // Send message
    } else {
      setMedicDataConfigure({
        ...medicDataConfigure,
        schedule: [
          ...medicDataConfigure.schedule,
          {
            week_day: medicDataConfigure.schedule.length,
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
    const newScheduleItem = medicDataConfigure.schedule.map(
      (scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value };
        }

        return scheduleItem;
      }
    );

    setMedicDataConfigure({ ...medicDataConfigure, schedule: newScheduleItem });
  }

  function deleteScheduleItem(position: number) {
    let newScheduleItems = [...medicDataConfigure.schedule];
    const index = newScheduleItems.findIndex((item: any) => item === position);

    newScheduleItems.splice(index, 1);

    setMedicDataConfigure({
      ...medicDataConfigure,
      schedule: newScheduleItems,
    });
  }

  return (
    <>
      <form className="form-container">
        <div className="form-container-flex">
          <h2>Horários disponíveis</h2>

          <div className="add-button" onClick={addNewScheduleItem}>
            + Novo horário
          </div>
        </div>

        {medicDataConfigure.schedule.map((scheduleItem, index) => {
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
              <p
                style={{
                  margin: "2rem 0",
                  color: "#f00",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {errors?.schedule?.length >= index
                  ? errors?.schedule[index]
                  : null}
              </p>
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
          {medicDataConfigure.schedule.length === 0
            ? "Você precisa informar pelo menos um dia da semana."
            : null}
        </p>

        <button className="secondary" onClick={previousPage}>
          Anterior
        </button>
        <button style={{ marginBottom: '2rem' }} className="primary" onClick={nextPage}>
          Próximo
        </button>
      </form>
    </>
  );
};

export default MedicSchedule;
