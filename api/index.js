import express from "express";
import cors from "cors";

import authRouter from "./routes/domain/authRoutes.js";
import userRouter from "./routes/domain/userRoutes.js";
import recipeRoutes from "./routes/domain/recipeRoutes.js";

const app = express();
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors());

const shoppingListsModel = [
    { id: 1, user_id: 1, product_name: "kenyér", product_quantity: 1, product_unit: "kg", estimated_price_per_unit: 400, currency: "HUF" },
    { id: 2, user_id: 1, product_name: "margarin", product_quantity: 1, product_unit: "dkg", estimated_price_per_unit: 670, currency: "HUF" },
    { id: 3, user_id: 1, product_name: "paprika", product_quantity: 3, product_unit: "piece", estimated_price_per_unit: 70, currency: "HUF" },
    { id: 4, user_id: 1, product_name: "tej", product_quantity: 1, product_unit: "liter", estimated_price_per_unit: 352, currency: "HUF" },
]
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", recipeRoutes);

app.listen(5000, () => { console.log("Backend is running") });