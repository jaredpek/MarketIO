import Selector, { Option } from "@/components/fields/Selector";
import FilterOption from "./FilterOption";

export const sortOptions = [
    {value: "relevance", label: "Relevance"},
    {value: "priceasc", label: "Price Ascending"},
    {value: "pricedesc", label: "Price Descending"},
]

export default function SortFilter({
    value, onChange, className=""
}: {
    value: Option,
    onChange: (data: Option) => void,
    className?: string
}) {
    return (
        <FilterOption title="Sort By" className={className}>
            <Selector
                className="w-full"
                options={sortOptions}
                value={value}
                onChange={onChange}
            />
        </FilterOption>
    )
}