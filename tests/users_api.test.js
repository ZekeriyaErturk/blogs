const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("should invalid user creation return 400 status code", async () => {
  const newUser = {
    username: "hola",
    name: "user",
    password: "1",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(response.body.error).toContain(
    "username and password must be at least 3 character long"
  );
});

afterAll(() => {
  mongoose.connection.close();
});
