import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const app = express();
dotenv.config();
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
app.get('/', (req, res)=> {
  res.send('hello thang')
})


app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
