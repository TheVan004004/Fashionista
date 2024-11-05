import cors from "cors";
import bodyParser from "body-parser";

const configEngine = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}

export { configEngine };