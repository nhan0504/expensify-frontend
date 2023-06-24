"user-client";

import { useState } from "react";
import { LoginButton } from "../buttons/login";
import { FormInput } from "../input/formInput";
import { redirect } from "next/navigation";
//import { onLogin } from "@/app/api/login";
import "./style.css";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    console.log(data);

    const url = "http://localhost:8080/login";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((res) =>
        res.ok
          ? (window.location.href = "http://localhost:3000")
          : setErrorMsg("Wrong")
      )
      .catch((e) => console.log(e));
  };

  return (
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
        <div style={{position: "absolute", paddingLeft: 130, paddingBottom: 20}}>
          <p>{errorMsg}</p>
        </div>

        <LoginButton />
      </form>
    </div>
  );
}
