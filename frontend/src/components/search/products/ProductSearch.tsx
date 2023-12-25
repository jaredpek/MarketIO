"use client"

import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/navigation/Loader";
import Error from "@/components/fields/Error";

export default function ProductSearch({
    className="",
}: {
    className?: string
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useSearchParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/api/search/?${params.toString()}`)
            .then(({data}) => {
                const products = data.data.products || [];
                setItems(products);
            })
            .catch((errors) => console.log(errors))
            .finally(() => setLoading(false))
    }, [params])

    return (
        loading ?
        <Loader /> :
        !items.length ?
        <Error message="No Products Found" /> :
        <ProductGrid className={className} items={items} />
    )
}
