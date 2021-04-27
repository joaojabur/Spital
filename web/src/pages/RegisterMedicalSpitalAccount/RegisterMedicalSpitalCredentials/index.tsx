import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import MedicCredentials from "../../../components/FormMedic/Steps/Credentials";
import { useHistory } from "react-router-dom";

const RegisterMedicalSpitalCredentials = () => {
  const history = useHistory();
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={() => history.push('/entrar-registrar-medico')}
        />

        <MedicCredentials />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalCredentials;
