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
  // describe("POST /login", () => {
  //   let user;
  beforeAll(async () => {
    // mongoServer = await MongoMemoryServer.create();
    // const mongoUri = mongoServer.getUri();
    // await mongoose.connect(mongoUri);
    const PORT = process.env.PORT || 3000;
    const uriDb = process.env.DB_HOST;
    mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(3000);
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });

    // server = app.listen(3000);

    // Create a user and hash their password
    const password = await bcrypt.hash("password123", 10);
    user = await User.create({
      email: "test@example.com",
      password,
      subscription: "starter",
    });

    // Generate a JWT token for the user
    // const payload = {
    //   id: user._id,
    // };
    // token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  });
  afterAll(async () => {
    await User.findByIdAndRemove(user._id);
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  });

  // await server.close();
  // await mongoServer.stop();
  // process.on("SIGINT", () => {
  //   mongoose
  //     .disconnect()
  //     .then(() => {
  //       console.log("Disconnected from MongoDB");
  //       process.exit(0);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // });

  it("should return a 200 status code and a token and user object", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" })
      .expect(200);

    expect(response.body.token).toBeDefined();
    // expect(response.body.token).toEqual(token);
    expect(response.body.email).toBeDefined();
    expect(typeof response.body.email).toEqual("string");
    expect(response.body.subscription).toBeDefined();
    expect(typeof response.body.subscription).toEqual("string");
  });

  //   it("should return a 401 status code when the email is wrong", async () => {
  //     const response = await request(app)
  //       .post("/login")
  //       .send({ email: "wrong@example.com", password: "password123" })
  //       .expect(401);

  //     expect(response.body.error).toEqual("Email or password is wrong");
  //   });

  //   it("should return a 401 status code when the password is wrong", async () => {
  //     const response = await request(app)
  //       .post("/login")
  //       .send({ email: "test@example.com", password: "wrongpassword" })
  //       .expect(401);

  //     expect(response.body.error).toEqual("Email or password is wrong");
  //   });
});
