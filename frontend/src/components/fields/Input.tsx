export default function Input({
    className, placeholder
}: {
    className: string,
    placeholder: string
}) {
    return (
        <input
            type="text"
            className={ `gray-border rounded-xl px-4 py-3 ${className}` }
            placeholder={ placeholder }
        />
    )
}