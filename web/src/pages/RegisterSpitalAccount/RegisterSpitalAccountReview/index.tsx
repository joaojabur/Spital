import { Fragment } from "react";
import "../styles.css";

import Header from "../../../components/Header";
import Review from "../../../components/Form/Steps/Review";

const RegisterSpitalAccountReview = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="registrar-paciente"
        />

        <Review />
      </Fragment>
    </div>
  );
};

export default RegisterSpitalAccountReview;
