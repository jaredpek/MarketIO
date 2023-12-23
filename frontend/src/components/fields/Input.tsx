import { ChangeEventHandler, KeyboardEventHandler } from "react";

export default function Input({
    className="", placeholder, value, onChange, onKeyDown
}: {
    className?: string,
    placeholder: string,
    value: string,
    onChange?: ChangeEventHandler<HTMLInputElement>
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}) {
    return (
        <input
            type="text"
            className={`rounded-edge px-4 py-3 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}