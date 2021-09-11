const faker = require("faker/locale/es");

const fakeRecipe = () => {
  return {
    name: faker
      .fake("{{lorem.word}} {{lorem.word}} {{commerce.color}}")
      .toLowerCase(),
  };
};

module.exports = fakeRecipe;
