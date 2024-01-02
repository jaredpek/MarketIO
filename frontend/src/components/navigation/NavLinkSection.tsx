import { getKey } from "@/lib/util";
import NavLink from "./NavLink";

const links = [
    {title: "Smartphones", search: "smartphones"},
    {title: "Wireless Earbuds", search: "wireless+earbuds"},
    {title: "Laptops", search: "laptops"},
    {title: "Fashion", search: "fashion"},
    {title: "Gaming", search: "gaming"},
]

export default function NavLinkSection({
    links
}: {
    links: {title: string, search: string}[]
}) {
    return (
        <div className="w-full flex-grow hidden md:flex gap-10 items-center justify-center">
            {
                links.map(({title, search}) => {
                    return <NavLink title={title} search={search} key={getKey()} />
            })
        }
        </div>
    )
}