import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductGrid from "./ProductGrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import Error from "@/components/fields/Error";
import { useSession } from "next-auth/react";

export default function ProductSearch({
    loading, setLoading, className=""
}: {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    className?: string,
}) {
    const params = useSearchParams();
    const {status} = useSession();
    const [watchlist, setWatchlist] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (status === "authenticated") {
            axios.get(
                "/api/user/watchlist",
            ).then(({data: {data: {items}}}) => setWatchlist(items))
            .catch(errors => console.log(errors))
        }
    }, [status])

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/search?${params.toString()}`)
        .then(({data}) => {
            const products = data.data.products || [];
            setProducts(products);
        }).catch((errors) => console.log(errors))
        .finally(() => setLoading(false))
    }, [params])

    return (
        loading ?
        <Loader message="Searching Products..." /> :
        !products.length ?
        <Error message="No Products Found" /> :
        <ProductGrid
            className={className}
            products={products} 
            watchlist={watchlist}
        />
    )
}
