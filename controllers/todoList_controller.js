const todoSchema = require("../models/todo_list");
const userSchema = require("../models/userModel");
const createList = async (req, res, next) => {
  try {
    const { title, description } = req?.body;
    const createdList = await todoSchema.create({
      title,
      description,
      createdBy: req.user._id,
    });
    const updatedUser = await userSchema.findByIdAndUpdate(req?.user?._id, {
      $push: { todo_list: createdList?._id },
    });
    // updatedUser.todo_list.push(createdList?._id);
    // await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const updateList = async (req, res, next) => {
  const { id } = req?.params;
  try {
    const updatedList = await todoSchema.findByIdAndUpdate(id, req?.body, {
      new: true,
    });
    res.json(updatedList);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const getAllList = async (req, res, next) => {

  try {
    const lists = await todoSchema.find({createdBy:req.user._id});
    res.json(lists);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};
const getlist = async (req, res, next) => {
  const { id } = req?.params;
  try {
    const list = await todoSchema.findById(id);
    res.json(list);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

const deleteList = async (req, res, next) => {
  const user = req?.user;
  const { id } = req?.params;
  try {
    const deletedList = await todoSchema.findByIdAndDelete(id);
    const updatedUser = await userSchema.findByIdAndUpdate(
      user._id,
      { $pull: { todo_list: deletedList?._id } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    const err = new Error(error);
    next(err);
  }
};

module.exports = { createList, deleteList, getAllList, getlist, updateList };
