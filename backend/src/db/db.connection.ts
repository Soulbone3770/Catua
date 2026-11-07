import mysql from 'mysql2/promise';
import 'dotenv/config';
import { envGetter } from '../utils/envGetter.js';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = envGetter();

const dbPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    connectionLimit: 10
});

export default dbPool;