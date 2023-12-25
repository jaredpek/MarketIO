import { MdErrorOutline } from "react-icons/md";

export default function Error({
    message="Error", className=""
}: {
    message?: string,
    className?: string,
}) {
    return (
        <div className={`rounded px-4 border-none bg-red-500 text-white flex gap-2 items-center justify-center h-[44px] ${className}`}>
            <MdErrorOutline size={20} />
            {message}
        </div>
    )
}