import mysql from "mysql";
import dbConfig from "../dbconfig.js";
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

export default connection;
