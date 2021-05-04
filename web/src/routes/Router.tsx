import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import LoginAndRegisterMedico from "../pages/LoginAndRegisterMedico";
import LoginAndRegisterPaciente from "../pages/LoginAndRegisterPaciente";
import LoginPacient from "../pages/LoginPatient";
import LoginSpitalAccount from "../pages/LoginSpitalAccount";
import RegisterPacient from "../pages/RegisterPacient";
import RegisterPatientSpitalAccount from "../pages/RegisterSpitalAccount";
import AppointmentsClient from "../platform-pages/AppointmentsClient";
import HomeClient from "../platform-pages/HomeClient";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../platform-pages/MyProfile";
import SearchClient from "../platform-pages/SearchClient";
import PublicRoute from "./PublicRoute";
import RegisterMedicSpital from "../pages/RegisterMedicalSpitalAccount";
import MedicArea from "../platform-pages/MedicArea";
import MedicProfile from "../platform-pages/MedicProfile";

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
        <PublicRoute
          path="/login-spital-paciente"
          component={LoginSpitalAccount}
        />

        <PrivateRoute path="/principal" component={HomeClient} />
        <PrivateRoute path="/busca" exact component={SearchClient} />
        <PrivateRoute path="/busca/:area" exact component={MedicArea} />
        <PrivateRoute path="/consultas" exact component={AppointmentsClient} />
        <PrivateRoute path="/perfil" exact component={MyProfile} />
        <PrivateRoute path="/medicos/:id" exact component={MedicProfile} />

        <PublicRoute
          path="/registrar-spital-paciente"
          component={RegisterPatientSpitalAccount}
        />
        <PublicRoute
          path="/registrar-spital-medico"
          component={RegisterMedicSpital}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
