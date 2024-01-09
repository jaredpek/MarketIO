import { ReactNode } from "react";

export default function Message({
    className="", children
}: {
    children: ReactNode,
    className?: string,
}) {
    return (
        <div className={`rounded px-4 border-none flex gap-2 items-center justify-center min-h-[44px] py-2 ${className}`}>
            {children}
        </div>
    )
}