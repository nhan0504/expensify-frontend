"use client";

import { useUser } from "../context/UserContext";
export default function Home() {
  const { user, setUser } = useUser();

  return (
    <main
      style={{
        backgroundImage: `url("/background_home.jpg")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100vh",
      }}
    >
      <div style={{ padding: "20%" }}>
        {user ? (
          <p
            className="animate-bounce"
            style={{ fontSize: 100, color: "white" }}
          >
            Hello, {user.username}!
          </p>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </main>
  );
}
