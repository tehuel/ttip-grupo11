let Tag = require("../models/tag.model");

exports.findAll = async function () {
  try {
    return await Tag.find().sort("name");
  } catch (e) {
    console.error(e);
    throw Error("Error getting tags.");
  }
};

exports.create = async function (tagData) {
  await Tag.ensureIndexes();
  return await Tag.create(tagData);
};

exports.update = async function (name, update) {
  await Tag.ensureIndexes();
  return Tag.findOneAndUpdate({ name: name }, update, {
    new: true,
  });
};

exports.delete = async function (name) {
  return Tag.deleteOne({ name: name });
};

exports.getByName = async function (name) {
  return Tag.find({
    name: name,
  });
};
