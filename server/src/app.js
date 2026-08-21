import express from "express";
import { usersRouter } from "./routes/users.js";
export const app = express();
import {authRouter} from "./routes/auth.js";



app.use(express.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.json({ message: "LitRec API is running"});
});