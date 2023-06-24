"use client";

import { LoginForm } from "@/components/form/login";
import "./style.css";

export default function Login() {
  return (
    <div className="flex items-center justify-center styled-background">
      <LoginForm />
    </div>
  );
}
