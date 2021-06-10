import React from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const Configurations = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (!user.configured) {
    history.replace("/configurar");
  }
  return (
    <div className="agenda">
      <HorizontalHeader title="Configurações" />
      <VerticalHeader colorIcon="configurations" />
    </div>
  );
};

export default Configurations;
