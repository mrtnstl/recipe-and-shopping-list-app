import express from "express";
import cors from "cors";

import authRouter from "./routes/domain/authRoutes.js";
import userRouter from "./routes/domain/userRoutes.js";
import recipeRouter from "./routes/domain/recipeRoutes.js";

const app = express();

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", recipeRouter);

app.listen(5000, () => { console.log("Backend is running") });