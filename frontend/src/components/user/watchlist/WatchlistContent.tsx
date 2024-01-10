"use client"

import ProductGrid from "@/components/search/products/ProductGrid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WatchlistContent({
    backendUrl
}: {
    backendUrl: string
}) {
    const {data, status} = useSession();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (status === "authenticated") {
            const {access} = data as any;
            axios.get(
                `${backendUrl}/api/watchlists/`,
                {headers: {Authorization: `Bearer ${access}`}}
            ).then(({data: {data: {items}}}) => setItems(items))
            .catch(errors => console.log(errors))
        }
    }, [status])
    
    return (
        (status === "authenticated") &&
        <ProductGrid
            backendUrl={backendUrl}
            items={items}
        />
    )
}