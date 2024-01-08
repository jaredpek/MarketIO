export default function TriggerButton({
    title, children, onClick
}: {
    title: string,
    children: React.ReactNode,
    onClick?: React.MouseEventHandler,
}) {
    return (
        <div
            className="rounded w-[55px] gray trigger"
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    )
}