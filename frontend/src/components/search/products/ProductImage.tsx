import { useEffect, useState } from "react";

export default function ProductImage({
    image
}: {
    image: string
}) {
    const [stretch, setStretch] = useState("");

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            (img.width > img.height) ?
            setStretch("w-full") :
            setStretch("h-full")
        }
    }, [])

    return <img src={image} className={`${stretch} max-h-full`} alt="Product image not found" />
}