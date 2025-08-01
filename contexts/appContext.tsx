"use client";

import Home from "@/app/(home)/page";
import { Configure } from "@/components/configure";
import { createContext, useContext, useEffect, useState } from "react";

export enum AppState {
  INITIAL,
  READY,
}

export interface IAppContext {
  state: AppState;
  artist?: string;
  album?: string;
}

const AppContext = createContext<IAppContext>({
  state: AppState.INITIAL,
  artist: "",
  album: "",
});

export const useAppContext = () => useContext(AppContext);

interface IAppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [contextData, setContextData] = useState<IAppContext>({
    state: AppState.INITIAL,
  });
  const [albumId, setAlbumId] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ ...contextData }}>
      {contextData.state === AppState.INITIAL ? (
        <Configure setState={setContextData} />
      ) : (
        <Home setState={setContextData} />
      )}
    </AppContext.Provider>
  );
};
