export default function Title({
    title
}: {
    title: string
}) {
    return <div className="text-2xl md:text-3xl font-semibold mb-4 text-center">{title}</div>
}