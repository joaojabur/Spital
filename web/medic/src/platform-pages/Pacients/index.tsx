import React from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";
import { DataGrid } from "@material-ui/data-grid";

const Pacients = () => {
  const history = useHistory();
  const { user } = useAuth();

  const columns = [
    { field: "id", headerName: "Identificador", width: 130 },
    { field: "name", headerName: "Nome", width: 130 },
    { field: "lastName", headerName: "Sobrenome", width: 170 },
    { field: "phone", headerName: "Telefone", width: 200 },
    { field: "email", headerName: "E-mail", width: 300 },
    { field: "lastAppointment", headerName: "Última consulta", width: 240 },
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      lastName: "Jon",
      email: "joaozito0205@gmail.com",
      lastAppointment: "16/02/2000",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Pacientes" />
      <VerticalHeader colorIcon="pacients" />
      <div style={{ backgroundColor: "#fff" }} className="content">
        <DataGrid
          className="tabela"
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Pacients;
