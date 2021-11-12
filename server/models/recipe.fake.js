const faker = require("faker/locale/es");

const fakeRecipe = (user = null, ingredients = [], tags = []) => {
  const generateStep = () => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      image: faker.image.unsplash.image(),
    };
  };
  const generateInstructions = () => {
    const stepsQuantity = faker.datatype.number({ min: 1, max: 6 });
    return Array(stepsQuantity)
      .fill()
      .map(() => {
        return generateStep();
      });
  };

  return {
    name: faker.lorem.sentence(),
    user: user,
    description: faker.lorem.sentence(),
    instructions: generateInstructions(),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    ingredients: ingredients,
    image: faker.image.unsplash.image(800, 600, "food"),
    tags: tags,
  };
};

module.exports = fakeRecipe;
