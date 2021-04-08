import { useContext, useState } from "react";
import "./styles.css";
import DataContext from "../../../context/DataContext";
import { Link } from "react-router-dom";
import Select from "react-select";
import { TextField } from "@material-ui/core";

const Schedule = () => {
  const { medic, setMedic } = useContext(DataContext);

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
    {
      week_day: 1,
      from: "",
      to: "",
    },
    {
      week_day: 2,
      from: "",
      to: "",
    },
    {
      week_day: 3,
      from: "",
      to: "",
    },
    {
      week_day: 4,
      from: "",
      to: "",
    },
    {
      week_day: 5,
      from: "",
      to: "",
    },
    {
      week_day: 6,
      from: "",
      to: "",
    },
  ]);

  return (
    <form className="form-container" id="form-container-schedule">
      <div className="form-container-flex">
        <h2>Horários disponíveis</h2>
      </div>
      <div className="line"></div>

      {scheduleItems.map((data) => {
        return (
          <div key={data.week_day} className="medic-schedule">
            <div className="medic-schedule-input-group">
              <h1>
                {data.week_day === 0
                  ? "Domingo"
                  : data.week_day === 1
                  ? "Segunda-feira"
                  : data.week_day === 2
                  ? "Terça-feira"
                  : data.week_day === 3
                  ? "Quarta-feira"
                  : data.week_day === 4
                  ? "Quinta-feira"
                  : data.week_day === 5
                  ? "Sexta-feira"
                  : "Sábado"}
              </h1>
            </div>

            <div className="medic-schedule-input-group-flex">
              <div className="input-flex">
                <span className="label">Das</span>
                <TextField name="from" type="time" fullWidth />
              </div>

              <div className="input-flex">
                <span className="label">Até</span>
                <TextField name="from" type="time" fullWidth />
              </div>
            </div>

            <div className="line-gray">
              <span>Excluir horário</span>
            </div>
          </div>
        );
      })}

      <Link to="/registrar-spital-medico-3">
        <button className="secondary" type="submit">
          Anterior
        </button>
      </Link>

      <Link to="/registrar-spital-medico-5">
        <button className="primary" type="submit">
          Próximo
        </button>
      </Link>
    </form>
  );
};

export default Schedule;
