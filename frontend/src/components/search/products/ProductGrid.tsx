import { getKey } from "@/lib/util";
import ProductItem, { Product } from "./ProductItem";

export default function ProductGrid({
    items, watchlist=[], className="", authenticated
}: {
    items: Product[],
    watchlist: Product[],
    authenticated: boolean,
    className?: string
}) {
    return (
        <div className={`select-none grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ${className}`}>
            {
                items.map(item => {
                    return <ProductItem 
                        key={getKey()} 
                        item={item} 
                        authenticated={authenticated} 
                        watchlisted={(() => {
                            for (let i = 0; i < watchlist.length; i ++) {
                                if (watchlist[i].key === item.key) return true;
                            }
                            return false;
                        })()} 
                    />
                })
            }
        </div>
    )
}
