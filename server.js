import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import connection from "./db/index.js";
import { getQueryStructure } from "./db/functionDB.js";
const app = express();
app.use(express.json());
dotenv.config();
// connection.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get("/getHomePage", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes ORDER BY a_imdb DESC`,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
app.get("/getListMovie", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes;`,
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
app.get("/getListSeries", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.animes where a_type = "serie";`,
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      res.send(results);
    }
  );
});
app.get("/genres", async (req, res) => {
  connection.query(
    `SELECT * FROM heroku_aecadcb09441e8c.genres;`,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post(`/movies/genre`, async (req, res) => {
  connection.query(
    `call heroku_aecadcb09441e8c.GET_ANIME_BY_GENRE_ID(${req.body.params});`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.post(`/sign-in`, async (req, res) => {
  console.log(req.body);
  connection.query(
    `call heroku_aecadcb09441e8c.SIGN_IN('${req.body.username}', '${req.body.password}');`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results[0]);
    }
  );
});

app.listen(4000, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
