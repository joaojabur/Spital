import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/" />;
}
