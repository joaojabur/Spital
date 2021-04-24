import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { redirect } = useContext(DataContext);
  console.log(redirect);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (redirect) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
