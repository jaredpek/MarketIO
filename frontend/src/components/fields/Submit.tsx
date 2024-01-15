import { MouseEventHandler } from "react";
import { ClipLoader } from "react-spinners";

export default function Submit({
    title="Submit", className="", loading=false, onClick
}: {
    title?: string,
    className?: string,
    loading?: boolean,
    onClick: MouseEventHandler
}) {
    return (
        <div
            className={`rounded button submit ${className} ${loading ? "loading" : ""}`}
            onClick={onClick}
        >
            {title}
            <ClipLoader
                size={15}
                color="#ffffff"
                loading={loading}
            />
        </div>
    )
}