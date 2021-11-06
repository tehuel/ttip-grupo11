const Comment = require("../models/comment.model");

exports.findAll = async function (skip, limit) {
  try {
    return await Comment.find().skip(skip).limit(limit);
  } catch (e) {
    console.error(e);
    throw Error("Error getting comments.");
  }
};

exports.create = async function (commentData) {
  await Comment.ensureIndexes();
  return await Comment.create(commentData);
};
