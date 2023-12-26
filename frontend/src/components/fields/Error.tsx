import { MdErrorOutline } from "react-icons/md";

export default function Error({
    message="Error", className=""
}: {
    message?: string,
    className?: string,
}) {
    return (
        <div className={`rounded px-4 border-none bg-red-500 text-white flex gap-2 items-center justify-center min-h-[44px] py-3 ${className}`}>
            <MdErrorOutline className="shrink-0" size={20} />
            <div className="text-md">{message}</div>
        </div>
    )
}