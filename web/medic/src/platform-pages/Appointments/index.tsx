import React, { useState } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import { useEffect } from "react";
import api from "../../services/api";
import Table from "../../components-platform/Table";
import Loader from "react-loader-spinner";

interface AppointmentProps {
  confirmed: boolean;
  id: number;
  time: string;
  date: string;
  type: string;
  price: string;
  first_name: string;
  last_name: string;
}

const Appointments = () => {
  const history = useHistory();
  const [id, setId] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [isToday, setIsToday] = useState(true);
  const [isFinalized, setIsFinalized] = useState(false);
  const [data, setData] = useState<Array<AppointmentProps>>([
    {
      confirmed: true,
      id: 0,
      time: "",
      date: "",
      type: "",
      price: "",
      first_name: "",
      last_name: "",
    },
  ]);

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`appointments?medicID=${user.id}`).then((response: any) => {
      setData(response.data);
      setLoading(false);
    });
  }, [user, setData]);

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Consultas" />
      <VerticalHeader colorIcon="appointments" />
      <div className="content">
        {loading ? (
          <Loader
            type="TailSpin"
            color="var(--color-button-primary)"
            height={30}
            width={30}
          />
        ) : (
          <Table
            data={data}
            head={{
              confirmed: "Status",
              id: "ID da consulta",
              type: "Tipo",
              date: "Dia",
              time: "Hora",
              price: "Preço",
              first_name: "Nome do paciente",
              last_name: "Sobrenome do paciente",
            }}
            title="BUSCAR CONSULTA"
            inputs={[
              { label: "ID da consulta", value: id, setValue: setId },
              { label: "Dia", value: day, setValue: setDay },
              { label: "Hora", value: hour, setValue: setHour },
            ]}
            switches={[
              { label: "Consultas hoje", value: isToday, setValue: setIsToday },
              {
                label: "Finalizadas",
                value: isFinalized,
                setValue: setIsFinalized,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
