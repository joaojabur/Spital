import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterMedic from "../pages/RegisterMedic";
import ConfirmEmail from "../pages/ConfirmEmail";
import VerifyEmail from "../pages/VerifyEmail";
import PrivateRoute from "./PrivateRoute";
import AgendaComponent from "../platform-pages/Agenda";
import Profile from "../platform-pages/Profile";
import Appointments from "../platform-pages/Appointments";
import Configurations from "../platform-pages/Configurations";
import ConfigureMedic from "../platform-pages/ConfigureMedic";
import RecoverPassword from "../pages/RecoverPassword";
import ForgetPassword from "../pages/ForgetPassword";
import Page404 from "../platform-pages/404";
import ConfigurationsConsult from "../platform-pages/ConfigurationsConsult";
import ConfigurationsAddress from "../platform-pages/ConfigurationsAddress";
import ConfigurationsMedicSchedule from "../platform-pages/ConfigurationsMedicSchedule";
import Revenue from "../platform-pages/Revenue";
import Marketing from "../platform-pages/Marketing";
import Pacients from "../platform-pages/Pacients";
import ConfigurationsBankAccount from "../platform-pages/ConfigurationsBankAccount";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LandingPage} />
        <PublicRoute path="/entrar" component={LoginPage} />
        <PublicRoute path="/registrar" component={RegisterMedic} />
        <PublicRoute path="/confirmar-email" component={ConfirmEmail} />
        <PublicRoute path="/verificar/:token" component={VerifyEmail} />
        <PublicRoute path="/recuperar" exact component={ForgetPassword} />
        <PublicRoute path="/recuperar/:token" component={RecoverPassword} />

        <PrivateRoute path="/agenda" component={AgendaComponent} />
        <PrivateRoute path="/perfil" component={Profile} />
        <PrivateRoute path="/consultas" component={Appointments} />
        <PrivateRoute path="/pacientes" component={Pacients} />
        <PrivateRoute path="/configuracoes" exact component={Configurations} />
        <PrivateRoute
          path="/configuracoes/consultas/:id"
          component={ConfigurationsConsult}
        />
        <PrivateRoute
          path="/configuracoes/endereco"
          component={ConfigurationsAddress}
        />
        <PrivateRoute
          path="/configuracoes/horarios/:id"
          component={ConfigurationsMedicSchedule}
        />

        <PrivateRoute
          path="/configuracoes/conta-bancaria"
          component={ConfigurationsBankAccount}
        />
        <PrivateRoute path="/configurar" component={ConfigureMedic} />
        <PrivateRoute path="/faturamento" component={Revenue} />
        <PrivateRoute path="/marketing" component={Marketing} />
        <PrivateRoute path="/404" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
