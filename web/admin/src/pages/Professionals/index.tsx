import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Header from "../../components/Header";
import Table from "../../components/Table";
import "./styles.css";

const Professionals = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

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

  const newDataArray = data.filter((obj) => {
    return (
      obj.id
        .replace(/[- ()]/g, "")
        .toLowerCase()
        .includes(id.toLowerCase()) &&
      obj.email.toLowerCase().includes(email.toLowerCase())
    );
  });

  return (
    <div className="main">
      <Header />
      <div className="professionals">
        <DashboardHeader />
        <Table
          data={newDataArray}
          inputs={[
            { label: "ID", value: id, setValue: setId },
            { label: "E-mail", value: email, setValue: setEmail },
          ]}
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
