import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import LandingPage from "../pages/LandingPage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
