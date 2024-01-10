"use client"

import Loader from "@/components/navigation/Loader";
import ProductGrid from "@/components/search/products/ProductGrid";
import { Product } from "@/components/search/products/ProductItem";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WatchlistContent() {
    const {status} = useSession();
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        if (status === "authenticated") {
            axios.get(
                "/api/user/watchlist",
            ).then(({data: {data: {items}}}) => setProducts(items))
            .catch(errors => console.log(errors))
            .finally(() => setLoaded(true))
        }
    }, [status])
    
    return (
        (!loaded) || (status !== "authenticated") ?
        <Loader /> :
        <ProductGrid
            products={products}
            watchlist={products.slice(0)}
        />
    )
}