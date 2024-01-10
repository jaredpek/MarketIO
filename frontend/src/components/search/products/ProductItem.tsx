import Link from "next/link";
import ProductRating from "./ProductRating";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

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
    item, authenticated, watchlisted
}: {
    item: Product,
    authenticated: boolean,
    watchlisted: boolean
}) {
    const {key, title, url, image, currency, price, rating, rating_qty, platform} = item;
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
                authenticated &&
                <div
                    className="absolute z-40 top-3 right-3 h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border border-red-200 hover:shadow-lg"
                    title={`Add "${title}" to watchlist`}
                >
                    {
                        watchlisted ?
                        <IoHeartSharp size={18} className="text-red-400" /> :
                        <IoHeartOutline size={18} className="text-red-400" />
                    }
                </div>
            }
        </div>
    )
}