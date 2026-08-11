import express from "express";
import { usersRouter } from "./routes/users.js";
export const app = express();

app.use(express.json());
app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.json({ message: "LitRec API is running"});
});