"use client"

import { useState } from "react"
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        setLogin(true);
    }

    return(
        <div>
            <form>
                <p>Username</p>
                <input type="text" value={username} style={{color: "black"}} placeholder="username" onChange={handleUsername} />
                <p>Password</p>
                <input type="password" value={password} style={{color: "black"}} placeholder="password" onChange={handlePassword} />
            </form>
            <button onClick={handleLogin}>Log in</button>
            <p>{login ? "Logged in successfully" : ""}</p>
        </div>
    )
}