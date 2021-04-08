import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import MedicCredentials from "../../../components/FormMedic/Steps/Credentials";

const RegisterMedicalSpitalCredentials = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="entrar-registrar-medico"
        />

        <MedicCredentials />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalCredentials;
