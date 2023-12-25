import React from "react";

export default function FilterOption({
    title, children
}: {
    title: string,
    children: React.ReactNode,
}) {
    return (
        <div className="flex gap-3 items-center w-full">
            <span className="shrink-0">{title}</span>
            {children}
        </div>
    )
}