import Input from "@/components/fields/Input";
import { ChangeEvent } from "react";

export default function({
    title, value, onChange, disabled=false, type="text", placeholder="", className="", error=""
}: {
    title: string,
    value: any,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    type?: string,
    placeholder?: string,
    className?: string,
    error?: string | undefined
}) {
    return (
        <div className="w-full">
            {title}
            <Input
                className={`w-full h-[44px] ${error ? "!border-red-500" : ""} ${className}`}
                type={type}
                placeholder={placeholder || title}
                value={value || ""}
                onChange={onChange}
                disabled={disabled}
            />
            {
                !!error &&
                <span className="error text-sm">{error}</span>
            }
        </div>
    )
}