import React from "react";

export default function FilterOption({
    title, children, className=""
}: {
    title: string,
    children: React.ReactNode,
    className?: string
}) {
    return (
        <div className={`flex gap-3 items-center w-full ${className}`}>
            <span className="shrink-0">{title}</span>
            {children}
        </div>
    )
}