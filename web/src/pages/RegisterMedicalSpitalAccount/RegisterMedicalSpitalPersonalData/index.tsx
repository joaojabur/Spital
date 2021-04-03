import { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import PersonalData from "../../../components/FormMedic/Steps/PersonalData";

const RegisterMedicalSpitalPersonalData = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-medico"
        />

        <PersonalData />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalPersonalData;
