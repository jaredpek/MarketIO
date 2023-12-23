import { getKey } from "@/lib/util";
import ProductItem from "./ProductItem";

export default function ProductGrid({
    items, className=""
}: {
    items: {
        id: string,
        title: string,
        url: string,
        image: string,
        currency: string,
        price: number,
        rating: number,
        rating_qty: number,
        platform: string,
    }[],
    className?: string
}) {
    return (
        <div className={`grid grid-cols-4 ${className}`}>
            {
                items.map(item => {
                    return <ProductItem key={getKey()} item={item} />
                })
            }
        </div>
    )
}
