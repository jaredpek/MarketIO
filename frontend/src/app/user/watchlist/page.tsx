import Layout from "@/components/layouts/Layout";
import WatchlistContent from "@/components/user/watchlist/WatchlistContent";

export default function Page() {
    return (
        <Layout>
            <WatchlistContent backendUrl={process.env.NEXTAUTH_BACKEND_URL || ""} />
        </Layout>
    )
}