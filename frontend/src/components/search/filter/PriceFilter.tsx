import Input from "@/components/fields/Input";
import FilterOption from "./FilterOption";
import { ChangeEventHandler } from "react";

export default function PriceFilter({
    minPriceValue, maxPriceValue, minPriceChange, maxPriceChange
}: {
    minPriceValue: string,
    maxPriceValue: string,
    minPriceChange: ChangeEventHandler<HTMLInputElement>,
    maxPriceChange: ChangeEventHandler<HTMLInputElement>,
}) {
    return (
        <FilterOption title="Price">
            <div className="flex items-center gap-1 w-full">
                <Input
                    type="number"
                    placeholder="Min..."
                    value={minPriceValue}
                    onChange={minPriceChange}
                    className="w-full"
                />
                -
                <Input
                    type="number"
                    placeholder="Max..."
                    value={maxPriceValue}
                    onChange={maxPriceChange}
                    className="w-full"
                />
            </div>
        </FilterOption>
    )
}
