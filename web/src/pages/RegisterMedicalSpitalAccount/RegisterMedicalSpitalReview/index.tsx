import { Fragment } from "react";
import "./styles.css";

import Header from "../../../components/Header";
import Review from "../../../components/FormMedic/Steps/Review";

const RegisterMedicalSpitalAccountReview = () => {
  return (
    <div className="register-spital-container">
      <Fragment>
        <Header
          title="Insira suas informações para que a gente consiga realizar seu cadastro"
          returnTo="entrar-registrar-medico"
        />

        <Review />
      </Fragment>
    </div>
  );
};

export default RegisterMedicalSpitalAccountReview;
