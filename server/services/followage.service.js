let Followage = require("../models/followage.model");

exports.getFollowing = async function (user) {
  try {
    // agrego condicionalmente las queries
    let query = {};
    if (user) {
      query.user = user;
    }
    return await Followage.find(query);
  } catch (e) {
    console.error(e);
    throw Error("Error getting follows.");
  }
};

exports.add = async function (followageData) {
  await Followage.ensureIndexes();
  return await Followage.create({
    follower: followageData.userId,
    receiver: followageData.profileId,
  });
};
