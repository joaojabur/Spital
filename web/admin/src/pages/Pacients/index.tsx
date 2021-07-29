import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Header from "../../components/Header";
import Table from "../../components/Table";
import "./styles.css";

const Pacients = () => {
  const [id, setId] = useState("");
  const [surname, setSurname] = useState("");

  const data = [
    {
      id: "1",
      email: "joaozito0205@gmail.com",
      phoneNumber: "(16) 9 9798-4147",
      first_name: "João",
      last_name: "Jabur",
    },
    {
      id: "2",
      email: "mariogomes@gmail.com",
      phoneNumber: "(30) 9 2398-5617",
      first_name: "Mário",
      last_name: "Gomes",
    },
    {
      id: "3",
      email: "marcossouza1021@gmail.com",
      phoneNumber: "(11) 9 9712-4443",
      first_name: "Marcos",
      last_name: "Souza",
    },
    {
      id: "4",
      email: "morianomelhem12@gmail.com",
      phoneNumber: "(21) 9 9195-1127",
      first_name: "Moria",
      last_name: "Melhem",
    },
  ];

  return (
    <div className="main">
      <Header />
      <div className="pacients">
        <DashboardHeader />
        <Table
          head={{
            id: "ID do paciente",
            email: "E-mail",
            phoneNumber: "Telefone celular",
            first_name: "Nome do paciente",
            last_name: "Sobrenome do paciente",
          }}
          data={data}
          inputs={[
            { label: "ID", value: id, setValue: setId },
            { label: "Sobrenome", value: surname, setValue: setSurname },
          ]}
          title="Pacientes"
        />
      </div>
    </div>
  );
};

export default Pacients;
