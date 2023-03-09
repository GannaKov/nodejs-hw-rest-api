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
app.use("/api/users", authRouter);

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
// "token1": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDY1ODhjYmU0NmFjYWQwZWFiM2IyNCIsImlhdCI6MTY3ODMwMDk5MiwiZXhwIjoxNjc4MzgzNzkyfQ.XU_yAtcOg0ltr9tYKgNbJtEtbUHSW0J5slvUh01UTu0
//  "token2": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDc0NTAxOGEwNzBmNmRmMjQ4NjBiYiIsImlhdCI6MTY3ODMxMDQyOSwiZXhwIjoxNjc4MzkzMjI5fQ.1tfY6C163K8MGF62XqvYi4g-oph_AUC_NEYpp6FbiIE
