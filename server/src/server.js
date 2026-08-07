import { app } from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

try {
    await pool.query("SELECT 1");
    app.listen(env.port, ()=> {
        console.log(`LitRec API running on port ${env.port}`);
    });
} catch (error) {
    console.error("Failed to start LitRec API:", error);
    process.exit(1);
}