import { MouseEventHandler } from "react";
import { ClipLoader } from "react-spinners";

export default function Submit({
    className="", loading=false, onClick
}: {
    className?: string,
    loading?: boolean,
    onClick: MouseEventHandler
}) {
    return (
        <div
            className={`rounded button submit ${className} ${loading ? "loading" : ""}`}
            onClick={onClick}
        >
            Update
            <ClipLoader
                size={15}
                color="#ffffff"
                loading={loading}
            />
        </div>
    )
}