import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductGrid from "./ProductGrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import Error from "@/components/fields/Error";

export default function ProductSearch({
    loading, setLoading, className="", backendUrl
}: {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    backendUrl: string,
    className?: string,
}) {
    const [items, setItems] = useState([]);
    const params = useSearchParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`${backendUrl}/api/search/?${params.toString()}`)
        .then(({data}) => {
            const products = data.data.products || [];
            setItems(products);
        }).catch((errors) => console.log(errors))
        .finally(() => setLoading(false))
    }, [params])

    return (
        loading ?
        <Loader message="Searching Products..." /> :
        !items.length ?
        <Error message="No Products Found" /> :
        <ProductGrid
            className={className}
            backendUrl={backendUrl}
            items={items} 
        />
    )
}
