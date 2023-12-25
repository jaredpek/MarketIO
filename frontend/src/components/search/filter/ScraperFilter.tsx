import Selector, { Option } from "@/components/fields/Selector";
import FilterOption from "./FilterOption";

export const scraperOptions = [
    {value: "aliexpress", label: "AliExpress"},
    {value: "amazon", label: "Amazon"},
    {value: "ezbuy", label: "EzBuy"},
    {value: "lazada", label: "Lazada"},
    {value: "qoo10", label: "Qoo10"},
]

export default function ScraperFilter({
    value, onChange
}: {
    value: Option[],
    onChange: (data: Option[]) => void
}) {
    return (
        <FilterOption title="Platform">
            <Selector
                className="w-full"
                isMulti={true}
                isClearable={true}
                options={scraperOptions}
                value={value}
                onChange={onChange}
            />
        </FilterOption>
    )
}