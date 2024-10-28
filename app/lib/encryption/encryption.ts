"use server"

import "dotenv/config.js"
const crypto = require("crypto");

const encryptData = (text : string) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.ENCRYPTION_SECRET,
    process.env.ENCRYPTION_IV
  );

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

const decryptData = (text : string) => {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    process.env.ENCRYPTION_SECRET,
    process.env.ENCRYPTION_IV
  );
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8")
  console.log("decrupt!!")
  console.log(decrypted)


  //return decrypted + decipher.final("utf8");
  return decrypted;
};

export { encryptData, decryptData }
