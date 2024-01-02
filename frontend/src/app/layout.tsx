import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "MarketIO",
}

export default function RootLayout({
    children,
}: {
    children?: React.ReactNode
}) {
    return (
        <html lang="en">
            <link rel="icon" href="/images/marketio_icon.png" />
            <body className={inter.className}>{children}</body>
        </html>
    )
}
