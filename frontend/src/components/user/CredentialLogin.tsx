"use client"

import { useState } from "react";
import Input from "../fields/Input";
import Password from "../fields/Password";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function CredentialLogin({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const params = useSearchParams();

    function login() {
        if (username && password) signIn(
            "credentials",
            {
                username, password,
                redirect: true,
                callbackUrl: params.get("redirect") || "/"
            }
        )
    }

    return (
        <div className={className}>
            <span>Username</span>
            <Input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full mb-2"
                onKeyDown={e => {
                    if (e.key === "Enter") login();
                }}
            />
            <span>Password</span>
            <Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mb-4"
                onKeyDown={e => {
                    if (e.key === "Enter") login();
                }}
            />
            <div
                className="rounded button submit"
                onClick={login}
            >
                Login
            </div>
        </div>
    )
}