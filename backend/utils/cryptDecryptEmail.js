import crypto from "crypto";

export const cryptEmail = (email, key, iv) => {
    const chiper = crypto.createCipheriv(
        process.env.algorithm,
        key,
        Buffer.from(iv, "hex")
    );

    let encryptedEmail = chiper.update(email, "utf-8", "hex");
    encryptedEmail += chiper.final("hex");

    return encryptedEmail;
};

export const decryptEmail = (email, key, iv) => {
    const dechiper = crypto.createDecipheriv(
        process.env.algorithm,
        key,
        Buffer.from(iv, "hex")
    );

    let decryptedEmail = dechiper.update(email, "hex", "utf-8");
    decryptedEmail += dechiper.final("utf-8");

    return decryptedEmail;
};
