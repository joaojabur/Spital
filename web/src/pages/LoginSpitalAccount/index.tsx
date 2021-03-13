import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";
import Loader from "react-loader-spinner";

const LoginSpitalAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <Fragment>
          <div className="header-login">
            <div className="container header-context">
              <Link className="return-link" to={`/entrar-paciente`}>
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
          <div className="login-spital-account">
            <div className="login-spital-account-credentials">
              <form className="login-spital-account-form">
                <h2>Entre com seu e-mail e senha</h2>
                <div className="gray-line"></div>

                <div className="login-spital-account-form-inputs">
                  <TextField label="E-mail" placeholder="Digite seu e-mail" />

                  <TextField label="Senha" placeholder="Digite sua senha" />
                </div>

                <div className="gray-line" id="gray-line-2"></div>

                <button className="login-button">Entrar</button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSpitalAccount;
