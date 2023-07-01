"use client";

import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useState, useEffect, useCallback } from "react";
import { Expense } from "@/shared/types";
import "./style.css";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    user
      ? api.getExpenses(user.id).then((res) => setExpenses(res))
      : router.push("/login");
  }, [user]);

  return (
    <main>
      <Header />
      <Search />
      {user && expenses && <ExpensesTable items={expenses} />}
    </main>
  );
}

const Header = () => {
  return (
    <div
      style={{ padding: 10, backgroundColor: "beige" }}
      className="flex items-center"
    >
      <p>My expenses</p>
    </div>
  );
};

const Search = () => {
  return (
    <div style={{ margin: 50, marginLeft: "70%" }}>
      <input type="text" placeholder="Search by merchant" />
    </div>
  );
};

type ExpensesTableProp = {
  items: Expense[];
};

const ExpensesTable: React.FC<ExpensesTableProp> = ({ items }) => {
  return (
    <div className="flex justify-center">
      <table>
        <tr style={{ backgroundColor: "beige" }}>
          <th style={{ padding: 10 }}>Merchant</th>
          <th style={{ padding: 10 }}>Purchase Date</th>
          <th style={{ padding: 10 }}>Amount</th>
          <th style={{ padding: 10 }}>Description</th>
          <th style={{ padding: 10 }}>Status</th>
          <th style={{ padding: 10 }}>Reviewed By</th>
          <th style={{ padding: 10 }}>Review Date</th>
          <th style={{ padding: 10 }}>Comment</th>
        </tr>
      </table>
    </div>
  );
};
