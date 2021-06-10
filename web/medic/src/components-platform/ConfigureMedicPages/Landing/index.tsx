import React from "react";
import { PagesProps } from "../../../platform-pages/ConfigureMedic";
import scheduleMeeting from "../../../assets/images/schedule-meeting.svg";
import "./styles.css";

const Landing = ({ nextPage }: PagesProps) => {
  return (
    <div className="landing">
      <div>
        <h1 className="landing-title">
          Que bom que você escolheu a nossa plataforma!
        </h1>
        <h3 className="landing-subtitle">
          Primeiro, necessitamos de alguns outros dados para tornar seu perfil
          “agendável”
        </h3>
      </div>

      <img src={scheduleMeeting} alt="Agendamento" />

      <button onClick={nextPage} className="next">
        Vamos começar!
      </button>
    </div>
  );
};

export default Landing;
