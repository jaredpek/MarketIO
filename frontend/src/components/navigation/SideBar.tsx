"use client"

import { BiMenu } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import NavIcon from "./NavIcon";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "../fields/SearchBar";
import NavLink from "./NavLink";
import { getKey } from "@/lib/util";

export default function SideBar({
    links
}: {
    links: {title: string, search: string}[]
}) {
    const [hidden, setHidden] = useState(true);
    const toggle = () => setHidden(!hidden);

    return (
        <div className="select-none">
            <NavIcon className={"md:hidden"}>
                <BiMenu className="navbar-icon text-[25px]" onClick={toggle} />
            </NavIcon>
            <div
                className={`overlay backdrop-brightness-50 w-full ${hidden ? "hidden" : ""}`}
                onClick={toggle}
            />
            <div className={`overlay w-[280px] bg-white p-12 shadow-2xl ${hidden ? "hidden" : ""}`}>
                <div className="w-full h-[45px] flex justify-between items-center mb-10">
                    <Link href={"/"} className="h-full">
                        <img src="/images/marketio_logo.png" className="h-full" alt="MarketIO" />
                    </Link>
                    <RxCross1 className="cursor-pointer gray" size={30} onClick={toggle} />
                </div>
                <SearchBar className="mb-10" />
                <div className="flex flex-col gap-2">
                    {
                        links.map(({title, search}) => {
                            return <NavLink key={getKey()} title={title} search={search} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}