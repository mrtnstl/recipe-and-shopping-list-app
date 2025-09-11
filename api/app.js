import express from "express";
import cors from "cors";

import initRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors());

// TODO: init db connection here when ready
initRoutes(app);

app.listen(5000, () => { console.log("Backend is running") });


