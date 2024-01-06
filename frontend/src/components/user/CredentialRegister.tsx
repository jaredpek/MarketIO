"use client"

import { useState } from "react";
import Input from "../fields/Input";
import Password from "../fields/Password";

export default function CredentialRegister({
    className=""
}: {
    className?: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
            <span>Password Confirmation</span>
            <Password
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                className="mb-2"
            />
            <span>Email</span>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mb-2"
            />
            <span>First Name</span>
            <Input
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full mb-2"
            />
            <span>Last Name</span>
            <Input
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full mb-4"
            />
            <div className="rounded button submit">Register</div>
        </div>
    )
}