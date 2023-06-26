"use client";

import { useState } from "react";
import { FormInput } from "../../components/input/formInput";
import { useUser } from "../../context/UserContext";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUser();

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    const url = "http://localhost:8080/login";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          window.location.href = "http://localhost:3000";
        } else {
          setPassword("");
          setUsername("");
          setErrorMsg("Wrong username or password");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex items-center justify-center styled-background">
      <div className="backdrop-blur-sm bg-black/30 styled-login-form rounded-3xl">
        <form onSubmit={handleSubmit} autoComplete="on">
          <FormInput
            type={"text"}
            text={"Username"}
            input={username}
            onInput={handleUsername}
          />
          <FormInput
            type={"password"}
            text={"Password"}
            input={password}
            onInput={handlePassword}
          />
          <p style={{position: "absolute", color: "#99ffff", marginLeft: 50}}>{errorMsg}</p>
          <button type="submit" className="styled-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
