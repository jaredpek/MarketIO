import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductGrid from "./ProductGrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import { useSession } from "next-auth/react";
import { Product } from "./ProductItem";
import Submit from "@/components/fields/Submit";

export default function ProductSearch({
    loading, setLoading, className=""
}: {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    className?: string,
}) {
    const params = useSearchParams();
    const {status} = useSession();
    const [page, setPage] = useState(1);
    const [watchlist, setWatchlist] = useState([] as string[]);
    const [products, setProducts] = useState([] as Product[]);
    const [extending, setExtending] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            axios.get("/api/user/watchlist")
            .then(({data: {data: {items}}}: {data: {data: {items: Product[]}}}) => setWatchlist(items.map((item) => item.key)))
            .catch(errors => console.log(errors))
        }
    }, [status])

    useEffect(() => {
        setLoading(true);
        setPage(page + 1);
        axios.get(`/api/search?page=${page}&${params.toString()}`)
        .then(({data: {data: {products}}}) => setProducts(products))
        .catch(errors => console.log(errors))
        .finally(() => setLoading(false))
    }, [params])

    function extendProducts() {
        setExtending(true);
        setPage(page + 1);
        axios.get(`/api/search?page=${page}&${params.toString()}`)
        .then(({data: {data: {products: newProducts}}}) => setProducts([...products, ...newProducts]))
        .catch(errors => console.log(errors))
        .finally(() => setExtending(false))
    }

    return (
        loading ?
        <Loader message="Searching Products..." /> :
        <>
            <ProductGrid
                className={`mb-6 ${className}`}
                products={products} 
                watchlist={watchlist}
            />
            <Submit
                className="max-w-[600px] m-auto"
                title="More Products"
                loading={extending}
                onClick={extendProducts}
            />
        </>
    )
}
