const userSchema = require("../models/userModel");

const loginChecker = async (req, res, next) => {
  try {
    token = req?.headers?.authorization?.split(" ")[1];
    if (token !== req?.user.token) {
      const err = new Error("Invalid Token");
      next(err);
    } else {
      next();
    }
  } catch (error) {
    const err = new Error("Token Error");
    next(err);
  }
};

module.exports = { loginChecker };
