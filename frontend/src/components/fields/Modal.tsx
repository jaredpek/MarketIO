import React from "react";

export default function Modal({
    children
}: {
    children?: React.ReactNode
}) {
    return (
        <>
            <div className="overlay w-full backdrop-brightness-50" />
            <div className="overlay w-[75%] bg-white rounded">
                {children}
            </div>
        </>
    )
}