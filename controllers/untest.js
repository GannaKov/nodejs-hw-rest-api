// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const { login, register } = require("./auth");
const request = require("supertest");
const { User } = require("../models/user");

const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require("jest");
// const jwt = require("jsonwebtoken");
const {
  beforeEach,
  afterEach,
  describe,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");

// const gravatar = require("gravatar");

// ---------------------
let connection;
let db;
let mongoServer;

const SECRET_KEY = "mysecretkey";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  // const mongoUri = mongoServer.getUri();
  // await mongoose.connect(mongoServer.getUri(), { dbName: "users" });
  // connection = await MongoClient.connect(
  //   mongoUri,
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   },
  //   30000
  // );
  // db = await connection.db();
  // app.locals.db = db; // передача объекта базы данных в приложение
});

afterAll(async () => {
  // await connection.close();
  await mongoose.disconnect();
  await mongoServer.stop();
}, 30000);

describe("POST /login", () => {
  let user;
  let token;
  let email;
  let password;

  beforeEach(async () => {
    password = "mypassword";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    email = "test@test.com";
    user = new User({ email, password: hashedPassword });

    await user.save();
    const payload = { id: user._id };
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should return 200 status code and a token if credentials are correct", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email, password })
      .expect(200);

    expect(res.body.token).toEqual(token);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.email).toEqual(email);
    expect(typeof res.body.email).toBe("string");
    expect(res.body.subscription).toEqual(user.subscription);
    expect(typeof res.body.subscription).toBe("string");
  });

  it("should throw a 401 error if email is incorrect", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "wrongemail@test.com", password })
      .expect(401);

    expect(res.body.message).toEqual("Email or password is wrong");
  });

  it("should throw a 401 error if password is incorrect", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email, password: "wrongpassword" })
      .expect(401);

    expect(res.body.message).toEqual("Email or password is wrong");
  });
});
// ====================================
// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
//   await mongoose.connect(mongoUri);
// });
// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe("POST /api/users/login", () => {
//   let user;

//   beforeEach(async () => {
//     // Создание тестового пользователя
//     const password = await bcrypt.hash("test_password", 10);
//     // user = await User.create({
//     //   email: "test@example.com",
//     //   password: password,
//     //   subscription: "starter",

//     user = {
//       email: "test@example.com",
//       password: password,
//     };
//     register(user.email, user.password);
//   });
//   afterEach(async () => {
//     await User.deleteMany();
//   });

//   it("should return a token and user with email and subscription fields", async () => {
//     const response = await request(app)
//       .post("/api/users/login")
//       .send({ email: "test@example.com", password: "test_password" })
//       .expect(200);

//     const { token, email, subscription } = response.body;

//     expect(token).toBeDefined();
//     expect(email).toBe(user.email);
//     expect(subscription).toBe(user.subscription);
//   });

//   it("should return 401 if user not found", async () => {
//     await User.deleteMany();

//     const response = await request(app)
//       .post("/api/users/login")
//       .send({ email: "test@example.com", password: "test_password" })
//       .expect(401);

//     const { message } = response.body;

//     expect(message).toBe("Email or password is wrong");
//   });

//   it("should return 401 if password is wrong", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({ email: "test@example.com", password: "wrong_password" })
//       .expect(401);

//     const { message } = response.body;

//     expect(message).toBe("Email or password is wrong");
//   });
// });
