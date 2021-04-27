import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import AcademicData from "../../../components/FormMedic/Steps/AcademicData";
import { useHistory } from "react-router-dom";

const RegisterMedicalSpitalAcademic = () => {
  const history = useHistory();
  
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={() => history.push('/entrar-registrar-medico')}
        />

        <AcademicData />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalAcademic;
