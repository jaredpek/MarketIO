import Input from "@/components/fields/Input";
import { ChangeEvent, ReactNode } from "react";

export default function Field({
    title, value, onChange, disabled=false, type="text", placeholder="", className="", error="", children
}: {
    title: string,
    value?: any,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    type?: string,
    placeholder?: string,
    className?: string,
    error?: string | undefined,
    children?: ReactNode
}) {
    return (
        <div className="w-full">
            {title}
            {
                children ||
                <Input
                    className={`w-full h-[44px] ${error ? "!border-red-500" : ""} ${className}`}
                    type={type}
                    placeholder={placeholder || title}
                    value={value || ""}
                    onChange={onChange}
                    disabled={disabled}
                />
            }
            {
                !!error &&
                <span className="error text-sm">{error}</span>
            }
        </div>
    )
}