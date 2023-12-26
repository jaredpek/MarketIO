export interface Metric {
    lower_quartile: number,
    mean: number,
    median: number,
    upper_quartile: number,
    quantity_reviewed: number
}

function ValueDisplay({
    title, value
}: {
    title: string,
    value: number,
}) {
    return (
        <div>
            <div className="font-semibold">{title}</div>
            <div>{value}</div>
        </div>
    )
}

export default function MetricData({
    title, metric
}: {
    title: string,
    metric: Metric,
}) {
    const {lower_quartile, mean, median, upper_quartile} = metric;
    return (
        <div className="rounded px-4 py-3">
            <div className="font-semibold underline">{title}</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <ValueDisplay title={`Mean ${title}`} value={mean} />
                <ValueDisplay title={`Median ${title}`} value={median} />
                <ValueDisplay title="Lower Quartile" value={lower_quartile} />
                <ValueDisplay title="Upper Quartile" value={upper_quartile} />
            </div>
        </div>
    )
}