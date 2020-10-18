const { totalLikes, favoriteBlog } = require("../utils/list_helper");

const data = [
  {
    title: "All About Actresses (Le bal des actrices)",
    author: "Jock Scothron",
    url: "https://arizona.edu/quam/fringilla/rhoncus/mauris.html",
    likes: 100,
  },
  {
    title: "Broken Trail",
    author: "Mella Bidewell",
    url: "https://parallels.com/fermentum.png",
    likes: 45,
  },
  {
    title: "Blue Jasmine",
    author: "Jocko Cancellor",
    url: "https://blogs.com/nascetur.js",
    likes: 66,
  },
  {
    title: "Minority Report",
    author: "Anatol Umney",
    url: "http://unicef.org/curae/mauris/viverra/diam/vitae.js",
    likes: 300,
  },
  {
    title: "Coward, The (Kapurush)",
    author: "North Margerrison",
    url: "http://prlog.org/dapibus/duis.json",
    likes: 33,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(totalLikes(data.slice(2, 3))).toBe(66);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(data)).toBe(544);
  });
});

describe("favorite blog", () => {
  test("of empty list is undefined", () => {
    expect(favoriteBlog([])).toEqual(undefined);
  });

  test("when list has only one blog equals to blog", () => {
    expect(favoriteBlog(data.slice(0, 1))).toEqual(data[0]);
  });

  test("of biggler list of blogs calculated", () => {
    expect(favoriteBlog(data)).toEqual(data[3]);
  });
});
