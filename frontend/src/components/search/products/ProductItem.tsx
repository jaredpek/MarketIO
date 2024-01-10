import Link from "next/link";
import ProductRating from "./ProductRating";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface Product {
    id: string,
    key: string,
    title: string,
    url: string,
    image: string,
    currency: string,
    price: number,
    rating: number,
    rating_qty: number,
    platform: string,
}

export default function ProductItem({
    item, watchlist, setWatchlist, backendUrl
}: {
    item: Product,
    watchlist: string[],
    setWatchlist: Dispatch<SetStateAction<string[]>>,
    backendUrl: string
}) {
    const {key, title, url, image, currency, price, rating, rating_qty, platform} = item;
    const {data, status} = useSession();
    const [added, setAdded] = useState(false);

    useEffect(() => {
        for (let i = 0; i < watchlist.length; i ++) {
            if (watchlist[i] === item.key) {
                setAdded(true); return;
            }
        }
        setAdded(false);
    }, [])

    async function addItem() {
        if (status === "authenticated") {
            setAdded(true);
            const {access} = data as any;
            await axios.post(
                `${backendUrl}/api/watchlists/`,
                {key, title, url, image, currency, price, rating, rating_qty, platform},
                {headers: {Authorization: `Bearer ${access}`}}
            ).then(() => {
                watchlist.push(key);
                setWatchlist(watchlist.slice(0));
            })
        }
    }

    async function deleteItem() {
        if (status === "authenticated") {
            setAdded(false);
            const {access} = data as any;
            await axios.delete(
                `${backendUrl}/api/watchlists/?key=${key}`,
                {headers: {Authorization: `Bearer ${access}`}}
            ).then(() => {
                watchlist.splice(watchlist.indexOf(key), 1);
                setWatchlist(watchlist.slice(0));
            })
        }
    }

    return (
        <div id={key} className="cursor-pointer p-3 rounded-md h-[350px] relative hover:shadow-lg">
            <Link target="_blank" href={url} title={title}>
                <div className="mb-2 w-full h-[50%] flex items-center justify-center">
                    <img src={image} className="h-full w-fit" alt="No Product Image" />
                </div>
                <div className="line-clamp-2 mb-2">{title}</div>
                <div className="mb-2">
                    <span className="text-sm">{currency}</span>
                    <span className="text-xl">{price}</span>
                </div>
                <ProductRating className="mb-2" rating={rating} rating_qty={rating_qty} />
                <div>{platform}</div>
            </Link>
            {
                (status === "authenticated") &&
                <div
                    className="absolute z-40 top-3 right-3 h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border border-red-200 hover:shadow-lg text-red-400"
                    title={`Add "${title}" to watchlist`}
                    onClick={added ? deleteItem : addItem}
                >
                    {
                        added ? <IoHeartSharp size={18} /> : <IoHeartOutline size={18} />
                    }
                </div>
            }
        </div>
    )
}