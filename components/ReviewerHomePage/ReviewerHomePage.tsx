"use client";

import "./style.css";
import { Search } from "../search/Search";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Employee, Expense } from "@/shared/types";
import { useReview } from "@/context/ReviewContext";
import { Logout } from "../logout/Logout";

export const ReviewerHomePage = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    api.getEmployees().then((res) => setEmployees(res));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="mt-4 search">
        <Search onSearch={handleSearch} />
      </div>
      <ExpensesTable search={search} employees={employees} />
      <ReviewExpensePopup setEmployees={setEmployees} />
    </>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between p-2 sm:p-2 md:p-3 lg:p-3 xl:p-3 items-center shadow-lg shadow-indigo-400/50 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-300">
      <p className="flex-shrink-0 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-white pl-3">Expenses to Review</p>
      <div className="pr-3">
        <Logout />
      </div>
    </div>
  );
};

type ExpenseRowProp = {
  expense: Expense;
};

const ExpenseRow: React.FC<ExpenseRowProp> = ({ expense }) => {
  const { setIsOpen, setExpenseId } = useReview();

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
};

const EmployeeRow: React.FC<EmployeeRowProp> = ({ search, employee }) => {
  const inReviewExpenses = employee.expenses
    .filter((expense) => expense.status.state === "IN_REVIEW")
    .filter((expense) =>
      expense.merchant.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      {inReviewExpenses.map((expense) => (
        <tr key={expense.id} className="text-white text-center expense-border">
          <td className="p-3">{employee.id}</td>
          <td>{employee.username}</td>

          <ExpenseRow expense={expense} />
        </tr>
      ))}
    </>
  );
};

type ExpensesTableProp = {
  search: string;
  employees: Employee[];
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({ search, employees }) => {
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type ReviewExpensePopupProp = {
  setEmployees: (value: Employee[]) => void;
};

const ReviewExpensePopup: React.FC<ReviewExpensePopupProp> = ({
  setEmployees,
}) => {
  const { user } = useUser();
  const { isOpen, setIsOpen, expenseId } = useReview();

  const date = new Date();
  const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${("0" + date.getDate()).slice(-2)}`;

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
    const newEmployee = await api.getEmployees();
    setEmployees(newEmployee);
    setIsOpen(false);
  };

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
                defaultValue={user?.username}
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
