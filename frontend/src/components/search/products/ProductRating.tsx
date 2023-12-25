export default function ProductRating({
    rating, rating_qty, className="", width=80
}: {
    rating: number,
    rating_qty: number,
    className?: string,
    width?: number
}) {
    const height = 560 / 3000 * width;

    return (
        <div className={`flex gap-[4px] ${className}`}>
            <div className="relative mt-[2px]">
                <span>
                    <img 
                        src="/images/zero_rating.png"
                        style={{width, height}}
                    />
                </span>
                <span className="absolute top-0 left-0">
                    <img
                        src="/images/full_rating.png" 
                        style={{
                            height,
                            width: (rating / 5) * width,  
                            objectFit: "cover", 
                            objectPosition: "left"
                        }}
                    />
                </span>
            </div>
            <div>({rating_qty})</div>
        </div>
    )
}