import { Router } from "express";
import { pool } from "../db/pool.js"

export const usersRouter = Router();

usersRouter.post("/", async (req, res)=> {
    const { username, displayName, email, passwordHash } = req.body;

    try{
        const result = await pool.query(
            `
            INSERT INTO users (
            username,
            display_name,
            email,
            password_hash
            )
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, display_name, email, created_at;
            `,
            [username, displayName, email, passwordHash]
        );

        res.status(201).json(result.rows[0]);
    } catch(error){
        console.error(error);
        res.status(500).json({error: " Failed to create user" });
    }

});