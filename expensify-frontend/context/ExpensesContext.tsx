"use client";

import { createContext, useContext, useState } from "react";
import { Expense } from "@/shared/types";

type ExpensesContextData = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const ExpensesContext = createContext<ExpensesContextData | undefined>(
  undefined
);

export const ExpensesProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }
  return context;
};
