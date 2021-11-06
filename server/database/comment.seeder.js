const Comment = require("../models/comment.model");
const faker = require("faker/locale/es");

const seedComments = async (recipes = [], users = [], amount = 20) => {
  // genero un listado de comentarios
  const fakeComments = Array(amount)
    .fill()
    .map(() => {
      const selectedRecipe = faker.random.arrayElement(recipes);
      const selectedUser = faker.random.arrayElement(users);

      // genero un comentario
      return {
        recipe: selectedRecipe._id,
        user: selectedUser._id,
        text: faker.lorem.sentence(),
      };
    });

  // agrego comentarios a la BD
  await Comment.collection.deleteMany({});
  return await Comment.insertMany(fakeComments);
};

module.exports = seedComments;
