import Link from "next/link";

export default function NavLink({
    title, search
}: {
    title: string,
    search: string
}) {
    return (
        <Link href={"/search/?search=" + search} className="gray gray-hover text-[15px] flex-shrink-0">
            {title}
        </Link>
    )
}
