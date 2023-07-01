export type User = {
  id: string;
  username: string;
  authorities: string;
};

export type UserContextData = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }

type Status = {
    state: string,
    comment: string,
    reviewed_by: string,
    review_date: string
}

export type Expense = {
    id: string,
    merchant: string,
    description: string,
    amount: string,
    status: Status,
    purchase_date: string
}