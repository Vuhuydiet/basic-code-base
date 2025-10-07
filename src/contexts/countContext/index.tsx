import React, { useState } from "react";
import type { ReactNode } from "react";
import type { CountContextType } from "./index.types";
import { CountContext } from "./index.context";

interface CountProviderProps {
  children: ReactNode;
}

export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  const value: CountContextType = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

export default CountProvider;
