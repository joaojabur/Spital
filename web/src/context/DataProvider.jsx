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

  useEffect(() => {
    setUsers(usersCredentials);
  }, []);

  return (
    <DataContext.Provider
      value={{
        users: users,
        user: user,
        setUser: setUser
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
