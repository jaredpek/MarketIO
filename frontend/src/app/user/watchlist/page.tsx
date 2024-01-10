import Title from "@/components/fields/Title";
import Layout from "@/components/layouts/Layout";
import WatchlistContent from "@/components/user/watchlist/WatchlistContent";

export default function Page() {
    return (
        <Layout>
            <Title title="Watchlist" />
            <WatchlistContent />
        </Layout>
    )
}