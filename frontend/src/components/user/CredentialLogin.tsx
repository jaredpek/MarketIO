"use client"

import { useState } from "react";
import Input from "../fields/Input";
import Password from "../fields/Password";

export default function CredentialLogin({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={className}>
            <span>Username</span>
            <Input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full mb-2"
            />
            <span>Password</span>
            <Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mb-4"
            />
            <div className="rounded button submit">Login</div>
        </div>
    )
}