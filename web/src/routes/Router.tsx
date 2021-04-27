import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
import RegisterPatientSpitalAccount from "../pages/RegisterSpitalAccount";
import AppointmentsClient from "../platform-pages/AppointmentsClient";
import HomeClient from "../platform-pages/HomeClient";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../platform-pages/MyProfile";
import SearchClient from "../platform-pages/SearchClient";
import PublicRoute from "./PublicRoute";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" component={Landing} exact />
        <PublicRoute
          path="/entrar-registrar-paciente"
          component={LoginAndRegisterPaciente}
        />
        <PublicRoute
          path="/entrar-registrar-medico"
          component={LoginAndRegisterMedico}
        />
        <PublicRoute path="/registrar-paciente" component={RegisterPacient} />
        <PublicRoute path="/entrar-paciente" component={LoginPacient} />
        <PublicRoute path="/login-spital-paciente" component={LoginSpitalAccount} />

        <PrivateRoute path="/principal" component={HomeClient} />
        <PrivateRoute path="/busca" exact component={SearchClient} />
        <PrivateRoute path="/consultas" exact component={AppointmentsClient} />
        <PrivateRoute path="/perfil" exact component={MyProfile} />

        <PublicRoute
          path="/registrar-spital-paciente"
          component={RegisterPatientSpitalAccount}
        />
        <PublicRoute
          path="/registrar-spital-medico"
          component={RegisterMedicalSpitalNames}
        />
        <PublicRoute
          path="/registrar-spital-medico-1"
          component={RegisterMedicalSpitalCredentials}
        />
        <PublicRoute
          path="/registrar-spital-medico-2"
          component={RegisterMedicalSpitalAcademic}
        />
        <PublicRoute
          path="/registrar-spital-medico-3"
          component={RegisterMedicalSpitalPersonalData}
        />
        <PublicRoute
          path="/registrar-spital-medico-4"
          component={RegisterMedicalSpitalSchedule}
        />
        <PublicRoute
          path="/registrar-spital-medico-5"
          component={RegisterMedicalSpitalAccountReview}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
