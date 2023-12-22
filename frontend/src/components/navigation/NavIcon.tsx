export default function NavIcon({ 
    children,
    className
}: {
    children: React.ReactNode,
    className: string
}) {
    return (
        <div className={ `w-20 flex-shrink-0 md:w-24 ${className}` }>
            { children }
        </div>
    )
}