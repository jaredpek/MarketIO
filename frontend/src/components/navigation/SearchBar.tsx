"use client"

import { BsSearch } from "react-icons/bs";
import Input from "../fields/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
    className=""
}: {
    className?: string
}) {
    const [search, setSearch] = useState("");
    const router = useRouter();

    function executeSearch() {
        router.push("/search/?search=" + search);
    }

    return (
        <div className={`flex items-center justify-center max-w-[600px] rounded-edge ${className}`}>
            <Input
                className="w-full border-none focus:outline-none pr-0"
                placeholder="Search a product"
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                }}
                onKeyDown={e => {
                    if (e.key === "Enter" && search) executeSearch();
                }}
            />
            <BsSearch 
                size={20} 
                className="gray gray-hover cursor-pointer mx-3.5"
                onClick={e => {
                    if (search) executeSearch();
                }}
            />
        </div>
    )
}