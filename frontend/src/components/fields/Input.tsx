import { ChangeEventHandler, KeyboardEventHandler } from "react";

export default function Input({
    className="", placeholder, value, onChange, onKeyDown, type="text", min=0, disabled=false
}: {
    className?: string,
    placeholder: string,
    value: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    type?: string,
    min?: number,
    disabled?: boolean
}) {
    return (
        <input
            type={type}
            className={`rounded px-4 py-[9px] ${disabled ? "bg-gray-200" : ""} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            min={min}
            disabled={disabled}
        />
    )
}