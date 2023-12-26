import { getKey } from "@/lib/util";
import ProductItem, { Product } from "./ProductItem";

export default function ProductGrid({
    items, className=""
}: {
    items: Product[],
    className?: string
}) {
    return (
        <div className={`select-none grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ${className}`}>
            {
                items.map(item => {
                    return <ProductItem key={getKey()} item={item} />
                })
            }
        </div>
    )
}
