"use client";

import { useUser } from "../context/UserContext";
import "./style.css";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="background_home">
      <div className="welcome_container">
        {user ? (
          <p className="animate-bounce welcome">Hello, {user.username}!</p>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </main>
  );
}
