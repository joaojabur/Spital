import React, { createContext, useContext, useState } from "react";

interface MedicConfigureData {
  appointments: Array<Appointment>;
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
}

interface Appointment {
  name: string;
  price: string;
}

interface ShareMedicConfigureFormContextData {
  medicDataConfigure: MedicConfigureData;
  setMedicDataConfigure: React.Dispatch<
    React.SetStateAction<MedicConfigureData>
  >;
}

interface ShareClientFormProviderProps {
  children: React.ReactNode;
}

export const ShareMedicConfigureFormContext = createContext(
  {} as ShareMedicConfigureFormContextData
);

export default function ShareClientFormProvider({
  children,
}: ShareClientFormProviderProps) {
  const [medicDataConfigure, setMedicDataConfigure] =
    useState<MedicConfigureData>({
      appointments: [
        {
          name: "Consulta simples",
          price: "200",
        },
      ],
      address: "",
      number: "",
      lat: null,
      lon: null,
    } as MedicConfigureData);

  let value = {
    medicDataConfigure,
    setMedicDataConfigure,
  } as ShareMedicConfigureFormContextData;

  return (
    <ShareMedicConfigureFormContext.Provider value={value}>
      {children}
    </ShareMedicConfigureFormContext.Provider>
  );
}

export function useShareFormMedicConfigure() {
  return useContext(ShareMedicConfigureFormContext);
}
