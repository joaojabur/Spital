import { useState, useEffect } from "react";
import api from "../services/api";
import Cookies from "js-cookie";

import DataContext from "./DataContext";

const DataProvider = (props) => {
  const [responseData, setResponseData] = useState({});

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
              if (responseData.length > 0) {
                console.log(responseData[0].first_name);
                console.log(responseData[0].id);
                setLoggedUser({
                  ...loggedUser,
                  id: responseData[0].id,
                  firstName: responseData[0].first_name,
                  lastName: responseData[0].last_name,
                  email: responseData[0].email,
                  phoneNumber: responseData[0].phoneNumber,
                });
              } else {
                setResponseData(response.data);
                setLoggedUser({
                  ...loggedUser,
                  id: responseData[0].id,
                  firstName: responseData[0].first_name,
                  lastName: responseData[0].last_name,
                  email: responseData[0].email,
                  phoneNumber: responseData[0].phoneNumber,
                });
              }
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
  }, [responseData]);

  //console.log(redirect);

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
