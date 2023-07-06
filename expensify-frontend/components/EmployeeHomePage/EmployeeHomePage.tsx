"use client";

import "./style.css";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { Expense } from "@/shared/types";
import { useUser } from "@/context/UserContext";
import { useExpenses } from "@/context/ExpensesContext";
import { Search } from "../search/Search";
import { FormInput } from "../input/formInput";

export const EmployeeHomePage = () => {
  const { setExpenses } = useExpenses();
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api.getExpenses(user.id).then((res) => setExpenses(res));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <div className="mt-4 search">
        <Search onSearch={handleSearch} />
      </div>
      <ExpensesTable search={search} />
      <AddExpensePopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

type HeaderProp = {
  setIsOpen: (value: boolean) => void;
};

const Header: React.FC<HeaderProp> = ({ setIsOpen }) => {
  const { setUser } = useUser();

  const logOut = () => {
    api.logOut().then((res) => setUser(null));
  };

  return (
    <div className="flex items-center shadow-lg shadow-indigo-400/50  p-3 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-300">
      <p className="text-2xl font-bold text-white pl-3">My expenses</p>
      <button
        className="add-expense hover:bg-indigo-300 hover:scale-110 hover:cursor-cell transition ease-in-out delay-150"
        onClick={() => setIsOpen(true)}
      >
        Add Expense
      </button>
      <button
        className="log-out hover:bg-violet-400 hover:scale-110 transition ease-in-out delay-150"
        onClick={logOut}
      >
        Log out
      </button>
    </div>
  );
};

type ExpensesRowProp = {
  item: Expense;
  onDelete: (item: Expense) => void;
};

const ExpenseRow: React.FC<ExpensesRowProp> = ({ item, onDelete }) => {
  const state = item.status.state;

  return (
    <tr className="text-white text-center">
      <td>{item.merchant}</td>
      <td>{item.purchase_date}</td>
      <td>${item.amount}</td>
      <td className="p-2 break-word">{item.description}</td>
      <td>
        <div
          className={`rounded-xl p-1 my-3 font-medium ${
            state === "IN_REVIEW"
              ? "bg-amber-300"
              : state === "APPROVED"
              ? "bg-green-400"
              : "bg-red-700"
          } `}
        >
          {state}
        </div>
      </td>
      <td>{item.status.reviewed_by}</td>
      <td>{item.status.review_date}</td>
      <td>{item.status.comment}</td>
      <td>
        <button type="button" onClick={() => onDelete(item)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ff6666"
            className="w-6 h-6 hover:animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

type ExpensesTableProp = {
  search: string;
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({ search }) => {
  const { user } = useUser();
  const { expenses, setExpenses } = useExpenses();
  const [filterExpenses, setFilterExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setFilterExpenses(
      expenses.filter((item) => item.merchant.includes(search))
    );
  }, [expenses, search]);

  const handleDelete = (item: Expense) => {
    if (item.status.state == "APPROVED" || item.status.state == "REJECTED") {
      return;
    }

    api
      .deleteExpense(user.id, item.id)
      .then((res) =>
        setExpenses(expenses.filter((expense) => expense.id != item.id))
      );
  };

  return (
    <div className="flex justify-center expenses-table-container">
      <table className="backdrop-blur-sm bg-black/50">
        <thead className="bg-indigo-300 sticky top-0">
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
        <tbody className="divide-y-2">
          {filterExpenses.map((item) => (
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
};

const AddExpensePopup: React.FC<AddExpensePopupProp> = ({
  isOpen,
  setIsOpen,
}) => {
  const { user } = useUser();
  const { setExpenses } = useExpenses();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const newExpense = {
      merchant: target.merchant.value,
      description: target.description.value,
      purchase_date: target.date.value,
      amount: target.amount.value,
    };

    api
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
                <button
                  className="submit-button hover:bg-sky-600"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="close-button hover:bg-sky-600"
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
