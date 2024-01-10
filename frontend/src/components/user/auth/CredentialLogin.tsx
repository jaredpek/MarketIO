"use client"

import { useState } from "react";
import Password from "../../fields/Password";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Error from "@/components/fields/Error";
import Field from "@/components/fields/Field";

export default function CredentialLogin({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useSearchParams();

    function login() {
        if (username && password) {
            setLoading(true);
            signIn(
                "credentials",
                {
                    username, password,
                    redirect: true,
                    callbackUrl: params.get("redirect") || "/"
                }
            )
        } 
    }

    return (
        <div
            className={className}
            onKeyDown={e => {
                if (e.key === "Enter") login();
            }}
        >
            <div className="grid gap-2 mb-4">
                <Field
                    title="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Field title="Password">
                    <Password
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Field>
            </div>
            {
                !!(params.get("error") === "CredentialsSignin") &&
                <Error className="mb-4" message="Invalid username or password" />
            }
            <div
                className={`rounded button submit ${loading ? "loading" : ""}`}
                onClick={login}
            >
                Login
            </div>
        </div>
    )
}