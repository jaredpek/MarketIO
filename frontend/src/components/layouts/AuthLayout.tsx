"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GoogleAuth from "../user/auth/GoogleAuth";
import Link from "next/link";
import { getRedirect } from "@/lib/util";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loader from "../navigation/Loader";

export default function AuthLayout({
    children
}: {
    children?: React.ReactNode
}) {
    const path = usePathname();
    const params = useSearchParams();
    const {status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") router.push("/user/profile");
    }, [status])
    
    return (
        (status === "unauthenticated") ?
        <div className="max-w-[600px] m-auto">
            {children}
            <hr className="my-4" />
            <GoogleAuth />
            <hr className="my-4" />
            <div className="text-center">
                {
                    (path.includes("login")) ?
                    <>
                        {`Don't`} have an account? Register <Link href={`/user/auth/register?${getRedirect(path, params)}`} className="underline text-blue-500 hover:text-blue-400">here!</Link>
                    </> :
                    <>
                        Already have an account? Login <Link href={`/user/auth/login?${getRedirect(path, params)}`} className="underline text-blue-500 hover:text-blue-400">here!</Link>
                    </>
                }
            </div>
        </div> :
        <Loader />
    )
}