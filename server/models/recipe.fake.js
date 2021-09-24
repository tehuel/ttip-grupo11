const faker = require("faker/locale/es");

const fakeRecipe = () => {
  return {
    name: faker.fake("{{lorem.word}} {{commerce.color}}").toLowerCase(),
    description: faker.fake("{{lorem.sentence}}"),
    rating: faker.fake("{{lorem.sentence}}"),
    ingredients: [],
    imgUrl: faker.fake("{{lorem.sentence}}").toLowerCase(),
  };
};

module.exports = fakeRecipe;
