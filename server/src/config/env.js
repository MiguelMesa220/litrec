import "dotenv/config";

export const env = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL

};

if (!env.databaseUrl){
    throw new Error("DATABASE_URL is not defined");

}