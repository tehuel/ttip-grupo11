const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const faker = require("faker/locale/es");

const seedUsers = async (amount = 20) => {
  await User.collection.deleteMany({});
  const passwordHash = bcrypt.hashSync("password");

  // agrego un usuario admin a la DB
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: passwordHash,
  });

  // agrego usuarios random
  const fakeUsers = Array(amount)
    .fill()
    .map(() => {
      const fakeCompleteName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      return {
        name: fakeCompleteName,
        image: faker.internet.avatar(),
        email: faker.internet.exampleEmail(),
        password: passwordHash,
      };
    });
  return await User.insertMany(fakeUsers);
};

module.exports = seedUsers;
