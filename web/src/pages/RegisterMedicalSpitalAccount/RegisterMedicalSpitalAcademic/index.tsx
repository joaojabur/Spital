import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import AcademicData from "../../../components/FormMedic/Steps/AcademicData";

const RegisterMedicalSpitalAcademic = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-paciente"
        />

        <AcademicData />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalAcademic;
