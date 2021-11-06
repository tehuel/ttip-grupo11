let CommentService = require("../services/comment.service");

exports.getComments = async function (req, res) {
  try {
    const { skip, limit } = req.pagination;
    let comments = await CommentService.findAll(skip, limit);
    return res.status(200).json({
      data: comments,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.add = async function (req, res) {
  try {
    // TODO: validate req.body
    const { recipe, user, text } = req.body;

    const createdComment = await CommentService.create({
      recipe,
      user,
      text,
    });

    return res.status(201).json({
      message: "Created",
      data: createdComment,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
