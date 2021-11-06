const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const faker = require("faker/locale/es");
const Comment = require("../models/comment.model");

const seedUsers = async (amount = 20) => {
  await User.collection.deleteMany({});
  const passwordHash = bcrypt.hashSync("password");

  // agrego un usuario admin a la DB
  await User.create({
    email: "admin@example.com",
    password: passwordHash,
  });

  // agrego usuarios random
  const fakeUsers = Array(amount)
    .fill()
    .map(() => {
      return {
        email: faker.internet.exampleEmail,
        password: passwordHash,
      };
    });
  return await Comment.insertMany(fakeUsers);
};

module.exports = seedUsers;
