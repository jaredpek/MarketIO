import Link from "next/link";
import ProductRating from "./ProductRating";

export interface Product {
    id: string,
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
    item
}: {
    item: Product
}) {
    const {id, title, url, image, currency, price, rating, rating_qty, platform} = item;
    return (
        <Link target="_blank" href={url} id={id} className="hover:shadow-lg cursor-pointer p-3 rounded-md h-[350px]" title={title}>
            <div className="mb-2 w-full h-[50%] flex items-center justify-center">
                <img className="h-full" src={image} alt="No Product Image" />
            </div>
            <div className="line-clamp-2 mb-2">{title}</div>
            <div className="mb-2">
                <span className="text-sm">{currency}</span>
                <span className="text-xl">{price}</span>
            </div>
            <ProductRating className="mb-2" rating={rating} rating_qty={rating_qty} />
            <div>{platform}</div>
        </Link>
    )
}