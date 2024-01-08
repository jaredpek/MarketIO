"use client"

import { usePathname } from "next/navigation";
import GoogleAuth from "./GoogleAuth";
import Link from "next/link";

export default function AuthLayout({
    children
}: {
    children?: React.ReactNode
}) {
    const path = usePathname();
    return (
        <div className="max-w-[600px] m-auto">
            {children}
            <hr className="my-4" />
            <GoogleAuth />
            <hr className="my-4" />
                <div className="text-center">
                    {
                        (path.includes("login")) ?
                        <>
                            Don't have an account? Register <Link href="/user/auth/register" className="underline text-blue-500 hover:text-blue-400">here!</Link>
                        </> :
                        <>
                            Already have an account? Login <Link href="/user/auth/login" className="underline text-blue-500 hover:text-blue-400">here!</Link>
                        </>
                    }
                </div>
        </div>
    )
}