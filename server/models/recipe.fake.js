const faker = require("faker/locale/es");

const fakeRecipe = (ingredients = [], tags = []) => {
  return {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    ingredients: ingredients,
    imgUrl: faker.image.unsplash.image(800, 600, "food"),
    tags: tags,
  };
};

module.exports = fakeRecipe;
