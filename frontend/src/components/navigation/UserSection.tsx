"use client"

import { BiUserCircle } from "react-icons/bi";
import NavIcon from "./NavIcon";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import NavLink from "./NavLink";
import { getRedirect } from "@/lib/util";

export default function UserSection() {
    const [hidden, setHidden] = useState(true);
    const path = usePathname();
    const params = useSearchParams();
    const {status} = useSession();

    return (
        <NavIcon className="relative">
            {
                (status === "authenticated") ?
                <>
                    <BiUserCircle 
                        className="navbar-icon text-[35px] md:text-[45px]" 
                        onMouseEnter={() => setHidden(false)}
                        onMouseLeave={() => setHidden(true)}
                    />
                    <UserMenu
                        hidden={hidden}
                        onMouseEnter={() => setHidden(false)}
                        onMouseLeave={() => setHidden(true)}
                    />
                </> :
                <NavLink title="Login" href={`/user/auth/login?${getRedirect(path, params)}`} className="rounded text-sm py-2.5 px-3 md:text-base md:px-4 md:py-3 border-none submit !text-white" />
            }
        </NavIcon>
    )
}