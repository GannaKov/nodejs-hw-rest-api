const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;

  res.status(status).json({ message });
});

module.exports = app;

// http://localhost:3000/api/contacts
// https://nodejs-hw-rest-api-zggp.onrender.com/api/contacts
// http://localhost:3000/api/auth/register
// { "email": "aaa2@aaa.com", "password": "123456" }
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDc0ZGZiMTgzMTkwZDU3OGNkZWY2ZiIsImlhdCI6MTY3ODI5NDM0OSwiZXhwIjoxNjc4Mzc3MTQ5fQ.Hljw_88Jlx4xHvkXZyOoUk4FyVZxTRLETqz0j8qk95A"
