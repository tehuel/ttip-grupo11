let CommentService = require("../services/comment.service");

exports.getComments = async function (req, res) {
  try {
    const { skip, limit } = req.pagination;
    const { recipe = null } = req.query;
    console.log("getComments", recipe);
    let comments = await CommentService.findAll(skip, limit, recipe);
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
    const { sub: user } = req.user;
    const { recipe, text } = req.body;

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
