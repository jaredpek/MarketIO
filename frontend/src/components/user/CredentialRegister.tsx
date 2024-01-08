"use client"

import { useState } from "react";
import Input from "../fields/Input";
import Password from "../fields/Password";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function CredentialRegister({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const params = useSearchParams();

    async function register() {
        await axios.post(
            "/api/auth/register",
            {
                username, email,
                password1: password,
                password2: passwordConfirmation,
            }
        )
        .then(response => {
            signIn(
                "credentials", 
                {
                    username, password,
                    redirect: true,
                    callbackUrl: params.get("redirect") || "/"
                }
            )
        })
        .catch(errors => console.log(errors))
    }

    return (
        <div className={className}>
            <span>Username</span>
            <Input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full mb-2"
            />
            <span>Email</span>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mb-2"
            />
            <span>Password</span>
            <Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full mb-2"
            />
            <span>Password Confirmation</span>
            <Password
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                className="w-full mb-4"
            />
            <div
                className="rounded button submit"
                onClick={register}
            >
                Register
            </div>
        </div>
    )
}