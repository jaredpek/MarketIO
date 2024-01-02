"use client"

import { BiUserCircle } from "react-icons/bi";
import NavIcon from "./NavIcon";
import UserMenu from "./UserMenu";
import { useState } from "react";

export default function UserSection() {
    const [hidden, setHidden] = useState(true);

    return (
        <NavIcon className="relative">
            <BiUserCircle 
                className="navbar-icon text-[35px] md:text-[45px]" 
                onClick={() => setHidden(!hidden)}
            />
            <UserMenu hidden={hidden} />
        </NavIcon>
    )
}