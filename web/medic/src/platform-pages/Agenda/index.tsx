import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";

const Agenda = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="Agenda" />
      <VerticalHeader colorIcon="agenda" />
    </div>
  );
};

export default Agenda;
