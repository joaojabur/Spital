import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";

const Pacients = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="Pacientes" />
      <VerticalHeader colorIcon="pacients" />
    </div>
  );
};

export default Pacients;
