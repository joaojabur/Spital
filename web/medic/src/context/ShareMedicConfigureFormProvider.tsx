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
      invoiceAddress: {
        street: "",
        streetNumber: "",
        district: "",
        zipCode: "",
        city: "",
        state: "SP",
      },
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
