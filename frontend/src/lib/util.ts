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
