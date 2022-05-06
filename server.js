import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import connection from "./db/index.js";
import { getQueryStructure } from "./db/functionDB.js";
const app = express();
dotenv.config();
connection.connect();
app.use(cors());
const checkToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_TOKEN, (err, username) => {
    if (err) return res.sendStatus(403);
    req.username;
    next();
  });
};
// app.use(checkToken);
app.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes where a_type = "movie";`,
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results)
      // console.log("The solution is: ", results[0].solution);
      res.json(results[0]);
    }
  );
});

app.get("/getListMovie", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes where a_type = "movie";`,
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      res.json(results);
    }
  );
});
app.get("/getListSeries", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes where a_type = "serie";`,
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      res.json(results);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
