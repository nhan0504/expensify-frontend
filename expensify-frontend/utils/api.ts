type NewExpense = {
  merchant: string;
  description: string;
  amount: number;
  purchase_date: string;
};

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

  async logOut() {
    fetch(this.baseUrl + "/logout");
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
    );
  }

  async addExpense(employeeId: string, newExpense: NewExpense) {
    await fetch(this.baseUrl + `/employees/${employeeId}/expenses`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });
  }
}

export const api = new Api("http://localhost:8080");
