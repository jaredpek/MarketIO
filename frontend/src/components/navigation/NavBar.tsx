import Link from "next/link";
import NavIcon from "./NavIcon";
import SideBar from "./SideBar";
import UserSection from "./UserSection";
import NavLinkSection from "./NavLinkSection";

const links = [
    {title: "Smartphones", search: "smartphones"},
    {title: "Wireless Earbuds", search: "wireless+earbuds"},
    {title: "Laptops", search: "laptops"},
    {title: "Fashion", search: "fashion"},
    {title: "Gaming", search: "gaming"},
]

export default function NavBar() {
    return (
        <div className="w-full h-20 shadow-md py-5 md:h-24 md:py-7 flex items-center justify-center sticky top-0 bg-white z-50 select-none">
            <SideBar links={links} />
            <NavIcon className={"h-full flex flex-grow md:flex-grow-0 flex-shrink-0 items-center justify-center"}>
                <Link href={"/"} className="h-full">
                    <img src="/images/marketio_logo.png" className="h-full m-auto" alt="MarketIO" />
                </Link>
            </NavIcon>
            <NavLinkSection links={links} />
            <UserSection />
        </div>
    )
}
