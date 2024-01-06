"use client"

import GoogleAuth from "./GoogleAuth";

export default function AuthLayout({
    children
}: {
    children?: React.ReactNode
}) {
    return (
        <div className="max-w-[600px] m-auto">
            {children}
            <hr className="my-4" />
            <GoogleAuth />
        </div>
    )
}