const supertest = require("supertest");
const moongose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("check blogs id's are not named _id", async () => {
  const blogs = await api.get("/api/blogs");

  blogs.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(() => {
  moongose.connection.close();
});
