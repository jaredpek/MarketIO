import NavLink from "./NavLink";
import { IoMdLogOut, IoIosHeartEmpty } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

function MenuLink({
    title, children, href, onClick
}: {
    title: string,
    children: React.ReactNode
    href: string
    onClick?: MouseEventHandler
}) {
    return (
        <NavLink title={title} href={href} className="flex gap-2 items-center pl-4 pr-5 py-1 hover:bg-gray-200 hover:text-gray-600 text text-[13px] md:text-[15px]" onClick={onClick}>
            {children}
        </NavLink>
    )
}

export default function UserMenu({
    hidden
}: {
    hidden: boolean,
}) {
    return (
        <div className={`absolute right-5 py-2 bg-white rounded ${hidden ? "hidden" : ""}`} >
            <MenuLink title="Profile" href="/user/profile">
                <RiProfileLine size={18} />
            </MenuLink>
            <MenuLink title="Watchlist" href="/user/watchlist">
                <IoIosHeartEmpty size={18} />
            </MenuLink>
            <MenuLink title="Logout" href="#" onClick={() => signOut({callbackUrl: "/"})}>
                <IoMdLogOut size={18} />
            </MenuLink>
        </div>
    )
}
