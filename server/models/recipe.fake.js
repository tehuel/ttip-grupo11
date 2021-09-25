const faker = require("faker/locale/es");

const fakeRecipe = (ingredients = []) => {
  return {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    ingredients: ingredients,
    imgUrl: faker.image.lorempixel.food(800, 600, true),
  };
};

module.exports = fakeRecipe;
