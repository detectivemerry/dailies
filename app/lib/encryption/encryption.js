const crypto = require("crypto");
//require("dotenv").config();

const encryptData = (text) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
    process.env.NEXT_PUBLIC_ENCRYPTION_IV
  );

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decryptData = (text) => {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
    process.env.NEXT_PUBLIC_ENCRYPTION_IV
  );
  let decrypted = decipher.update(text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

export { encryptData, decryptData }
