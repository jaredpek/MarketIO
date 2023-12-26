import { MoonLoader } from "react-spinners";

export default function Loader({
    message="", className=""
}: {
    message?: string,
    className?: string,
}) {
    return (
        <div className={`w-full my-4 flex flex-col gap-3 items-center justify-center pt-4 ${className}`}>
            <MoonLoader size={40} />
            {
                message &&
                <div>{message}</div>
            }
        </div>
    )
}