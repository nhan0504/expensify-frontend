"use client";

import { api } from "@/utils/api";
import { createContext, useContext, useState } from "react";

type ReviewContextData = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  expenseId: number;
  setExpenseId: (value: number) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ReviewContext = createContext<ReviewContextData | undefined>(undefined);

export const ReviewProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseId, setExpenseId] = useState<number>(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const review = {
      state: target.state.value,
      reviewed_by: target.reviewedBy.value,
      review_date: target.date.value,
      comment: target.comment.value,
    };

    await api.reviewExpense(expenseId, review);
    setIsOpen(false);
  };

  return (
    <ReviewContext.Provider
      value={{ isOpen, setIsOpen, expenseId, setExpenseId, handleSubmit }}
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
