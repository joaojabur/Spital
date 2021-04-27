import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../services/api";
import Cookies from "js-cookie";

interface User {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  image: string,
}

interface AuthContextData {
  user: User;
  authenticated: boolean;
  login: (email: string, password: string) => any;
  signup: (user: User) => Promise<any>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps){
  const [ user, setUser ] = useState<User | null>(null);

  async function login(email: string, password: string){
    // Login
    let response = await api
      .post("/clients/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        Cookies.set("access-token", response.data.token, {
          expires: 7,
        });
        loginWithToken();
    });

    return response;
  }

  async function loginWithToken(){
    let response = await api.get('client/auth', {
      data: {
        Authorization: Cookies.get('access-token')
      }
    });

    console.log(response);


  }

  async function signup(user: User){
    return await api.post("clients", {
      ...user
    });
  }

  useEffect(() => {
    /*
      Verifica se o navegador tem os Cookies,
      ou seja já está logado
    */
    if (Cookies.get('access-token')){
      loginWithToken();
    }
  }, [])
  
  let value = {
    user,
    authenticated: user !== null,
    signup
  } as AuthContextData;

  return (
    <AuthContext.Provider value={value}>
      {children }
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);
}
// const DataProvider = ({ children }: DataProviderProps) => {
//   const [responseData, setResponseData] = useState({} as Array<User>);

//   const [redirect, setRedirect] = useState(false);

//   const [loggedUser, setLoggedUser] = useState({} as User);

//   const [users, setUsers] = useState([] as Array<User>);

//   const [user, setUser] = useState({} as User);

//   const [loggedMedic, setLoggedMedic] = useState({} as Medic);

//   const [medic, setMedic] = useState({} as Medic);

//   useEffect(() => {
//     api.get("clients").then((response) => {
//       setUsers(response.data);
//     });

//     const token = Cookies.get("access-token");
//     if (token === null) {
//       console.log("token is null!");
//     } else {
//       api
//         .get("clients/auth", {
//           headers: { Authorization: token },
//         })
//         .then((response) => {
//           const { auth, user_id } = response.data;

//           api
//             .get(`clients?id=${user_id}`)
//             .then((response) => {
//               if (responseData.length > 0) {
//                 setLoggedUser((oldLoggedUser) => ({
//                   ...oldLoggedUser,
//                   ...responseData[0]
//                 }));
//               } else {
//                 setResponseData(response.data);
//                 setLoggedUser((oldLoggedUser) => ({
//                   ...oldLoggedUser,
//                   ...responseData[0]
//                 }));
//               }
//             })
//             .catch((err) => {
//               if (err) {
//                 console.log(err);
//               }
//             });

//           if (auth) {
//             console.log("Logou")
//             setRedirect(true);
//           }
//         });
//       }
//   }, [responseData]);
  
//   return (
//     <DataContext.Provider
//       value={{
//         users,
//         user,
//         setUser,
//         loggedUser,
//         setLoggedUser,
//         medic,
//         setMedic,
//         setLoggedMedic,
//         loggedMedic,
//         redirect,
//       }}
//     >
//       { children }
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;
