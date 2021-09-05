const faker = require("faker/locale/es");

const fakeIngredient = () => {
  return {
    name: faker
      .fake("{{lorem.word}} {{lorem.word}} {{commerce.color}}")
      .toLowerCase(),
  };
};

module.exports = fakeIngredient;
