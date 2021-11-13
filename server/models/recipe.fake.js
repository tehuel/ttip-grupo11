const faker = require("faker/locale/es");
const { generate } = require("faker/vendor/user-agent");

const recipeName = [
  "Torta",
  "Tortilla",
  "Revuelto",
  "Ensalada",
  "Asado",
  "Postre",
  "Galletitas",
  "Dulce",
  "Sorpresa",
  "Relleno",
];

const fakeRecipe = (user = null, ingredients = [], tags = []) => {
  const generateStep = () => {
    const possibleTitles = [faker.lorem.sentence(), null];
    const possibleImages = [faker.image.unsplash.image(), null];
    return {
      title: faker.random.arrayElement(possibleTitles),
      description: faker.lorem.sentence(),
      image: faker.random.arrayElement(possibleImages),
    };
  };
  const generateInstructions = () => {
    const stepsQuantity = faker.datatype.number({ min: 2, max: 6 });
    return Array(stepsQuantity)
      .fill()
      .map(() => {
        return generateStep();
      });
  };
  const generateName = () => {
    const selectedName = faker.random.arrayElement(recipeName);
    const randomWords = faker.lorem.words(2);
    return `${selectedName} ${randomWords}`;
  };

  const fakeRatings = Array(faker.datatype.number({ min: 0, max: 6 }))
    .fill()
    .map(() => {
      return faker.random.arrayElement([1, 2, 3, 4, 5]);
    });
  const fakeAvg = fakeRatings.length
    ? fakeRatings.reduce((p, c) => p + c, 0) / fakeRatings.length
    : null;

  return {
    name: generateName(),
    user: user,
    description: faker.lorem.sentence(),
    instructions: generateInstructions(),
    ratings: fakeRatings,
    avgRating: fakeAvg,
    ingredients: ingredients,
    image: faker.image.unsplash.image(800, 600, "food"),
    tags: tags,
  };
};

module.exports = fakeRecipe;
