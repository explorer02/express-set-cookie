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
  res.cookie("cookie1", "cookieValue", {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: true, // Cookie will only be sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  });

  res.cookie("cookie2", "test_value", {
    domain: ".sprinklr.com", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    expires: new Date(Date.now() + 3600000), // Cookie expiration
  });

  res.cookie("cookie3", "test_value", {
    domain: ".sprinklr.com", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("cookie4", "test_value", {
    domain: "*", // Allow cookie for subdomains
    path: "/",
    sameSite: "none", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("cookie5", "test_value", {
    path: "/",
    sameSite: "lax", // Cross-origin cookies
    secure: true, // Cookies only sent over HTTPS
    httpOnly: true, // Cookies not accessible via JavaScript
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("cookie6", "test_value", {
    sameSite: "lax", // Cross-origin cookies
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
  });

  res.cookie("cookie7", "test_value", {
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    expires: new Date("20 sep 2024"),
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

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
