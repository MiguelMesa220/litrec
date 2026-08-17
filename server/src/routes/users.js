import { Router } from "express";
import { pool } from "../db/pool.js";
import bcrypt from "bcrypt";
import {createUserSchema} from "../schemas/users.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res)=> {
    const parsed = createUserSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            eror: "Invalid registration data",
            details: parsed.error.issues,
        });
    }

    const {
        username,
        displayName,
        email,
        password,
    } = parsed.data;

    try{
        const passwordHash = await bcrypt.hash(password, 12);
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