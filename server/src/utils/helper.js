export const levenshteinDistance = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    dp[0] = Array.from({ length: b.length + 1 }, (_, i) => i);

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[a.length][b.length];
};

export function encryptCart(data, key) {
    const cipher = crypto.createCipher("aes-256-cbc", key);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
export function decryptCart(encrypted, key) {
    const decipher = crypto.createDecipher("aes-256-cbc", key);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// function encryptCart(key, cartData) {
//     const iv = generateIV();
//     const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     let encryptedData = cipher.update(cartData, "utf-8", "base64");
//     encryptedData += cipher.final("base64");
//     return {
//         iv: iv.toString("base64"),
//         encryptedData,
//     };
// }
// function decryptCart(key, encryptedCart) {
//     const iv = Buffer.from(encryptedCart.iv, "base64");
//     const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
//     let decryptedData = decipher.update(
//         encryptedCart.encryptedData,
//         "base64",
//         "utf-8"
//     );
//     decryptedData += decipher.final("utf-8");
//     return decryptedData;
// }
