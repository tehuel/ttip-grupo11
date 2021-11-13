let FavService = require("../services/fav.service");

exports.getFavs = async function (req, res) {
  try {
    const { skip, limit } = req.pagination;
    const { recipe = null } = req.query;
    console.log("getFavs", recipe);
    let favs = await FavService.findAll(skip, limit, recipe);
    return res.status(200).json({
      data: favs,
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
    const { recipe } = req.body;

    const createdFav = await FavService.create({
      recipe,
      user,
    });

    return res.status(201).json({
      message: "Created",
      data: createdFav,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
