const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UnauthenticatedError, CustomAPIError } = require("../errors");

const secret = process.env.jwt;

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  // remove password when returning
  user.password = undefined;

  res.status(201).json({
    status: "success",
    data: user,
  });
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  // check db
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new CustomAPIError("User not Found", 404);
  }

  const { _id: id, username: userName, password: hashedpassword } = user;

  const isMatch = await bcrypt.compare(password, hashedpassword);

  if (isMatch) {
    const token = jwt.sign({ id, userName }, secret, { expiresIn: "1d" });

    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    throw new UnauthenticatedError("Password doesn't match");
  }
};

exports.dashboard = async (req, res) => {
  res.json({
    msg: `Welcome ${req.user.userName}`,
    secret: "I'm a Software Engineer",
  });
};
