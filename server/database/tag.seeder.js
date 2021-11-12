const Tag = require("../models/tag.model");
const faker = require("faker/locale/es");

const seedTags = async (amount = 9) => {
  // genero un listado de tags
  const tags = [
    "Vegetariano",
    "Vegano",
    "Bajo en Grasas",
    "Bajo en Sodio",
    "Bajo en Colesterol",
    "Sin Azúcar",
    "Sin Gluten",
    "Kosher",
    "Halal",
  ].map((i) => ({
    name: i,
  }));

  const selectedTags = faker.random.arrayElements(tags, amount);
  // agrego los tags a la BD
  await Tag.collection.deleteMany({});
  return await Tag.insertMany(selectedTags);
};

module.exports = seedTags;
