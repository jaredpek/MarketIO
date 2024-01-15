"use client"

import { action } from "@/lib/util";
import axios from "axios";
import { useState } from "react"
import Success from "@/components/fields/Success";
import Error from "@/components/fields/Error";
import Field from "@/components/fields/Field";
import Submit from "@/components/fields/Submit";

export default function ProfileForm({
    profile
}: {
    profile: {
        username?: string, 
        first_name?: string, 
        last_name?: string, 
        email?: string, 
        mobile_number?: string, 
        date_joined?: string
    }
}) {
    const [first, setFirst] = useState(profile.first_name);
    const [last, setLast] = useState(profile.last_name);
    const [mobile, setMobile] = useState(profile.mobile_number);
    const [updating, setUpdating] = useState("none" as action);
    const [errors, setErrors] = useState(Object);

    async function updateProfile() {
        setUpdating("progress");
        setErrors({});
        await axios.post(
            "/api/user/profile",
            {
                first_name: first,
                last_name: last,
                mobile_number: mobile
            },
        ).then(() => setUpdating("success"))
        .catch(({response: {data: {data: {errors}}}}) => {
            setErrors(errors);
            setUpdating("error");
        })
    }

    return (
        <div className="w-full">
            <div
                className="grid w-full gap-2 sm:grid-cols-2 mb-4"
                onKeyDown={e => {
                    if (e.key === "Enter") updateProfile();
                }}
            >
                <Field
                    title="Username"
                    value={profile.username}
                    disabled={true}
                />
                <Field
                    title="Member Since"
                    value={profile.date_joined}
                    disabled={true}
                    type="date"
                />
                <Field
                    title="First Name"
                    value={first}
                    onChange={e => setFirst(e.target.value)}
                    error={errors.first_name}
                />
                <Field
                    title="Last Name"
                    value={last}
                    onChange={e => setLast(e.target.value)}
                    error={errors.last_name}
                />
                <Field
                    title="Email"
                    type="email"
                    value={profile.email}
                    disabled={true}
                />
                <Field
                    title="Mobile Number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    error={errors.mobile_number}
                />
            </div>
            <div className="mb-4">
                {
                    (updating === "success") ?
                    <Success message="Profile successfully updated" /> :
                    (updating === "error") ?
                    <Error message="Error updating profile" /> :
                    <></>
                }
            </div>
            <Submit 
                loading={updating === "progress"}
                onClick={updateProfile}
                title="Update"
            />
        </div>
    )
}