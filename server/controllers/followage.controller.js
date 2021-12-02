let FollowageService = require("../services/followage.service");

exports.getFollows = async function (req, res) {
  try {
    const { skip, limit } = req.pagination;
    const { user = null } = req.query;
    let follows = await FollowageService.getFollowing(skip, limit, user);
    return res.status(200).json({
      data: follows,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.add = async function (req, res) {
  try {;
    const { sub: userId } = req.user;
    const { profile } = req.body;
    const profileId = profile.id;
    const followData = {
      userId,
      profileId,
    };
    let user = await FollowageService.add(followData);
    console.log(user);
    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
