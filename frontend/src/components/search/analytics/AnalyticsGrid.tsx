export default function AnalyticsGrid({
    analytics, className=""
}: {
    analytics: any,
    className?: string,
}) {
    return (
        <div className={className}>{analytics}</div>
    )
}