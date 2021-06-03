import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterMedic from "../pages/RegisterMedic";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LandingPage} />
        <PublicRoute path="/entrar" component={LoginPage}/>
        <PublicRoute path="/registrar" component={RegisterMedic}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
