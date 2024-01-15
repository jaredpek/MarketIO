"use client"

import { action, convertDate } from "@/lib/util";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Success from "@/components/fields/Success";
import Error from "@/components/fields/Error";
import Loader from "@/components/navigation/Loader";
import Field from "@/components/fields/Field";
import Submit from "@/components/fields/Submit";

export default function ProfileForm() {
    const {status}: any = useSession();
    const [username, setUsername] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [updating, setUpdating] = useState("none" as action);
    const [errors, setErrors] = useState(Object);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    async function getProfile() {
        const {data: {username, first_name, last_name, email, mobile_number, date_joined}} = await axios.get(
            "/api/user/profile"
        ).then(({data}) => data)
        
        setUsername(username);
        setFirst(first_name);
        setLast(last_name);
        setEmail(email);
        setMobile(mobile_number);
        setDateJoined(convertDate(date_joined));
    }

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

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/user/auth/login"); return;
        }
        getProfile().finally(() => setLoaded(true));
    }, [status])

    return (
        (!loaded) || (status !== "authenticated") ?
        <Loader /> :
        <div className="max-w-[1000px] m-auto">
            <div
                className="grid w-full gap-2 sm:grid-cols-2 mb-4"
                onKeyDown={e => {
                    if (e.key === "Enter") updateProfile();
                }}
            >
                <Field
                    title="Username"
                    value={username}
                    disabled={true}
                />
                <Field
                    title="Member Since"
                    value={dateJoined}
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
            />
        </div>
    )
}