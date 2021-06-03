import React, { createContext, useContext, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  image: string;
}

interface ShareClientFormContextData {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface ShareClientFormProviderProps {
  children: React.ReactNode;
}

export const ShareClientFormContext = createContext(
  {} as ShareClientFormContextData
);

export default function ShareClientFormProvider({
  children,
}: ShareClientFormProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  let value = {
    userData,
    setUserData,
  } as ShareClientFormContextData;
  return (
    <ShareClientFormContext.Provider value={value}>
      {children}
    </ShareClientFormContext.Provider>
  );
}

export function useShareClientForm() {
  return useContext(ShareClientFormContext);
}
