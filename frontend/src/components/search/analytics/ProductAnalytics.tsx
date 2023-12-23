"use client"

import { useState } from "react";
import AnalyticsGrid from "./AnalyticsGrid";

export default function ProductAnalytics({
    className="",
}: {
    className?: string
}) {
    const [analytics, setAnalytics] = useState("Analytics");

    return (
        <AnalyticsGrid className={className} analytics={analytics} />
    )
}