const _ = require("lodash");

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => (sum += blog.likes), 0);

const favoriteBlog = (blogs) => {
  let max = -Infinity;
  for (let i = 0; i < blogs.length; i++) {
    max = Math.max(max, blogs[i].likes);
  }
  return blogs.find((blog) => blog.likes === max);
};

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, (data) => data.author);
  const result = Object.keys(counted).map((key) => ({
    author: key,
    blogs: counted[key],
  }));
  return _.maxBy(result, (o) => o.blogs);
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
