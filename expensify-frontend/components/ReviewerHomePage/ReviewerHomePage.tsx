"use client";

import "./style.css";
import { Search } from "../search/Search";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Employee, Expense } from "@/shared/types";
<<<<<<< HEAD
import { useReview } from "@/context/ReviewContext";
import { Logout } from "../logout/Logout";

export const ReviewerHomePage = () => {
  const [search, setSearch] = useState("");
=======

export const ReviewerHomePage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [expenseId, setExpenseId] = useState<number>(-1);
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="mt-4 search">
        <Search onSearch={handleSearch} />
      </div>
<<<<<<< HEAD
      <ExpensesTable search={search} />
      <ReviewExpensePopup />
=======
      <ExpensesTable
        search={search}
        setIsOpen={setIsOpen}
        setExpenseId={setExpenseId}
      />
      <ReviewExpensePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        expenseId={expenseId}
      />
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
    </>
  );
};

const Header = () => {
<<<<<<< HEAD
=======
  const { setUser } = useUser();

  const logOut = () => {
    api.logOut().then((res) => setUser(null));
  };

>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
  return (
    <div className="flex items-center shadow-lg shadow-indigo-400/50  p-3 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-300">
      <p className="text-2xl font-bold text-white pl-3">Expenses to Review</p>
      <div className="logout-container">
<<<<<<< HEAD
        <Logout />
=======
        <button
          className="log-out hover:bg-violet-400 hover:scale-110 transition ease-in-out delay-150"
          onClick={logOut}
        >
          Log out
        </button>
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
      </div>
    </div>
  );
};

type ExpenseRowProp = {
  expense: Expense;
<<<<<<< HEAD
};

const ExpenseRow: React.FC<ExpenseRowProp> = ({ expense }) => {
  const { setIsOpen, setExpenseId } = useReview();

=======
  setIsOpen: (value: boolean) => void;
  setExpenseId: (value: number) => void;
};

const ExpenseRow: React.FC<ExpenseRowProp> = ({
  expense,
  setIsOpen,
  setExpenseId,
}) => {
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
  const handleReview = () => {
    setExpenseId(expense.id);
    setIsOpen(true);
  };

  return (
    <>
      <td>{expense.merchant}</td>
      <td>{expense.purchase_date}</td>
      <td>${expense.amount}</td>
      <td className="p-2 break-word">{expense.description}</td>
      <td>
        <button
          className="bg-indigo-200 rounded-xl p-1 px-3 text-black font-medium hover:bg-indigo-400"
          onClick={() => handleReview()}
        >
          Review
        </button>
      </td>
    </>
  );
};

type EmployeeRowProp = {
  search: string;
  employee: Employee;
<<<<<<< HEAD
};

const EmployeeRow: React.FC<EmployeeRowProp> = ({ search, employee }) => {
  const inReviewExpenses = employee.expenses
    .filter((expense) => expense.status.state === "IN_REVIEW")
    .filter((expense) =>
      expense.merchant.toLowerCase().includes(search.toLowerCase())
    );
=======
  setIsOpen: (value: boolean) => void;
  setExpenseId: (value: number) => void;
};

const EmployeeRow: React.FC<EmployeeRowProp> = ({
  search,
  employee,
  setIsOpen,
  setExpenseId,
}) => {
  const inReviewExpenses = employee.expenses
    .filter((expense) => expense.status.state === "IN_REVIEW")
    .filter((expense) => expense.merchant.includes(search));
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2

  return (
    <>
      {inReviewExpenses.map((expense) => (
        <tr key={expense.id} className="text-white text-center">
          <td className="p-3">{employee.id}</td>
          <td>{employee.username}</td>
<<<<<<< HEAD
          <ExpenseRow expense={expense} />
=======
          <ExpenseRow
            expense={expense}
            setIsOpen={setIsOpen}
            setExpenseId={setExpenseId}
          />
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
        </tr>
      ))}
    </>
  );
};

type ExpensesTableProp = {
  search: string;
<<<<<<< HEAD
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({ search }) => {
=======
  setIsOpen: (value: boolean) => void;
  setExpenseId: (value: number) => void;
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({
  search,
  setIsOpen,
  setExpenseId,
}) => {
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    api.getEmployees().then((res) => setEmployees(res));
  }, []);

  return (
    <div className="flex justify-center expenses-table-container">
      <table className="backdrop-blur-sm bg-black/50">
        <thead className="bg-indigo-300 sticky top-0">
          <tr>
            <th className="w-32 p-3">Employee ID</th>
            <th className="w-56">Employee Username</th>
            <th className="w-52">Merchant</th>
            <th className="w-40">Purchase Date</th>
            <th className="w-40">Amount</th>
            <th className="w-96">Description</th>
            <th className="w-36"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow
              search={search}
              key={employee.id}
              employee={employee}
<<<<<<< HEAD
=======
              setIsOpen={setIsOpen}
              setExpenseId={setExpenseId}
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

<<<<<<< HEAD
const ReviewExpensePopup = ({}) => {
  const { user } = useUser();
  const { isOpen, setIsOpen, handleSubmit } = useReview();
=======
type ReviewExpensePopupProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  expenseId: number;
};

const ReviewExpensePopup: React.FC<ReviewExpensePopupProp> = ({
  isOpen,
  setIsOpen,
  expenseId,
}) => {
  const { user } = useUser();
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
  const date = new Date();
  const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${("0" + date.getDate()).slice(-2)}`;

<<<<<<< HEAD
=======
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

>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
  return (
    <>
      {isOpen && (
        <div className="popup-background">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="state"
                className="text-white text-lg font-bold ml-4"
              >
                State
              </label>
              <br />
              <select
                name="state"
                id="state"
                className="p-3 pr-36 m-2 indent-0 rounded-3xl"
              >
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <br />
              <label
                htmlFor="reviewedBy"
                className="text-white text-lg font-bold ml-4"
              >
                Reviewed By
              </label>
              <br />
              <input
                type="text"
                readOnly
                name="reviewedBy"
<<<<<<< HEAD
                defaultValue={user?.username}
=======
                defaultValue={user.username}
>>>>>>> c23146eff721e96c700d517449419b57cf9b6dc2
                className="p-3 m-2 rounded-3xl bg-slate-300"
              />
              <label
                htmlFor="date"
                className="text-white text-lg font-bold ml-4"
              >
                Date
              </label>
              <br />
              <input
                type="date"
                readOnly
                name="date"
                defaultValue={today}
                className="p-3 m-2 pr-24 rounded-3xl bg-slate-300"
              />
              <br />
              <label
                htmlFor="comment"
                className="text-white text-lg font-bold ml-4"
              >
                Comment
              </label>
              <br />
              <textarea
                name="comment"
                id="comment"
                rows={4}
                cols={27}
                className="m-2 indent-4 rounded-3xl"
              />
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
