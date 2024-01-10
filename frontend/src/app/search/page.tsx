import Layout from "@/components/layouts/Layout";
import SearchContent from "@/components/search/SearchContent";

export default function Page() {
    return (
        <Layout>
            <SearchContent backendUrl={process.env.NEXTAUTH_BACKEND_URL || ""} />
        </Layout>
    )
}
