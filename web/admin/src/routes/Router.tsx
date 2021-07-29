import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Pacients from "../pages/Pacients";
import Professionals from "../pages/Professionals";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/pacientes">
          <Pacients />
        </Route>
        <Route exact path="/profissionais">
          <Professionals />
        </Route>
        <Route exact path="/pedidos">
          <Orders />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
