import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductGrid from "./ProductGrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import { useSession } from "next-auth/react";
import { Product } from "./ProductItem";

export default function ProductSearch({
    loading, setLoading, className=""
}: {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    className?: string,
}) {
    const params = useSearchParams();
    const {status} = useSession();
    const [watchlist, setWatchlist] = useState([] as string[]);
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        if (status === "authenticated") {
            axios.get("/api/user/watchlist")
            .then(({data: {data: {items}}}: {data: {data: {items: Product[]}}}) => setWatchlist(items.map((item) => item.key)))
            .catch(errors => console.log(errors))
        }
    }, [status])

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/search?${params.toString()}`)
        .then(({data: {data: {products}}}) => setProducts(products))
        .catch(errors => console.log(errors))
        .finally(() => setLoading(false))
    }, [params])

    return (
        loading ?
        <Loader message="Searching Products..." /> :
        <ProductGrid
            className={className}
            products={products} 
            watchlist={watchlist}
        />
    )
}
