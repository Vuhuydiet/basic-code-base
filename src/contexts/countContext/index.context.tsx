import { createContext, useContext } from "react";
import type { CountContextType } from "./index.types";

export const CountContext = createContext<CountContextType | undefined>(
  undefined
);

export const useCount = (): CountContextType => {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
