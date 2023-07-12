const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

let envData = {};

try {
    const rawData = fs.readFileSync(path.resolve(process.cwd(), ".env"));
    envData = dotenv.parse(rawData);
} catch (error) {}

const getValue = (name, defaultValue) => {
    const value = process.env[name] || envData[name];
    if (value === undefined && defaultValue === undefined) {
        throw new Error(`${name} config var have to be set`);
    }
    return value || defaultValue;
};

module.exports = {
    HOST: getValue("HOST", "http://192.168.1.41"),
    PORT: getValue("PORT", "1337"),
    API_URL: getValue("API_URL", "http://192.168.1.41:1337"),
    DB_NAME: getValue("DB_NAME", "ronove"),
    DB_USER: getValue("DB_USER", "postgres"),
    DB_PASSWORD: getValue("DB_PASSWORD", "itiva2020"),
    DB_HOST: getValue("DB_HOST", "192.168.2.250"),
    DB_PORT: getValue("DB_PORT", "5432"),
    JWT_ACCESS_SECRET: getValue(
        "JWT_ACCESS_SECRET",
        "SDLKF111JLSDKF-LSNFDFSDFSsadf!!!asdfsdasdasfSKxvcefvbnhkFNSKDJF-SDFsdfsdfs234234234234"
    ),
    JWT_REFRESH_SECRET: getValue(
        "JWT_REFRESH_SECRET",
        "SASDAasdasdwerwemkcvkl1234-sdasda-sxcvmnklty-1242345jnkmzxkn!!sfkjmncmksf%^$%^456"
    ),
    CLIENT_URL: getValue("CLIENT_URL", "http://10.66.66.20:3001"),

    SMTP_HOST: getValue("SMTP_HOST", "smtp.gmail.com"),
    SMTP_PORT: getValue("SMTP_PORT", "587"),
    SMTP_USER: getValue("SMTP_USER", "midnightdidik@gmail.com"),
    SMTP_PASS: getValue("SMTP_PASS", "jzmrukmwvemdzkpl"),
};
