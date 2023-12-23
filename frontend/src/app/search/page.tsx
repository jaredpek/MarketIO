import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/navigation/SearchBar";
import FilterOptions from "@/components/search/FilterOptions";
import ProductAnalytics from "@/components/search/analytics/ProductAnalytics";
import ProductSearch from "@/components/search/products/ProductSearch";

export default function Page() {
    return (
        <Layout>
            <div className="flex gap-4">
                <FilterOptions />
                <div className="flex-grow">
                    <SearchBar className="max-w-none" />
                    <ProductSearch />
                </div>
                <ProductAnalytics />
            </div>
        </Layout>
    )
}
