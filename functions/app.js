//app.js

const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cookieParser());
app.use(cors());

router.get("/", (req, res) => {
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: true, // Cookie will only be sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  });

  res.cookie("test__2", "test_value", {
    domain: ".sprinklr.com", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    expires: new Date(Date.now() + 3600000), // Cookie expiration
  });

  res.cookie("test__3", "test_value", {
    domain: ".sprinklr.com", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__4", "test_value", {
    domain: "*", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__5", "test_value", {
    path: "/",
    sameSite: "lax", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__6", "test_value", {
    sameSite: "lax", // Cross-origin cookies
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__7", "test_value", {
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__8", "test_value", {
    path: "*",
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__9", "test_value", {
    path: "*",
    domain: "localhost",
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("test__10", "test_value", {
    path: "*",
    domain: "localhost",
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });

  res.json({ data: "App is running.." });
});

app.post("/", (req, res) => {
  // Set a cookie
  //   res.cookie("myCookie", "cookieValue", {
  //     httpOnly: true, // Makes the cookie inaccessible to JavaScript
  //     secure: true, // Cookie will only be sent over HTTPS
  //     maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  //   });

  res.cookie("test_cookie", "test_value", {
    domain: ".sprinklr.com", // Allow cookie for subdomains
    path: "/",
    sameSite: "None", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  //   res.cookie("test_cookie_max", "test_value", {
  //     domain: ".sprinklr.com", // Allow cookie for subdomains
  //     path: "/",
  //     sameSite: "None", // Cross-origin cookies
  //     secure: true, // Cookies only sent over HTTPS
  //     httpOnly: true, // Cookies not accessible via JavaScript
  //     maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  //   });

  // Return dummy JSON
  res.json({
    message: "Hello, world!",
    data: {
      key1: "value1",
      key2: "value2",
    },
  });
});

app.get("/api/data", (req, res) => {
  // Set a cookie
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: true, // Cookie will only be sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  });

  // Return dummy JSON
  res.json({
    message: "Hello, world GET!",
    data: {
      key1: "value1",
      key2: "value2",
    },
  });
});

// app.use("/", router);
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

// app.listen(1123, () => {
//   console.log(`Server is running on http://localhost:${1123}`);
// });
