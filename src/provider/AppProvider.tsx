import React, { createContext, useContext } from "react";
import { useAppReducer } from "@/hooks/useAppReducer";

// creating the context
const AppContext = createContext<ReturnType<typeof useAppReducer> | undefined>(
  undefined
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appReducerValue = useAppReducer();
  return (
    <AppContext.Provider value={appReducerValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
