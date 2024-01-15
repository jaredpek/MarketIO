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
            ((img.width / img.height) > (208 / 162)) ?
            setStretch("w-full") :
            setStretch("h-full")
        }
    }, [])

    return <img src={image} className={stretch} alt="Product image not found" />
}