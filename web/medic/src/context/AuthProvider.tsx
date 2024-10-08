import React, { useState, useEffect, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import Cookies from "js-cookie";

interface Medic {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  xp: number;
  confirmed: boolean;
  configured: boolean;
  birthDate: Date;
  crm: string;
  area: string;
  graduation: string;
  masterDegree?: string;
  doctorageDegree?: string;
  id: number;
  userID: number;
  rating: string;
  recipientID: string;
  location: {
    address: string;
    lat: string;
    lon: string;
    number: number;
  };
}

interface MedicData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  area: string;
  graduation: string;
  masterDegree: string;
  configured: boolean;
  doctorateDegree: string;
  cpf: string;
  rg: string;
  birthDate: string;
  crm: string;
  schedule: Array<Schedule>;
  xp: 0;
  location: {
    address: string;
    lat: string;
    lon: string;
    number: number;
  };
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

interface AuthContextData {
  user: Medic;
  authenticated: boolean;
  login: (email: string, password: string) => any;
  signup: (medic: MedicData) => Promise<any>;
  logout: () => void;
  confirmed: boolean;
  userID: number;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();
  const [user, setUser] = useState<Medic | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getUserData(id: number) {
    try {
      let response = await api.get(`medics?id=${id}`);

      setUser({
        ...response.data,
      });
    } catch (error) {
      if (error) {
        history?.replace("/404");
      }
    }

    setLoading(false);
  }

  async function logout() {
    Cookies.remove("access-token");
    window.location.reload();
  }

  async function login(email: string, password: string) {
    let response;
    try {
      response = await api.post("/medics/login", {
        email: email,
        password: password,
      });

      let { token, id, confirmed, accepted } = response.data;

      if (confirmed && accepted) {
        Cookies.set("access-token", token);
        setUserID(id);

        setConfirmed(confirmed);

        getUserData(id);
      } else {
        throw new Error("Usuário não verificado");
      }

      return response;
    } catch (error: any) {
      return error?.response?.data ?? { error: error?.message };
    }
  }

  async function loginWithToken() {
    let response = await api.get("medics/auth", {
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

  async function signup(user: MedicData) {
    return await api.post("medics", {
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
