import { useEffect, useState } from "react";
import AnalyticsGrid, { Analytics } from "./AnalyticsGrid";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/navigation/Loader";
import Error from "@/components/fields/Error";

export default function ProductAnalytics({
    className="",
}: {
    className?: string
}) {
    const [analytics, setAnalytics] = useState <Analytics | null> (null);
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/api/analytics/?search=${params.get("search") || ""}`)
            .then(({data}) => setAnalytics(data.data.analytics))
            .catch((errors) => console.log(errors))
            .finally(() => setLoading(false));
    }, [params.get("search")]);

    return (
        <div className={className}>
            {
                loading ?
                <Loader message="Generating Analytics..." /> :
                analytics ?
                <AnalyticsGrid analytics={analytics} /> :
                <Error message="No Products to Generate Analytics" />
            }
        </div>
    )
}