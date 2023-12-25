import { MoonLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <MoonLoader size={40} />
        </div>
    )
}