import React from "react";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import "./styles.css";

const Configurations = () => {
  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações" />
      <VerticalHeader colorIcon="configurations" />
    </div>
  );
};

export default Configurations;
