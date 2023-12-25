"use client"

import { useEffect, useState } from "react";
import AnalyticsGrid from "./AnalyticsGrid";

export default function ProductAnalytics({
    className="",
}: {
    className?: string
}) {
    const [analytics, setAnalytics] = useState({
        price: {
            lower_quartile: 39.59,
            mean: 624.14,
            median: 359.9,
            upper_quartile: 929.0,
            quantity_reviewed: 1033
        },
        rating: {
            lower_quartile: 0,
            mean: 1.87,
            median: 0,
            upper_quartile: 4.7,
            quantity_reviewed: 1033
        }
    });

    useEffect(() => {
        setAnalytics({
            price: {
                lower_quartile: 39.59,
                mean: 624.14,
                median: 359.9,
                upper_quartile: 929.0,
                quantity_reviewed: 1033
            },
            rating: {
                lower_quartile: Math.random(),
                mean: 1.87,
                median: 0,
                upper_quartile: 4.7,
                quantity_reviewed: 1033
            }
        })
    }, []);

    return (
        <AnalyticsGrid className={className} analytics={analytics} />
    )
}