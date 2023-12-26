import { TbDeviceAnalytics, TbFilterSearch } from "react-icons/tb";
import SearchBar from "../fields/SearchBar";
import SearchFilters from "./filter/SearchFilters";
import ProductAnalytics from "./analytics/ProductAnalytics";
import { useState } from "react";

function TriggerButton({
    title, children, onClick
}: {
    title: string,
    children: React.ReactNode,
    onClick?: React.MouseEventHandler,
}) {
    return (
        <div
            className="rounded button w-[55px] gray"
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    )
}

export default function SearchSection({
    loading
}: {
    loading: boolean
}) {
    const [filterHidden, setFilterHidden] = useState(true);
    const [analyticsHidden, setAnalyticsHidden] = useState(true);
    return (
        <div className="select-none">
            <div className="mb-2 w-full">
                <div className="flex gap-2 mb-2">
                    <SearchBar className="w-full max-w-none" />
                    <TriggerButton title="Filter" onClick={() => setFilterHidden(!filterHidden)}><TbFilterSearch size={23} /></TriggerButton>
                    <TriggerButton title="Analytics" onClick={() => setAnalyticsHidden(!analyticsHidden)}><TbDeviceAnalytics size={24} /></TriggerButton>
                </div>
                <SearchFilters className={`mb-2 ${filterHidden ? "hidden" : ""}`} loading={loading} />
                <ProductAnalytics className={`mb-2 ${analyticsHidden ? "hidden" : ""}`} />
            </div>
        </div>
    )
}