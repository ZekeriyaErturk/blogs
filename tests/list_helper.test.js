const { totalLikes, favoriteBlog, mostBlogs } = require("../utils/list_helper");
const data = require("./testData");
const _ = require("lodash");

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(data.slice(2, 3).likes).toBe(data.slice(2, 3).likes);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(data)).toBe(data.reduce((s, a) => s + a.likes, 0));
  });
});

describe("favorite blog", () => {
  test("of empty list is undefined", () => {
    expect(favoriteBlog([])).toEqual(undefined);
  });

  test("when list has only one blog equals to blog", () => {
    expect(favoriteBlog(data.slice(0, 1))).toEqual(data[0]);
  });

  test("of bigger list of blogs calculated", () => {
    expect(favoriteBlog(data)).toEqual(_.maxBy(data, (b) => b.likes));
  });
});

describe("most blogs", () => {
  test("of empty list is undefined", () => {
    expect(mostBlogs([])).toBe(undefined);
  });

  test("of one blog is equal to that blog", () => {
    expect(mostBlogs(data.slice(0, 1))).toEqual({
      author: data[0].author,
      blogs: 1,
    });
  });

  test("of bigger list of blogs calculated", () => {
    expect(mostBlogs(data)).toEqual({
      author: "Jennette Tivnan",
      blogs: 4,
    });
  });
});
