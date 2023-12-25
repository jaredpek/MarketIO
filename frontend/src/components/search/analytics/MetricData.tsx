export interface Metric {
    lower_quartile: number,
    mean: number,
    median: number,
    upper_quartile: number,
    quantity_reviewed: number
}

export default function MetricData({
    title, metric
}: {
    title: string,
    metric: Metric,
}) {
    const {lower_quartile, mean, median, upper_quartile} = metric;
    return (
        <div>
            <div className="font-semibold">{title}</div>
            <div>Mean: {mean}</div>
            <div>Median: {median}</div>
            <div>Lower Quartile: {lower_quartile}</div>
            <div>Upper Quartile: {upper_quartile}</div>
        </div>
    )
}