import 'dotenv/config';

export const env = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    FRONTEND_URL: process.env.FRONTEND_URL
};

if (!env.DB_USER || !env.DB_NAME) {
    throw new Error("Missing essential Database environment variables.");
}