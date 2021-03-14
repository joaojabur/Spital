import { useState, useEffect } from "react";
import { usersCredentials } from "./data";

import DataContext from "./DataContext";

const DataProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    image: "",
  });

  const [globalErrors, setGlobalErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setUsers(usersCredentials);
  }, []);

  return (
    <DataContext.Provider
      value={{
        users: users,
        user: user,
        setUser: setUser,
        globalErrors: globalErrors,
        setGlobalErrors: setGlobalErrors,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
