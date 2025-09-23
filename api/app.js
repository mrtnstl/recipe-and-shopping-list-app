import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDb } from "./services/db/neonPostgres.js";
import initRoutes from "./routes/index.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const corsOptions = { origin: "http://localhost:5173" }; // TODO: implement accepted domain whitelist
app.use(cors());

initDb((err, pool) => {
    if (err) return console.error(err.message);//TODO: throw new Error??
    initRoutes(app, pool);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});