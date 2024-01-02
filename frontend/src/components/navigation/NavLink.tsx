import Link from "next/link";

export default function NavLink({
    title, children, href="/search/?search=", search="", className=""
}: {
    title: string,
    children?: React.ReactNode
    href?: string,
    search?: string,
    className?: string
}) {
    return (
        <Link href={search ? `${href}${search}` : href} className={`gray text-[15px] flex-shrink-0 ${className}`}>
            {children}{title}
        </Link>
    )
}
