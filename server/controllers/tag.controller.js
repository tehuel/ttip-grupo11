let TagService = require("../services/tag.service");

exports.getTags = async function (req, res) {
  try {
    let tags = await TagService.findAll();
    return res.status(200).json({
      data: tags,
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
    const { name } = req.body;

    const createdTag = await TagService.create({ name });
    return res.status(201).json({
      message: "Created",
      data: createdTag,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.update = async function (req, res) {
  try {
    // TODO: validate req.params and req.body
    const { name: oldName } = req.params;
    const { name: newName } = req.body;

    const updatedTag = await TagService.update(oldName, {
      name: newName,
    });

    return res.status(200).json({
      message: "Etiqueta modificada",
      data: updatedTag,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.delete = async function (req, res) {
  try {
    // TODO: validate req.params and req.body
    const { name } = req.params;

    TagService.delete(name);

    return res.status(200).json({
      message: "Etiqueta eliminada",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getByName = async function (req, res, next) {
  TagService.getByName(req.params.name, req.body)
    .then((tags) => res.json(tags))
    .catch((err) => next(err));
};
