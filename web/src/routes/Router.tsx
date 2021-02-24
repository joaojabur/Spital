import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import LoginAndRegisterMedico from "../pages/LoginAndRegisterMedico";
import LoginAndRegisterPaciente from "../pages/LoginAndRegisterPaciente";
import LoginPacient from "../pages/LoginPatient";
import LoginSpitalAccount from "../pages/LoginSpitalAccount";
import RegisterPacient from "../pages/RegisterPacient";
import RegisterSpitalAccount from "../pages/RegisterSpitalAccount";

function Router() {
  return (
    <BrowserRouter>
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

      <Route
        path="/registrar-spital-paciente"
        component={RegisterSpitalAccount}
      />

      <Route
        path="/login-spital-paciente"
        component={LoginSpitalAccount}
      />
    </BrowserRouter>
  );
}

export default Router;
