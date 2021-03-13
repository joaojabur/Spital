import { Fragment } from "react";
import "./styles.css";

import Header from "../../components/Header";
import Names from "../../components/Form/Steps/Names";

const RegisterSpitalAccount = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-paciente"
        />

        <Names />
      </Fragment>
    </div>
  );
};

export default RegisterSpitalAccount;
