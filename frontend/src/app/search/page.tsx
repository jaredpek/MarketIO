"use client"

import Layout from "@/components/layouts/Layout";
import React, { useState } from "react";
import SearchSection from "@/components/search/SearchSection";
import ProductSearch from "@/components/search/products/ProductSearch";

export default function Page() {
    const [loading, setLoading] = useState(true);
    return (
        <Layout>
            <SearchSection loading={loading} />
            <ProductSearch loading={loading} setLoading={setLoading} />
        </Layout>
    )
}
