const express = require("express");
const blogsRouter = require("./controllers/blogs");
const cors = require("cors");
const middleware = require("./utils/middleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
