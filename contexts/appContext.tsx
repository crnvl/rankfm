"use client";

import { Configure } from "@/components/configure";
import { createContext, useContext, useState } from "react";

export enum AppState {
  INITIAL,
  READY,
}

interface IAppContext {
  state: AppState;
  albumId: number | null;
}

const AppContext = createContext<IAppContext>({
  state: AppState.INITIAL,
  albumId: null,
});

export const useAppContext = () => useContext(AppContext);

interface IAppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [state, setState] = useState(AppState.INITIAL);
  const [albumId, setAlbumId] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ state, albumId }}>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
        {state === AppState.INITIAL ? <Configure setState={setState} /> : children}
      </main>
    </AppContext.Provider>
  );
};
