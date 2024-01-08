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
                        onClick={() => setHidden(!hidden)}
                    />
                    <UserMenu hidden={hidden} />
                </> :
                <NavLink title="Login" href={`/user/auth/login?${getRedirect(path, params)}`} className="rounded p-3 border-none submit !text-white" />
            }
        </NavIcon>
    )
}