import React, { createContext, useContext, useState } from "react";

interface InfoData {
  location: string;
}

interface ShareInfoData {
  infoData: InfoData;
  setInfoData: React.Dispatch<React.SetStateAction<InfoData>>;
}

interface ShareClientFormProviderProps {
  children: React.ReactNode;
}

export const InfoDataProvider = createContext({} as ShareInfoData);

export default function ShareInfoDataProvider({
  children,
}: ShareClientFormProviderProps) {
  const [infoData, setInfoData] = useState<InfoData>();

  let value = {
    infoData,
    setInfoData,
  } as ShareInfoData;
  return (
    <InfoDataProvider.Provider value={value}>
      {children}
    </InfoDataProvider.Provider>
  );
}

export function useInfoData() {
  return useContext(InfoDataProvider);
}
