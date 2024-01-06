import NavLink from "./NavLink";
import { IoMdLogIn, IoMdLogOut, IoIosHeartEmpty } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { PiUserPlus } from "react-icons/pi";
import { usePathname, useSearchParams } from "next/navigation";

function MenuLink({
    title, children, href
}: {
    title: string,
    children: React.ReactNode
    href: string
}) {
    return (
        <NavLink title={title} href={href} className="flex gap-2 items-center pl-4 pr-5 py-1 hover:bg-gray-200 hover:text-gray-600 text text-[13px] md:text-[15px]">
            {children}
        </NavLink>
    )
}

export default function UserMenu({
    hidden
}: {
    hidden: boolean,
}) {
    const params = useSearchParams();
    const path = usePathname();

    function getRedirect() {
        if (path.includes("login") || path.includes("register")) return `${params.toString()}`;
        return `redirect=${path}?${params.toString()}`
    }

    return (
        <div className={`absolute right-5 py-2 bg-white rounded ${hidden ? "hidden" : ""}`} >
            <MenuLink title="Login" href={`/user/auth/login?${getRedirect()}`}>
                <IoMdLogIn size={18} />
            </MenuLink>
            <MenuLink title="Register" href={`/user/auth/register?${getRedirect()}`}>
                <PiUserPlus size={18} />
            </MenuLink>
            <MenuLink title="Profile" href="/user/profile">
                <RiProfileLine size={18} />
            </MenuLink>
            <MenuLink title="Watchlist" href="/user/watchlist">
                <IoIosHeartEmpty size={18} />
            </MenuLink>
            <MenuLink title="Logout" href="/">
                <IoMdLogOut size={18} />
            </MenuLink>
        </div>
    )
}
