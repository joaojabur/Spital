import { useState, useEffect } from "react";
import api from "../services/api";
import Cookies from "js-cookie";

import DataContext from "./DataContext";

const DataProvider = (props) => {
  const [redirect, setRedirect] = useState(false);

  const [loggedUser, setLoggedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
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

  useEffect(() => {
    api.get("clients").then((response) => {
      setUsers(response.data);
    });

    const token = Cookies.get("access-token");
    if (token === null) {
      console.log("token is null!");
    } else {
      api
        .get("clients/auth", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const { auth, user_id } = response.data;

          api
            .get(`clients?id=${user_id}`)
            .then((response) => {
              setLoggedUser({
                ...loggedUser,
                id: response.data[0].id,
                firstName: response.data[0].first_name,
                lastName: response.data[0].last_name,
                email: response.data[0].email,
                phoneNumber: response.data[0].phoneNumber,
              });
            })
            .catch((err) => {
              if (err) {
                console.log(err);
              }
            });

          if (auth) {
            setRedirect(true);
          }
        });
    }
  }, [loggedUser]);

  return (
    <DataContext.Provider
      value={{
        users,
        user,
        setUser,
        loggedUser,
        setLoggedUser,
        medic,
        setMedic,
        setLoggedMedic,
        loggedMedic,
        redirect,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
