import React, { useState } from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import api from "../../services/api";

const Appointments = () => {
  const history = useHistory();
  const { userID, user } = useAuth();
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "Identificador", width: 130 },
    { field: "type", headerName: "Tipo de consulta", width: 300 },
    { field: "price", headerName: "Preço", width: 120 },
    { field: "date", headerName: "Data", width: 140 },
    { field: "time", headerName: "Hora", width: 120 },
    { field: "pacient", headerName: "Paciente", width: 240 },
    { field: "confirmed", headerName: "Confirmada", width: 140 },
  ];

  useEffect(() => {
    api.get(`appointments?medicID=${userID}`).then((response: any) => {
      setRows(response.data);
    });
  }, [setRows, userID]);

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Consultas" />
      <VerticalHeader colorIcon="appointments" />
      <div style={{ backgroundColor: "#fff" }} className="content">
        <DataGrid
          className="tabela"
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onCellClick={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default Appointments;
