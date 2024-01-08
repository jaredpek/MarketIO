import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import Input from "./Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password({
    className="", placeholder="Password", value, onChange, onKeyDown
}: {
    className?: string,
    placeholder?: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onKeyDown?: KeyboardEventHandler
}) {
    const [hidden, setHidden] = useState(true);
    return (
        <div className={`rounded flex items-center select-none ${className}`}>
            <Input
                type={hidden ? "password" : "text"}
                className="px-4 py-3 rounded border-none w-full"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <div
                className="pr-4 gray cursor-pointer"
                onClick={() => setHidden(!hidden)}
            >
                {
                    hidden ?
                    <FaEye size={23} /> :
                    <FaEyeSlash size={23} />
                }
            </div>
        </div>
    )
}