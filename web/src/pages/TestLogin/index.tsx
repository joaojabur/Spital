import { useContext } from "react";
import DataContext from "../../context/DataContext";

const TestLogin = () => {
  const { loggedUser } = useContext(DataContext);

  return (
    <div>
      <h1>
        Nome:
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {loggedUser.firstName}
        </span>
      </h1>
      <h1>
        Sobrenome:
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {loggedUser.lastName}
        </span>
      </h1>
      <h1>
        E-mail:
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {loggedUser.email}
        </span>
      </h1>
      <h1>
        First Name:
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {loggedUser.phoneNumber}
        </span>
      </h1>
    </div>
  );
};

export default TestLogin;
