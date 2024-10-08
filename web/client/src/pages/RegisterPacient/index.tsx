import { Fragment } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import doctors from "../../assets/images/doctors.svg";
import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";
import facebookIcon from "../../assets/images/icons/facebook.svg";
import googleIcon from "../../assets/images/icons/google.png";

const RegisterPacient = () => {
  return (
    <div className="register-patient">
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
              <h1>Escolha sua melhor forma para se registrar</h1>
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

                <Link to="/registrar-spital-paciente">
                  <button className="spital-button">Conta Spital</button>
                </Link>
              </div>

              <div className="register-pacient-form-text">
                <p>
                  Já possui uma conta?{" "}
                  <Link to="/entrar-paciente">Entre aqui!</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

export default RegisterPacient;
