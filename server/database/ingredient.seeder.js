const Ingredient = require("../models/ingredient.model");
const faker = require("faker/locale/es");

const seedIngredients = async (amount = 20) => {
  // genero un listado de ingredientes
  const ingredients = [
    "Aceite de soja",
    "Aceite de maíz",
    "Aceite de oliva",
    "Aceite de trufa",
    "Yogur",
    "Leche",
    "Helado",
    "Queso",
    "Manteca",
    "Miel",
    "Ajo",
    "Papa",
    "Lechuga",
    "Acelga",
    "Alcaparra",
    "Batata",
    "Berenjena",
    "Brócoli",
    "Calabacín",
    "Calabaza",
    "Cebolla",
    "Cebolla caramelizada",
    "Ciboulette",
    "Coles de Bruselas",
    "Coliflor",
    "Endivia",
    "Tomate",
    "Zanahoria",
    "Escarola",
    "Espárrago",
    "Espinaca",
    "Hinojo",
    "Judías",
    "Maíz",
    "Palmito",
    "Pepino",
    "Pimiento",
    "Puerro",
    "Remolacha",
    "Zapallo",
  ].map((i) => ({
    name: i,
  }));

  const selectedIngredients = faker.random.arrayElements(ingredients, amount);

  // agrego los ingredientes a la BD
  await Ingredient.collection.deleteMany({});
  return await Ingredient.insertMany(selectedIngredients);
};

module.exports = seedIngredients;
