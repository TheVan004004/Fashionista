import express from "express";
import { configEngine } from "./config/config.js";
import { db } from "./config/database.js";
import { router } from "./routes/api.js";
import env from "dotenv";
import { passport } from "./config/passportConfig.js";

const app = express();
env.config();
const port = process.env.PORT;

//config template engine
configEngine(app);

//connect database
db.connect();

//define Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//define routes
app.use("/", router);

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});

