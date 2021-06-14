import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { useModal } from "./ModalProvider";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  xp: number;
}

interface AuthContextData {
  user: User;
  authenticated: boolean;
  login: (email: string, password: string) => any;
  signup: (user: User) => Promise<any>;
  logout: () => void;
  confirmed: boolean;
  userID: number;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const { spinner } = useModal();
  const [user, setUser] = useState<User | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getUserData(id: number) {
    let response = await api.get(`clients?id=${id}`);

    setUser({
      ...response.data,
    });

    setLoading(false);
  }

  async function logout() {
    Cookies.remove("access-token");
    window.location.reload();
  }

  async function login(email: string, password: string) {
    let response;
    try {
      response = await api.post("/clients/login", {
        email: email,
        password: password,
      });
      console.log(response);

      let { token, id, confirmed } = response.data;

      if (confirmed) {
        Cookies.set("access-token", token);
        setUserID(id);

        setConfirmed(confirmed);

        getUserData(id);
      } else {
        throw new Error("Usuário não verificado");
      }

      return response;
    } catch (error) {
      return error?.response?.data ?? { error: error.message };
    }
  }

  async function loginWithToken() {
    let response = await api.get("clients/auth", {
      headers: {
        Authorization: Cookies.get("access-token"),
      },
    });

    let { auth, userID, confirmed } = response.data;

    if (auth) {
      setUserID(userID);
      setConfirmed(confirmed);
      getUserData(userID);
    } else {
      setLoading(false);
    }
  }

  async function signup(user: User) {
    await spinner.open();

    return await api.post("clients", {
      ...user,
    });
  }

  useEffect(() => {
    if (Cookies.get("access-token")) {
      loginWithToken();
    } else {
      setLoading(false);
    }
  }, []);

  let value = {
    user,
    authenticated: user !== null,
    signup,
    login,
    logout,
    confirmed,
    userID,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
