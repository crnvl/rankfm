"use client";

import Home from "@/app/page";
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

  // TODO: debug bypass context
  useEffect(() => {
    setContextData({
      state: AppState.READY,
      artist: "$uicideboy$",
      album: "Long Term Effects of SUFFERING",
    });
  }, []);

  return (
    <AppContext.Provider value={{ ...contextData }}>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
        {contextData.state === AppState.INITIAL ? (
          <Configure setState={setContextData} />
        ) : (
          <Home setState={setContextData} />
        )}
      </main>
    </AppContext.Provider>
  );
};
