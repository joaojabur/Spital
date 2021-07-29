import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Header from "../../components/Header";
import Table from "../../components/Table";
import "./styles.css";

const Professionals = () => {
  const [id, setId] = useState("");
  const [created_at, setCreated_at] = useState("");

  const data = [
    {
      id: "1",
      confirmed: true,
      email: "jonathanmedicina@gmail.com",
      phoneNumber: "(22) 9 9891-1002",
      first_name: "Jonathan",
      last_name: "Maurício",
      area: "Dermatologista",
      accepted: false,
    },
    {
      id: "2",
      confirmed: true,
      email: "jonathanmedicina@gmail.com",
      phoneNumber: "(22) 9 9891-1002",
      first_name: "Jonathan",
      last_name: "Maurício",
      area: "Dermatologista",
      accepted: false,
    },
    {
      id: "3",
      confirmed: true,
      email: "jonathanmedicina@gmail.com",
      phoneNumber: "(22) 9 9891-1002",
      first_name: "Jonathan",
      last_name: "Maurício",
      area: "Dermatologista",
      accepted: false,
    },
    {
      id: "4",
      confirmed: true,
      email: "jonathanmedicina@gmail.com",
      phoneNumber: "(22) 9 9891-1002",
      first_name: "Jonathan",
      last_name: "Maurício",
      area: "Dermatologista",
      accepted: false,
    },
  ];
  return (
    <div className="main">
      <Header />
      <div className="professionals">
        <DashboardHeader />
        <Table
          data={data}
          head={{
            id: "ID",
            confirmed: "Confirmado",
            email: "E-mail",
            phoneNumber: "Telefone celular",
            first_name: "Nome",
            last_name: "Sobrenome",
            area: "Área",
            accepted: "Aceito",
          }}
          title="Profissionais"
        />
      </div>
    </div>
  );
};

export default Professionals;
