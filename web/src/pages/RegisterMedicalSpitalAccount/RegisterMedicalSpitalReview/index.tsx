import { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import Review from "../../../components/FormMedic/Steps/Review";
import { useHistory } from "react-router-dom";

const RegisterMedicalSpitalAccountReview = () => {
  const history = useHistory();
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnFunction={() => history.push('/entrar-registrar-medico')}
        />

        <Review />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalAccountReview;
