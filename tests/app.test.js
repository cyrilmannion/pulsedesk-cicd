// tests/app.test.js
const request = require("supertest");
const app = require("../src/app");

test("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(500);// wrong on purpose to show how to fix it
});