import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import medics from "../../assets/images/medics.svg";
import { FaCommentMedical, FaClinicMedical } from "react-icons/fa";

const Landing = () => {
  return (
    <div id="page-landing">
      <div id="page-landing-container" className="container">
        <div className="logo-container">
          <img src={logo} alt="Spital" />
          <h2>Sua plataforma para cuidar da saúde e do bolso</h2>
        </div>

        <img
          src={medics}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/entrar-registrar-paciente" className="pacient">
            <FaCommentMedical size={30} color="#fff" />
            <span>Sou paciente</span>
          </Link>

          <Link to="/entrar-registrar-medico" className="medic">
            <FaClinicMedical size={30} color="#fff" />
            <span>Sou médico</span>
          </Link>
        </div>

        <span className="total-connections">
          O melhor site para agendar a sua consulta
        </span>
      </div>
    </div>
  );
};

export default Landing;
