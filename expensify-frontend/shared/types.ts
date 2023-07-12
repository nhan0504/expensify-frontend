export type User = {
  id: number;
  username: string;
  role: string;
};

type StatusState = "IN_REVIEW" | "APPROVED" | "REJECTED";

type Status = {
  state: StatusState;
  comment: string;
  reviewed_by: string;
  review_date: string;
};

export type Expense = {
  id: number;
  merchant: string;
  description: string;
  amount: number;
  status: Status;
  purchase_date: string;
};

export type Employee = {
  id: number;
  username: string;
  role: string;
  expenses: Expense[];
};
