"use client";

import { useState } from "react";
import "./style.css"

export function LoginButton() {
    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin(true);
      };

    return(
        <div>
            <button onClick={handleLogin} className="styled-button">
        Log in
      </button>
      <p>{login ? "Logged in successfully" : ""}</p>
        </div>
    )
}