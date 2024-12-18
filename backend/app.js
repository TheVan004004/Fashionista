import express from "express";
import { configEngine } from "./src/config/config.js";
import { router } from "./src/routes/api.js";
import env from "dotenv";
import { passport } from "./src/config/passportConfig.js";

const app = express();
env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


//config template engine
configEngine(app);

//define Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//define routes
app.use("/", router);

app.listen(port, hostname, () => {
    console.log(`API is running at http://${hostname}:${port}`);
});

