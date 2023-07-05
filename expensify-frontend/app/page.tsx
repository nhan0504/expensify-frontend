"use client";

import "./style.css";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { Expense } from "@/shared/types";
import { ExpenseRow } from "@/components/expensesRow/expenseRow";
import { FormInput } from "@/components/input/formInput";
import { useExpenses } from "@/context/ExpensesContext";

export default function Home() {
  const { user, isLoading } = useUser();
  const { setExpenses } = useExpenses();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      user
        ? api.getExpenses(user.id).then((res) => setExpenses(res))
        : router.push("/login");
    }
  }, [user, isLoading]);

  return (
    <main className="background-home">
      {user?.role == "ROLE_EMPLOYEE" && <EmployeeHomePage />}
    </main>
  );
}

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

type SearchProp = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProp> = ({ onSearch }) => {
  return (
    <div className="mt-4 search">
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

const EmployeeHomePage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Search onSearch={handleSearch} />
      <ExpensesTable search={search} />
      <AddExpensePopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
