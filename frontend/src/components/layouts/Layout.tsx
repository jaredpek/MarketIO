import React from "react";
import NavBar from "../navigation/NavBar";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <div className="px-3 min-[300px]:px-7 py-7 max-w-[1300px] m-auto">
                {children}
            </div>
        </>
    )
}
