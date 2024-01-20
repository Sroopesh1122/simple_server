const userSchema = require("../models/userModel");
const { cloudinaryUploadImages } = require("../utils/cloudinary");
const { generateToken } = require("../utils/tokenGenerator");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const createUser = async (req, res, next) => {
  const { email } = req?.body;
  try {
    const findUser = await userSchema.findOne({ email });
    if (!findUser) {
      const user = await userSchema.create(req?.body);
      res.json(user);
    } else {
      const error = new Error("User Already Exists");
      next(error);
      // res.json({message:"User Already Exists"})
    }
  } catch (error) {
    throw new Error(error);
  }
};

const loginHandler = async (req, res, next) => {
  const { email, password } = req?.body;
  try {
    const findUser = await userSchema.findOne({ email });
    if (!findUser) {
      const err = new Error("User with is email not found!!!");
      next(err);
    }
    if (!(await findUser.isPasswordMatched(password))) {
      const err = new Error("Password not matched");
      next(err);
    }
    const token = await generateToken(findUser._id);
    const updateUser = await userSchema.findByIdAndUpdate(
      findUser._id,
      { token },
      { new: true }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 48 * 60 * 60 * 1000 });
    res.json(updateUser);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { _id } = req?.user;
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(_id, req?.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  const { _id } = req?.user;
  try {
    const user = await userSchema.findById(_id);
    if (req?.headers?.authorization.split(" ")[1] !== user.token) {
      const err = new Error("Invalid token");
      next(err);
    } else {
      user.token = "";
      await user.save();
      res.clearCookie("token");
      res.json(user);
    }
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const Imageuploader = asyncHandler(async (req, res) => {
  const user = req?.user;

  try {
    const uploader = (cpath) => cloudinaryUploadImages(cpath, "images");
    const urls = [];
    const paths = req.newPaths;
    const files = req.files;
    for (const fPath of paths) {
      const newpath = await uploader(path.join(__dirname, fPath));
      urls.push(newpath);
    }
    for (const file of files) {
      fs.unlinkSync(file.path);
    }
    const imagesUrls = urls.map((file) => {
      return file.url;
    });
    const updatedUser = await userSchema.findByIdAndUpdate(
      user._id,
      { image: imagesUrls[0] },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginHandler,
  updateUser,
  logoutUser,
  Imageuploader,
};
