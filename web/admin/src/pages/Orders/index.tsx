import React from "react";
import { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Header from "../../components/Header";
import Table from "../../components/Table";
import "./styles.css";

const Orders = () => {
  const [id, setId] = useState("");
  const [created_at, setCreated_at] = useState("");

  const data = [
    {
      id: "1",
      created_at: "2020-10-17",
      price: "300",
      first_name: "João",
      last_name: "Jabur",
    },
    {
      id: "2",
      created_at: "2020-10-17",
      price: "200",
      first_name: "João",
      last_name: "Jabur",
    },
    {
      id: "3",
      created_at: "2020-10-17",
      price: "400",
      first_name: "João",
      last_name: "Jabur",
    },
    {
      id: "4",
      created_at: "2020-10-17",
      price: "500",
      first_name: "João",
      last_name: "Jabur",
    },
  ];
  return (
    <div className="main">
      <Header />
      <div className="orders">
        <DashboardHeader />
        <Table
          data={data}
          head={{
            id: "ID",
            created_at: "Data",
            price: "Preço",
            first_name: "Nome",
            last_name: "Sobrenome",
          }}
          inputs={[
            { label: "ID", value: id, setValue: setId },
            { label: "Data", value: created_at, setValue: setCreated_at },
          ]}
          title="Pedidos"
        />
      </div>
    </div>
  );
};

export default Orders;
