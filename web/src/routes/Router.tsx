import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import LoginAndRegisterMedico from "../pages/LoginAndRegisterMedico";
import LoginAndRegisterPaciente from "../pages/LoginAndRegisterPaciente";
import LoginPacient from "../pages/LoginPatient";
import LoginSpitalAccount from "../pages/LoginSpitalAccount";
import RegisterMedicalSpitalAcademic from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalAcademic";
import RegisterMedicalSpitalCredentials from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalCredentials";
import RegisterMedicalSpitalNames from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalNames";
import RegisterMedicalSpitalPersonalData from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalPersonalData";
import RegisterMedicalSpitalAccountReview from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalReview";
import RegisterMedicalSpitalSchedule from "../pages/RegisterMedicalSpitalAccount/RegisterMedicalSpitalSchedule";
import RegisterPacient from "../pages/RegisterPacient";
import RegisterSpitalAccount from "../pages/RegisterSpitalAccount";
import RegisterSpitalAccountCredentials from "../pages/RegisterSpitalAccount/RegisterSpitalAccountCredentials";
import RegisterSpitalAccountPhone from "../pages/RegisterSpitalAccount/RegisterSpitalAccountPhone";
import RegisterSpitalAccountReview from "../pages/RegisterSpitalAccount/RegisterSpitalAccountReview";
import HomeClient from "../platform-pages/HomeClient";

//import PrivateRoute from "../components/PrivateRoute";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/home-cliente" component={HomeClient} />
      <Route path="/" component={Landing} exact />
      <Route
        path="/entrar-registrar-paciente"
        component={LoginAndRegisterPaciente}
      />
      <Route
        path="/entrar-registrar-medico"
        component={LoginAndRegisterMedico}
      />
      <Route path="/registrar-paciente" component={RegisterPacient} />
      <Route path="/entrar-paciente" component={LoginPacient} />
      <Route path="/login-spital-paciente" component={LoginSpitalAccount} />

      <Route
        path="/registrar-spital-paciente"
        component={RegisterSpitalAccount}
      />
      <Route
        path="/registrar-spital-paciente-1"
        component={RegisterSpitalAccountCredentials}
      />
      <Route
        path="/registrar-spital-paciente-2"
        component={RegisterSpitalAccountPhone}
      />
      <Route
        path="/registrar-spital-paciente-3"
        component={RegisterSpitalAccountReview}
      />
      <Route
        path="/registrar-spital-medico"
        component={RegisterMedicalSpitalNames}
      />
      <Route
        path="/registrar-spital-medico-1"
        component={RegisterMedicalSpitalCredentials}
      />
      <Route
        path="/registrar-spital-medico-2"
        component={RegisterMedicalSpitalAcademic}
      />
      <Route
        path="/registrar-spital-medico-3"
        component={RegisterMedicalSpitalPersonalData}
      />
      <Route
        path="/registrar-spital-medico-4"
        component={RegisterMedicalSpitalSchedule}
      />
      <Route
        path="/registrar-spital-medico-5"
        component={RegisterMedicalSpitalAccountReview}
      />
    </BrowserRouter>
  );
}

export default Router;
