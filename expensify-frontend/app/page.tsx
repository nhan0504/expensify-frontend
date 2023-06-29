"use client";

import { useUser } from "../context/UserContext";
import { useRouter } from 'next/navigation';
import "./style.css";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("login");
  }

  return (
    <main className="background-home">
      <div className="welcome-container">
        {user && <p className="animate-bounce welcome">Hello, {user.username}!</p> }
      </div>
    </main>
  );
}
