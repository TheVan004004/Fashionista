import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import env from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

env.config();

const configEngine = (app) => {
  //Static file config
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use("/public", express.static(path.join(__dirname, "../public")));

  //Cors
  app.use(
    cors({
      origin: "http://localhost:3000", // Frontend URL
      credentials: true,
    })
  );

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
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
};

export { configEngine };
