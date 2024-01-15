import { getKey } from "@/lib/util";
import ProductItem, { Product } from "./ProductItem";
import Error from "@/components/fields/Error";

export default function ProductGrid({
    products, watchlist, className=""
}: {
    products: Product[],
    watchlist: string[],
    className?: string
}) {
    return (
        products.length ?
        <div className={`select-none grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ${className}`}>
            {
                products.map(product => {
                    return <ProductItem 
                        key={getKey()} 
                        item={product} 
                        watchlist={watchlist}
                    />
                })
            }
        </div> :
        <Error message="No products found" />
    )
}
