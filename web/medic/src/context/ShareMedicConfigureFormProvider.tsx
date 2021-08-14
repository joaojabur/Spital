import React, { createContext, useContext, useState } from "react";
import { BankData } from "../components-platform/ConfigureMedicPages/BankData";
import { InvoiceAddressProps } from "../components-platform/ConfigureMedicPages/InvoiceAddress";

interface MedicConfigureData {
  appointments: Array<Appointment>;
  address: string;
  number: string;
  lat: number | null;
  lon: number | null;
  bankData: BankData;
  invoiceAddress: InvoiceAddressProps;
  schedule: Array<Schedule>;
  file: File;
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
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
      bankData: {
        bankNumber: "",
        agencyNumber: "",
        accountNumber: "",
        accountCheckNumber: "",
        fullName: "",
        cpf: "",
      },
      schedule: [
        {
          week_day: 0,
          from: "08:30",
          to: "17:00",
        },
      ],
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
