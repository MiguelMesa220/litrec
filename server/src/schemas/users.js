import {z} from "zod";

export const createUserSchema = z.object({
    username: z
    .string()
    .min(3)
    .max(30),

    displayName: z
    .string()
    .min(1)
    .max(100),

    email: z
    .string()
    .email(),

    password: z
    .string()
    .min(8)
    .max(128),
});