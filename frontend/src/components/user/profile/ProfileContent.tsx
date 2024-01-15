"use client"

import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import { useRouter } from "next/navigation";
import { convertDate } from "@/lib/util";

export default function ProfileContent() {
    const {status}: any = useSession();
    const [loaded, setLoaded] = useState(false);
    const [profile, setProfile] = useState({});
    const router = useRouter();
    
    async function getProfile() {
        const {data: {username, first_name, last_name, email, mobile_number, date_joined}} = await axios.get(
            "/api/user/profile"
        ).then(({data}) => data)

        setProfile({
            username, first_name, last_name, email, mobile_number,
            date_joined: convertDate(date_joined)
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
            <ProfileForm profile={profile} />
        </div>
    )
}