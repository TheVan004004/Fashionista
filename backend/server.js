import express from "express";
import { configEngine } from "./config/config.js";
import { db } from "./config/database.js";
import { router } from "./routes/api.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

//config template engine
configEngine(app);

//connect database
db.connect();

//define routes
app.use("/", router);

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
