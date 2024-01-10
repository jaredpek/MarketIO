"use client"

import { useState } from "react";
import SearchSection from "./SearchSection";
import ProductSearch from "./products/ProductSearch";
import { useSession } from "next-auth/react";
import Success from "../fields/Success";

export default function SearchContent() {
    const [loading, setLoading] = useState(true);
    const {status} = useSession();
    return (
        <>
            {
                (status === "unauthenticated") &&
                <Success message="Please login to add items to watchlist" className="mb-4" />
            }
            <SearchSection loading={loading} />
            <ProductSearch 
                loading={loading} 
                setLoading={setLoading}
            />
        </>
    )
}