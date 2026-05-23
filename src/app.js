// src/app.js  Simple Express application to demonstrate CI/CD pipeline
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Updated staging environment");
});

module.exports = app;