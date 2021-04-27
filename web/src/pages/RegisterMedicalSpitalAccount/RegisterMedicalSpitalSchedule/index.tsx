import { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import Schedule from "../../../components/FormMedic/Steps/Schedule";
import { useHistory } from "react-router-dom";

const RegisterMedicalSpitalSchedule = () => {
  const history = useHistory();
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={() => history.push('/entrar-registrar-medico')}
        />

        <Schedule />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalSchedule;
