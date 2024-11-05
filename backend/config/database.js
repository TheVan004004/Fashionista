import pg from 'pg';
import fs from 'fs';
import 'dotenv/config';

// connect database
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// read file database.sql
const sql = await fs.readFileSync('database.sql', 'utf8');
const sql_command = sql.split("----"); // Separate commands in the .sql file with "----", each commands is element of sql_command

export { db, sql_command };