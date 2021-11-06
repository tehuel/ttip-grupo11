const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const seedUsers = async () => {
  await User.collection.deleteMany({});

  // agrego un usuario a la DB
  const adminUser = {
    email: "admin@example.com",
    password: bcrypt.hashSync("password"),
  };
  return await User.create(adminUser);
};

module.exports = seedUsers;
