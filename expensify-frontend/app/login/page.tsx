"use client";

import { LoginForm } from "@/components/form/login";
import { useState } from "react";
import { LoginButton } from "../../components/buttons/login";
import { FormInput } from "../../components/input/formInput";
import { useUser } from "../../context/UserContext";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const { setUser } = useUser();

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        if(res.ok) {
          const userData = await res.json();
          setUser(userData);
          window.location.href = "http://localhost:3000"
        }
        else {
          console.log("Fail")
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex items-center justify-center styled-background">
      <div className="backdrop-blur-sm bg-black/30 styled-login-form rounded-3xl">
      <form onSubmit={handleSubmit} method="post">
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
        <LoginButton />
      </form>
      </div>
      {/* <LoginForm /> */}
    </div>
  );
}
