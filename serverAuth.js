import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
app.use(express.json());

let RefreshToken = [];

app.use(express.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  let { username } = req.body;

  let accessToken = jwt.sign({ username }, process.env.SECRET_TOKEN, {
    expiresIn: 60,
  });
  let refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN);
  RefreshToken.push(refreshToken);
  res.send({ accessToken, refreshToken });
});

app.post("/getRefreshToken", (req, res) => {
  let { refreshToken } = req.body;
  if (refreshToken == null) res.sendStatus(401);
  if (!RefreshToken.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.SECRET_TOKEN,
      {
        expiresIn: 60,
      }
    );
    res.json(accessToken);
  });
});

app.listen(process.env.PORTAUTH, () => {
  console.log(`server is running at ${process.env.PORTAUTH}`);
});
