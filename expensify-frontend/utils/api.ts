import { NewExpense } from "@/shared/types";

class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async formLogin(username: string, password: string) {
    const response = await fetch(this.baseUrl + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  }

  async getExpenses(employeeId: string) {
    const response = await fetch(
      this.baseUrl + `/employees/${employeeId}/expenses`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Fail to get expenses");
    }
    return await response.json();
  }

  async deleteExpense(employeeId: string, expenseId: string) {
    await fetch(
      this.baseUrl + `/employees/${employeeId}/expenses/${expenseId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    ).then((res) => res.ok);
  }

  async addExpense(employeeId: string, newExpense: NewExpense) {
    await fetch(`http://localhost:8080/employees/${employeeId}/expenses`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });
  }
}

export const api = new Api("http://localhost:8080");