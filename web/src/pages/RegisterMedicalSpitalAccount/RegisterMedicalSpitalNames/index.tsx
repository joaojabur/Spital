import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import MedicNames from "../../../components/FormMedic/Steps/Names";

const RegisterMedicalSpitalNames = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="entrar-registrar-medico"
        />

        <MedicNames />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalNames;
