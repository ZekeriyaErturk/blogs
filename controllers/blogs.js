const blogsRouter = require("express").Router();
let fakeData = require("../MOCK_DATA");

blogsRouter.get("/", (req, res) => {
  res.json(fakeData);
});

blogsRouter.post("/", (req, res) => {
  const blog = req.body;

  fakeData = fakeData.concat(blog);

  res.json(fakeData);
});

module.exports = blogsRouter;
