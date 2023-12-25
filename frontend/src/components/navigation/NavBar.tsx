import Link from "next/link";
import {BiMenu, BiUserCircle} from "react-icons/bi";
import NavLink from "./NavLink";
import NavIcon from "./NavIcon";
import {getKey} from "@/lib/util";

const links = [
    {title: "Smartphones", search: "smartphones"},
    {title: "Wireless Earbuds", search: "wireless+earbuds"},
    {title: "Laptops", search: "laptops"},
    {title: "Fashion", search: "fashion"},
    {title: "Gaming", search: "gaming"},
]

export default function NavBar() {
    return (
        <div className="w-full h-20 shadow-md py-5 md:h-24 md:py-7 flex items-center justify-center sticky top-0 bg-white z-50">
            <NavIcon className={"md:hidden"}>
                <BiMenu className="navbar-icon text-[25px]" />
            </NavIcon>
            <NavIcon className={"h-full flex flex-grow md:flex-grow-0 flex-shrink-0 items-center justify-center"}>
                <Link href={"/"} className="h-full">
                    <img src="/images/marketio_logo.png" className="h-full m-auto" />
                </Link>
            </NavIcon>
            <div className="w-full flex-grow hidden md:flex gap-10 items-center justify-center">
                {
                    links.map(({title, search}) => {
                        return <NavLink title={title} search={search} key={getKey()} />
                   })
               }
            </div>
            <NavIcon>
                <BiUserCircle className="navbar-icon text-[35px] md:text-[45px]" />
            </NavIcon>
        </div>
    )
}
