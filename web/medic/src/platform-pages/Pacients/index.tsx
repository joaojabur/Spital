import React from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const Pacients = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (!user.configured) {
    history.replace("/configurar");
  }

  return (
    <div className="agenda">
      <HorizontalHeader title="Pacientes" />
      <VerticalHeader colorIcon="pacients" />
    </div>
  );
};

export default Pacients;
