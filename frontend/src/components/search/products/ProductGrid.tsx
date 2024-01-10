import { getKey } from "@/lib/util";
import ProductItem, { Product } from "./ProductItem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProductGrid({
    items, className="", backendUrl
}: {
    items: Product[],
    backendUrl: string,
    className?: string
}) {
    const {data, status} = useSession();
    const [loaded, setLoaded] = useState(false);
    const [watchlist, setWatchlist] = useState([] as string[]);

    useEffect(() => {
        if (status === "authenticated") {
            const {access} = data as any;
            axios.get(
                `${backendUrl}/api/watchlists/`,
                {headers: {Authorization: `Bearer ${access}`}}
            ).then(({data: {data: {items}}}) => setWatchlist(items.map((item: Product) => item.key)))
            .catch(errors => console.log(errors))
            .finally(() => setLoaded(true))
        }
    }, [status])

    return (
        loaded &&
        <div className={`select-none grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ${className}`}>
            {
                items.map(item => {
                    return <ProductItem 
                        key={getKey()} 
                        item={item} 
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}
                        backendUrl={backendUrl}
                    />
                })
            }
        </div>
    )
}
