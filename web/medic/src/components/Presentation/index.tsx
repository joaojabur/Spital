import React from "react";
import "./styles.css";
import doctorImg from "../../assets/images/doctor.svg";
import { useHistory } from "react-router-dom";

const Presentation = () => {
  let history = useHistory();

  return (
    <div className="presentation">
      <img src={doctorImg} alt="Médico e paciente" />
      <div className="presentation-message">
        <h2>Plataforma grátis para encontrar pacientes!</h2>
        <p>
          Nossa plataforma oferece o melhor serviço para aumentar seu
          faturamento em até 200%. Você sabe o melhor de tudo isso? A plataforma
          é totalmente gratuita! Gostaria de saber como te proporcionamos tudo
          isso? Clique no botão abaixo.
        </p>
        <button onClick={() => history.push('/entrar')}>Venha descobrir</button>
      </div>
    </div>
  );
};

export default Presentation;
