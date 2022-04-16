import express from "express";
import dotenv from "dotenv";
const app = express();
import jwt from "jsonwebtoken";

dotenv.config();
app.use(express.json());

app.post("/login", (req, res) => {
  let {} = req.body;
  let accessToken = jwt.sign(req.body, process.env.SECRET_TOKEN, {
    expiresIn: "30s",
  });
  res.send(accessToken);
});

app.listen(process.env.PORTAUTH, () => {
  console.log(`server is running at ${process.env.PORTAUTH}`);
});
