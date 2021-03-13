import { Fragment } from "react";
import "../styles.css";

import Header from "../../../components/Header";
import Credentials from "../../../components/Form/Steps/Credentials";

const RegisterSpitalAccountCredentials = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-paciente"
        />

        <Credentials />
      </Fragment>
    </div>
  );
};

export default RegisterSpitalAccountCredentials;
