import { BrowserRouter, Switch } from "react-router-dom";

import Landing from "../pages/Landing";
import LoginAndRegisterMedico from "../pages/LoginAndRegisterMedico";
import LoginAndRegisterPaciente from "../pages/LoginAndRegisterPaciente";
import LoginPacient from "../pages/LoginPatient";
import ConfirmEmail from "../pages/ConfirmEmail";
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
import VerifyEmail from "../pages/VerifyEmail";
import ForgetPassword from "../pages/ForgetPassword";
import RecoverPassword from "../pages/RecoverPassword";

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
        <PublicRoute path="/confirmar-email" component={ConfirmEmail} />
        <PublicRoute path="/verificar/:token" component={VerifyEmail} />
        <PublicRoute path="/recuperar" exact component={ForgetPassword} />
        <PublicRoute path="/recuperar/:token" component={RecoverPassword} />

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
