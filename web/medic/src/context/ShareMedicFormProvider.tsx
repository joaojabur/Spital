import React, { createContext, useContext, useState } from "react";

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
  doctorateDegree: string;
  cpf: string;
  rg: string;
  birthDate: string;
  crm: string;
  schedule: Array<Schedule>;
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

interface ShareMedicFormContextData {
  medicData: MedicData;
  setMedicData: React.Dispatch<React.SetStateAction<MedicData>>;
}

interface ShareClientFormProviderProps {
  children: React.ReactNode;
}

export const ShareMedicFormContext = createContext(
  {} as ShareMedicFormContextData
);

export default function ShareClientFormProvider({
  children,
}: ShareClientFormProviderProps) {
  const [medicData, setMedicData] = useState<MedicData>({} as MedicData);

  let value = {
    medicData,
    setMedicData,
  } as ShareMedicFormContextData;

  return (
    <ShareMedicFormContext.Provider value={value}>
      {children}
    </ShareMedicFormContext.Provider>
  );
}

export function useShareFormMedic() {
  return useContext(ShareMedicFormContext);
}
