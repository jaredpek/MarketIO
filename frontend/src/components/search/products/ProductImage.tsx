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
        img.decode().finally(() => {
            (img.naturalWidth > img.naturalHeight) ?
            setStretch("w-full") :
            setStretch("h-full")
        })
    }, [image])

    return <img src={image} className={stretch} alt="No Product Image" />
}