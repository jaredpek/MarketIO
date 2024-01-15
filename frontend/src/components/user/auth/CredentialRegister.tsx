"use client"

import { useState } from "react";
import Password from "../../fields/Password";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { action } from "@/lib/util";
import Field from "@/components/fields/Field";
import Submit from "@/components/fields/Submit";

export default function CredentialRegister({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(Object);
    const [state, setState] = useState("none" as action);
    const params = useSearchParams();

    async function register() {
        if (username && email && password && passwordConfirmation) {
            setState("progress");
            setErrors({});
            await axios.post(
                "/api/auth/register",
                {
                    username, email,
                    password1: password,
                    password2: passwordConfirmation,
                }
            ).then(response => {
                signIn(
                    "credentials", 
                    {
                        username, password,
                        redirect: true,
                        callbackUrl: params.get("redirect") || "/"
                    }
                )
            }).catch(({response: {data: {data: {errors}}}}) => {
                setErrors(errors);
                setState("error");
            })
        }
    }

    return (
        <div
            className={className}
            onKeyDown={e => {
                if (e.key === "Enter") register();
            }}
        >
            <div className="grid gap-2 mb-4">
                <Field
                    title="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    error={errors.username}
                />
                <Field
                    title="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    error={errors.email}
                />
                <Field title="Password" error={errors.password1 || errors.non_field_errors}>
                    <Password
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={`w-full ${errors.password1 || errors.non_field_errors ? "error-border" : ""}`}
                    />
                </Field>
                <Field title="Password Confirmation" error={errors.password2 || errors.non_field_errors}>
                    <Password
                        placeholder="Password Confirmation"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        className={`w-full ${errors.password2 || errors.non_field_errors ? "error-border" : ""}`}
                    />
                </Field>
            </div>
            <Submit
                loading={state === "progress"}
                onClick={register}
                title="Register"
            />
        </div>
    )
}