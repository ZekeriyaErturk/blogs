const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Back end user Validation
// username password -> boolean
const validate = (usr, psw) => {
  if (!usr || !psw) return false;
  else if (usr.length < 3 || psw.length < 3) return false;
  else return true;
};

// GET Users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  res.json(users);
});

// ADD User
usersRouter.post("/", async (req, res) => {
  const body = req.body;

  if (validate(body.username, body.password)) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } else {
    res.status(400).send({
      error: "username and password must be at least 3 character long",
    });
  }
});

module.exports = usersRouter;
