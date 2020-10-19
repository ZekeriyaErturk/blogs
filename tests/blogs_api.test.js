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

test("check adding blog is working", async () => {
  const newBlog = {
    title: "A blog about JS",
    author: "John Doe",
    url: "www.somesite.com",
    likes: 10,
  };

  const res1 = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const res2 = await api.get("/api/blogs");

  const titles = res2.body.map((r) => r.title);

  expect(res2.body).toHaveLength(res1.body.length + 1);
  expect(titles).toContain("A blog about JS");
});

test("check for likes property default to 0", async () => {
  const newBlog = {
    title: "A blog",
    author: "John Doe",
    url: "www.somesite.com",
  };

  const res = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.likes).toBe(0);
});

test("check for title and url are missing from post", async () => {
  const newBlog = {
    author: "John Doe",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => {
  moongose.connection.close();
});
