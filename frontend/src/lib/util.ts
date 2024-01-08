import { ReadonlyURLSearchParams } from "next/navigation";

export function getKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    const length = 32;
    let result = "";

    for (let i = 0; i < length; i ++) {
        let index = Math.floor(Math.random() * (length - 1));
        result += chars[index];
    }

    return result;
}

export function getRedirect(path: string, params: ReadonlyURLSearchParams) {
    if (path.includes("login") || path.includes("register")) return `${params.toString()}`;
    const paramStr = params.toString();
    return `redirect=${path}${paramStr ? "?" + paramStr : ""}`
}
