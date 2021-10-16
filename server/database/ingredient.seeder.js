const Ingredient = require("../models/ingredient.model");

const seedIngredients = async () => {
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
    "Lechugas",
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

  // agrego los ingredientes a la BD
  await Ingredient.collection.deleteMany({});
  return await Ingredient.insertMany(ingredients);
};

module.exports = seedIngredients;
