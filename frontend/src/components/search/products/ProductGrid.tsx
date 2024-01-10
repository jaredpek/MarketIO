import { getKey } from "@/lib/util";
import ProductItem, { Product } from "./ProductItem";
import { useState } from "react";

export default function ProductGrid({
    products, watchlist: watchlistItems, className=""
}: {
    products: Product[],
    watchlist: Product[],
    className?: string
}) {
    const [watchlist, setWatchlist] = useState(watchlistItems.map(({key}) => key));

    return (
        <div className={`select-none grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ${className}`}>
            {
                products.map(product => {
                    return <ProductItem 
                        key={getKey()} 
                        item={product} 
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}
                    />
                })
            }
        </div>
    )
}
