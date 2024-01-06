"use client"

import { usePathname } from "next/navigation";
import { IoLogoGoogle } from "react-icons/io";
import { signIn } from "next-auth/react";

export default function GoogleAuth() {
    const path = usePathname();
    return (
        <div
            className="rounded button gap-2 bg-red-500 hover:bg-red-400 text-white"
            onClick={() => signIn("google", {callbackUrl: "/"})}
        >
            <IoLogoGoogle size={22} className="shrink-0" />
            {path.includes("login") ? "Login" : "Register"} with Google
        </div>
    )
}