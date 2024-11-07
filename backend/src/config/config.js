import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import env from "dotenv";

env.config();

const configEngine = (app) => {
    //Cors
    app.use(cors());

    //req.body Config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Session Config
    app.use(
        session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        }));
}

export { configEngine };