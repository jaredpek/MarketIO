import Selector, { Option } from "@/components/fields/Selector";
import FilterOption from "./FilterOption";

export const sortOptions = [
    {value: "relevance", label: "Relevance"},
    {value: "priceasc", label: "Price Ascending"},
    {value: "pricedesc", label: "Price Descending"},
]

export default function SortFilter({
    value, onChange
}: {
    value: Option,
    onChange: (data: Option) => void
}) {
    return (
        <FilterOption title="Sort By">
            <Selector
                className="w-full"
                options={sortOptions}
                value={value}
                onChange={onChange}
            />
        </FilterOption>
    )
}