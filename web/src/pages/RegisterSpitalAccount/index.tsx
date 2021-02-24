import React, { Fragment } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import InputText from "../../components/InputText";

import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";

const RegisterSpitalAccount = () => {
  return (
    <Fragment>
      <div className="header-register">
        <div className="container header-context">
          <Link className="return-link" to={`/registrar-paciente`}>
            <img src={returnIcon} alt="Retornar" className="return" />
          </Link>
          <div className="header-title">
            <h1>
              Insira suas informações para que a gente consiga realizar seu
              cadastro
            </h1>
          </div>
          <img className="logo" src={logo} alt="Spital" />
        </div>
      </div>
      <div className="register-spital-account">
        <div className="register-spital-account-credentials">
          <form className="register-spital-account-form">
            <h2>Seus dados</h2>
            <div className="gray-line"></div>

            <div className="register-spital-account-form-inputs">
              <InputText label="Nome" placeHolder="Digite seu nome" />

              <InputText label="Sobrenome" placeHolder="Digite seu sobrenome" />
            </div>

            <div className="gray-line" id="gray-line-2"></div>

            <p className="input-text-label" id="label-upload">
              Foto do perfil (opcional)
            </p>
            <div className="input-upload">
              <input type="file" id="input-upload-file" />
              <label htmlFor="input-upload-file" className="input-upload-label">
                Choose file
              </label>
              <div className="upload-button">Upload</div>
            </div>
            <button className="register-button">Continuar</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterSpitalAccount;
