import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";

import Header from "../../components/Header";
import Form from "../../components/Form/Form";
import Loader from "react-loader-spinner";

const RegisterSpitalAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div className="register-spital-container">
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
          <Header
            title="Insira suas informações para que a gente consiga realizar seu cadastro"
            returnTo="registrar-paciente"
          />

          <Form />
        </Fragment>
      )}
    </div>
  );
};

export default RegisterSpitalAccount;
