"use client"

import { BsSearch } from "react-icons/bs";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({
    className=""
}: {
    className?: string
}) {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        setSearch(params.get("search") || "");
    }, [params])

    function executeSearch() {
        router.push("/search/?search=" + search);
    }

    return (
        <div className={`flex items-center justify-center max-w-[600px] h-[44px] rounded-edge ${className}`}>
            <Input
                className="w-full border-none focus:outline-none pr-0 h-[42px]"
                placeholder="Search..."
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
                className="gray cursor-pointer mx-3.5"
                onClick={e => {
                    if (search) executeSearch();
                }}
                title="Search"
            />
        </div>
    )
}