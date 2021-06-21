import React, { createContext, useContext, useState } from "react";

interface AppointmentData {
  date: string;
  time: string;
  doctorName: string;
  type: string;
  price: string;
}

interface ShareAppointmentFormContextData {
  appointmentData: AppointmentData;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface ShareClientFormProviderProps {
  children: React.ReactNode;
}

export const ShareAppointmentFormContext = createContext(
  {} as ShareAppointmentFormContextData
);

export default function ShareAppointmentFormProvider({
  children,
}: ShareClientFormProviderProps) {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    time: "",
    price: "",
    date: "",
    doctorName: "",
    type: "",
  });
  const [error, setError] = useState<any>(null);

  let value = {
    appointmentData,
    setAppointmentData,
    error,
    setError,
  } as ShareAppointmentFormContextData;
  return (
    <ShareAppointmentFormContext.Provider value={value}>
      {children}
    </ShareAppointmentFormContext.Provider>
  );
}

export function useShareAppointmentForm() {
  return useContext(ShareAppointmentFormContext);
}
