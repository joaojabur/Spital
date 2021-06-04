import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";

const Appointments = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="Consultas" />
      <VerticalHeader colorIcon="appointments" />
    </div>
  );
};

export default Appointments;
