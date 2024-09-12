//app.js

const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();
app.use(cookieParser());

router.get("/", (req, res) => {
  res.send("App is running..");
});

app.post("/api/data", (req, res) => {
  // Set a cookie
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: true, // Cookie will only be sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  });

  // Return dummy JSON
  res.json({
    message: "Hello, world!",
    data: {
      key1: "value1",
      key2: "value2",
    },
  });
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
