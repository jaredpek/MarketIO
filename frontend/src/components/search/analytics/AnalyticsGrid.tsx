import { useSearchParams } from "next/navigation";
import MetricData, { Metric } from "./MetricData";

export interface Analytics {
    price: Metric,
    rating: Metric,
}

export default function AnalyticsGrid({
    analytics, className=""
}: {
    analytics: Analytics,
    className?: string,
}) {
    const params = useSearchParams();
    return (
        <div className={`select-none ${className}`}>
            <div className="font-semibold underline mb-0.5">Analysing the top {analytics.price.quantity_reviewed} {`"${params.get("search")}"`}...</div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                <MetricData title="Price" metric={analytics.price} />
                <MetricData title="Rating" metric={analytics.rating} />
            </div>
        </div>
    )
}