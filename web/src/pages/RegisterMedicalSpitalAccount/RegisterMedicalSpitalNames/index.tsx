import React, { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import MedicNames from "../../../components/FormMedic/Steps/Names";
import { useHistory } from "react-router-dom";

const RegisterMedicalSpitalNames = () => {
  const history = useHistory();
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={() => history.push('/entrar-registrar-medico')}
        />

        <MedicNames />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalNames;
