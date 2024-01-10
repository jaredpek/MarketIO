import { MdErrorOutline } from "react-icons/md";
import Message from "./Message";

export default function Success({
    message="Success", className=""
}: {
    message?: string,
    className?: string
}) {
    return (
        <Message className={`bg-green-500 text-white ${className}`}>
            <MdErrorOutline className="shrink-0" size={20} />
            <div className="text-md">{message}</div>
        </Message>
    )
}