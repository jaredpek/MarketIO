export default function ProductItem({
    item
}: {
    item: {
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
}) {
    return (
        <div>
            Product
        </div>
    )
}