import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterMedic from "../pages/RegisterMedic";
import ConfirmEmail from "../pages/ConfirmEmail";
import VerifyEmail from "../pages/VerifyEmail";
import PrivateRoute from "./PrivateRoute";
import AgendaComponent from "../platform-pages/Agenda";
import Pacients from "../platform-pages/Pacients";
import Profile from "../platform-pages/Profile";
import Appointments from "../platform-pages/Appointments";
import Configurations from "../platform-pages/Configurations";
import ConfigureMedic from "../platform-pages/ConfigureMedic";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LandingPage} />
        <PublicRoute path="/entrar" component={LoginPage} />
        <PublicRoute path="/registrar" component={RegisterMedic} />
        <PublicRoute path="/confirmar-email" component={ConfirmEmail} />
        <PublicRoute path="/verificar/:token" component={VerifyEmail} />

        <PrivateRoute path="/agenda" component={AgendaComponent} />
        <PrivateRoute path="/pacientes" component={Pacients} />
        <PrivateRoute path="/perfil" component={Profile} />
        <PrivateRoute path="/consultas" component={Appointments} />
        <PrivateRoute path="/configuracoes" component={Configurations} />
        <PrivateRoute path="/configurar" component={ConfigureMedic} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
