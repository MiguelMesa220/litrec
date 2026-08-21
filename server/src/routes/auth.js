import {Router} from "express";
import bcrypt from "bcrypt";
import {z} from "zod";

import {pool} from "../db/pool.js";

export const authRouter = Router();

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

authRouter.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            error: "Invalid login data",
            details: parsed.error.issues,
        });
    }

    const{email, password} = parsed.data;

    try{
        const result = await pool.query(
            `
            SELECT
                id,
                username,
                display_name,
                email,
                password_hash
            FROM users
            WHERE email = $1;
            `,
            [email]
        );
        const user = result.rows[0];

        if (!user){
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if(!passwordMatches){
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        return res.status(200).json({
            id: user.id,
            username: user.username,
            displayName: user.display_name,
            email: user.email,
        });
        }catch(error){
            console.error(error);

            return res.status(500).json({
                error: "Failed to log in",
            });

        }
});