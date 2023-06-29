"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FormInput } from "../../components/input/formInput";
import { useUser } from "../../context/UserContext";
import { api } from "@/utils/api";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const user = await api.formLogin(target.Username.value, target.Password.value);
      setUser(user);
      router.push('/');
    } catch {
      setPassword("");
      setUsername("");
      setErrorMsg("Wrong username or password");
    }
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
          <p className="styled-error">{errorMsg}</p>
          <button type="submit" className="styled-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
