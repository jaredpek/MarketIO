import MetricData, { Metric } from "./MetricData";

export default function AnalyticsGrid({
    analytics, className=""
}: {
    analytics: {
        price: Metric,
        rating: Metric,
    },
    className?: string,
}) {
    return (
        <div className={`select-none ${className}`}>
            <div className="font-semibold underline">Analysing the Top {analytics.price.quantity_reviewed} Products...</div>
            <div className="flex gap-6">
                <MetricData title="Price" metric={analytics.price} />
                <MetricData title="Rating" metric={analytics.rating} />
            </div>
        </div>
    )
}