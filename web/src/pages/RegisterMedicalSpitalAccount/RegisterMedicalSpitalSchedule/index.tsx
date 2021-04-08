import { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import Schedule from "../../../components/FormMedic/Steps/Schedule";

const RegisterMedicalSpitalSchedule = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="entrar-registrar-medico"
        />

        <Schedule />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalSchedule;
