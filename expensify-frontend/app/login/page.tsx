"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FormInput } from "../../components/input/formInput";
import { useUser } from "../../context/UserContext";
import { api } from "@/utils/api";
import "./style.css";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    try {
      const user = await api.formLogin(target.Username.value, target.Password.value);
      setUser(user);
      router.push('/');
    } catch {
      target.Username.value = "";
      target.Password.value = "";
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
          />
          <FormInput
            type={"password"}
            text={"Password"}
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
