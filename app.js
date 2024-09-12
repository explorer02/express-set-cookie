const express = require("express");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 1122;

// Load SSL certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, "cert", "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "server.crt")),
};

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ data: "Hello" });
});

// POST route that sets a cookie and returns dummy JSON
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

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
