import React, { useEffect } from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useState } from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import { useModal } from "../../context/ModalProvider";
import { useAuth } from "../../context/AuthProvider";
import refreshScheduleValidate from "../../utils/validateRefreshSchedule";

export interface ParamsProps {
  id: string;
}

export interface RefreshSchedule {
  id: number;
  from: string;
  to: string;
}

const ConfigurationsMedicSchedule = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { spinner, sucesso } = useModal();
  const { id } = useParams<ParamsProps>();
  const [refreshSchedule, setRefreshSchedule] = useState<RefreshSchedule>({
    id: 0,
    from: "",
    to: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    api.post(`medic-schedule/${id}`).then((response: any) => {
      // FROM
      const totalFrom = Number(response.data.from) / 60;
      const [fromHour, fromMinute] = totalFrom.toString().split(".");
      const totalStringFromMinute = `${fromMinute}`;
      const formattedTotalFromMinute = totalStringFromMinute.substring(0, 1);
      const TotalFromMinute = Number(formattedTotalFromMinute) * 6;

      // TO
      const totalTo = Number(response.data.to) / 60;
      const [toHour, toMinute] = totalTo.toString().split(".");
      const totalStringToMinute = `${toMinute}`;
      const formattedTotalToMinute = totalStringToMinute.substring(0, 1);
      const TotalToMinute = Number(formattedTotalToMinute) * 6;

      setRefreshSchedule({
        ...refreshSchedule,
        id: response.data.id,
        from: `${fromHour.length > 1 ? fromHour : "0" + fromHour}:${
          isNaN(TotalFromMinute) ? "00" : TotalFromMinute
        }`,
        to: `${toHour.length > 1 ? toHour : "0" + toHour}:${
          isNaN(TotalToMinute) ? "00" : TotalToMinute
        }`,
      });
    });
  }, [id]);

  const [errors, setErrors] = useState(
    refreshScheduleValidate(refreshSchedule)
  );

  useEffect(() => {
    setErrors(refreshScheduleValidate(refreshSchedule));
  }, [refreshSchedule]);

  async function handleSubmitRefreshSchedule(e: any) {
    e.preventDefault();
    const loopedErrors = Object.values(errors);

    if (loopedErrors.length > 0) {
      setFormError("Nome ou preço incorreto.");
    } else {
      setFormError("");
      spinner.open();

      await api
        .put(`medic-schedule/${id}`, {
          from: refreshSchedule.from,
          to: refreshSchedule.to,
        })
        .then(async () => {
          await spinner.close();
          await sucesso.open({
            name: `Parabéns ${user.firstName}`,
            description: "Horário atualizado com sucesso!",
            close: () => sucesso.close(),
          });
          await history.push("/configuracoes");
        });
    }
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações de horários" />
      <VerticalHeader colorIcon="configurations" />
      <div className="content">
        <form onSubmit={handleSubmitRefreshSchedule} className="content-form">
          <h1>Atualize os dados de horário</h1>
          <div style={{ width: "90%" }} className="line-global"></div>
          <TextField
            type="time"
            placeholder="16:30"
            value={refreshSchedule.from}
            name="from"
            label={<span style={{ fontSize: "1.5rem" }}>Das</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setRefreshSchedule({ ...refreshSchedule, from: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.from ? true : false}
            helperText={
              <span style={{ fontSize: "1rem" }}>{errors?.from}</span>
            }
          />
          <TextField
            type="time"
            placeholder="22:00"
            value={refreshSchedule.to}
            name="to"
            label={<span style={{ fontSize: "1.5rem" }}>Até</span>}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setRefreshSchedule({ ...refreshSchedule, to: e.target.value });
            }}
            style={{ marginTop: "1rem", width: "90%" }}
            error={errors?.to ? true : false}
            helperText={<span style={{ fontSize: "1rem" }}>{errors?.to}</span>}
          />

          <p
            style={{
              color: "#f00",
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "-1rem",
            }}
          >
            {formError}
          </p>

          <button className="submit-button" type="submit">
            Atualizar consulta
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigurationsMedicSchedule;
