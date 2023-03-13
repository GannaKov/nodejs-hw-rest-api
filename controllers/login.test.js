const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User } = require("../models/user");
const { login } = require("./auth");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
require("dotenv").config();
const {
  beforeEach,
  afterEach,
  describe,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");

describe("POST /login", () => {
  let user;
  let token;
  let server;
  let mongoServer;

  beforeAll(async () => {
    // mongoServer = await MongoMemoryServer.create();
    // const mongoUri = mongoServer.getUri();
    // await mongoose.connect(mongoUri);
    //   ----------------

    await mongoose.connect(DB_HOST);
    server = app.listen(3000);

    // Create a user and hash their password
    const password = await bcrypt.hash("password123", 10);
    user = await User.create({
      email: "test@example.com",
      password,
      subscription: "starter",
    });
  });
  afterAll(async () => {
    await User.findByIdAndRemove(user._id);
    await mongoose.disconnect();
    await server.close();
    console.log("Disconnected from MongoDB");
  });

  it("should return a 200 status code and a token and user object", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" })
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(typeof response.body.email).toEqual("string");
    expect(response.body.subscription).toBeDefined();
    expect(typeof response.body.subscription).toEqual("string");
  });

  it("should return a 401 status code when the email is wrong", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "wrong@example.com", password: "password123" })
      .expect(401);
  });

  it("should return a 401 status code when the password is wrong", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" })
      .expect(401);
  });
});
