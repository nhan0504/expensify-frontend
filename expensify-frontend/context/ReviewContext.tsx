"use client";

import { createContext, useContext, useState } from "react";

type ReviewContextData = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  expenseId: number;
  setExpenseId: (value: number) => void;
};

const ReviewContext = createContext<ReviewContextData | undefined>(undefined);

export const ReviewProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseId, setExpenseId] = useState<number>(-1);

  return (
    <ReviewContext.Provider
      value={{ isOpen, setIsOpen, expenseId, setExpenseId }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
};
