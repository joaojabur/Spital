import { Fragment } from "react";
import "../styles.css";

import Header from "../../../components/Header";
import Phone from "../../../components/Form/Steps/Phone";

const RegisterSpitalAccountPhone = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-paciente"
        />

        <Phone />
      </Fragment>
    </div>
  );
};

export default RegisterSpitalAccountPhone;
