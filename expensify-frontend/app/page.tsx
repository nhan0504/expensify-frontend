"use client";

import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { Expense } from "@/shared/types";
import "./style.css";
import { ExpenseRow } from "@/components/expensesRow/expenseRow";
import { FormInput } from "@/components/input/formInput";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    console.log("run effect");
    user
      ? api.getExpenses(user.id).then((res) => setExpenses(res))
      : router.push("/login");
  }, [user]);

  return (
    <main className="background-home">
      {user?.role == "ROLE_EMPLOYEE" && (
        <UserHomePage expenses={expenses} setExpenses={setExpenses} />
      )}
    </main>
  );
}

type HeaderProp = {
  setIsOpen: (value: boolean) => void;
};

const Header: React.FC<HeaderProp> = ({ setIsOpen }) => {
  return (
    <div className="flex items-center shadow-lg shadow-indigo-400/50 bg-indigo-400 p-3">
      <p className="text-xl font-bold text-white">My expenses</p>
      <button className="add-expense" onClick={() => setIsOpen(true)}>
        Add Expense
      </button>
    </div>
  );
};

type SearchProp = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProp> = ({ onSearch }) => {
  return (
    <div className="mt-4" style={{ paddingLeft: "77%" }}>
      <FormInput
        label="Search"
        type="text"
        name="search"
        placeholder="Search by merchant"
        onChange={onSearch}
      />
    </div>
  );
};

type ExpensesTableProp = {
  list: Expense[];
  handleDelete: (item: Expense) => void;
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({ list, handleDelete }) => {
  return (
    <div className="flex justify-center expenses-table-container">
      <table className="backdrop-blur-sm bg-black/50">
        <thead className="table-head">
          <tr>
            <th className="w-32 p-3">Merchant</th>
            <th className="w-32">Purchase Date</th>
            <th className="w-24">Amount</th>
            <th className="w-80">Description</th>
            <th className="w-32">Status</th>
            <th className="w-40">Reviewed By</th>
            <th className="w-36">Review Date</th>
            <th className="w-60">Comment</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ExpenseRow key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type AddExpensePopupProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setExpenses: (expenses: Expense[]) => void;
};

const AddExpensePopup: React.FC<AddExpensePopupProp> = ({
  isOpen,
  setIsOpen,
  setExpenses,
}) => {
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const newExpense = {
      merchant: target.merchant.value,
      description: target.description.value,
      purchase_date: target.date.value,
      amount: target.amount.value,
    };

    await api
      .addExpense(user.id, newExpense)
      .then((res) => api.getExpenses(user.id).then((res) => setExpenses(res)));
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="popup-background">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <FormInput label="Merchant" type="text" name={"merchant"} />
              <FormInput label="Purchase Date" type="date" name={"date"} />
              <FormInput label="Amount" type="number" name={"amount"} />
              <FormInput label="Description" type="text" name={"description"} />
              <span>
                <button className="submit-button" type="submit">
                  Submit
                </button>
                <button
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

type UserHomePageProp = {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
};

const UserHomePage: React.FC<UserHomePageProp> = ({
  expenses,
  setExpenses,
}) => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDelete = (item: Expense) => {
    if (item.status.state == "APPROVED" || item.status.state == "REJECTED")
      return;

    api
      .deleteExpense(user.id, item.id)
      .then((res) => api.getExpenses(user.id).then((res) => setExpenses(res)));
  };

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Search onSearch={handleSearch} />

      <ExpensesTable
        list={expenses.filter((item) => item.merchant.includes(search))}
        handleDelete={handleDelete}
      />
      <AddExpensePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setExpenses={setExpenses}
      />
    </>
  );
};
