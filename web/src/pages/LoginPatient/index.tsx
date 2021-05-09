import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import doctors from "../../assets/images/doctors.svg";
import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";
import facebookIcon from "../../assets/images/icons/facebook.svg";
import googleIcon from "../../assets/images/icons/google.png";
import Loader from "react-loader-spinner";

const LoginPacient = () => {
  return (
    <div className="register-patient">
      (
      <Fragment>
        <header className="register-patient-header">
          <Link to="/entrar-registrar-paciente">
            <img src={returnIcon} alt="Retornar" />
          </Link>
          <img src={logo} alt="Spital" />
        </header>

        <main className="register-patient-main">
          <img src={doctors} alt="Médicos" />
          <div className="register-patient-form">
            <div className="register-patient-form-content">
              <h1>Escolha sua melhor forma para entrar</h1>
              <h4>Como deseja continuar?</h4>

              <div className="register-pacient-form-content-buttons">
                <button className="facebook-button">
                  <img src={facebookIcon} alt="Facebook" />
                  Continuar como João Jabur
                </button>

                <button className="google-button">
                  <img src={googleIcon} alt="Google" />
                  Continuar como João Jabur
                </button>
                <Link to="/login-spital-paciente">
                  <button className="spital-button">Conta Spital</button>
                </Link>
              </div>

              <div className="register-pacient-form-text">
                <p>
                  Ainda não possui uma conta?{" "}
                  <Link to="/registrar-paciente">Cadastre aqui!</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
      )
    </div>
  );
};

export default LoginPacient;
