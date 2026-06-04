// src/app.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("PulseDesk app running now, well done");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
console.log("New Deployment triggered");

module.exports = app;
