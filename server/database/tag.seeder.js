const Tag = require("../models/tag.model");

const seedTags = async () => {
  // genero un listado de tags
  const fakeTags = [
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
  // agrego los tags a la BD
  await Tag.collection.deleteMany({});
  return await Tag.insertMany(fakeTags);
};

module.exports = seedTags;
