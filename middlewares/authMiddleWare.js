const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
   
    if (req?.headers?.authorization.startsWith("Bearer")) {
      const token = req?.headers?.authorization.split(" ")[1];
      try {
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await userSchema.findById(decode.id);
        req.user = user;
        next();
      } catch (error) {
        const err = new Error("Invalid Token");
        next(err);
      }
    } else {
      const err = new Error("Token Not found");
      next(err);
    }
  } catch (error) {
    const err = new Error("Token not found");
    next(err);
  }
};

module.exports = { authMiddleware };
