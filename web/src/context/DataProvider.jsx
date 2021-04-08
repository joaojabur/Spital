import { useState, useEffect } from "react";
import api from "../services/api";

import DataContext from "./DataContext";

const DataProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: "",
  });

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

  const [loggedMedic, setLoggedMedic] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    area: "",
    graduation: "",
    masterDegree: "",
    doctorateDegree: "",
    cpf: "",
    rg: "",
    birthDate: "",
    cardName: "",
    cardNumber: "",
    expiresInDate: "",
    cvv: "",
  });

  const [medic, setMedic] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    area: "",
    graduation: "",
    masterDegree: "",
    doctorateDegree: "",
    cpf: "",
    rg: "",
    birthDate: "",
    cardName: "",
    cardNumber: "",
    expiresInDate: "",
    cvv: "",
    schedule: [],
  });

  console.log(medic);

  useEffect(() => {
    api.get("clients").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        users: users,
        user: user,
        setUser: setUser,
        loggedUser: loggedUser,
        setLoggedUser: setLoggedUser,
        medic: medic,
        setMedic: setMedic,
        loggedMedic: loggedMedic,
        setLoggedMedic: setLoggedMedic,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
