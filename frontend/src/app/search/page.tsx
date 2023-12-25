import Layout from "@/components/layouts/Layout";
import React from "react";
import ProductSearch from "@/components/search/products/ProductSearch";
import SearchSection from "@/components/search/SearchSection";

export default function Page() {
    return (
        <Layout>
            <SearchSection />
            <ProductSearch />
        </Layout>
    )
}
