import { ChangeEventHandler, KeyboardEventHandler } from "react";

export default function Input({
    className="", placeholder, value, onChange, onKeyDown, type="text", min=0
}: {
    className?: string,
    placeholder: string,
    value: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    type?: string,
    min?: number,
}) {
    return (
        <input
            type={type}
            className={`rounded px-4 py-3 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            min={min}
        />
    )
}