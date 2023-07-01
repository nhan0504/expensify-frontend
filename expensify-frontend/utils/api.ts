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
}

export const api = new Api("http://localhost:8080");
