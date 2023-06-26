class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async formLogin(username: string, password: string) {
    const response = await fetch(this.baseUrl + "/login", {
      method: "POST",
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
}

export default Api;
