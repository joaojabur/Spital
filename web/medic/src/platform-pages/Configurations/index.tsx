import React from "react";
import { useHistory } from "react-router";
import HorizontalHeader from "../../components-platform/HorizontalHeader";
import VerticalHeader from "../../components-platform/VerticalHeader";
import ConfigContainer from "../../components/ConfigContainer";
import { useAuth } from "../../context/AuthProvider";
import "./styles.css";

const Configurations = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (!user.configured) {
    history.replace("/configurar");
  }

  console.log(user)
  return (
    <div className="config">
      <HorizontalHeader title="Configurações" />
      <VerticalHeader colorIcon="configurations" />
      <div className="content">
        <ConfigContainer>
          <h3>Dados da Clínica</h3>
          <div className="data">
            <p><strong>Endereço:</strong>{user.location.address.replace("State of", '')}</p>
            <p><strong>Número:</strong>{user.location.number}</p>
          </div>
        </ConfigContainer>
        <ConfigContainer>
          <h3>Dados Bancários</h3>
          <div className="data">
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
          </div>
        </ConfigContainer>
        <ConfigContainer>
          <h3>Dados de Consulta</h3>
          <div className="data">
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
            <p><strong>Endereço:</strong></p>
          </div>
        </ConfigContainer>
      </div>
    </div>
  );
};

export default Configurations;
