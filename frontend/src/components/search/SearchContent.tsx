"use client"

import { useState } from "react";
import SearchSection from "./SearchSection";
import ProductSearch from "./products/ProductSearch";

export default function SearchContent() {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <SearchSection loading={loading} />
            <ProductSearch loading={loading} setLoading={setLoading} />
        </>
    )
}