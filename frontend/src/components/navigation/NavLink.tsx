import Link from "next/link";
import { MouseEventHandler } from "react";

export default function NavLink({
    title, children, href="/search/?search=", search="", className="", onClick=undefined
}: {
    title: string,
    children?: React.ReactNode
    href?: string,
    search?: string,
    className?: string,
    onClick?: MouseEventHandler
}) {
    return (
        <Link 
            href={
                search ? 
                `${href}${search}` : 
                href
            } 
            className={`gray text-[15px] flex-shrink-0 ${className}`} 
            onClick={onClick}
        >
            {children}{title}
        </Link>
    )
}
