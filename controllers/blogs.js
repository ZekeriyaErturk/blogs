const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  if (!blog.title && !blog.url) {
    res.status(400).send({ error: "missing title and url" });
  } else {
    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    res.json(savedBlog);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  res.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } else {
    res.status(401).send({ error: "user unauthorized" });
  }
});

module.exports = blogsRouter;
