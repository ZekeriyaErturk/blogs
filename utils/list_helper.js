const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => (sum += blog.likes), 0);

const favoriteBlog = (blogs) => {
  let max = -Infinity;
  for (let i = 0; i < blogs.length; i++) {
    max = Math.max(max, blogs[i].likes);
  }
  return blogs.find((blog) => blog.likes === max);
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
