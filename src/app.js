// src/app.js  Simple Express application to demonstrate CI/CD pipeline
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("CI/CD Pipeline Running Successfully!");
});

module.exports = app;