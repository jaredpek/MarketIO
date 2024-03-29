import { MdErrorOutline } from "react-icons/md";
import Message from "./Message";

export default function Error({
    message="Error", className=""
}: {
    message?: string,
    className?: string
}) {
    return (
        <Message className={`bg-red-500 text-white ${className}`}>
            <MdErrorOutline className="shrink-0" size={20} />
            <div className="text-md">{message}</div>
        </Message>
    )
}